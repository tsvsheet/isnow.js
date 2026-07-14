/**
 * role identifies which of the seven fields a spec constrains, in canonical
 * order (specs/contracts/semantics.md). Sunday = 1 for the weekday field.
 */
export const ROLE = Object.freeze({
  YEAR: 0,
  MONTH: 1,
  DAY: 2,
  WEEKDAY: 3,
  HOUR: 4,
  MINUTE: 5,
  SECOND: 6,
});

export const NUM_ROLES = 7;

/** FIELDS maps each role to its instantCtx property name (value lookup). */
export const FIELDS = ['year', 'month', 'day', 'weekday', 'hour', 'minute', 'second'];

/** DOMAINS are the static per-role value ranges for validation (day pre-clamp). */
export const DOMAINS = [
  [0, 9999], // year
  [1, 12], // month
  [1, 31], // day
  [1, 7], // weekday
  [0, 23], // hour
  [0, 59], // minute
  [0, 59], // second
];
