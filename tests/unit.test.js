/**
 * Unit tests for the residue: the ladder, the field algebra, symbol resolution,
 * canonicalization, bounds, derivation, zone handling, and the error contract —
 * so the suite alone reaches full line coverage. The conformance corpus (when
 * present) is the cross-implementation oracle.
 */

import assert from 'node:assert/strict';
import test from 'node:test';

import { CODES, IsnowError, Pattern, is, parse } from '../src/isnow/index.js';

// -- helpers ----------------------------------------------------------------

function canon(src, want) {
  assert.equal(parse(src).canonical, want, `canonical(${src})`);
}

function holds(src, at, want) {
  assert.equal(parse(src).holds(at), want, `holds(${src}, ${at})`);
}

function parseCode(src, code) {
  let got = null;
  try {
    parse(src);
  } catch (e) {
    got = e;
  }
  assert.ok(got instanceof IsnowError, `expected ${code} for ${src}, got ${got}`);
  assert.equal(got.code, code, `code(${src})`);
  return got;
}

function nextIso(src, from, tz) {
  const d = parse(src, tz ? { timeZone: tz } : undefined).next(from);
  return d === null ? null : d.toISOString();
}

function prevIso(src, from) {
  const d = parse(src).prev(from);
  return d === null ? null : d.toISOString();
}

// -- canonical --------------------------------------------------------------

test('canonical: ladder and defaults', () => {
  canon('6', '*/*/* * 06:00:00');
  canon('M noon', '*/*/* Monday 12:00:00');
  canon('/1 18', '*/*/01 * 18:00:00');
  canon('Su :0,30', '*/*/* Sunday *:00,30:00');
  canon('12/-1 0', '*/12/-01 * 00:00:00');
  canon('2000// ::0+[5]', '2000/*/* * *:*:0+[5]');
  canon('*', '*/*/* * *:*:00');
  canon('12/25', '*/12/25 * *:*:00');
  canon('2026//', '2026/*/* * *:*:00');
  canon('7/14', '*/07/14 * *:*:00');
  canon('2 :30', '*/*/* * 02:30:00');
  canon('*/*/* 2 12:00', '*/*/* Monday 12:00:00');
  canon('M.noon', '*/*/* Monday 12:00:00');
  canon('M_noon', '*/*/* Monday 12:00:00');
  canon(' 6 ', '*/*/* * 06:00:00');
});

test('canonical: symbols', () => {
  canon('Tu noon', '*/*/* Tuesday 12:00:00');
  canon('Th noon', '*/*/* Thursday 12:00:00');
  canon('monday noon', '*/*/* Monday 12:00:00');
  canon('Wednesday noon', '*/*/* Wednesday 12:00:00');
  canon('MWF noon', '*/*/* Monday,Wednesday,Friday 12:00:00');
  canon('SS noon', '*/*/* Sunday,Saturday 12:00:00');
  canon('TT noon', '*/*/* Tuesday,Thursday 12:00:00');
  canon('midnight', '*/*/* * 00:00:00');
  canon('mn', '*/*/* * 00:00:00');
  canon('md', '*/*/* * 12:00:00');
  canon('n', '*/*/* * 12:00:00');
  canon('M', '*/*/* Monday *:*:00');
  canon('*/*/* 7 12:00', '*/*/* Saturday 12:00:00');
  canon('*/*/* 2-6 12:00', '*/*/* Monday-Friday 12:00:00'); // numeric weekday span renders as names
  canon('*/*/* 2+[1] 12:00', '*/*/* 2+[1] 12:00:00'); // numeric weekday step anchor stays numeric
});

test('canonical: algebra shapes render verbatim', () => {
  canon('8-12+[2]', '*/*/* * 08-12+[2]:00:00'); // span-step anchor renders as a span
  canon('::*+[2]', '*/*/* * *:*:*+[2]'); // wildcard step anchor
  canon('*/12/-2w1d *:*:00', '*/12/-2w1d * *:*:00'); // unit compound concatenates
  canon('*/*/29-* *:*:00', '*/*/29-* * *:*:00'); // open-high span
  canon('/!1 *:*:00', '*/*/!01 * *:*:00'); // exclusion renders before its terms
  canon(':30-[10]', '*/*/* * *:30-[10]:00'); // descending step with anchor
  canon('M+[1,3] noon', '*/*/* Monday+[1,3] 12:00:00'); // occurrence union
});

