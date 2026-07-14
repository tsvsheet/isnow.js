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
  const out = [];
  let cur = from;
  while (out.length < n) {
    const next = forward ? p.next(cur) : p.prev(cur);
    if (next === null) {
      break;
    }
    out.push(next.getTime());
    cur = next;
  }
  return out;
}
