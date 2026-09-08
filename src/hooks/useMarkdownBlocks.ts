import { type Hooks, lexer, type Token, type Tokenizer } from "marked";
import { useMemo, useRef } from "react";
import type { ColorSchemeName } from "react-native";
import {
	assignBlockIds,
	getBlockRaw,
	isSameBlockToken,
} from "../lib/blockUtils";
import Parser from "../lib/Parser";
import Renderer from "../lib/Renderer";
import type { MarkdownBlock, RendererInterface } from "../lib/types";
import getStyles from "./../theme/styles";
import type { MarkedStyles, UserTheme } from "./../theme/types";

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
		const ids = assignBlockIds(tokens);

		// If parser changed (styles/theme/renderer changed), all blocks must be recreated
		// because rendered output depends on styles/renderer. Ids stay stable because
		// they are content-derived.
		if (parserChanged) {
			const newBlocks: MarkdownBlock[] = tokens.map((token, index) => {
				const id = ids[index] as string;
				return { id, token, raw: getBlockRaw(token, index), type: token.type };
			});
			prevBlocksRef.current = newBlocks;
			prevParserRef.current = parser;
			return newBlocks;
		}

		// Fast path: same blocks in the same order — return the previous array
		// reference so FlatList and memo can bail out completely.
		if (prevBlocks && prevBlocks.length === tokens.length) {
			let allEqual = true;
			for (let i = 0; i < tokens.length; i++) {
				const token = tokens[i] as Token;
				const prev = prevBlocks[i] as MarkdownBlock;
				if (prev.id !== ids[i] || !isSameBlockToken(prev.token, token)) {
					allEqual = false;
					break;
				}
			}
			if (allEqual) {
				return prevBlocks;
			}
		}

		// Content-keyed reuse: surviving blocks keep their object identity no
		// matter where they moved (append, prepend, insert, delete, reorder),
		// so memoized rows bail out. Only new/changed blocks are recreated.
		const prevById = new Map<string, MarkdownBlock>();
		if (prevBlocks) {
			for (const block of prevBlocks) {
				if (!prevById.has(block.id)) {
					prevById.set(block.id, block);
				}
			}
		}

		const newBlocks: MarkdownBlock[] = tokens.map((token, index) => {
			const id = ids[index] as string;
			const prev = prevById.get(id);
			if (prev && isSameBlockToken(prev.token, token)) {
				// Consume so two new blocks never share one previous object.
				prevById.delete(id);
				return prev;
			}
			return { id, token, raw: getBlockRaw(token, index), type: token.type };
		});

		prevBlocksRef.current = newBlocks;
		prevParserRef.current = parser;
		return newBlocks;
	}, [tokens, parser]);

	return { blocks, parser };
};

export default useMarkdownBlocks;