// -- holds: the field algebra ----------------------------------------------

test('holds: wildcard, exact, set, exclusion', () => {
  holds('*/*/* * *:00:00', '2026-07-14T13:00:00Z', true);
  holds('2026// *:*:00', '2026-03-01T08:22:00Z', true);
  holds('2026// *:*:00', '2027-03-01T08:22:00Z', false);
  holds(':00,15,30,45', '2026-07-14T09:30:00Z', true);
  holds(':00,15,30,45', '2026-07-14T09:31:00Z', false);
  holds('/!1 *:*:00', '2026-07-02T00:00:00Z', true);
  holds('/!1 *:*:00', '2026-07-01T00:00:00Z', false);
});

test('holds: spans wrap and open', () => {
  holds('8-12', '2026-07-14T08:00:00Z', true);
  holds('8-12', '2026-07-14T13:00:00Z', false);
  holds('M-F noon', '2026-07-15T12:00:00Z', true);
  holds('M-F noon', '2026-07-18T12:00:00Z', false);
  holds('22-2', '2026-07-14T01:00:00Z', true);
  holds('22-2', '2026-07-14T12:00:00Z', false);
  holds('F-M noon', '2026-07-19T12:00:00Z', true); // wraps over the weekend
  holds('*/*/29-* *:*:00', '2026-07-31T00:00:00Z', true);
});

test('holds: from-end tails', () => {
  holds('*/*/-1 *:*:00', '2026-02-28T00:00:00Z', true);
  holds('*/*/-1 *:*:00', '2026-02-27T00:00:00Z', false);
  holds('*/12/-15 *:*:00', '2026-12-17T00:00:00Z', true);
  holds('*/12/-2w1d *:*:00', '2026-12-17T00:00:00Z', true);
  holds('*/12/-2w1d *:*:00', '2026-12-16T00:00:00Z', false);
  holds('/-2/ noon', '2026-12-15T12:00:00Z', true); // month from-end: last 2 months
  holds('/-2/ noon', '2026-06-15T12:00:00Z', false);
  holds('*/*/* -2 12:00', '2026-07-18T12:00:00Z', true); // weekday from-end: {Fri, Sat}
  holds('*/*/* -2 12:00', '2026-07-15T12:00:00Z', false);
  holds('*/*/* * -3:00:00', '2026-07-14T23:00:00Z', true); // hour from-end: last 3 hours
  holds('*/*/* * -3:00:00', '2026-07-14T20:00:00Z', false);
});

test('holds: steps (arithmetic, occurrence, week)', () => {
  holds(':0+[15]', '2026-07-14T09:30:00Z', true);
  holds(':0+[15]', '2026-07-14T09:20:00Z', false);
  holds('::+[9]', '2026-07-14T06:00:18Z', true);
  holds(':-[15]', '2026-07-14T09:59:00Z', true);
  holds(':-[15]', '2026-07-14T09:44:00Z', true);
  holds(':-[15]', '2026-07-14T09:45:00Z', false);
  holds('Monday+[3] noon', '2026-01-19T12:00:00Z', true);
  holds('11/ Th-[1] noon', '2026-11-26T12:00:00Z', true);
  holds('M+[1,3] noon', '2026-01-05T12:00:00Z', true);
  holds('/+[3w] noon', '2026-01-22T12:00:00Z', true);
  holds('/+[3w] noon', '2026-01-08T12:00:00Z', false);
  holds('M+[1],W+[2] noon', '2026-01-14T12:00:00Z', true);
  holds('2000+[4]// noon', '2004-06-01T12:00:00Z', true); // open year progression
  holds('2000+[4]// noon', '2005-06-01T12:00:00Z', false);
  holds('8-12+[2]', '2026-07-14T10:00:00Z', true); // non-weekday span-step: hours 8,10,12
  holds('8-12+[2]', '2026-07-14T09:00:00Z', false);
});

