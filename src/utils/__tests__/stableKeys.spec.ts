import type { Token, Tokens } from "marked";
import { lexer } from "marked";
import { assignStableKeys, getStableKeyOf } from "../stableKeys";

/** Collects the stable key of every token in a token tree. */
const collectKeys = (tokens?: readonly unknown[]): string[] => {
	if (!tokens || !Array.isArray(tokens)) return [];
	const keys: string[] = [];
	for (const entry of tokens) {
		const token = entry as Token;
		const key = getStableKeyOf(token);
		if (key) keys.push(key);
		keys.push(...collectKeys((token as Tokens.Generic).tokens as unknown[]));
		keys.push(...collectKeys((token as Tokens.List).items as unknown[]));
		keys.push(...collectKeys((token as Tokens.Table).header as unknown[]));
		const rows = (token as Tokens.Table).rows;
		if (rows) {
			for (const row of rows) {
				keys.push(...collectKeys(row as unknown[]));
			}
		}
	}
	return keys;
};

describe("stableKeys", () => {
	it("assigns identical keys to unchanged content across lexes", () => {
		const md = "# Heading\n\nSome paragraph text.";

		const first = lexer(md, { gfm: true });
		assignStableKeys(first);
		const second = lexer(md, { gfm: true });
		assignStableKeys(second);

		expect(collectKeys(first)).toEqual(collectKeys(second));
	});

	it("keeps keys stable when tokens are inserted before unchanged ones", () => {
		const tail = lexer("B paragraph.", { gfm: true });
		const expanded = lexer("A paragraph.\n\nB paragraph.", { gfm: true });

		assignStableKeys(tail);
		assignStableKeys(expanded);

		const tailKeys = collectKeys(tail);
		const expandedKeys = collectKeys(expanded);

		expect(expandedKeys.slice(expandedKeys.length - tailKeys.length)).toEqual(
			tailKeys,
		);
	});

	it("assigns unique keys to identical duplicate block tokens", () => {
		const tokens = lexer("Same.\n\nSame.", { gfm: true });
		assignStableKeys(tokens);

		const keys = collectKeys(tokens);
		expect(new Set(keys).size).toBe(keys.length);
	});

	it("assigns unique keys to identical nested inline tokens", () => {
		const tokens = lexer("a `code` b `code` c", { gfm: true });
		assignStableKeys(tokens);

		const keys = collectKeys(tokens);
		expect(new Set(keys).size).toBe(keys.length);
	});

	it("guards non-array look-alike fields (table cells)", () => {
		const tokens = lexer("| A | B |\n| --- | --- |\n| 1 | 2 |", {
			gfm: true,
		});

		expect(() => assignStableKeys(tokens)).not.toThrow();
		expect(collectKeys(tokens).length).toBeGreaterThan(0);
	});

	it("handles empty input", () => {
		expect(() => assignStableKeys(undefined)).not.toThrow();
		expect(() => assignStableKeys([])).not.toThrow();
	});

	it("ignores tokens that were never assigned", () => {
		expect(getStableKeyOf(undefined)).toBeUndefined();
		expect(
			getStableKeyOf({ type: "custom", raw: "x" } as unknown as Token),
		).toBeUndefined();
	});
});
