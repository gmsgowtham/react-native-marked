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

export interface MarkdownProps extends Partial<ParserOptions> {
	value: string;
	flatListProps?: Omit<
		FlatListProps<ReactNode>,
		"data" | "renderItem" | "horizontal"
	>;
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

/**
 * Optional trailing `token` parameter: when present (default flow), renderers
 * can derive stable, content-based React keys from it via `Renderer.getKey(token)`.
 */
export interface RendererInterface {
	paragraph(
		children: ReactNode[],
		styles?: ViewStyle,
		token?: Token,
	): ReactNode;
	blockquote(
		children: ReactNode[],
		styles?: ViewStyle,
		token?: Token,
	): ReactNode;
	heading(
		text: string | ReactNode[],
		styles?: TextStyle,
		depth?: number,
		token?: Token,
	): ReactNode;
	code(
		text: string,
		language?: string,
		containerStyle?: ViewStyle,
		textStyle?: TextStyle,
		token?: Token,
	): ReactNode;
	hr(styles?: ViewStyle, token?: Token): ReactNode;
	listItem(children: ReactNode[], styles?: ViewStyle, token?: Token): ReactNode;
	list(
		ordered: boolean,
		li: ReactNode[],
		listStyle?: ViewStyle,
		textStyle?: TextStyle,
		startIndex?: number,
		token?: Token,
	): ReactNode;
	escape(text: string, styles?: TextStyle, token?: Token): ReactNode;
	link(
		children: string | ReactNode[],
		href: string,
		styles?: TextStyle,
		title?: string,
		token?: Token,
	): ReactNode;
	image(
		uri: string,
		alt?: string,
		style?: ImageStyle,
		title?: string,
		token?: Token,
	): ReactNode;
	strong(
		children: string | ReactNode[],
		styles?: TextStyle,
		token?: Token,
	): ReactNode;
	em(
		children: string | ReactNode[],
		styles?: TextStyle,
		token?: Token,
	): ReactNode;
	codespan(text: string, styles?: TextStyle, token?: Token): ReactNode;
	br(token?: Token): ReactNode;
	del(
		children: string | ReactNode[],
		styles?: TextStyle,
		token?: Token,
	): ReactNode;
	text(
		text: string | ReactNode[],
		styles?: TextStyle,
		token?: Token,
	): ReactNode;
	html(
		text: string | ReactNode[],
		styles?: TextStyle,
		token?: Token,
	): ReactNode;
	linkImage(
		href: string,
		imageUrl: string,
		alt?: string,
		style?: ImageStyle,
		title?: string | null,
		token?: Token,
	): ReactNode;
	table(
		header: ReactNode[][],
		rows: ReactNode[][][],
		tableStyle?: ViewStyle,
		rowStyle?: ViewStyle,
		cellStyle?: ViewStyle,
		token?: Token,
	): ReactNode;
}
