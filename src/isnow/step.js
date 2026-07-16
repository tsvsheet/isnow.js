/**
 * Step compilation (specs/contracts/semantics.md §Step): a step is read as a
 * week-granular index, a weekday-occurrence selection, or an arithmetic
 * progression, chosen by the anchor and unit. Mirrors isnow.go/step.go. Steps
 * are field-local in every context (decision 004).
 */

import { contains, spanTerm } from "./compile.js";
import { cycle, value } from "./ctx.js";
import { CODES, fail } from "./errors.js";
import { ROLE, cycleSize } from "./roles.js";
import { RES, resolveWeekday } from "./symbol.js";

/** stepTerm dispatches a step by anchor and unit. */
export function stepTerm(r, anchor, incr) {
	if (hasWeekUnit(incr)) {
		return weekStepTerm(r, anchor, incr);
	}
	if (r === ROLE.WEEKDAY && anchor !== null && anchor.name !== "") {
		return occurrenceTerm(anchor.name, incr);
	}
	return arithStepTerm(r, anchor, incr);
}

function hasWeekUnit(incr) {
	return incr.qtys.some((q) => q.unit === "w");
}

// occurrenceTerm selects the nth <weekday> of the month (or nth from the end).
function occurrenceTerm(name, incr) {
	const { set, res } = resolveWeekday(name);
	if (res !== RES.ONE) {
		fail(CODES.SYMBOL);
	}
	const ks = incr.qtys.map((q) => q.num);
	occurrenceIndices(ks);
	return (c) => {
		if (!contains(set, c.weekday)) {
			return false;
		}
		return contains(ks, incr.fromEnd ? c.occFromEnd : c.occ);
	};
}

// occurrenceIndices validates weekday-occurrence selectors: a month holds at
// most five of any weekday, so the index must be 1..5.
function occurrenceIndices(ks) {
	for (const k of ks) {
		if (k < 1 || k > 5) {
			fail(CODES.RANGE);
		}
	}
}

// weekStepTerm matches days whose zero-based week-of-year index is anchor mod N.
function weekStepTerm(r, anchor, incr) {
	if (r !== ROLE.DAY) {
		fail(CODES.CONTEXT);
	}
	const a = anchorNum(anchor);
	const n = positive(incr.qtys[0].num);
	if (a >= n || n > WEEKS_PER_YEAR) {
		fail(CODES.RANGE); // a week stride must be 1..53 and larger than its anchor
	}
	return (c) => mod(Math.floor((c.dayOfYear - 1) / 7) - a, n) === 0;
}

// WEEKS_PER_YEAR caps a week-granular step; a year spans at most 53 week buckets.
const WEEKS_PER_YEAR = 53;

/** arithStepTerm matches an arithmetic progression from the anchor or cycle edge. */
export function arithStepTerm(r, anchor, incr) {
	const { a, elided } = anchorOrElided(r, anchor, incr.fromEnd);
	const ns = incr.qtys.map((q) => positive(q.num));
	boundedStrides(r, ns);
	return (c) => anyStep(c, r, a, elided, incr.fromEnd, ns);
}

// boundedStrides rejects a field-local stride that cannot progress within its
// cycle (stride >= cycle collapses to the anchor). Cross-cycle periods use a
// unit step instead. Year steps are open progressions (cycle 0 = no guard).
function boundedStrides(r, ns) {
	const cs = cycleSize(r);
	if (cs === 0) {
		return;
	}
	for (const n of ns) {
		if (n >= cs) {
			fail(CODES.RANGE);
		}
	}
}

function anyStep(c, r, anchor, elided, fromEnd, ns) {
	let base = anchor;
	if (elided) {
		const [clo, chi] = cycle(c, r);
		base = fromEnd ? chi : clo;
	}
	const v = value(c, r);
	return ns.some((n) => stepHit(v, base, fromEnd, n));
}

function stepHit(v, base, fromEnd, n) {
	if (fromEnd) {
		return v <= base && (base - v) % n === 0;
	}
	return v >= base && (v - base) % n === 0;
}

/**
 * anchorOrElided resolves a numeric step anchor. Year steps that need a cycle
 * (elided or from-end anchor) are rejected: year has no natural cycle.
 */
function anchorOrElided(r, anchor, fromEnd) {
	if (anchor === null || anchor.star) {
		yearGuard(r);
		return { a: 0, elided: true };
	}
	const a = anchorNum(anchor);
	if (fromEnd) {
		yearGuard(r);
	}
	return { a, elided: false };
}

function yearGuard(r) {
	if (r === ROLE.YEAR) {
		fail(CODES.CONTEXT);
	}
}

function anchorNum(a) {
	if (a === null || a.star) {
		return 0;
	}
	if (!isPlainNumber(a)) {
		fail(CODES.CONTEXT); // a step anchor is a plain number, not a unit compound
	}
	const v = a.qtys[0].num;
	if (v < 0 || v > 9999) {
		fail(CODES.RANGE);
	}
	return v;
}

/** isPlainNumber reports a single unitless numeric quantity (a valid step anchor). */
function isPlainNumber(a) {
	return a.name === "" && a.qtys.length === 1 && a.qtys[0].unit === "";
}

export function positive(n) {
	if (n < 1) {
		fail(CODES.RANGE);
	}
	return n;
}

export function mod(a, n) {
	return ((a % n) + n) % n;
}

/** spanStepTerm restricts an arithmetic step to an inclusive span. */
export function spanStepTerm(r, t) {
	const sp = spanTerm(r, t);
	const st = arithStepTerm(r, t.lo, t.incr);
	return (c) => sp(c) && st(c);
}
