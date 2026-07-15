/**
 * Pattern-level exclusions (specs/contracts/semantics.md §Exclusions): a
 * `! <spec>` clause carves specific instants out of a pattern — the isnow does
 * not hold at an instant when every field of the exclusion's sub-spec holds
 * there. Absent time fields default to wildcard, so `! 12/25` excludes all of
 * December 25 (the whole matching period), not just midnight. Mirrors
 * isnow.go/exclusion.go.
 */

import { compileAll, fieldHolds } from './compile.js';
import { mapGroups } from './ladder.js';
import { NUM_ROLES } from './roles.js';
import { renderMain } from './render.js';

/** excludes reports whether every field of the exclusion sub-spec holds. */
export function excludes(e, c) {
  for (let r = 0; r < NUM_ROLES; r += 1) {
    if (!fieldHolds(e.fields[r], c)) {
      return false;
    }
  }
  return true;
}

/** compileExclusion compiles one exclusion sub-spec (whole-period, timeWild). */
function compileExclusion(groups) {
  const sl = mapGroups(groups, false, true); // timeWild: exclude the whole matching period
  return { fields: compileAll(sl), text: ` ! ${renderMain(sl)}` };
}

/** compileExclusions compiles every extracted exclusion sub-spec. */
export function compileExclusions(raw) {
  return raw.map(compileExclusion);
}

/** renderExclusions renders each exclusion after the main form and bounds. */
export function renderExclusions(es) {
  return es.map((e) => e.text).join('');
}
