/**
 * Since/until bounds (specs/contracts/semantics.md §Bounds): positional tuple
 * comparison over a sub-spec's constrained exact fields. Mirrors isnow.go/
 * bound.go. A bound's canonical text is the full Y/m/d w H:M:S form so it
 * round-trips unambiguously.
 */

import { inDomain } from './compile.js';
import { value } from './ctx.js';
import { CODES, fail } from './errors.js';
import { assignDate, assignTime, claim, exactRaw } from './ladder.js';
import { renderCanonical } from './render.js';
import { NUM_ROLES, ROLE } from './roles.js';

/** boundSatisfied reports whether an instant satisfies a compiled bound. */
export function boundSatisfied(b, c) {
  const cmp = compare(b, c);
  switch (b.op) {
    case 'ge':
      return cmp >= 0;
    case 'gt':
      return cmp > 0;
    case 'le':
      return cmp <= 0;
    default:
      return cmp < 0;
  }
}

function compare(b, c) {
  for (const bf of b.fields) {
    const v = value(c, bf.role);
    if (v < bf.value) {
      return -1;
    }
    if (v > bf.value) {
      return 1;
    }
  }
  return 0;
}

/** compileBounds compiles each raw bound into a boundSpec. */
export function compileBounds(raw) {
  return raw.map(compileBound);
}

function compileBound(b) {
  const sl = mapBoundGroups(b.groups);
  const fields = boundFields(sl);
  if (fields.length === 0) {
    fail(CODES.CONTEXT); // a bound must constrain something
  }
  return { op: b.op, fields, text: renderCanonical(sl, [], []) };
}

function mapBoundGroups(groups) {
  const s = new Array(NUM_ROLES).fill(null);
  for (const gr of groups) {
    assignBoundGroup(s, gr);
  }
  validateBoundTime(s);
  fillBoundDefaults(s);
  return s;
}

function validateBoundTime(s) {
  if (!boundHas(s, ROLE.HOUR) && (boundHas(s, ROLE.MINUTE) || boundHas(s, ROLE.SECOND))) {
    fail(CODES.CONTEXT);
  }
  if (!boundHas(s, ROLE.MINUTE) && boundHas(s, ROLE.SECOND)) {
    fail(CODES.CONTEXT);
  }
}

function fillBoundDefaults(s) {
  if (boundHas(s, ROLE.HOUR) && s[ROLE.MINUTE] === null) {
    s[ROLE.MINUTE] = exactRaw(0);
  }
  if ((boundHas(s, ROLE.HOUR) || boundHas(s, ROLE.MINUTE)) && s[ROLE.SECOND] === null) {
    s[ROLE.SECOND] = exactRaw(0);
  }
}

function boundHas(s, r) {
  return s[r] !== null && s[r].present;
}

function assignBoundGroup(s, gr) {
  if (gr.kind === 'date') {
    assignDate(s, gr);
  } else if (gr.kind === 'time') {
    assignTime(s, gr);
  } else {
    assignBoundBare(s, gr.slots[0]);
  }
}

function assignBoundBare(s, f) {
  const a = f.terms[0].lo;
  if (a !== null && a.star) {
    return; // a bare wildcard is no constraint
  }
  if (a === null || a.name !== '' || a.qtys.length === 0) {
    fail(CODES.CONTEXT);
  }
  claim(s, a.qtys[0].digits === 4 ? ROLE.YEAR : ROLE.HOUR, f);
}

function boundFields(s) {
  const out = [];
  for (let r = 0; r < NUM_ROLES; r += 1) {
    const bf = boundValue(r, s[r]);
    if (bf !== null) {
      out.push(bf);
    }
  }
  return out;
}

function boundValue(r, f) {
  if (f === null || !f.present || isWildcardField(f)) {
    return null;
  }
  if (r === ROLE.WEEKDAY || !isExactField(f)) {
    fail(CODES.CONTEXT);
  }
  const v = f.terms[0].lo.qtys[0].num;
  inDomain(r, v);
  return { role: r, value: v };
}

function isWildcardField(f) {
  if (f.exclude || f.terms.length !== 1) {
    return false;
  }
  const t = f.terms[0];
  return t.lo !== null && t.lo.star && bareTerm(t) && !t.loFromEnd;
}

function isExactField(f) {
  if (f.exclude || f.terms.length !== 1) {
    return false;
  }
  const t = f.terms[0];
  return plainNumericAtom(t.lo) && bareTerm(t) && !t.loFromEnd;
}

/** bareTerm reports a term with no high endpoint and no step. */
function bareTerm(t) {
  return t.hi === null && t.incr === null;
}

/** plainNumericAtom reports a single numeric value (no star, no name). */
function plainNumericAtom(a) {
  return a !== null && !a.star && a.name === '' && a.qtys.length === 1;
}
