import type { Hooks, Token, Tokenizer } from "marked";
import type { ReactNode } from "react";
import type {
	FlatListProps,
	ImageStyle,
	TextStyle,
	ViewStyle,
} from "react-native";
import type { MarkedStyles, UserTheme } from "./../theme/types";

export interface ParserOptions {
	styles?: MarkedStyles;
	baseUrl?: string;
	renderer: RendererInterface;
}

export type MarkdownBlock = {
	id: string;
	token: Token;
	raw: string;
	type: string;
};

export interface MarkdownProps extends Partial<ParserOptions> {
	value: string;
	flatListProps?: Omit<
		FlatListProps<MarkdownBlock>,
		"data" | "renderItem" | "horizontal"
	> | null;
	theme?: UserTheme;
	tokenizer?: Tokenizer;
	hooks?: Hooks;
	/**
	 * Whether Text elements are selectable. Defaults to `true`.
	 * When a custom `renderer` is provided this prop is ignored —
	 * configure the renderer directly via `new Renderer({ selectable })`.
	 */
	selectable?: boolean;
}

export type TableColAlignment = "center" | "left" | "right" | null;

export interface RendererInterface {
	paragraph(children: ReactNode[], styles?: ViewStyle): ReactNode;
	blockquote(children: ReactNode[], styles?: ViewStyle): ReactNode;
	heading(
		text: string | ReactNode[],
		styles?: TextStyle,
		depth?: number,
	): ReactNode;
	code(
		text: string,
		language?: string,
		containerStyle?: ViewStyle,
		textStyle?: TextStyle,
	): ReactNode;
	hr(styles?: ViewStyle): ReactNode;
	listItem(children: ReactNode[], styles?: ViewStyle): ReactNode;
	list(
		ordered: boolean,
		li: ReactNode[],
		listStyle?: ViewStyle,
		textStyle?: TextStyle,
		startIndex?: number,
	): ReactNode;
	escape(text: string, styles?: TextStyle): ReactNode;
	link(
		children: string | ReactNode[],
		href: string,
		styles?: TextStyle,
		title?: string,
	): ReactNode;
	image(
		uri: string,
		alt?: string,
		style?: ImageStyle,
		title?: string,
	): ReactNode;
	strong(children: string | ReactNode[], styles?: TextStyle): ReactNode;
	em(children: string | ReactNode[], styles?: TextStyle): ReactNode;
	codespan(text: string, styles?: TextStyle): ReactNode;
	br(): ReactNode;
	del(children: string | ReactNode[], styles?: TextStyle): ReactNode;
	text(text: string | ReactNode[], styles?: TextStyle): ReactNode;
	html(text: string | ReactNode[], styles?: TextStyle): ReactNode;
	linkImage(
		href: string,
		imageUrl: string,
		alt?: string,
		style?: ImageStyle,
		title?: string | null,
	): ReactNode;
	table(
		header: ReactNode[][],
		rows: ReactNode[][][],
		tableStyle?: ViewStyle,
		rowStyle?: ViewStyle,
		cellStyle?: ViewStyle,
	): ReactNode;
}
