import { type Hooks, lexer, type Token, type Tokenizer } from "marked";
import { type ReactNode, useMemo, useRef } from "react";
import type { ColorSchemeName } from "react-native";
import Parser from "../lib/Parser";
import Renderer from "../lib/Renderer";
import type { RendererInterface } from "../lib/types";
import getStyles from "./../theme/styles";
import type { MarkedStyles, UserTheme } from "./../theme/types";

export interface useMarkdownHookOptions {
	colorScheme?: ColorSchemeName;
	/** Custom renderer. When provided, `selectable` is ignored — configure via `new Renderer({ selectable })`. */
	renderer?: RendererInterface;
	theme?: UserTheme;
	styles?: MarkedStyles;
	baseUrl?: string;
	tokenizer?: Tokenizer;
	hooks?: Hooks;
	/** Whether Text elements are selectable. Defaults to `true`. Ignored when `renderer` is provided. */
	selectable?: boolean;
}

const useMarkdown = (
	value: string,
	options?: useMarkdownHookOptions,
): ReactNode[] => {
	const styles = useMemo(
		() => getStyles(options?.styles, options?.colorScheme, options?.theme),
		[options?.styles, options?.theme, options?.colorScheme],
	);

	const parser = useMemo(
		() =>
			new Parser({
				styles: styles,
				baseUrl: options?.baseUrl,
				renderer:
					options?.renderer ??
					new Renderer({ selectable: options?.selectable }),
			}),
		[options?.renderer, options?.baseUrl, styles, options?.selectable],
	);

	const prevTokensRef = useRef<Token[] | null>(null);
	const prevElementsRef = useRef<ReactNode[] | null>(null);
	const prevParserRef = useRef<Parser | null>(null);

	const elements = useMemo(() => {
		const tokens = lexer(value, {
			gfm: true,
			tokenizer: options?.tokenizer,
			hooks: options?.hooks,
		});

		const prevTokens = prevTokensRef.current;
		const prevElements = prevElementsRef.current;
		const prevParser = prevParserRef.current;

		// If parser changed (styles/renderer changed), re-parse fully
		if (prevParser !== parser) {
			const result = parser.parse(tokens);
			prevTokensRef.current = tokens;
			prevElementsRef.current = result;
			prevParserRef.current = parser;
			return result;
		}

		// If tokens identical to previous, return same array reference to bail out
		if (prevTokens && prevElements && prevTokens.length === tokens.length) {
			let allSame = true;
			for (let i = 0; i < tokens.length; i++) {
				const a = prevTokens[i] as Token & { raw?: string };
				const b = tokens[i] as Token & { raw?: string };
				if (a.raw !== b.raw || a.type !== b.type) {
					allSame = false;
					break;
				}
			}
			if (allSame) {
				return prevElements;
			}
		}

		// Try prefix reuse for streaming appends
		if (prevTokens && prevElements && tokens.length > prevTokens.length) {
			let prefixMatches = true;
			for (let i = 0; i < prevTokens.length; i++) {
				const a = prevTokens[i] as Token & { raw?: string };
				const b = tokens[i] as Token & { raw?: string };
				if (a.raw !== b.raw || a.type !== b.type) {
					prefixMatches = false;
					break;
				}
			}
			if (prefixMatches) {
				const remainingTokens = tokens.slice(prevTokens.length);
				const newElements = parser.parse(remainingTokens);
				const result = [...prevElements, ...newElements];
				prevTokensRef.current = tokens;
				prevElementsRef.current = result;
				return result;
			}
		}

		// Per-index reuse for same-length edits (e.g., editing one paragraph)
		if (prevTokens && prevElements && prevTokens.length === tokens.length) {
			let hasReuse = false;
			let needsParse = false;
			const newElements: ReactNode[] = new Array(tokens.length);
			for (let i = 0; i < tokens.length; i++) {
				const a = prevTokens[i] as Token & { raw?: string };
				const b = tokens[i] as Token & { raw?: string };
				if (
					a.raw === b.raw &&
					a.type === b.type &&
					prevElements[i] !== null &&
					prevElements[i] !== undefined
				) {
					newElements[i] = prevElements[i] as ReactNode;
					hasReuse = true;
				} else {
					needsParse = true;
					newElements[i] = null as unknown as ReactNode;
				}
			}
			if (hasReuse && needsParse) {
				for (let i = 0; i < tokens.length; i++) {
					if (newElements[i] === null) {
						const parsed = parser.parse([tokens[i] as Token]);
						newElements[i] = parsed[0] as ReactNode;
					}
				}
				prevTokensRef.current = tokens;
				prevElementsRef.current = newElements;
				return newElements;
			}
		}

		const result = parser.parse(tokens);
		prevTokensRef.current = tokens;
		prevElementsRef.current = result;
		prevParserRef.current = parser;
		return result;
	}, [value, parser, options?.tokenizer, options?.hooks]);

	return elements;
};

export default useMarkdown;
