import Slugger from "github-slugger";
import type { Token } from "marked";
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
import MDImage from "./../components/MDImage";
import MDList from "./../components/MDList";
import MDSvg from "./../components/MDSvg";
import MDTable from "./../components/MDTable";
import { onLinkPress } from "../utils/handlers";
import hashString from "./../utils/hash";
import { getStableKeyOf } from "./../utils/stableKeys";
import { getTableWidthArr } from "../utils/table";
import type { RendererInterface } from "./types";

export interface RendererOptions {
	/**
	 * Whether Text elements are selectable. Defaults to `true`.
	 */
	selectable?: boolean;
}

class Renderer implements RendererInterface {
	/** Prefix for fallback keys of tokens without pre-assigned stable keys. */
	private slugPrefix = "react-native-marked-ele";
	private slugger: Slugger;
	private windowWidth: number;
	private selectable: boolean;
	constructor(options?: RendererOptions) {
		this.slugger = new Slugger();
		const { width } = Dimensions.get("window");
		this.windowWidth = width;
		this.selectable = options?.selectable ?? true;
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
				key={this.getKey(token)}
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

	hr(styles?: ViewStyle, token?: Token): ReactNode {
		return this.getViewNode(null, styles, token);
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
		token?: Token,
	): ReactNode {
		return (
			<MDList
				key={this.getKey(token)}
				ordered={ordered}
				li={li}
				listStyle={listStyle}
				textStyle={textStyle}
				startIndex={startIndex}
			/>
		);
	}

	escape(text: string, styles?: TextStyle, token?: Token): ReactNode {
		return this.getTextNode(text, styles, token);
	}

	link(
		children: string | ReactNode[],
		href: string,
		styles?: TextStyle,
		title?: string,
		token?: Token,
	): ReactNode {
		return (
			<Text
				selectable={this.selectable}
				accessibilityRole="link"
				accessibilityHint="Opens in a new window"
				accessibilityLabel={title || "Link"}
				key={this.getKey(token, children)}
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
		title?: string,
		token?: Token,
	): ReactNode {
		const key = this.getKey(token);
		if (/\.svg$/i.test(uri.replace(/[?#].*/, ""))) {
			return <MDSvg uri={uri} key={key} alt={alt || title} />;
		}
		return <MDImage key={key} uri={uri} alt={alt || title} style={style} />;
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

	br(token?: Token): ReactNode {
		return this.getTextNode("\n", {}, token);
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
		title?: string | null,
		token?: Token,
	): ReactNode {
		const imageNode = this.image(
			imageUrl,
			alt,
			style,
			title ?? undefined,
			token,
		);
		return (
			<TouchableHighlight
				accessibilityRole="link"
				accessibilityHint="Opens in a new window"
				onPress={onLinkPress(href)}
				key={this.getKey(token)}
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
		token?: Token,
	): React.ReactNode {
		const widthArr = getTableWidthArr(header.length, this.windowWidth);
		const { borderWidth, borderColor } = tableStyle || {};
		return (
			<MDTable
				key={this.getKey(token)}
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

	/**
	 * Returns a React key for a rendered token.
	 *
	 * Priority order:
	 * 1. Stable, content-derived key assigned by `assignStableKeys` (preferred;
	 *    identical tokens keep identical keys across parses → no remounts).
	 * 2. Key derived from the token keys of rendered child elements (`children`
	 *    must be a flat array of already-keyed elements; used for wrapper nodes
	 *    that combine multiple tokens and have no token of their own).
	 * 3. Slugger-based unique counter (fallback; unstable across parses).
	 */
	getKey(token?: Token, children?: ReactNode): string {
		const stableKey = getStableKeyOf(token);
		if (stableKey) return stableKey;

		const childKey = this.getChildKey(children);
		if (childKey) return childKey;

		return this.slugger.slug(this.slugPrefix);
	}

	/**
	 * Derives a stable key from the keys of rendered child elements. Used for
	 * wrapper nodes created from a group of already-keyed tokens (e.g. the
	 * text run before an inline image) so wrappers stay stable across parses.
	 */
	private getChildKey(children?: ReactNode): string {
		if (!children || typeof children === "string") return "";
		if (!Array.isArray(children)) return "";
		let childKeys = "";
		for (const child of children) {
			if (
				React.isValidElement(child) &&
				typeof child.key === "string" &&
				child.key.length > 0
			) {
				childKeys = childKeys.concat(child.key, ",");
			}
		}
		return childKeys ? hashString(childKeys).toString() : "";
	}

	private getTextNode(
		children: string | ReactNode[],
		styles?: TextStyle,
		token?: Token,
	): ReactNode {
		return (
			<Text
				selectable={this.selectable}
				key={this.getKey(token, children)}
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
			<View key={this.getKey(token, children)} style={styles}>
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
			<View key={this.getKey(token, children)} style={styles}>
				{children}
			</View>
		);
	}
}

export default Renderer;
