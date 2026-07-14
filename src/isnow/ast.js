/**
 * The parse residue: drive the ANTLR-generated lexer/parser and lift the tree
 * into the raw AST the semantic layers consume. Mirrors isnow.go/parse.go +
 * parse_ast.go. A syntax error becomes IsnowError('syntax') via a custom
 * listener rather than antlr's default stderr print.
 */

import antlr4 from 'antlr4';

import IsnowLexer from '../isnowgrammar/IsnowLexer.js';
import IsnowParser from '../isnowgrammar/IsnowParser.js';
import { CODES, fail } from './errors.js';

const GROUP_KIND = Object.freeze({ DATE: 'date', TIME: 'time', BARE: 'bare' });
const BOUND_OP = Object.freeze({ GE: 'ge', GT: 'gt', LE: 'le', LT: 'lt' });

/** Records whether the parse encountered a syntax error. */
class SyntaxListener extends antlr4.error.ErrorListener {
  constructor() {
    super();
    this.failed = false;
  }

  syntaxError() {
    this.failed = true;
  }
}

function parseTree(src) {
  const listener = new SyntaxListener();
  const lexer = new IsnowLexer(new antlr4.InputStream(src));
  lexer.removeErrorListeners();
  lexer.addErrorListener(listener);
  const parser = new IsnowParser(new antlr4.CommonTokenStream(lexer));
  parser.removeErrorListeners();
  parser.addErrorListener(listener);
  const tree = parser.pattern();
  return { tree, ok: !listener.failed };
}

/**
 * parseRaw parses src into the raw AST, or throws IsnowError('syntax').
 * @param {string} src
 * @returns {{ groups: object[], bounds: object[] }}
 */
export function parseRaw(src) {
  const { tree, ok } = parseTree(src);
  if (!ok) {
    fail(CODES.SYNTAX);
  }
  return { groups: specGroups(tree.spec()), bounds: tree.bound().map(bound) };
}

function bound(ctx) {
  return { op: boundOp(ctx.boundOp()), groups: specGroups(ctx.spec()) };
}

function boundOp(ctx) {
  if (ctx.GE() !== null) {
    return BOUND_OP.GE;
  }
  if (ctx.GT() !== null) {
    return BOUND_OP.GT;
  }
  if (ctx.LE() !== null) {
    return BOUND_OP.LE;
  }
  return BOUND_OP.LT;
}

function specGroups(spec) {
  return spec.group().map(group);
}

function group(ctx) {
  const date = ctx.dateGroup();
  if (date !== null) {
    return { kind: GROUP_KIND.DATE, slots: placeFields(date.field(), tokenIndices(date.SLASH())) };
  }
  const time = ctx.timeGroup();
  if (time !== null) {
    return { kind: GROUP_KIND.TIME, slots: placeFields(time.field(), tokenIndices(time.COLON())) };
  }
  return { kind: GROUP_KIND.BARE, slots: [field(ctx.bareGroup().field())] };
}

function tokenIndices(terminals) {
  return terminals.map((t) => t.symbol.tokenIndex);
}

/**
 * placeFields assigns each present field to the slot after the separators that
 * precede it, leaving the rest empty (present-but-empty wildcards).
 */
function placeFields(fields, seps) {
  const slots = new Array(seps.length + 1).fill(null).map(() => ({ present: false, exclude: false, terms: [] }));
  for (const fc of fields) {
    slots[slotOf(fc.start.tokenIndex, seps)] = field(fc);
  }
  return slots;
}

function slotOf(fieldTok, seps) {
  return seps.filter((s) => s < fieldTok).length;
}

// --- fields, terms, atoms (parse_ast.go) ---

function field(ctx) {
  return { present: true, exclude: ctx.BANG() !== null, terms: ctx.term().map(term) };
}

function term(ctx) {
  const atoms = ctx.atom();
  if (atoms.length === 0) {
    return { lo: null, hi: null, loFromEnd: false, incr: incr(ctx.incr()) };
  }
  const dashes = ctx.DASH().length;
  const out = { lo: atom(atoms[0]), hi: null, loFromEnd: dashes > atoms.length - 1, incr: incrOrNull(ctx.incr()) };
  if (atoms.length === 2) {
    out.hi = atom(atoms[1]);
  }
  return out;
}

function incrOrNull(ctx) {
  return ctx === null ? null : incr(ctx);
}

function incr(ctx) {
  return { fromEnd: ctx.DASH() !== null, qtys: ctx.qty().map(qty) };
}

function atom(ctx) {
  if (ctx.STAR() !== null) {
    return { star: true, name: '', qtys: [] };
  }
  if (ctx.NAME() !== null) {
    return { star: false, name: ctx.NAME().getText(), qtys: [] };
  }
  return { star: false, name: '', qtys: ctx.qty().map(qty) };
}

function qty(ctx) {
  const text = ctx.NUMBER().getText();
  return { num: Number.parseInt(text, 10), digits: text.length, unit: ctx.NAME() === null ? '' : ctx.NAME().getText() };
}
