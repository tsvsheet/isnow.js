/**
 * Intervals: true periodic recurrences — "every N units" — as distinct from a
 * field-local step (specs/contracts/semantics.md §Intervals). Mirrors
 * isnow.go/interval.go. A field-local step resets within one field's cycle,
 * whereas an interval is anchored hierarchically to the civil calendar (ADR
 * 005): the stride's total duration selects the smallest containing civil unit
 * (the container), and the interval repeats within each container, re-aligning
 * at the container boundary. So the anchor "moves with its unit": `+[2h]` fires
 * at 00,02,…,22 each day and re-aligns at every midnight; `+[3d]` fires on
 * Sunday, Wednesday, and Saturday and re-aligns every week. The interval units
 * are s (second), mn (minute), h (hour), d (day); weeks/months/years are already
 * fields, so they are not interval units. Membership stays O(1).
 */

import { CODES, fail } from "./errors.js";
import { mod, positive } from "./step.js";

// Each grain carries its duration in seconds, the predicate that its finer-than-
// grain fields are 0 (a boundary), and the smallest civil container strictly
// larger than the grain (the floor of the container search).
const GRAINS = Object.freeze({
	s: { seconds: 1, onBoundary: () => true, min: 0 },
	mn: { seconds: 60, onBoundary: (c) => c.second === 0, min: 1 },
	h: {
		seconds: 3600,
		onBoundary: (c) => c.minute === 0 && c.second === 0,
		min: 2,
	},
	d: {
		seconds: 86400,
		onBoundary: (c) => c.hour === 0 && c.minute === 0 && c.second === 0,
		min: 3,
	},
});

// Container kinds (indices into NOMINAL_SECONDS): minute, hour, day, week,
// month, year. NOMINAL_SECONDS is the longest each kind can run, used only to
// select the container; the position within it comes from the real fields.
const C_WEEK = 3;
const C_YEAR = 5;
const NOMINAL_SECONDS = Object.freeze([
	60,
	3600,
	86400,
	604800,
	31 * 86400,
	366 * 86400,
]);

/** isIntervalUnit reports whether a unit name is an interval grain (s/mn/h/d). */
export function isIntervalUnit(unit) {
	return Object.hasOwn(GRAINS, unit);
}

/**
 * containerFor picks the smallest civil cycle (at least one grain larger than
 * the interval's own grain) whose nominal length holds the whole N-grain stride.
 * A stride longer than a year re-aligns annually. The comparison divides the
 * nominal by the grain (exact for every reachable pair) to avoid overflow.
 */
function containerFor(g, n) {
	let p = g.min;
	while (p < C_YEAR && NOMINAL_SECONDS[p] / g.seconds < n) {
		p += 1;
	}
	return p;
}

/**
 * secondsInto is the offset, in seconds, from the start of the container to the
 * instant. Divided by the grain it gives the grain-position the interval strides
 * over; the week container starts on Sunday (weekday 1).
 */
function secondsInto(p, c) {
	const tod = c.hour * 3600 + c.minute * 60 + c.second;
	switch (p) {
		case 0: // minute
			return c.second;
		case 1: // hour
			return c.minute * 60 + c.second;
		case 2: // day
			return tod;
		case C_WEEK:
			return (c.weekday - 1) * 86400 + tod;
		case 4: // month
			return (c.day - 1) * 86400 + tod;
		default: // year
			return (c.dayOfYear - 1) * 86400 + tod;
	}
}

/**
 * intervalHolds reports whether the instant lands on the interval grid: it must
 * sit on a grain boundary and an integer number of strides into its container.
 */
export function intervalHolds(iv, c) {
	const g = GRAINS[iv.unit];
	if (!g.onBoundary(c)) {
		return false;
	}
	const pos = Math.trunc(secondsInto(iv.container, c) / g.seconds);
	return mod(pos, iv.n) === 0;
}

/** compileInterval validates and compiles a bare interval increment. */
export function compileInterval(incr) {
	if (incr.fromEnd) {
		fail(CODES.CONTEXT); // a descending interval is meaningless
	}
	const q = incr.qtys[0];
	const n = positive(q.num); // +[0mn] and an overflow magnitude are range errors
	return {
		unit: q.unit,
		n,
		container: containerFor(GRAINS[q.unit], n),
		text: `+[${n}${q.unit}]`,
	};
}

/** compileIntervals compiles every extracted interval increment. */
export function compileIntervals(raws) {
	return raws.map(compileInterval);
}

/**
 * hasSecondInterval reports whether any interval is second-grained (so the
 * second field must default to wildcard rather than 0 — it owns that field).
 */
export function hasSecondInterval(incrs) {
	return incrs.some((incr) => incr.qtys[0].unit === "s");
}

/** renderIntervals renders each interval (after the main form, before bounds). */
export function renderIntervals(ivs) {
	return ivs.map((iv) => ` ${iv.text}`).join("");
}
