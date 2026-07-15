/**
 * The shorthand ladder (specs/contracts/semantics.md §Ladder): assign each
 * group's fields to the seven roles, then fill defaults. Mirrors isnow.go/
 * ladder.go + ladder_bare.go. Slots is a length-7 array of rawField or null.
 */

import { CODES, fail } from './errors.js';
import { NUM_ROLES, ROLE } from './roles.js';
import { RES, resolveTime, resolveWeekday } from './symbol.js';

const WILD_RAW = { present: false, exclude: false, terms: [] };

/** exactRaw builds a present field of a single exact value. */
export function exactRaw(v) {
  return {
    present: true,
    exclude: false,
    terms: [{ lo: { star: false, name: '', qtys: [{ num: v, digits: 1, unit: '' }] }, hi: null, loFromEnd: false, incr: null }],
  };
}

/**
 * mapGroups applies the ladder and returns the filled slots. secWild makes an
 * unprovided second default to wildcard (a second-grained interval owns the
 * second field) rather than to 0. timeWild makes every unprovided time field
 * default to wildcard (an exclusion sub-spec excludes its whole matching period,
 * so `! 12/25` carves out all of December 25, not just midnight).
 */
export function mapGroups(groups, secWild, timeWild) {
  const s = new Array(NUM_ROLES).fill(null);
  const hasDate = groups.some((g) => g.kind === 'date');
  const hasTime = groups.some((g) => g.kind === 'time');
  assignPass(s, groups, false, hasDate && hasTime);
  assignPass(s, groups, true, hasDate && hasTime);
  fillDefaults(s, secWild, timeWild);
  return s;
}

function assignPass(s, groups, bareOnly, threeForm) {
  for (const gr of groups) {
    if ((gr.kind === 'bare') === bareOnly) {
      assignGroup(s, gr, threeForm);
    }
  }
}

function assignGroup(s, gr, threeForm) {
  if (gr.kind === 'date') {
    assignDate(s, gr);
  } else if (gr.kind === 'time') {
    assignTime(s, gr);
  } else {
    assignBare(s, gr.slots[0], threeForm);
  }
}

/** assignDate maps a date group's positional slots (shared with bounds). */
export function assignDate(s, gr) {
  assignPositional(s, dateRoles(gr.slots.length), gr.slots);
}

/** assignTime maps a time group's positional slots (shared with bounds). */
export function assignTime(s, gr) {
  assignPositional(s, timeRoles(gr.slots.length), gr.slots);
}

function dateRoles(n) {
  if (n === 2) {
    return [ROLE.MONTH, ROLE.DAY];
  }
  if (n === 3) {
    return [ROLE.YEAR, ROLE.MONTH, ROLE.DAY];
  }
  return fail(CODES.CONTEXT);
}

function timeRoles(n) {
  if (n === 2) {
    return [ROLE.HOUR, ROLE.MINUTE];
  }
  if (n === 3) {
    return [ROLE.HOUR, ROLE.MINUTE, ROLE.SECOND];
  }
  return fail(CODES.CONTEXT);
}

function assignPositional(s, roles, fields) {
  roles.forEach((r, i) => claim(s, r, fields[i]));
}

/** claim assigns a role, rejecting a double assignment. */
export function claim(s, r, f) {
  if (s[r] !== null) {
    fail(CODES.CONTEXT);
  }
  s[r] = f;
}

// --- bare routing (ladder_bare.go) ---

function assignBare(s, f, threeForm) {
  const route = classifyBare(f);
  if (route === 'weekday') {
    claim(s, ROLE.WEEKDAY, f);
  } else if (route === 'time') {
    assignTimeSymbol(s, f);
  } else {
    assignBareNumber(s, f, threeForm);
  }
}

function classifyBare(f) {
  const a = f.terms[0].lo;
  if (a === null || a.star) {
    return 'weekday';
  }
  if (a.name !== '') {
    return classifyName(a.name);
  }
  return 'number';
}

function classifyName(name) {
  const wd = resolveWeekday(name);
  if (wd.res === RES.ONE) {
    return 'weekday';
  }
  if (wd.res === RES.AMBIGUOUS) {
    fail(CODES.SYMBOL);
  }
  if (resolveTime(name).res === RES.ONE) {
    return 'time';
  }
  return fail(CODES.SYMBOL);
}

function assignTimeSymbol(s, f) {
  const hms = resolveTime(f.terms[0].lo.name).hms;
  [ROLE.HOUR, ROLE.MINUTE, ROLE.SECOND].forEach((r, i) => claim(s, r, exactRaw(hms[i])));
}

function assignBareNumber(s, f, threeForm) {
  if (hourFree(s)) {
    s[ROLE.HOUR] = f;
  } else if (threeForm) {
    claim(s, ROLE.WEEKDAY, f);
  } else {
    fail(CODES.CONTEXT);
  }
}

function hourFree(s) {
  return s[ROLE.HOUR] === null || !s[ROLE.HOUR].present;
}

// --- defaults ---

function fillDefaults(s, secWild, timeWild) {
  for (const r of [ROLE.YEAR, ROLE.MONTH, ROLE.DAY, ROLE.WEEKDAY]) {
    if (s[r] === null) {
      s[r] = WILD_RAW;
    }
  }
  fillTimeDefaults(s, secWild, timeWild);
}

function fillTimeDefaults(s, secWild, timeWild) {
  const roles = [ROLE.HOUR, ROLE.MINUTE, ROLE.SECOND];
  if (!roles.some((r) => s[r] !== null)) {
    s[ROLE.HOUR] = WILD_RAW;
    s[ROLE.MINUTE] = WILD_RAW;
    s[ROLE.SECOND] = defaultSecond(secWild || timeWild);
    return;
  }
  for (const r of roles) {
    if (s[r] === null) {
      s[r] = exactRaw(0);
    }
  }
}

function defaultSecond(wild) {
  return wild ? WILD_RAW : exactRaw(0);
}
