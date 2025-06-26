import { lexer, type Tokenizer } from "marked";
import { type ReactNode, useMemo } from "react";
import type { ColorSchemeName } from "react-native";
import Parser from "../lib/Parser";
import Renderer from "../lib/Renderer";
import type { RendererInterface } from "../lib/types";
import getStyles from "./../theme/styles";
import type { MarkedStyles, UserTheme } from "./../theme/types";

export interface useMarkdownHookOptions {
	colorScheme?: ColorSchemeName;
	renderer?: RendererInterface;
	theme?: UserTheme;
	styles?: MarkedStyles;
	baseUrl?: string;
	tokenizer?: Tokenizer;
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
				renderer: options?.renderer ?? new Renderer(),
			}),
		[options?.renderer, options?.baseUrl, styles],
	);

	const elements = useMemo(() => {
		const tokens = lexer(value, {
			gfm: true,
			tokenizer: options?.tokenizer,
		});
		return parser.parse(tokens);
	}, [value, parser, options?.tokenizer]);

	return elements;
};

export default useMarkdown;
