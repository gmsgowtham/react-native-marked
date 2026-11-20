import { type Hooks, lexer, type Token, type Tokenizer } from "marked";
import {
	cloneElement,
	isValidElement,
	type ReactNode,
	useLayoutEffect,
	useMemo,
	useRef,
} from "react";
import type { ColorSchemeName } from "react-native";
import Parser from "../lib/Parser";
import Renderer from "../lib/Renderer";
import type { RendererInterface } from "../lib/types";
import getStyles from "./../theme/styles";
import type { MarkedStyles, UserTheme } from "./../theme/types";
import isEqual from "./../utils/isEqual";
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

type CachedBlock = { token: Token; element: ReactNode };

export const usesDefaultMarkdown = ({
	renderer,
	tokenizer,
	hooks,
}: useMarkdownHookOptions): boolean => !renderer && !tokenizer && !hooks;

const useMarkdown = (
	value: string,
	options: useMarkdownHookOptions = {},
): ReactNode[] => {
	const { colorScheme, baseUrl, renderer, selectable, tokenizer, hooks } =
		options;
	const userStyles = useStableValue(options.styles);
	const theme = useStableValue(options.theme);
	const reuseBlocks = usesDefaultMarkdown(options);
	const styles = useMemo(
		() => getStyles(userStyles, colorScheme, theme),
		[userStyles, colorScheme, theme],
	);

	const parser = useMemo(
		() =>
			new Parser({
				styles,
				baseUrl,
				renderer: renderer ?? new Renderer({ selectable }),
			}),
		[renderer, baseUrl, styles, selectable],
	);

	const committed = useRef<
		{ parser: Parser; blocks: Map<string, CachedBlock> } | undefined
	>(undefined);
	const { elements, cache } = useMemo(() => {
		const tokens = lexer(value, { gfm: true, tokenizer, hooks });
		if (!reuseBlocks)
			return { elements: parser.parse(tokens), cache: undefined };

		const previous =
			committed.current?.parser === parser
				? committed.current.blocks
				: undefined;
		const occurrences = new Map<string, number>();
		const blocks = new Map<string, CachedBlock>();
		const elements: ReactNode[] = [];

		for (const token of tokens) {
			const content = [token.type, token.raw];
			const identity = JSON.stringify(content);
			const occurrence = occurrences.get(identity) ?? 0;
			occurrences.set(identity, occurrence + 1);
			const key = JSON.stringify([...content, occurrence]);

			const cached = previous?.get(key);
			if (cached && isEqual(cached.token, token)) {
				blocks.set(key, cached);
				elements.push(cached.element);
				continue;
			}

			const [node] = parser.parse([token]);
			if (!isValidElement(node)) continue;
			const element = cloneElement(node, { key });
			blocks.set(key, { token, element });
			elements.push(element);
		}

		return { elements, cache: { parser, blocks } };
	}, [value, parser, tokenizer, hooks, reuseBlocks]);

	useLayoutEffect(() => {
		committed.current = cache;
	}, [cache]);

	return elements;
};

export default useMarkdown;
