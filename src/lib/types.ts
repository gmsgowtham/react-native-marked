import type { ReactNode } from "react";
import type { FlatListProps } from "react-native";
import type { MarkedStyles, UserTheme } from "./../theme/types";
import type Renderer from "./Renderer";

export interface ParserOptions {
	styles?: MarkedStyles;
	baseUrl?: string;
	renderer: Renderer;
}

export interface MarkdownProps extends Partial<ParserOptions> {
	value: string;
	flatListProps?: Omit<
		FlatListProps<ReactNode>,
		"data" | "renderItem" | "horizontal"
	>;
	theme?: UserTheme;
}
