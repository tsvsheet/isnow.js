/**
 * The four stable error codes every isnow implementation shares
 * (specs/contracts/semantics.md). Callers match on `err.code`.
 */
export const CODES = Object.freeze({
  SYNTAX: 'syntax',
  SYMBOL: 'symbol',
  RANGE: 'range',
  CONTEXT: 'context',
});

/** IsnowError carries one of the four stable codes in `.code`. */
export class IsnowError extends Error {
  /**
   * @param {string} code one of CODES
   * @param {string} [message]
   */
  constructor(code, message) {
    super(message ?? code);
    this.name = 'IsnowError';
    this.code = code;
  }
}

/** fail throws an IsnowError with the given code (mirrors Go's sentinels). */
export function fail(code, message) {
  throw new IsnowError(code, message);
}
