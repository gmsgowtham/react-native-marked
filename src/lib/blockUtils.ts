import type { Token } from "marked";

/**
 * Simple deterministic hash for block id generation.
 * Uses DJB2-like algorithm, returns hex string.
 */
export function hashString(str: string): string {
	let hash = 5381;
	for (let i = 0; i < str.length; i++) {
		hash = (hash * 33) ^ str.charCodeAt(i);
	}
	return (hash >>> 0).toString(16);
}

type TokenRecord = Token & Record<string, unknown>;

/**
 * Block-token fields that affect rendered output in addition to `raw`.
 * Comparing `raw` + `type` alone is not enough: e.g. a reference definition
 * (`[f]: /url`) elsewhere in the document can change a link with identical
 * `raw`, and custom tokenizers/hooks can return the same `raw` with
 * different parsed fields.
 */
function fingerprintFields(token: Token): string {
	const record = token as TokenRecord;
	return JSON.stringify({
		depth: record.depth ?? null,
		lang: record.lang ?? null,
		ordered: record.ordered ?? null,
		start: record.start ?? null,
		href: record.href ?? null,
		title: record.title ?? null,
		checked: record.checked ?? null,
		task: record.task ?? null,
		loose: record.loose ?? null,
		align: record.align ?? null,
	});
}

/**
 * Value comparison for block tokens. Token objects are recreated on every
 * `lexer()` call, so identity comparison never matches across renders.
 */
export function isSameBlockToken(a: Token, b: Token): boolean {
	if (a.type !== b.type) {
		return false;
	}
	const aRaw = (a as { raw?: string }).raw ?? "";
	const bRaw = (b as { raw?: string }).raw ?? "";
	if (aRaw !== bRaw) {
		return false;
	}
	return fingerprintFields(a) === fingerprintFields(b);
}

export function getBlockRaw(token: Token, index: number): string {
	return (token as { raw?: string }).raw ?? `${token.type}-${index}`;
}

/**
 * Deterministic content-derived ids for a token list.
 *
 * Ids intentionally do NOT contain the token index: an index suffix would
 * invalidate every downstream key on prepend/insert (see #451). Duplicate
 * blocks with identical content are disambiguated with an occurrence counter
 * (`base`, `base-1`, …), which keeps ids of surviving blocks stable when
 * blocks are appended, prepended, inserted, or removed.
 */
export function assignBlockIds(tokens: Token[]): string[] {
	const occurrences = new Map<string, number>();
	const used = new Set<string>();
	return tokens.map((token) => {
		const raw = getBlockRaw(token, 0);
		const base = `${token.type}-${hashString(raw)}`;
		let count = occurrences.get(base) ?? 0;
		let id = count === 0 ? base : `${base}-${count}`;
		// Fallback for the (unlikely) case of distinct raws hashing to the
		// same base id: bump the suffix until the id is unique in this list.
		while (used.has(id)) {
			count += 1;
			id = `${base}-${count}`;
		}
		occurrences.set(base, count + 1);
		used.add(id);
		return id;
	});
}
