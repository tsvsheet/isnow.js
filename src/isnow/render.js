/**
 * Canonical rendering (specs/contracts/semantics.md §Canonical): the fully
 * qualified `Y/m/d w H:M:S` form plus bounds. Mirrors isnow.go/render.go. The
 * canonical form is a fixed point of Parse.
 */

import { classifyTerm, KIND } from './compile.js';
import { renderIntervals } from './interval.js';
import { ROLE } from './roles.js';
import { resolveWeekday, WEEKDAY_NAMES } from './symbol.js';

/**
 * renderCanonical renders the seven-field `Y/m/d w H:M:S` form, then any
 * intervals (they are main-spec groups, so they precede bounds), then bounds.
 * The interval must render before the bounds — an interval after a bound would
 * be re-absorbed into that bound's sub-spec on round-trip.
 */
export function renderCanonical(sl, intervals, bounds) {
  const date = join(sl, '/', [ROLE.YEAR, ROLE.MONTH, ROLE.DAY]);
  const tod = join(sl, ':', [ROLE.HOUR, ROLE.MINUTE, ROLE.SECOND]);
  const main = `${date} ${fieldText(sl, ROLE.WEEKDAY)} ${tod}`;
  return main + renderIntervals(intervals) + renderBounds(bounds);
}

function join(sl, sep, roles) {
  return roles.map((r) => fieldText(sl, r)).join(sep);
}

export function fieldText(sl, r) {
  const f = sl[r];
  if (f === null || !f.present) {
    return '*';
  }
  return renderField(r, f);
}

function renderField(r, f) {
  const vals = f.terms.flatMap((t) => renderTerm(r, t));
  return (f.exclude ? '!' : '') + vals.join(',');
}

function renderTerm(r, t) {
  switch (classifyTerm(t)) {
    case KIND.WILDCARD:
      return ['*'];
    case KIND.STEP:
    case KIND.SPAN_STEP:
      return [renderStep(r, t)];
    case KIND.FROM_END:
      return [`-${renderMagnitude(r, t.lo)}`];
    case KIND.SPAN:
      return [renderSpan(r, t)];
    default:
      return renderExact(r, t.lo);
  }
}

function renderExact(r, a) {
  if (a.name !== '') {
    return weekdayNamesOf(a.name);
  }
  if (r === ROLE.WEEKDAY) {
    return [capitalize(WEEKDAY_NAMES[a.qtys[0].num])];
  }
  return [pad(r, a.qtys[0].num)];
}

function renderSpan(r, t) {
  const lo = renderEndpoint(r, t.lo);
  return t.hi.star ? `${lo}-*` : `${lo}-${renderEndpoint(r, t.hi)}`;
}

function renderEndpoint(r, a) {
  if (a.name !== '') {
    return weekdayNamesOf(a.name)[0];
  }
  // A numeric weekday span endpoint renders as its full name (2-6 => Monday-Friday);
  // a numeric weekday step anchor (renderAnchor) stays numeric — it is arithmetic.
  if (r === ROLE.WEEKDAY) {
    return capitalize(WEEKDAY_NAMES[a.qtys[0].num]);
  }
  return pad(r, a.qtys[0].num);
}

function renderStep(r, t) {
  return (t.lo !== null ? renderAnchor(r, t) : '') + renderIncr(t.incr);
}

function renderAnchor(r, t) {
  if (t.hi !== null) {
    return renderSpan(r, t);
  }
  if (t.lo.name !== '') {
    return weekdayNamesOf(t.lo.name)[0];
  }
  return t.lo.star ? '*' : renderQtys(t.lo.qtys);
}

function renderIncr(incr) {
  return `${incr.fromEnd ? '-' : '+'}[${renderQtys(incr.qtys)}]`;
}

function renderQtys(qs) {
  return qs.map((q) => `${q.num}${q.unit}`).join(',');
}

function renderMagnitude(r, a) {
  if (a.qtys.length === 1 && a.qtys[0].unit === '') {
    return pad(r, a.qtys[0].num);
  }
  return a.qtys.map((q) => `${q.num}${q.unit}`).join('');
}

function weekdayNamesOf(name) {
  return resolveWeekday(name).set.map((n) => capitalize(WEEKDAY_NAMES[n]));
}

export function pad(r, v) {
  const width = r === ROLE.YEAR ? 4 : 2;
  return String(v).padStart(width, '0');
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function renderBounds(bounds) {
  return bounds.map((b) => ` ${boundOpText(b.op)}${b.text}`).join('');
}

export function boundOpText(op) {
  switch (op) {
    case 'ge':
      return '>=';
    case 'gt':
      return '>';
    case 'le':
      return '<=';
    default:
      return '<';
  }
}
