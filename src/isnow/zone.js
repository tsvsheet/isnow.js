/**
 * Evaluation-zone resolution (specs/contracts/library-api.md). A `Date` carries
 * no zone, so the wall-clock fields the matcher reads are derived either by
 * fixed-offset arithmetic (when an instant string carries an explicit offset —
 * the conformance path) or via Intl.DateTimeFormat for a parse-time IANA
 * `timeZone`. Fields are truncated to whole seconds.
 */

import { utcMs } from "./ctx.js";
import { CODES, fail } from "./errors.js";

const RFC3339 =
	/^(\d{4})-(\d{2})-(\d{2})[Tt ](\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(Z|z|[+-]\d{2}:?\d{2})?$/u;
const MIN_MS = 60000;

/** FixedZone evaluates in a constant UTC offset (minutes east of UTC). */
class FixedZone {
	constructor(offsetMin) {
		this.offsetMin = offsetMin;
	}

	wallFromInstant(ms) {
		const d = new Date(ms + this.offsetMin * MIN_MS);
		return {
			y: d.getUTCFullYear(),
			m: d.getUTCMonth() + 1,
			d: d.getUTCDate(),
			H: d.getUTCHours(),
			M: d.getUTCMinutes(),
			S: d.getUTCSeconds(),
		};
	}

	instantFromWall(w) {
		return utcMs(w.y, w.m - 1, w.d, w.H, w.M, w.S) - this.offsetMin * MIN_MS;
	}
}

/** IntlZone evaluates in an IANA zone via Intl.DateTimeFormat field extraction. */
class IntlZone {
	constructor(name) {
		this.fmt = new Intl.DateTimeFormat("en-US", {
			timeZone: name,
			hourCycle: "h23",
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});
	}

	wallFromInstant(ms) {
		const parts = {};
		for (const p of this.fmt.formatToParts(new Date(ms))) {
			parts[p.type] = p.value;
		}
		return {
			y: +parts.year,
			m: +parts.month,
			d: +parts.day,
			H: +parts.hour,
			M: +parts.minute,
			S: +parts.second,
		};
	}

	instantFromWall(w) {
		const guess = utcMs(w.y, w.m - 1, w.d, w.H, w.M, w.S);
		const back = this.wallFromInstant(guess);
		const offset =
			utcMs(back.y, back.m - 1, back.d, back.H, back.M, back.S) - guess;
		return guess - offset;
	}
}

function zoneFor(timeZone) {
	return timeZone ? new IntlZone(timeZone) : new FixedZone(0);
}

function parseOffset(text) {
	if (text === "Z" || text === "z") {
		return 0;
	}
	const s = text.replace(":", "");
	const sign = s[0] === "-" ? -1 : 1;
	return (
		sign *
		(Number.parseInt(s.slice(1, 3), 10) * 60 +
			Number.parseInt(s.slice(3, 5), 10))
	);
}

/**
 * resolve normalizes an instant into { zone, ms, wall }. `at` is a Date or an
 * RFC3339 string; a string offset wins over the parse-time timeZone.
 * @param {Date|string} at
 * @param {string|undefined} timeZone
 */
export function resolve(at, timeZone) {
	if (at instanceof Date) {
		const zone = zoneFor(timeZone);
		return { zone, ms: at.getTime(), wall: zone.wallFromInstant(at.getTime()) };
	}
	const m = RFC3339.exec(String(at));
	if (m === null) {
		fail(CODES.CONTEXT, `invalid instant: ${at}`);
	}
	const wall = { y: +m[1], m: +m[2], d: +m[3], H: +m[4], M: +m[5], S: +m[6] };
	const zone = m[7] ? new FixedZone(parseOffset(m[7])) : zoneFor(timeZone);
	return { zone, ms: zone.instantFromWall(wall), wall };
}
