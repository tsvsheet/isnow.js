/**
 * Bundles @uplang/isnow (the residue in ../src/isnow) together with its antlr4
 * dependency into a single self-contained ESM browser bundle. No CDN, no
 * network at runtime: the whole engine ships in playground/isnow.bundle.js.
 *
 * Run with `node playground/build.mjs` (or `npm run playground`).
 */

import { build } from 'esbuild';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

await build({
  entryPoints: [resolve(here, '../src/isnow/index.js')],
  outfile: resolve(here, 'isnow.bundle.js'),
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  minify: true,
  sourcemap: false,
  legalComments: 'none',
  logLevel: 'info',
});
