/**
 * BYSETPOS over a weekday span (mirrors isnow.go/setpos.go): `M-F-[1]` is the
 * last business day of the month, `M-F+[1]` the first, `M-F+[1,3]` the first and
 * third. The rank is counted among the days of the instant's month whose weekday
 * lies in the span. A weekday span-step routes here instead of arithStepTerm.
 */

import { contains, inDomain, singleWeekday } from './compile.js';
import { CODES, fail } from './errors.js';
import { ROLE } from './roles.js';
import { mod } from './step.js';

/** setposTerm selects the nth day of the month among those matching a weekday span. */
export function setposTerm(t) {
  const set = weekdaySpanSet(endpointWeekday(t.lo), endpointWeekday(t.hi));
  const ks = setposIndices(t.incr.qtys);
  const { fromEnd } = t.incr;
  return (c) => contains(set, c.weekday) && contains(ks, monthRank(c, set, fromEnd));
}

// endpointWeekday resolves a span endpoint (a weekday name or a 1..7 number) to
// a single weekday value.
function endpointWeekday(a) {
  if (a.name !== '') {
    return singleWeekday(a.name);
  }
  if (a.star || a.qtys.length === 0) {
    fail(CODES.CONTEXT); // a weekday-span endpoint must be a name or a number
  }
  const v = a.qtys[0].num;
  inDomain(ROLE.WEEKDAY, v);
  return v;
}

// weekdaySpanSet expands an inclusive weekday span, wrapping past Saturday.
function weekdaySpanSet(lo, hi) {
  const out = [lo];
  for (let d = lo; d !== hi;) {
    d = (d % 7) + 1;
    out.push(d);
  }
  return out;
}

// monthRank returns the 1-based position of the instant's day among the month's
// days matching set, counted from the start (+) or the end (-). The instant's
// own day always lies in [1, daysInMonth], so counting from the edge to it is
// exactly its rank.
function monthRank(c, set, fromEnd) {
  let rank = 0;
  if (fromEnd) {
    for (let d = c.daysInMonth; d >= c.day; d -= 1) {
      rank += matchDay(c, set, d);
    }
    return rank;
  }
  for (let d = 1; d <= c.day; d += 1) {
    rank += matchDay(c, set, d);
  }
  return rank;
}

function matchDay(c, set, day) {
  return contains(set, weekdayOfDay(c, day)) ? 1 : 0;
}

// weekdayOfDay derives the weekday of an arbitrary day of the instant's month
// from the instant's own (day, weekday) by Gregorian arithmetic.
function weekdayOfDay(c, day) {
  return mod(c.weekday - 1 + day - c.day, 7) + 1;
}

// setposIndices validates BYSETPOS indices (a month has at most 31 days).
function setposIndices(qs) {
  return qs.map((q) => {
    if (q.num < 1 || q.num > 31) {
      fail(CODES.RANGE);
    }
    return q.num;
  });
}
