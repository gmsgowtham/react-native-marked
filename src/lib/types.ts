import type { ReactNode } from "react";
import type {
	FlatListProps,
	ViewStyle,
	TextStyle,
	ImageStyle,
} from "react-native";
import type { MarkedStyles, UserTheme } from "./../theme/types";
import type Renderer from "./Renderer";

export interface ParserOptions {
	styles?: MarkedStyles;
	baseUrl?: string;
	renderer: new () => Renderer;
}

export interface MarkdownProps extends Partial<ParserOptions> {
	value: string;
	flatListProps?: Omit<
		FlatListProps<ReactNode>,
		"data" | "renderItem" | "horizontal"
	>;
	theme?: UserTheme;
}
