/**
 * Compile a raw field into a predicate spec: the uniform per-field algebra
 * `!v-v±[N]` (specs/contracts/semantics.md §Algebra). Mirrors isnow.go/
 * compile.go + field.go. A predicate is a pure function of an instantCtx.
 */

import { cycle, value } from "./ctx.js";
import { CODES, fail } from "./errors.js";
import { DOMAINS, NUM_ROLES, ROLE, cycleSize } from "./roles.js";
import { setposTerm } from "./setpos.js";
import { spanStepTerm, stepTerm } from "./step.js";
import { RES, resolveWeekday } from "./symbol.js";

export const KIND = Object.freeze({
	EXACT: "exact",
	WILDCARD: "wildcard",
	STEP: "step",
	FROM_END: "fromEnd",
	SPAN: "span",
	SPAN_STEP: "spanStep",
});

/** classifyTerm identifies which algebra shape a raw term is. */
export function classifyTerm(t) {
	if (t.lo === null) {
		return KIND.STEP;
	}
	if (t.incr !== null) {
		return t.hi !== null ? KIND.SPAN_STEP : KIND.STEP;
	}
	if (t.loFromEnd) {
		return KIND.FROM_END;
	}
	if (t.hi !== null) {
		return KIND.SPAN;
	}
	return t.lo.star ? KIND.WILDCARD : KIND.EXACT;
}

/** compileField compiles a present field into { exclude, terms: pred[] }. */
export function compileField(r, f) {
	return { exclude: f.exclude, terms: f.terms.map((t) => compileTerm(r, t)) };
}

/** fieldHolds reports whether a compiled field matches the instant. */
export function fieldHolds(spec, c) {
	const m = spec.terms.some((p) => p(c));
	return spec.exclude ? !m : m;
}

/** wildcardField is the default for an absent or empty slot. */
export function wildcardField() {
	return { exclude: false, terms: [() => true] };
}

/** compileAll compiles every role's slot into the seven-field predicate array. */
export function compileAll(sl) {
	const out = new Array(NUM_ROLES);
	for (let r = 0; r < NUM_ROLES; r += 1) {
		out[r] = compileRole(r, sl[r]);
	}
	return out;
}

function compileRole(r, f) {
	return f === null || !f.present ? wildcardField() : compileField(r, f);
}

function compileTerm(r, t) {
	switch (classifyTerm(t)) {
		case KIND.WILDCARD:
			return () => true;
		case KIND.STEP:
			return stepTerm(r, t.lo, t.incr);
		case KIND.FROM_END:
			return fromEndTerm(r, t);
		case KIND.SPAN:
			return spanTerm(r, t);
		case KIND.SPAN_STEP:
			// A weekday span-step is BYSETPOS (M-F-[1] = last business day), not an
			// arithmetic progression over the weekday cycle.
			return r === ROLE.WEEKDAY ? setposTerm(t) : spanStepTerm(r, t);
		default:
			return exactTerm(r, t.lo);
	}
}

// --- exact ---

export function exactTerm(r, a) {
	if (a.name !== "") {
		return weekdaySetTerm(r, a.name);
	}
	const v = a.qtys[0].num;
	inDomain(r, v);
	return (c) => value(c, r) === v;
}

function weekdaySetTerm(r, name) {
	if (r !== ROLE.WEEKDAY) {
		fail(CODES.CONTEXT);
	}
	const { set, res } = resolveWeekday(name);
	if (res !== RES.ONE) {
		fail(CODES.SYMBOL);
	}
	return (c) => contains(set, c.weekday);
}

// --- span ---

export function spanTerm(r, t) {
	if (t.lo.star) {
		fail(CODES.CONTEXT); // *-v has no low bound
	}
	if (t.lo.name !== "") {
		return weekdaySpanTerm(r, t);
	}
	const lo = t.lo.qtys[0].num;
	inDomain(r, lo);
	if (t.hi.star) {
		return (c) => value(c, r) >= lo;
	}
	if (t.hi.name !== "") {
		fail(CODES.CONTEXT); // numeric low with a symbolic high
	}
	return boundedSpan(r, lo, t.hi.qtys[0].num);
}

function weekdaySpanTerm(r, t) {
	if (r !== ROLE.WEEKDAY || t.hi === null || t.hi.name === "") {
		fail(CODES.CONTEXT);
	}
	return boundedSpan(
		ROLE.WEEKDAY,
		singleWeekday(t.lo.name),
		singleWeekday(t.hi.name),
	);
}

export function singleWeekday(name) {
	const { set, res } = resolveWeekday(name);
	if (res !== RES.ONE || set.length !== 1) {
		fail(CODES.SYMBOL);
	}
	return set[0];
}

function boundedSpan(r, lo, hi) {
	inDomain(r, hi);
	if (hi >= lo) {
		return (c) => value(c, r) >= lo && value(c, r) <= hi;
	}
	if (r === ROLE.YEAR) {
		fail(CODES.RANGE); // years do not wrap
	}
	return (c) => value(c, r) >= lo || value(c, r) <= hi;
}

// --- from-end ---

function fromEndTerm(r, t) {
	if (t.hi !== null || r === ROLE.YEAR || t.lo.qtys.length === 0) {
		fail(CODES.CONTEXT); // from-end needs a numeric magnitude
	}
	const length = atomDays(t.lo);
	if (length < 1 || length > cycleSize(r)) {
		fail(CODES.RANGE); // a tail must be 1..cycle long
	}
	return (c) => {
		const [clo, chi] = cycle(c, r);
		const v = value(c, r);
		return v >= chi - length + 1 && v >= clo;
	};
}

// --- shared helpers ---

export function inDomain(r, v) {
	const [lo, hi] = DOMAINS[r];
	if (v < lo || v > hi) {
		fail(CODES.RANGE);
	}
}

export function contains(set, v) {
	return set.includes(v);
}

export function atomDays(a) {
	return a.qtys.reduce((total, q) => total + q.num * unitDays(q.unit), 0);
}

function unitDays(unit) {
	return unit === "w" ? 7 : 1;
}
