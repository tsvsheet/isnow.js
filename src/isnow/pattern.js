/**
 * Pattern: a parsed, canonicalized isnow (isnow.go/pattern.go + match.go +
 * derive.go). `holds` is the membership test; `next`/`prev` derive occurrences
 * by day-scanning with analytic per-field enumeration. Steps are field-local
 * (decision 004); bounds are honored and cap derivation.
 */

import { boundSatisfied, compileBounds } from './bound.js';
import { compileAll, fieldHolds } from './compile.js';
import { compileExclusions, excludes, renderExclusions } from './exclusion.js';
import { newCtx, withValue } from './ctx.js';
import { renderExplain } from './explain.js';
import { compileIntervals, hasSecondInterval, intervalHolds } from './interval.js';
import { mapGroups } from './ladder.js';
import { parseRaw } from './ast.js';
import { renderCanonical } from './render.js';
import { ROLE } from './roles.js';
import { validateUnits } from './units.js';
import { resolve } from './zone.js';

const HORIZON_YEARS = 100;
const DATE_ROLES = [ROLE.YEAR, ROLE.MONTH, ROLE.DAY, ROLE.WEEKDAY];

/** Pattern is immutable; obtain one from parse(). */
export class Pattern {
  constructor(fields, bounds, intervals, exclusions, canon, explanation, timeZone) {
    this._fields = fields;
    this._bounds = bounds;
    this._intervals = intervals;
    this._exclusions = exclusions;
    this._canon = canon;
    this._explanation = explanation;
    this._timeZone = timeZone;
  }

  /** canonical is the fully-qualified seven-field form. */
  get canonical() {
    return this._canon;
  }

  toString() {
    return this._canon;
  }

  /** explain returns the deterministic English description. */
  explain() {
    return this._explanation;
  }

  /** holds reports whether the pattern holds at an instant (Date or ISO string). */
  holds(at) {
    return this._holdsWall(resolve(at, this._timeZone).wall);
  }

  /** next returns the earliest occurrence strictly after from, or null. */
  next(from) {
    return this._derive(from, true);
  }

  /** prev returns the latest occurrence strictly before from, or null. */
  prev(from) {
    return this._derive(from, false);
  }

  _holdsWall(wall) {
    const c = newCtx(wall);
    return this._fieldsHold(c) && this._boundsHold(c) && this._intervalsHold(c) && this._notExcluded(c);
  }

  _notExcluded(c) {
    return !this._exclusions.some((e) => excludes(e, c));
  }

  _fieldsHold(c) {
    return this._fields.every((f) => fieldHolds(f, c));
  }

  _boundsHold(c) {
    return this._bounds.every((b) => boundSatisfied(b, c));
  }

  _intervalsHold(c) {
    return this._intervals.every((iv) => intervalHolds(iv, c));
  }

  _dateHolds(c) {
    return DATE_ROLES.every((r) => fieldHolds(this._fields[r], c));
  }

  _derive(from, forward) {
    const { zone, ms, wall } = resolve(from, this._timeZone);
    const horizonYear = wall.y + (forward ? HORIZON_YEARS : -HORIZON_YEARS);
    let day = { y: wall.y, m: wall.m, d: wall.d };
    while (!beyondHorizon(day, wall, horizonYear, forward)) {
      const found = this._dayMatch(day, zone, ms, forward);
      if (found !== null) {
        return new Date(found);
      }
      day = addDays(day, forward ? 1 : -1);
    }
    return null;
  }

  _dayMatch(day, zone, fromMs, forward) {
    const c = newCtx({ y: day.y, m: day.m, d: day.d, H: 0, M: 0, S: 0 });
    if (!this._dateHolds(c)) {
      return null;
    }
    const insts = this._dayInstants(day, c, zone);
    return forward ? this._firstAfter(insts, fromMs) : this._lastBefore(insts, fromMs);
  }

  _dayInstants(day, c, zone) {
    const out = [];
    for (const H of this._matching(ROLE.HOUR, c, 0, 23)) {
      for (const M of this._matching(ROLE.MINUTE, c, 0, 59)) {
        for (const S of this._matching(ROLE.SECOND, c, 0, 59)) {
          const wall = { y: day.y, m: day.m, d: day.d, H, M, S };
          out.push({ wall, ms: zone.instantFromWall(wall) });
        }
      }
    }
    return out;
  }

  _matching(r, c, lo, hi) {
    const out = [];
    for (let v = lo; v <= hi; v += 1) {
      if (fieldHolds(this._fields[r], withValue(c, r, v))) {
        out.push(v);
      }
    }
    return out;
  }

  _firstAfter(insts, fromMs) {
    for (const inst of insts) {
      if (inst.ms > fromMs && this._holdsWall(inst.wall)) {
        return inst.ms;
      }
    }
    return null;
  }

  _lastBefore(insts, fromMs) {
    for (let i = insts.length - 1; i >= 0; i -= 1) {
      if (insts[i].ms < fromMs && this._holdsWall(insts[i].wall)) {
        return insts[i].ms;
      }
    }
    return null;
  }
}

function cnum(x) {
  return x.y * 10000 + x.m * 100 + x.d;
}

function beyondHorizon(day, from, horizonYear, forward) {
  const limit = horizonYear * 10000 + from.m * 100 + from.d;
  return forward ? cnum(day) > limit : cnum(day) < limit;
}

function addDays(day, delta) {
  const d = new Date(Date.UTC(day.y, day.m - 1, day.d + delta));
  return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate() };
}

/**
 * parse recognizes src, resolves symbols and the shorthand ladder, and
 * validates field domains. Throws IsnowError with a stable `.code`.
 * @param {string} src
 * @param {{ timeZone?: string }} [options]
 */
export function parse(src, options = {}) {
  const raw = parseRaw(src);
  validateUnits(raw);
  const sl = mapGroups(raw.groups, hasSecondInterval(raw.intervals), false);
  const fields = compileAll(sl);
  const bounds = compileBounds(raw.bounds);
  const intervals = compileIntervals(raw.intervals);
  const exclusions = compileExclusions(raw.exclusions);
  const canon = renderCanonical(sl, intervals, bounds) + renderExclusions(exclusions);
  return new Pattern(fields, bounds, intervals, exclusions, canon, renderExplain(sl, bounds), options.timeZone);
}

/** is is the one-shot membership test: parse then holds. */
export function is(src, at) {
  return parse(src).holds(at);
}
