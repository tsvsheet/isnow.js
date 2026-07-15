/**
 * Unit validation (specs/contracts/semantics.md: an unknown unit is a symbol
 * error). Only 'w' and 'd' are legal quantity units. Mirrors isnow.go/units.go.
 */

import { CODES, fail } from './errors.js';

/** validateUnits rejects any quantity carrying a unit other than 'w' or 'd'. */
export function validateUnits(raw) {
  groupsUnits(raw.groups);
  for (const b of raw.bounds) {
    groupsUnits(b.groups);
  }
  for (const ex of raw.exclusions) {
    groupsUnits(ex);
  }
}

function groupsUnits(groups) {
  for (const gr of groups) {
    for (const f of gr.slots) {
      fieldUnits(f);
    }
  }
}

function fieldUnits(f) {
  for (const t of f.terms) {
    termUnits(t);
  }
}

function termUnits(t) {
  atomUnits(t.lo);
  atomUnits(t.hi);
  incrUnits(t.incr);
}

function atomUnits(a) {
  if (a !== null) {
    qtysUnits(a.qtys);
  }
}

function incrUnits(incr) {
  if (incr !== null) {
    qtysUnits(incr.qtys);
  }
}

function qtysUnits(qs) {
  for (const q of qs) {
    if (q.unit !== '' && q.unit !== 'w' && q.unit !== 'd') {
      fail(CODES.SYMBOL);
    }
  }
}
