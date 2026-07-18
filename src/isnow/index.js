/**
 * isnow — the JavaScript engine.
 *
 * The grammar carries the language: the ANTLR-generated parser in
 * ../isnowgrammar does all lexing and syntax. This package holds the semantic
 * residue (SPECIFICATION.md §6): symbol resolution, the shorthand ladder, the
 * uniform field algebra, the matcher, occurrence derivation, canonicalization,
 * and the English explanation. See specs/contracts/ for the pinned semantics.
 */

export { CODES, IsnowError } from "./errors.js";
export { is, Pattern, parse } from "./pattern.js";
