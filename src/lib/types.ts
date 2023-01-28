import type { ReactNode } from "react";
import type {
	FlatListProps,
	ImageStyle,
	TextStyle,
	ViewStyle,
} from "react-native";
import type { MarkedStyles, UserTheme } from "./../theme/types";
import type { marked } from "marked";

export interface ParserOptions {
	styles?: MarkedStyles;
	baseUrl?: string;
}

export interface MarkdownProps extends ParserOptions {
	value: string;
	flatListProps?: Omit<
		FlatListProps<ReactNode>,
		"data" | "renderItem" | "horizontal"
	>;
	theme?: UserTheme;
	parser?: CustomParser;
}

export interface IParser {
	parse: (tokens: marked.Token[]) => ReactNode[];
	parseInline: (
		tokens: marked.Token[],
		styles?: ViewStyle | TextStyle | ImageStyle,
	) => ReactNode[];
}

export type CustomParser = (baseParser: IParser) => {
	parse: (tokens: marked.Token[]) => ReactNode[];
};
