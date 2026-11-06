import type { Token, Tokens } from "marked";

/**
 * Maps every token instance reached by {@link assignStableKeys} to a stable,
 * content-derived key. A WeakMap keeps lookups O(1) and lets token instances
 * be garbage collected between parses.
 */
const stableKeys = new WeakMap<Token, string>();

/**
 * Recursively walks a token tree and assigns each token a stable key:
 * `type:raw` for the first occurrence, `type:raw@<n>` for repeated content.
 * The occurrence numbering is derived from the document content alone, so
 * identical documents always produce identical keys — across parses, renders
 * and streaming updates — which lets React reconcile instead of remount.
 */
const walk = (
	tokens: readonly unknown[] | undefined,
	occurrences: Map<string, number>,
): void => {
	/* TypeScript-safe and collision-safe: `header` is an array on Tokens.Table
	 * but a boolean flag on Tokens.TableCell, so only real arrays are walked. */
	if (!tokens || !Array.isArray(tokens)) return;
	for (const entry of tokens) {
		const token = entry as Token;
		const genericToken = token as Tokens.Generic;
		const keyBase = `${genericToken.type ?? ""}:${genericToken.raw ?? ""}`;
		const occurrence = occurrences.get(keyBase) ?? 0;
		occurrences.set(keyBase, occurrence + 1);
		stableKeys.set(
			token,
			occurrence === 0 ? keyBase : `${keyBase}@${occurrence}`,
		);

		/* Descend into the nested token arrays of every known token shape. */
		walk(genericToken.tokens, occurrences);
		walk((token as Tokens.List).items, occurrences);
		walk((token as Tokens.Table).header, occurrences);
		walk((token as Tokens.Table).rows?.flat(), occurrences);
	}
};

/**
 * Assigns a deterministic, content-based key to every token in the tree.
 *
 * Call this right after lexing, before parsing. Keys survive re-parses of
 * unchanged content (even when tokens are inserted or removed elsewhere in
 * the document), preventing full-tree remounts during streaming updates.
 */
const assignStableKeys = (tokens?: Token[]): void => {
	if (!tokens) return;
	walk(tokens, new Map());
};

/** Returns the stable key previously assigned to a token, if any. */
const getStableKeyOf = (token?: Token): string | undefined => {
	if (!token) return undefined;
	return stableKeys.get(token);
};

export { assignStableKeys, getStableKeyOf };
