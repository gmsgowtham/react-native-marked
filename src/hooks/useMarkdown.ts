import { type Hooks, lexer, type Tokenizer } from "marked";
import { type ReactNode, useMemo, useRef } from "react";
import type { ColorSchemeName } from "react-native";
import Parser from "../lib/Parser";
import Renderer from "../lib/Renderer";
import type { RendererInterface } from "../lib/types";
import getStyles from "./../theme/styles";
import type { MarkedStyles, UserTheme } from "./../theme/types";
import isEqual from "./../utils/isEqual";
import { assignStableKeys, getStableKeyOf } from "./../utils/stableKeys";
import useStableValue from "./useStableValue";

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

/**
 * Equality check for hook options: class/hook instances (`renderer`,
 * `tokenizer`, `hooks`) compare by reference, primitives (`baseUrl`,
 * `colorScheme`, `selectable`) by value, style/theme objects structurally.
 * Lets consumers pass inline `styles={{...}}`/`theme={{...}}` object literals
 * without invalidating the parse on every render.
 */
export const areHookOptionsEqual = (
	previous?: useMarkdownHookOptions,
	next?: useMarkdownHookOptions,
): boolean => {
	if (previous === next) return true;
	if (!previous || !next) return false;
	return (
		previous.renderer === next.renderer &&
		previous.tokenizer === next.tokenizer &&
		previous.hooks === next.hooks &&
		previous.baseUrl === next.baseUrl &&
		previous.colorScheme === next.colorScheme &&
		previous.selectable === next.selectable &&
		isEqual(previous.theme, next.theme) &&
		isEqual(previous.styles, next.styles)
	);
};

/**
 * Parsed-element cache for top-level tokens.
 *
 * Reuses previously parsed subtrees when their token content is unchanged,
 * keeping element (and every wrapped component) identities stable during
 * streaming updates so unchanged list items skip re-rendering.
 */
interface ElementsCache {
	/** Cache only holds entries parsed by this exact parser instance. */
	epoch: Parser;
	/** contentKey (occurrence-suffixed stable key + JSON) → parsed ReactNode[]. */
	entries: Map<string, ReactNode[]>;
}

const useMarkdown = (
	value: string,
	options?: useMarkdownHookOptions,
): ReactNode[] => {
	const stableOptions = useStableValue(options, areHookOptionsEqual);
	const {
		styles: userStyles,
		theme,
		colorScheme,
		baseUrl,
		renderer,
		selectable,
		tokenizer,
		hooks,
	} = stableOptions ?? {};

	const styles = useMemo(
		() => getStyles(userStyles, colorScheme, theme),
		[userStyles, colorScheme, theme],
	);

	const parser = useMemo(
		() =>
			new Parser({
				styles: styles,
				baseUrl: baseUrl,
				renderer: renderer ?? new Renderer({ selectable: selectable }),
			}),
		[renderer, baseUrl, styles, selectable],
	);

	const cacheRef = useRef<ElementsCache | undefined>(undefined);

	const elements = useMemo(() => {
		const tokens = lexer(value, {
			gfm: true,
			tokenizer: tokenizer,
			hooks: hooks,
		});

		/*
		 * Content-derived keys are assigned before parsing so that React keys
		 * stay identical across re-parses; unchanged tokens reconcile instead
		 * of remounting (no image refetches, no lost per-element state).
		 */
		assignStableKeys(tokens);

		/* Start a fresh cache for a new parser, keep hits from the previous. */
		const previousCache: ElementsCache | undefined = cacheRef.current;
		const entries: Map<string, ReactNode[]> = new Map();

		const elements: ReactNode[] = [];
		for (const token of tokens) {
			/*
			 * The occurrence-suffixed stable key separates content-identical
			 * tokens; without it a plain JSON key would deduplicate them into a
			 * single cached element, duplicating sibling React keys.
			 */
			const stableKey = getStableKeyOf(token);
			const contentKey = stableKey
				? `${stableKey}\u0000${JSON.stringify(token)}`
				: JSON.stringify(token);
			const cached =
				previousCache?.epoch === parser
					? previousCache.entries.get(contentKey)
					: undefined;
			if (cached) {
				entries.set(contentKey, cached);
				elements.push(...cached);
				continue;
			}
			/* One token at a time keeps releases localized, plus cache keys. */
			const parsed = parser.parse([token]);
			entries.set(contentKey, parsed);
			elements.push(...parsed);
		}

		cacheRef.current = { epoch: parser, entries: entries };
		return elements;
	}, [value, parser, tokenizer, hooks]);

	return elements;
};

export default useMarkdown;