// -- setpos: BYSETPOS over a weekday span (M-F-[1] = last business day) -------

test('holds: setpos business days', () => {
  holds('M-F-[1] noon', '2026-02-27T12:00:00Z', true); // Feb 2026 last business day (Fri 27th)
  holds('M-F-[1] noon', '2026-02-28T12:00:00Z', false); // Saturday is outside the span
  holds('M-F-[1] noon', '2026-02-26T12:00:00Z', false); // an earlier weekday is not the last
  holds('M-F+[1] noon', '2026-03-02T12:00:00Z', true); // Mar 2026 first business day (Mon 2nd)
  holds('M-F+[1] noon', '2026-03-03T12:00:00Z', false);
  holds('*/*/* 2-6-[1] 12:00', '2026-02-27T12:00:00Z', true); // numeric weekday endpoints (2-6 = Mon-Fri)
  holds('*/*/* 2-6-[1] 12:00', '2026-02-26T12:00:00Z', false);
});

// -- intervals: "every N units" periodic recurrences (interval.js) -----------

test('canonical: intervals render after the main form, before bounds', () => {
  canon('+[90mn]', '*/*/* * *:*:00 +[90mn]');
  canon('+[25h]', '*/*/* * *:*:00 +[25h]');
  canon('+[10d]', '*/*/* * *:*:00 +[10d]');
  canon('+[30s]', '*/*/* * *:*:* +[30s]'); // a second-grained interval frees the second field
  canon('M-F +[90mn] >=6 <=18', '*/*/* Monday-Friday *:*:00 +[90mn] >=*/*/* * 06:00:00 <=*/*/* * 18:00:00');
});

test('canonical: an interval canonical form is a fixed point', () => {
  for (const src of ['+[90mn]', '+[25h]', '+[10d]', '+[30s]', 'M-F +[90mn] >=6 <=18']) {
    const c = parse(src).canonical;
    assert.equal(parse(c).canonical, c, `fixed point ${src}`);
  }
});

test('holds: interval grid by grain', () => {
  holds('+[90mn]', '2026-07-14T00:00:00Z', true); // epoch-aligned at midnight
  holds('+[90mn]', '2026-07-14T01:30:00Z', true); // 90 minutes later
  holds('+[90mn]', '2026-07-14T01:00:00Z', false); // on the hour is off the 90-min grid
  holds('+[90mn]', '2026-07-14T00:00:30Z', false); // finer-than-minute field must be 0
  holds('+[25h]', '2026-07-14T23:00:00Z', true); // 25h grid drifts across days
  holds('+[25h]', '2026-07-14T23:30:00Z', false); // minute must be 0 for an hour grain
  holds('+[10d]', '2026-07-16T00:00:00Z', true); // a tenth day from the epoch, at midnight
  holds('+[10d]', '2026-07-16T01:00:00Z', false); // whole time must be 00:00:00 for a day grain
  holds('+[10d]', '2026-07-15T00:00:00Z', false); // off the 10-day grid
  holds('+[30s]', '2026-07-14T09:00:30Z', true);
  holds('+[30s]', '2026-07-14T09:00:15Z', false);
});

test('holds: an interval is ANDed with fields and bounds', () => {
  holds('M-F +[90mn] >=6 <=18', '2026-07-14T07:30:00Z', true); // Tuesday, within window, on grid
  holds('M-F +[90mn] >=6 <=18', '2026-07-18T07:30:00Z', false); // Saturday fails the weekday
  holds('M-F +[90mn] >=6 <=18', '2026-07-14T07:00:00Z', false); // within window but off the grid
});

test('holds: daysFromCivil spans the negative era (proleptic Gregorian)', () => {
  // year 0 with month <= 2 drives the civil year to -1, exercising eraOf's
  // negative-era branch (a faithful port of Hinnant's algorithm).
  holds('+[1d]', '0000-02-01T00:00:00Z', true); // every day trivially lands on a day-grain midnight
});

