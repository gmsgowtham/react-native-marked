import type { ReactNode } from "react";
import type { Tokenizer } from "marked";
import type { MarkedStyles, UserTheme } from "./../theme/types";
import type { ColorSchemeName } from "react-native";
import type { RendererInterface } from "../lib/types";
export interface useMarkdownHookOptions {
	colorScheme?: ColorSchemeName;
	renderer?: RendererInterface;
	theme?: UserTheme;
	styles?: MarkedStyles;
	baseUrl?: string;
	tokenizer?: Tokenizer;
}
declare const useMarkdown: (
	value: string,
	options?: useMarkdownHookOptions,
) => ReactNode[];
export default useMarkdown;
