import Slugger from "github-slugger";
import React, { type ReactNode } from "react";
import {
	Dimensions,
	type ImageStyle,
	ScrollView,
	Text,
	type TextStyle,
	TouchableHighlight,
	View,
	type ViewStyle,
} from "react-native";
import MDList from "src/components/MDList";
import MDImage from "./../components/MDImage";
import MDSvg from "./../components/MDSvg";
import MDTable from "./../components/MDTable";
import { onLinkPress } from "../utils/handlers";
import { getTableWidthArr } from "../utils/table";
import type { RendererInterface } from "./types";

class Renderer implements RendererInterface {
	private slugPrefix = "react-native-marked-ele";
	private slugger: Slugger;
	private windowWidth: number;
	constructor() {
		this.slugger = new Slugger();
		const { width } = Dimensions.get("window");
		this.windowWidth = width;
	}

	paragraph(children: ReactNode[], styles?: ViewStyle): ReactNode {
		return this.getViewNode(children, styles);
	}

	blockquote(children: ReactNode[], styles?: ViewStyle): ReactNode {
		return this.getBlockquoteNode(children, styles);
	}

	heading(text: string | ReactNode[], styles?: TextStyle): ReactNode {
		return this.getTextNode(text, styles);
	}

	code(
		text: string,
		_language?: string,
		containerStyle?: ViewStyle,
		textStyle?: TextStyle,
	): ReactNode {
		return (
			<ScrollView
				horizontal
				key={this.getKey()}
				contentContainerStyle={containerStyle}
			>
				{/*
					Wrapped in View node to avoid the following error
					Error: Cannot add a child that doesn't have a YogaNode to a parent without a measure function!
					ref: https://github.com/facebook/react-native/issues/18773
				*/}
				<View>{this.getTextNode(text, textStyle)}</View>
			</ScrollView>
		);
	}

	hr(styles?: ViewStyle): ReactNode {
		return this.getViewNode(null, styles);
	}

	listItem(children: ReactNode[], styles?: ViewStyle): ReactNode {
		return this.getViewNode(children, styles);
	}

	list(
		ordered: boolean,
		li: ReactNode[],
		listStyle?: ViewStyle,
		textStyle?: TextStyle,
		startIndex?: number,
	): ReactNode {
		return (
			<MDList
				key={this.getKey()}
				ordered={ordered}
				li={li}
				listStyle={listStyle}
				textStyle={textStyle}
				startIndex={startIndex}
			/>
		);
	}

	escape(text: string, styles?: TextStyle): ReactNode {
		return this.getTextNode(text, styles);
	}

	link(
		children: string | ReactNode[],
		href: string,
		styles?: TextStyle,
	): ReactNode {
		return (
			<Text
				selectable
				accessibilityRole="link"
				accessibilityHint="Opens in a new window"
				key={this.getKey()}
				onPress={onLinkPress(href)}
				style={styles}
			>
				{children}
			</Text>
		);
	}

	image(uri: string, alt?: string, style?: ImageStyle): ReactNode {
		const key = this.getKey();
		if (uri.endsWith(".svg")) {
			return <MDSvg uri={uri} key={key} />;
		}
		return <MDImage key={key} uri={uri} alt={alt} style={style} />;
	}

	strong(children: string | ReactNode[], styles?: TextStyle): ReactNode {
		return this.getTextNode(children, styles);
	}

	em(children: string | ReactNode[], styles?: TextStyle): ReactNode {
		return this.getTextNode(children, styles);
	}

	codespan(text: string, styles?: TextStyle): ReactNode {
		return this.getTextNode(text, styles);
	}

	br(): ReactNode {
		return this.getTextNode("\n", {});
	}

	del(children: string | ReactNode[], styles?: TextStyle): ReactNode {
		return this.getTextNode(children, styles);
	}

	text(text: string | ReactNode[], styles?: TextStyle): ReactNode {
		return this.getTextNode(text, styles);
	}

	html(text: string | ReactNode[], styles?: TextStyle): ReactNode {
		return this.getTextNode(text, styles);
	}

	linkImage(
		href: string,
		imageUrl: string,
		alt?: string,
		style?: ImageStyle,
	): ReactNode {
		const imageNode = this.image(imageUrl, alt, style);
		return (
			<TouchableHighlight
				accessibilityRole="link"
				accessibilityHint="Opens in a new window"
				onPress={onLinkPress(href)}
				key={this.getKey()}
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

	getKey(): string {
		return this.slugger.slug(this.slugPrefix);
	}

	private getTextNode(
		children: string | ReactNode[],
		styles?: TextStyle,
	): ReactNode {
		return (
			<Text selectable key={this.getKey()} style={styles}>
				{children}
			</Text>
		);
	}

	private getViewNode(
		children: ReactNode[] | null,
		styles?: ViewStyle,
	): ReactNode {
		return (
			<View key={this.getKey()} style={styles}>
				{children}
			</View>
		);
	}

	private getBlockquoteNode(
		children: ReactNode[],
		styles?: ViewStyle,
	): ReactNode {
		return (
			<View key={this.getKey()} style={styles}>
				{children}
			</View>
		);
	}
}

export default Renderer;
