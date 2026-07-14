/**
 * Deterministic English description of a pattern (isnow.go/explain.go). The
 * wording is implementation-defined — not pinned by the conformance corpus.
 */

import { fieldText, pad } from './render.js';
import { ROLE } from './roles.js';

/** renderExplain builds the description from the slots and bounds. */
export function renderExplain(sl, bounds) {
  const clauses = [`holds at ${timeClause(sl)}`, ...dateClauses(sl), ...boundClauses(bounds)];
  return clauses.join(' ');
}

function timeClause(sl) {
  return `${fieldText(sl, ROLE.HOUR)}:${fieldText(sl, ROLE.MINUTE)}:${fieldText(sl, ROLE.SECOND)}`;
}

function dateClauses(sl) {
  let out = [];
  out = appendClause(out, sl, ROLE.WEEKDAY, 'on ');
  out = appendClause(out, sl, ROLE.DAY, 'on day ');
  out = appendClause(out, sl, ROLE.MONTH, 'in month ');
  out = appendClause(out, sl, ROLE.YEAR, 'in year ');
  return out;
}

function appendClause(out, sl, r, prefix) {
  const text = fieldText(sl, r);
  return text === '*' ? out : [...out, prefix + text];
}

function boundClauses(bounds) {
  return bounds.map((b) => `${boundVerb(b.op)} ${renderBoundFields(b.fields)}`);
}

function boundVerb(op) {
  return op === 'ge' || op === 'gt' ? 'from' : 'until';
}

function renderBoundFields(fields) {
  const date = boundGroup(fields, '/', [ROLE.YEAR, ROLE.MONTH, ROLE.DAY]);
  const tod = boundGroup(fields, ':', [ROLE.HOUR, ROLE.MINUTE, ROLE.SECOND]);
  return `${date} ${tod}`.trim();
}

function boundGroup(fields, sep, roles) {
  const parts = [];
  for (const r of roles) {
    const bf = fields.find((x) => x.role === r);
    if (bf !== undefined) {
      parts.push(pad(r, bf.value));
    }
  }
  return parts.join(sep);
}