test('next / prev derive interval occurrences', () => {
  assert.equal(nextIso('+[25h]', '2026-07-14T00:00:00Z'), '2026-07-14T23:00:00.000Z');
  assert.equal(nextIso('+[10d]', '2026-07-14T00:00:00Z'), '2026-07-16T00:00:00.000Z');
  assert.equal(prevIso('+[10d]', '2026-07-16T00:00:01Z'), '2026-07-16T00:00:00.000Z');
});

test('errors: interval domain (descending and zero)', () => {
  parseCode('-[90mn]', CODES.CONTEXT); // a descending interval is meaningless
  parseCode('+[0mn]', CODES.RANGE); // N must be >= 1
  parseCode('+[99999999999999999999s]', CODES.RANGE); // overflow magnitude fails positive()
});

// -- exclusions: pattern-level `! <spec>` carve-outs (exclusion.js) ----------

test('canonical: exclusions render after the main form, bounds', () => {
  canon('M-F ! 12/25', '*/*/* Monday-Friday *:*:00 ! */12/25 * *:*:*'); // absent time => wildcard whole day
  canon('noon ! 12/25 ! 1/1', '*/*/* * 12:00:00 ! */12/25 * *:*:* ! */01/01 * *:*:*'); // holiday list
  canon('M-F !12/25', '*/!12/25 Monday-Friday *:*:00'); // no separator => field exclusion, not pattern-level
});

test('canonical: an exclusion canonical form is a fixed point', () => {
  for (const src of ['M-F ! 12/25', 'noon ! 12/25 ! 1/1']) {
    const c = parse(src).canonical;
    assert.equal(parse(c).canonical, c, `fixed point ${src}`);
  }
});

test('holds: a pattern-level exclusion carves out its whole matching period', () => {
  holds('M-F ! 12/25', '2026-12-25T12:00:00Z', false); // Christmas is a weekday but excluded
  holds('M-F ! 12/25', '2026-12-25T23:59:00Z', false); // whole day excluded, not just midnight
  holds('M-F ! 12/25', '2026-12-24T12:00:00Z', true); // an ordinary weekday still holds
  holds('noon ! 12/25 ! 1/1', '2027-01-01T12:00:00Z', false); // second holiday in the list
  holds('noon ! 12/25 ! 1/1', '2027-01-02T12:00:00Z', true); // outside every exclusion
  holds('M-F !12/25', '2026-12-25T12:00:00Z', false); // field exclusion `!12` drops December's 25th
  holds('M-F !12/25', '2026-11-25T12:00:00Z', true); // a non-December 25th on a weekday still holds
});

test('next skips an excluded holiday', () => {
  const p = parse('noon ! 12/25');
  let cur = '2026-12-23T00:00:00Z';
  const got = [];
  for (let i = 0; i < 3; i += 1) {
    const d = p.next(cur);
    got.push(d.toISOString());
    cur = d;
  }
  assert.deepEqual(got, ['2026-12-23T12:00:00.000Z', '2026-12-24T12:00:00.000Z', '2026-12-26T12:00:00.000Z']);
});

test('errors: a step anchor must be a plain number, not a unit compound', () => {
  parseCode('0d0+[1]', CODES.CONTEXT); // compound anchor rejected (fuzz-fix)
});

// -- bounds -----------------------------------------------------------------

test('holds: bounds and windows', () => {
  holds('12 >=2011', '2015-06-01T12:00:00Z', true);
  holds('12 >=2011', '2010-06-01T12:00:00Z', false);
  holds('12 <9/1', '2026-08-31T12:00:00Z', true);
  holds('12 <9/1', '2026-09-01T12:00:00Z', false);
  holds('::+[9] >=6 <=18', '2026-07-14T06:00:00Z', true);
  holds('::+[9] >=6 <=18', '2026-07-14T18:00:00Z', true);
  holds('::+[9] >=6 <=18', '2026-07-14T05:59:00Z', false);
  holds('::+[9] >=6 <=18', '2026-07-14T18:00:09Z', false);
  holds('12 >=2011 <2016', '2013-06-15T12:00:00Z', true);
  holds('12 >=2011 <2016', '2016-01-01T12:00:00Z', false);
  holds('noon >2011', '2011-06-01T12:00:00Z', false); // '>' is exclusive
  holds('noon >2011', '2012-06-01T12:00:00Z', true);
  holds('noon <=18', '2026-07-14T12:00:00Z', true);
});

