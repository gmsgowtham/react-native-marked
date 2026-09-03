import { type Hooks, lexer, type Token, type Tokenizer } from "marked";
import { useMemo, useRef } from "react";
import type { ColorSchemeName } from "react-native";
import Parser from "../lib/Parser";
import Renderer from "../lib/Renderer";
import type { MarkdownBlock, RendererInterface } from "../lib/types";
import getStyles from "./../theme/styles";
import type { MarkedStyles, UserTheme } from "./../theme/types";

/**
 * Simple deterministic hash for block id generation.
 * Uses DJB2-like algorithm, returns hex string.
 */
function hashString(str: string): string {
	let hash = 5381;
	for (let i = 0; i < str.length; i++) {
		hash = (hash * 33) ^ str.charCodeAt(i);
	}
	return (hash >>> 0).toString(16);
}

export interface UseMarkdownBlocksOptions {
	colorScheme?: ColorSchemeName;
	renderer?: RendererInterface;
	theme?: UserTheme;
	styles?: MarkedStyles;
	baseUrl?: string;
	tokenizer?: Tokenizer;
	hooks?: Hooks;
	selectable?: boolean;
}

const useMarkdownBlocks = (
	value: string,
	options?: UseMarkdownBlocksOptions,
): { blocks: MarkdownBlock[]; parser: Parser } => {
	const styles = useMemo(
		() => getStyles(options?.styles, options?.colorScheme, options?.theme),
		[options?.styles, options?.theme, options?.colorScheme],
	);

	const parser = useMemo(
		() =>
			new Parser({
				styles,
				baseUrl: options?.baseUrl,
				renderer:
					options?.renderer ??
					new Renderer({ selectable: options?.selectable }),
			}),
		[options?.renderer, options?.baseUrl, styles, options?.selectable],
	);

	const tokens = useMemo(() => {
		const rawTokens = lexer(value, {
			gfm: true,
			tokenizer: options?.tokenizer,
			hooks: options?.hooks,
		});
		// Filter out non-renderable tokens (e.g., 'space') — mirrors Parser filtering where default returns null
		return rawTokens.filter((t) => t.type !== "space");
	}, [value, options?.tokenizer, options?.hooks]);

	// Reuse previous blocks for stable references (prefix optimization for streaming)
	const prevBlocksRef = useRef<MarkdownBlock[] | null>(null);
	const prevParserRef = useRef<Parser | null>(null);

	const blocks = useMemo(() => {
		const prevBlocks = prevBlocksRef.current;
		const prevParser = prevParserRef.current;
		const parserChanged = prevParser !== parser;

		// If parser changed (styles/theme/renderer changed), all blocks must be recreated
		// because rendered output depends on styles/renderer.
		if (parserChanged) {
			const newBlocks: MarkdownBlock[] = tokens.map((token, index) => {
				const raw = (token as { raw?: string }).raw ?? `${token.type}-${index}`;
				const type = token.type;
				const id = `${type}-${hashString(raw)}-${index}`;
				return { id, token, raw, type };
			});
			prevBlocksRef.current = newBlocks;
			prevParserRef.current = parser;
			return newBlocks;
		}

		// Parser unchanged: try to reuse blocks where raw+type identical at same index
		if (prevBlocks && prevBlocks.length === tokens.length) {
			let allEqual = true;
			for (let i = 0; i < tokens.length; i++) {
				const t = tokens[i] as Token;
				const prev = prevBlocks[i] as MarkdownBlock;
				const raw = (t as { raw?: string }).raw ?? `${t.type}-${i}`;
				if (prev.raw !== raw || prev.type !== t.type) {
					allEqual = false;
					break;
				}
			}
			if (allEqual) {
				// Return previous array reference to allow FlatList and memo to bail out completely
				return prevBlocks;
			}
		}

		const newBlocks: MarkdownBlock[] = tokens.map((token, index) => {
			const raw = (token as { raw?: string }).raw ?? `${token.type}-${index}`;
			const type = token.type;
			const prev = prevBlocks?.[index];
			if (prev && prev.raw === raw && prev.type === type) {
				// Reuse previous block object (and thus its token reference) for memo bail-out
				return prev;
			}
			const id = `${type}-${hashString(raw)}-${index}`;
			return { id, token: token as Token, raw, type };
		});

		prevBlocksRef.current = newBlocks;
		prevParserRef.current = parser;
		return newBlocks;
	}, [tokens, parser]);

	return { blocks, parser };
};

export default useMarkdownBlocks;
