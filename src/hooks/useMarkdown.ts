import { useMemo } from "react";
import { Tokenizer, marked } from "marked";
import type { MarkedStyles, UserTheme } from "./../theme/types";
import Parser from "../lib/Parser";
import Renderer from "../lib/Renderer";
import getStyles from "./../theme/styles";
import { type ColorSchemeName } from "react-native";
import type { CustomToken, RendererInterface, Token } from "../lib/types";

export interface useMarkdownHookOptions {
	colorScheme?: ColorSchemeName;
	renderer?: RendererInterface;
	theme?: UserTheme;
	styles?: MarkedStyles;
	baseUrl?: string;
	tokenizer?: Tokenizer<CustomToken>;
}

export interface useMarkdownHook {
	parser: Parser;
	tokens: Token[];
}

const useMarkdown = (
	value: string,
	options?: useMarkdownHookOptions,
): useMarkdownHook => {
	const styles = useMemo(
		() => getStyles(options?.styles, options?.colorScheme, options?.theme),
		[options?.styles, options?.theme, options?.colorScheme],
	);

	const parser = useMemo(
		() =>
			new Parser({
				styles: styles,
				baseUrl: options?.baseUrl,
				renderer: options?.renderer ?? new Renderer(),
			}),
		[options?.renderer, options?.baseUrl, styles],
	);

	const tokens = useMemo(() => {
		const tokens = marked.lexer(value, {
			gfm: true,
			tokenizer: options?.tokenizer as Tokenizer<never>,
		});
		return tokens;
	}, [value, parser]);

	return { parser, tokens };
};

export default useMarkdown;
