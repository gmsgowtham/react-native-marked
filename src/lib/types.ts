import type { ReactNode } from "react";
import type {
	FlatListProps,
	ViewStyle,
	TextStyle,
	ImageStyle,
} from "react-native";
import type { MarkedStyles, UserTheme } from "./../theme/types";
import type { Tokenizer, Tokens } from "marked";

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
	): ReactNode;
	image(uri: string, alt?: string, style?: ImageStyle): ReactNode;
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
	): ReactNode;
	table(
		header: ReactNode[][],
		rows: ReactNode[][][],
		tableStyle?: ViewStyle,
		rowStyle?: ViewStyle,
		cellStyle?: ViewStyle,
	): ReactNode;
}
