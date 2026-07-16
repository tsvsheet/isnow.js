/**
 * Symbolic name resolution (specs/contracts/semantics.md §Symbols): weekday and
 * time words, resolved by case-insensitive unique prefix. Weekday resolution
 * runs before time resolution, so `m` = Monday wins over `midnight`.
 */

// Weekday numbering is Sunday = 1 .. Saturday = 7.
export const WEEKDAY_NAMES = [
	"",
	"sunday",
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
];

// weekdayRuns are the fixed multi-day tokens that are not name prefixes.
const WEEKDAY_RUNS = { mwf: [2, 4, 6], ss: [1, 7], tt: [3, 5] };

// timeSymbols maps each time word to its [H, M, S]; abbreviations resolve directly.
const TIME_SYMBOLS = {
	midnight: [0, 0, 0],
	noon: [12, 0, 0],
	midday: [12, 0, 0],
};
const TIME_ABBREV = { mn: [0, 0, 0], md: [12, 0, 0] };

export const RES = Object.freeze({ NONE: 0, ONE: 1, AMBIGUOUS: 2 });

/**
 * resolveWeekday returns { set, res } for a name.
 * @param {string} name
 */
export function resolveWeekday(name) {
	const low = name.toLowerCase();
	if (Object.hasOwn(WEEKDAY_RUNS, low)) {
		return { set: WEEKDAY_RUNS[low], res: RES.ONE };
	}
	return prefixWeekday(low);
}

function prefixWeekday(low) {
	const found = [];
	for (let n = 1; n <= 7; n += 1) {
		if (WEEKDAY_NAMES[n].startsWith(low)) {
			found.push(n);
		}
	}
	if (found.length === 0) {
		return { set: null, res: RES.NONE };
	}
	if (found.length === 1) {
		return { set: found, res: RES.ONE };
	}
	return { set: null, res: RES.AMBIGUOUS };
}

/**
 * resolveTime returns { hms, res } for a time symbol.
 * @param {string} name
 */
export function resolveTime(name) {
	const low = name.toLowerCase();
	if (Object.hasOwn(TIME_ABBREV, low)) {
		return { hms: TIME_ABBREV[low], res: RES.ONE };
	}
	return prefixTime(low);
}

function prefixTime(low) {
	const hits = [];
	for (const word of Object.keys(TIME_SYMBOLS)) {
		if (word.startsWith(low)) {
			hits.push(TIME_SYMBOLS[word]);
		}
	}
	return uniqueTime(hits);
}

function uniqueTime(hits) {
	if (hits.length === 0) {
		return { hms: null, res: RES.NONE };
	}
	if (
		hits.some(
			(h) => h[0] !== hits[0][0] || h[1] !== hits[0][1] || h[2] !== hits[0][2],
		)
	) {
		return { hms: null, res: RES.AMBIGUOUS };
	}
	return { hms: hits[0], res: RES.ONE };
}
