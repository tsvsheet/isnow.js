/**
 * Intervals: true periodic recurrences — "every N units" — as distinct from a
 * field-local step (specs/contracts/semantics.md §Intervals). Mirrors
 * isnow.go/interval.go. A field-local step resets within one field's cycle,
 * whereas an interval crosses field boundaries (`+[90mn]` spans hours, `+[25h]`
 * spans days, `+[10d]` spans months) and is anchored at the civil epoch
 * (1970-01-01T00:00:00 in the evaluation zone), so it needs no explicit start.
 * It fires at the start of each grid unit and is ANDed with the rest of the
 * pattern. The interval units are s (second), mn (minute), h (hour), d (day);
 * weeks/months/years are already fields, so they are not interval units.
 */

import { CODES, fail } from './errors.js';
import { mod, positive } from './step.js';

// Each interval grain carries the count of whole units from the epoch (civil
// arithmetic on the wall-clock fields) and the predicate that its finer-than-
// unit fields are 0: mn requires second 0; h minute and second 0; d the whole
// time 00:00:00. The second grain has no finer field, so it is always ready.
const GRAINS = Object.freeze({
  s: { total: totalSeconds, zero: () => true },
  mn: { total: totalMinutes, zero: (c) => c.second === 0 },
  h: { total: totalHours, zero: (c) => c.minute === 0 && c.second === 0 },
  d: { total: totalDays, zero: (c) => c.hour === 0 && c.minute === 0 && c.second === 0 },
});

/** isIntervalUnit reports whether a unit name is an interval grain (s/mn/h/d). */
export function isIntervalUnit(unit) {
  return Object.hasOwn(GRAINS, unit);
}

/**
 * intervalHolds reports whether the instant lands on the interval grid: it must
 * be an integer number of periods from the epoch, at the start of its grid unit.
 */
export function intervalHolds(iv, c) {
  const g = GRAINS[iv.unit];
  return g.zero(c) && mod(g.total(c), iv.n) === 0;
}

/** compileInterval validates and compiles a bare interval increment. */
export function compileInterval(incr) {
  if (incr.fromEnd) {
    fail(CODES.CONTEXT); // a descending interval is meaningless
  }
  const q = incr.qtys[0];
  const n = positive(q.num); // +[0mn] and an overflow magnitude are range errors
  return { unit: q.unit, n, text: `+[${n}${q.unit}]` };
}

/** compileIntervals compiles every extracted interval increment. */
export function compileIntervals(raws) {
  return raws.map(compileInterval);
}

/**
 * hasSecondInterval reports whether any interval is second-grained (so the
 * second field must default to wildcard rather than 0 — it owns that field).
 */
export function hasSecondInterval(incrs) {
  return incrs.some((incr) => incr.qtys[0].unit === 's');
}

/** renderIntervals renders each interval (after the main form, before bounds). */
export function renderIntervals(ivs) {
  return ivs.map((iv) => ` ${iv.text}`).join('');
}

function totalDays(c) {
  return daysFromCivil(c.year, c.month, c.day);
}

function totalHours(c) {
  return totalDays(c) * 24 + c.hour;
}

function totalMinutes(c) {
  return totalHours(c) * 60 + c.minute;
}

function totalSeconds(c) {
  return totalMinutes(c) * 60 + c.second;
}

/**
 * daysFromCivil returns the number of days from 1970-01-01 to the civil date
 * (Howard Hinnant's algorithm), valid across the proleptic Gregorian calendar.
 * Every division truncates toward zero (Math.trunc) to mirror Go's integer `/`,
 * including the negative-era branch in eraOf.
 */
function daysFromCivil(year, month, day) {
  const y = month <= 2 ? year - 1 : year;
  const era = eraOf(y);
  const yoe = y - era * 400; // [0, 399]
  const doy = Math.trunc((153 * monthShift(month) + 2) / 5) + day - 1;
  const doe = yoe * 365 + Math.trunc(yoe / 4) - Math.trunc(yoe / 100) + doy;
  return era * 146097 + doe - 719468;
}

function eraOf(y) {
  return y >= 0 ? Math.trunc(y / 400) : Math.trunc((y - 399) / 400);
}

function monthShift(m) {
  return m > 2 ? m - 3 : m + 9;
}