test('canonical: bound sub-spec is a full round-trippable form', () => {
  const p = parse('12 >=2011 <2016');
  assert.equal(p.canonical, '*/*/* * 12:00:00 >=2011/*/* * *:*:* <2016/*/* * *:*:*');
  assert.equal(parse(p.canonical).canonical, p.canonical); // fixed point
  assert.ok(parse('noon >=6:30').canonical.length > 0); // time group inside a bound
  assert.ok(parse('noon >=6').canonical.includes('>=')); // bare hour bound
});

// -- derivation -------------------------------------------------------------

test('next / prev', () => {
  assert.equal(nextIso('6', '2026-07-14T07:00:00Z'), '2026-07-15T06:00:00.000Z');
  assert.equal(nextIso('6', '2026-07-14T05:00:00Z'), '2026-07-14T06:00:00.000Z');
  assert.equal(nextIso('12/25 midnight', '2026-06-01T00:00:00Z'), '2026-12-25T00:00:00.000Z');
  assert.equal(nextIso('11/ Th-[1] noon', '2026-01-01T00:00:00Z'), '2026-11-26T12:00:00.000Z');
  assert.equal(nextIso('F midnight', '2026-07-14T00:00:00Z'), '2026-07-17T00:00:00.000Z');
  assert.equal(prevIso('6', '2026-07-14T07:00:00Z'), '2026-07-14T06:00:00.000Z');
  assert.equal(prevIso('11/ Th-[1] noon', '2026-12-01T00:00:00Z'), '2026-11-26T12:00:00.000Z');
});

test('next / prev honor and cap on bounds', () => {
  assert.equal(nextIso('12 <2016', '2020-01-01T00:00:00Z'), null); // past the until-window
  assert.equal(nextIso('noon >=2027', '2026-01-01T00:00:00Z'), '2027-01-01T12:00:00.000Z');
  assert.equal(prevIso('noon >=2027', '2026-01-01T00:00:00Z'), null); // before the since-window
});

test('next enumerates several quarter hours in order', () => {
  const p = parse(':0+[15]');
  let cur = '2026-07-14T09:07:00Z';
  const got = [];
  for (let i = 0; i < 3; i += 1) {
    const d = p.next(cur);
    got.push(d.toISOString());
    cur = d;
  }
  assert.deepEqual(got, ['2026-07-14T09:15:00.000Z', '2026-07-14T09:30:00.000Z', '2026-07-14T09:45:00.000Z']);
});

// -- zones ------------------------------------------------------------------

test('zones: offset strings, IANA timeZone, and Date inputs', () => {
  holds('M,W,F noon', '2026-07-15T12:00:00-05:00', true); // explicit offset wins
  holds('noon', '2026-07-15T12:00:00+05:30', true); // '+' offset arithmetic
  // A Date carries no zone: evaluate it in the parse-time IANA timeZone.
  const noonNy = new Date('2026-07-15T16:00:00Z'); // 12:00 in America/New_York (EDT)
  assert.equal(parse('noon', { timeZone: 'America/New_York' }).holds(noonNy), true);
  assert.equal(parse('noon', { timeZone: 'America/New_York' }).holds(new Date('2026-07-15T12:00:00Z')), false);
  // A naive string (no offset) is read in the timeZone; default is UTC.
  holds('noon', '2026-07-15T12:00:00', true);
  // Derivation in an IANA zone reconstructs the correct absolute instant. `from`
  // must be a Date (an offset string would fix the zone to that offset instead).
  const p = parse('noon', { timeZone: 'America/New_York' });
  assert.equal(p.next(new Date('2026-07-15T00:00:00Z')).toISOString(), '2026-07-15T16:00:00.000Z');
  assert.equal(p.prev(new Date('2026-07-15T20:00:00Z')).toISOString(), '2026-07-15T16:00:00.000Z');
});

