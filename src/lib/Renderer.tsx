import React, { ReactNode } from "react";
import {
	ScrollView,
	View,
	Text,
	TouchableHighlight,
	TextStyle,
	ViewStyle,
	ImageStyle,
} from "react-native";
import MarkedList from "@jsamr/react-native-li";
import Disc from "@jsamr/counter-style/presets/disc";
import Decimal from "@jsamr/counter-style/presets/decimal";
import { Slugger } from "marked";
import MDImage from "./../components/MDImage";
import { onLinkPress } from "../utils/handlers";
import type { IRenderer } from "./types";

class Renderer implements IRenderer {
	private slugPrefix = "react-native-marked-ele";
	private slugger: Slugger;
	constructor() {
		this.slugger = new Slugger();
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
				<Text style={textStyle}>{text}</Text>
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
	): ReactNode {
		return (
			<MarkedList
				counterRenderer={ordered ? Decimal : Disc}
				markerTextStyle={textStyle}
				markerBoxStyle={listStyle}
				key={this.getKey()}
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
	): ReactNode {
		return (
			<Text
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
		return <MDImage key={this.getKey()} uri={uri} alt={alt} style={style} />;
	}

	strong(children: ReactNode[], styles?: TextStyle): ReactNode {
		return this.getTextNode(children, styles);
	}

	em(children: ReactNode[], styles?: TextStyle): ReactNode {
		return this.getTextNode(children, styles);
	}

	codespan(text: string, styles?: TextStyle): ReactNode {
		return this.getTextNode(text, styles);
	}

	br(): ReactNode {
		return this.getTextNode("\n", {});
	}

	del(children: ReactNode[], styles?: TextStyle): ReactNode {
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

	getKey(): string {
		return this.slugger.slug(this.slugPrefix);
	}

	private getTextNode(
		children: string | ReactNode[],
		styles?: TextStyle,
	): ReactNode {
		return (
			<Text key={this.getKey()} style={styles}>
				{children}
			</Text>
		);
	}

	private getViewNode(
		children: ReactNode[] | null,
		styles?: ViewStyle,
	): ReactNode {
		{
			return (
				<View key={this.getKey()} style={styles}>
					{children}
				</View>
			);
		}
	}

	private getBlockquoteNode(
		children: ReactNode[],
		styles?: ViewStyle,
	): ReactNode {
		{
			return (
				<View key={this.getKey()} style={styles}>
					{children}
				</View>
			);
		}
	}
}

export default Renderer;
