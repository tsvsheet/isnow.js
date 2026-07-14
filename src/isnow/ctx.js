/**
 * instantCtx: broken-down wall-clock fields plus the derived context the
 * matchers need (cycle lengths, weekday occurrence indices). Every derived
 * value is pure civil arithmetic over Y/M/D, so it is zone-independent
 * (mirrors isnow.go/match.go:newCtx and field.go).
 */

import { FIELDS, ROLE } from './roles.js';

const DAY_MS = 86400000;

/**
 * newCtx builds a context from wall-clock fields.
 * @param {{ y: number, m: number, d: number, H: number, M: number, S: number }} w
 */
export function newCtx(w) {
  const dim = daysInMonth(w.y, w.m);
  return {
    year: w.y, month: w.m, day: w.d,
    hour: w.H, minute: w.M, second: w.S,
    weekday: new Date(Date.UTC(w.y, w.m - 1, w.d)).getUTCDay() + 1,
    daysInMonth: dim,
    dayOfYear: dayOfYear(w.y, w.m, w.d),
    occ: Math.floor((w.d - 1) / 7) + 1,
    occFromEnd: Math.floor((dim - w.d) / 7) + 1,
  };
}

export function daysInMonth(year, month) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function dayOfYear(year, month, day) {
  return Math.floor((Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 1)) / DAY_MS) + 1;
}

/** value returns the field value for a role. */
export function value(c, r) {
  return c[FIELDS[r]];
}

/**
 * cycle is the inclusive [lo, hi] range of a role's parent cycle for this
 * instant. Year is never a caller (it has no natural cycle).
 */
export function cycle(c, r) {
  switch (r) {
    case ROLE.MONTH:
      return [1, 12];
    case ROLE.DAY:
      return [1, c.daysInMonth];
    case ROLE.WEEKDAY:
      return [1, 7];
    case ROLE.HOUR:
      return [0, 23];
    default:
      return [0, 59];
  }
}

/** withValue returns a copy of the context with one field replaced. */
export function withValue(c, r, v) {
  return { ...c, [FIELDS[r]]: v };
}