test('zones: an unparseable instant is a context error', () => {
  let err = null;
  try {
    parse('6').holds('not-a-time');
  } catch (e) {
    err = e;
  }
  assert.ok(err instanceof IsnowError);
  assert.equal(err.code, CODES.CONTEXT);
});

// -- public API -------------------------------------------------------------

test('api: is, toString, explain, error shape', () => {
  assert.equal(is('M,W,F noon', '2026-07-15T12:00:00Z'), true);
  const p = parse('6');
  assert.equal(p.toString(), '*/*/* * 06:00:00');
  assert.equal(p.toString(), p.canonical);
  assert.ok(p instanceof Pattern);
  assert.equal(parse('M,W,F noon').explain(), 'holds at 12:00:00 on Monday,Wednesday,Friday');
  assert.equal(parse('12 >=2011 <2016').explain(), 'holds at 12:00:00 from 2011 until 2016');
  assert.equal(parse('2026// *:*:00').explain(), 'holds at *:*:00 in year 2026');
  assert.equal(parse('*/*/15 4 12:00').explain(), 'holds at 12:00:00 on Wednesday on day 15');
  const err = new IsnowError(CODES.RANGE, 'x');
  assert.ok(err instanceof Error);
  assert.equal(err.name, 'IsnowError');
  assert.equal(err.code, 'range');
});

// -- errors: every code and rejection branch --------------------------------

test('errors: syntax', () => {
  for (const src of ['M+[3', '>=', '//$']) {
    parseCode(src, CODES.SYNTAX);
  }
});

test('errors: symbol', () => {
  for (const src of ['T noon', 'S noon', 'mid', 'Xy noon', '*/*/5x *:*:00', 'M,T noon', 'MWF-F noon', 'noon >=5x', 'M,T+[1] noon']) {
    parseCode(src, CODES.SYMBOL);
  }
});

test('errors: range', () => {
  const cases = [
    '25', ':61', '/13/ *:*:00', '2016-2011// *:*:00', '12 >=25', '::+[0]', '25-30', '25-30+[2]',
    '8-25', '8-12+[0]', '*/*/1+[0w] noon', ':99999+[2]',
    // v0.2 silent-wrong guards (semantics.md §Algebra):
    ':0+[90]', '0+[25]', // step stride must be < the field cycle
    '*/*/-40 *:*:00', '*/*/-0 *:*:00', // from-end tail must be 1..cycle (day 40 > 31, day 0 < 1)
    'Monday+[0] noon', 'Monday+[6] noon', // weekday-occurrence index 1..5
    '*/*/+[99w] noon', '*/*/5+[3w] noon', // week stride 1..53 with anchor < stride
    ':0+[99999999999999999999]', '/-99999999999999999999', // overflow magnitude fails every range check
    'M-F+[99] noon', '*/*/* 2-9-[1] 12:00', // setpos index 1..31 and a numeric endpoint out of the weekday domain
  ];
  for (const src of cases) {
    parseCode(src, CODES.RANGE);
  }
});

test('errors: context', () => {
  const cases = [
    '-1// *:*:00', 'noon >=M', 'noon >=6,12', '6 7', 'noon 6:00', '*-5', '2 12:00',
    '/// noon', '::: noon', '2000// 2001// noon', 'M/1 noon', 'M-F/1 noon', '*/*/-2-5 noon',
    '12 <:0', '12 <::0', '12 <6::0', '-*', ':M+[2]', ':+[3w]', '*/*/M+[3w] noon', '0-A', 'M-5 noon',
    '+[4]// noon', '2000-[2]// noon', '-1// noon >=2011 <=2015', 'noon >=*',
    'noon >=*/*/-*', // a from-end wildcard inside a bound is not a plain wildcard
  ];
  for (const src of cases) {
    parseCode(src, CODES.CONTEXT);
  }
});

test('errors: a numeric-anchor forward year step is allowed', () => {
  assert.doesNotThrow(() => parse('2000+[4]// noon'));
});
