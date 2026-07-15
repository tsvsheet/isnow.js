/**
 * The conformance runner: executes the language-neutral corpus in the sibling
 * isnow checkout against the engine, per that repo's runner contract, with
 * results identical to Go's. Self-skips when the corpus is absent (a bare CI
 * checkout); the unit suite carries the coverage gate on its own.
 *
 * Offset-only cases evaluate with plain fixed-offset arithmetic (no Intl): the
 * `at`/`from` strings are RFC3339 with an explicit offset, and comparison of
 * derived occurrences is by absolute instant.
 */

import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import yaml from 'js-yaml';

import { CODES, parse } from '../src/isnow/index.js';

const CORPUS = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'isnow', 'conformance');
const present = existsSync(CORPUS);

test('conformance corpus', { skip: present ? false : `corpus not present at ${CORPUS} — clone uplang/isnow as a sibling` }, async (t) => {
  for (const file of readdirSync(CORPUS).filter((f) => f.endsWith('.yaml')).sort()) {
    const doc = yaml.load(readFileSync(path.join(CORPUS, file), 'utf8'));
    for (const c of doc.cases) {
      await t.test(`${file}/${c.name}`, () => runCase(c));
    }
  }
});

function runCase(c) {
  if (c.error !== undefined) {
    checkError(c);
  } else if (c.canonical !== undefined) {
    assert.equal(parse(c.isnow).canonical, c.canonical);
  } else if (c.holds !== undefined) {
    assert.equal(parse(c.isnow).holds(c.at), c.holds);
  } else {
    checkDerive(c);
  }
}

function checkError(c) {
  let code = '';
  try {
    parse(c.isnow);
  } catch (e) {
    code = e.code;
  }
  assert.equal(code, c.error, `${c.isnow}: expected ${c.error}, got ${code}`);
  assert.ok(Object.values(CODES).includes(c.error));
}

function checkDerive(c) {
  const forward = c.next !== undefined;
  const want = forward ? c.next : c.prev;
  const got = deriveN(parse(c.isnow), c.from, want.length, forward);
  assert.equal(got.length, want.length, `${c.isnow}: occurrence count`);
  for (let i = 0; i < want.length; i += 1) {
    assert.equal(got[i], Date.parse(want[i]), `${c.isnow}[${i}]`);
  }
}

function deriveN(p, from, n, forward) {
  const offset = offsetOf(from);
  const out = [];
  let cur = from;
  while (out.length < n) {
    const next = forward ? p.next(cur) : p.prev(cur);
    if (next === null) {
      break;
    }
    out.push(next.getTime());
    // A JS Date carries no zone, so re-encode the fixed offset for the next step
    // — mirrors Go's time.Time threading its Location through each Next/Prev.
    cur = withOffset(next.getTime(), offset);
  }
  return out;
}

function offsetOf(from) {
  const m = /(Z|[+-]\d{2}:?\d{2})$/u.exec(from);
  return m === null ? 'Z' : m[1];
}

function offsetMinutes(offset) {
  if (offset === 'Z') {
    return 0;
  }
  const s = offset.replace(':', '');
  const sign = s[0] === '-' ? -1 : 1;
  return sign * (Number.parseInt(s.slice(1, 3), 10) * 60 + Number.parseInt(s.slice(3, 5), 10));
}

function withOffset(ms, offset) {
  const d = new Date(ms + offsetMinutes(offset) * 60000);
  const p = (n, w = 2) => String(n).padStart(w, '0');
  const date = `${p(d.getUTCFullYear(), 4)}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())}`;
  const time = `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`;
  return `${date}T${time}${offset}`;
}
