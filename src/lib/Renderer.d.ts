import React, { type ReactNode } from "react";
import type { TextStyle, ViewStyle, ImageStyle } from "react-native";
import type { RendererInterface } from "./types";
declare class Renderer implements RendererInterface {
	private slugPrefix;
	private slugger;
	private windowWidth;
	constructor();
	paragraph(children: ReactNode[], styles?: ViewStyle): ReactNode;
	blockquote(children: ReactNode[], styles?: ViewStyle): ReactNode;
	heading(text: string | ReactNode[], styles?: TextStyle): ReactNode;
	code(
		text: string,
		_language?: string,
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
	): React.ReactNode;
	custom(
		_identifier: string,
		_raw: string,
		_children: ReactNode[],
		_args: Record<string, unknown>,
	): ReactNode;
	getKey(): string;
	private getTextNode;
	private getViewNode;
	private getBlockquoteNode;
}
export default Renderer;
