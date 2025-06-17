import React, { type ReactNode } from "react";
import {
	ScrollView,
	View,
	Text,
	TouchableHighlight,
	type TextStyle,
	type ViewStyle,
	type ImageStyle,
	Dimensions,
} from "react-native";
import MarkedList from "@jsamr/react-native-li";
import Disc from "@jsamr/counter-style/presets/disc";
import Decimal from "@jsamr/counter-style/presets/decimal";
import Slugger from "github-slugger";
import MDImage from "./../components/MDImage";
import { onLinkPress } from "../utils/handlers";
import type { RendererInterface } from "./types";
import { getTableWidthArr } from "../utils/table";
import MDSvg from "./../components/MDSvg";
import MDTable from "./../components/MDTable";
import type { Token } from "marked";
import { superFastHash } from "../utils/hash";

class Renderer implements RendererInterface {
	private slugPrefix = "react-native-marked-ele";
	private slugger: Slugger;
	private windowWidth: number;
	constructor() {
		this.slugger = new Slugger();
		const { width } = Dimensions.get("window");
		this.windowWidth = width;
	}

	paragraph(
		children: ReactNode[],
		styles?: ViewStyle,
		token?: Token,
	): ReactNode {
		return this.getViewNode(children, styles, token);
	}

	blockquote(
		children: ReactNode[],
		styles?: ViewStyle,
		token?: Token,
	): ReactNode {
		return this.getBlockquoteNode(children, styles, token);
	}

	heading(
		text: string | ReactNode[],
		styles?: TextStyle,
		_depth?: number,
		token?: Token,
	): ReactNode {
		return this.getTextNode(text, styles, token);
	}

	code(
		text: string,
		_language?: string,
		containerStyle?: ViewStyle,
		textStyle?: TextStyle,
		token?: Token,
	): ReactNode {
		return (
			<ScrollView
				horizontal
				key={this.getKey(token?.type, token?.raw)}
				contentContainerStyle={containerStyle}
			>
				{/*
					Wrapped in View node to avoid the following error
					Error: Cannot add a child that doesn't have a YogaNode to a parent without a measure function!
					ref: https://github.com/facebook/react-native/issues/18773
				*/}
				<View>{this.getTextNode(text, textStyle, token)}</View>
			</ScrollView>
		);
	}

	hr(styles?: ViewStyle): ReactNode {
		return this.getViewNode(null, styles);
	}

	listItem(
		children: ReactNode[],
		styles?: ViewStyle,
		token?: Token,
	): ReactNode {
		return this.getViewNode(children, styles, token);
	}

	list(
		ordered: boolean,
		li: ReactNode[],
		listStyle?: ViewStyle,
		textStyle?: TextStyle,
		startIndex?: number,
	): ReactNode {
		return (
			<MarkedList
				counterRenderer={ordered ? Decimal : Disc}
				markerTextStyle={textStyle}
				markerBoxStyle={listStyle}
				key={this.getKey()}
				startIndex={startIndex}
			>
				{li.map((node) => node)}
			</MarkedList>
		);
	}

	escape(text: string, styles?: TextStyle): ReactNode {
		return this.getTextNode(text, styles);
	}

	link(
		children: string | ReactNode[],
		href: string,
		styles?: TextStyle,
		token?: Token,
	): ReactNode {
		return (
			<Text
				selectable
				accessibilityRole="link"
				accessibilityHint="Opens in a new window"
				key={this.getKey(token?.type, token?.raw)}
				onPress={onLinkPress(href)}
				style={styles}
			>
				{children}
			</Text>
		);
	}

	image(
		uri: string,
		alt?: string,
		style?: ImageStyle,
		token?: Token,
	): ReactNode {
		const key = this.getKey(token?.type, token?.raw);
		if (uri.endsWith(".svg")) {
			return <MDSvg uri={uri} key={key} />;
		}
		return <MDImage key={key} uri={uri} alt={alt} style={style} />;
	}

	strong(
		children: string | ReactNode[],
		styles?: TextStyle,
		token?: Token,
	): ReactNode {
		return this.getTextNode(children, styles, token);
	}

	em(
		children: string | ReactNode[],
		styles?: TextStyle,
		token?: Token,
	): ReactNode {
		return this.getTextNode(children, styles, token);
	}

	codespan(text: string, styles?: TextStyle, token?: Token): ReactNode {
		return this.getTextNode(text, styles, token);
	}

	br(): ReactNode {
		return this.getTextNode("\n", {});
	}

	del(
		children: string | ReactNode[],
		styles?: TextStyle,
		token?: Token,
	): ReactNode {
		return this.getTextNode(children, styles, token);
	}

	text(
		text: string | ReactNode[],
		styles?: TextStyle,
		token?: Token,
	): ReactNode {
		return this.getTextNode(text, styles, token);
	}

	html(
		text: string | ReactNode[],
		styles?: TextStyle,
		token?: Token,
	): ReactNode {
		return this.getTextNode(text, styles, token);
	}

	linkImage(
		href: string,
		imageUrl: string,
		alt?: string,
		style?: ImageStyle,
		token?: Token,
	): ReactNode {
		const imageNode = this.image(imageUrl, alt, style);
		return (
			<TouchableHighlight
				accessibilityRole="link"
				accessibilityHint="Opens in a new window"
				onPress={onLinkPress(href)}
				key={this.getKey(token?.type, token?.raw)}
			>
				{imageNode}
			</TouchableHighlight>
		);
	}

	table(
		header: ReactNode[][],
		rows: ReactNode[][][],
		tableStyle?: ViewStyle,
		rowStyle?: ViewStyle,
		cellStyle?: ViewStyle,
	): React.ReactNode {
		const widthArr = getTableWidthArr(header.length, this.windowWidth);
		const { borderWidth, borderColor } = tableStyle || {};
		return (
			<MDTable
				header={header}
				rows={rows}
				widthArr={widthArr}
				rowStyle={rowStyle}
				cellStyle={cellStyle}
				borderColor={borderColor as string}
				borderWidth={borderWidth}
			/>
		);
	}

	getKey(type = "", text = ""): string {
		if (!type && !text) return this.slugger.slug(this.slugPrefix);

		const hash = superFastHash(type + text);
		return String(hash);
	}

	private getTextNode(
		children: string | ReactNode[],
		styles?: TextStyle,
		token?: Token,
	): ReactNode {
		return (
			<Text
				selectable
				key={this.getKey(token?.type, token?.raw)}
				style={styles}
			>
				{children}
			</Text>
		);
	}

	private getViewNode(
		children: ReactNode[] | null,
		styles?: ViewStyle,
		token?: Token,
	): ReactNode {
		return (
			<View key={this.getKey(token?.type, token?.raw)} style={styles}>
				{children}
			</View>
		);
	}

	private getBlockquoteNode(
		children: ReactNode[],
		styles?: ViewStyle,
		token?: Token,
	): ReactNode {
		return (
			<View key={this.getKey(token?.type, token?.raw)} style={styles}>
				{children}
			</View>
		);
	}
}

export default Renderer;
