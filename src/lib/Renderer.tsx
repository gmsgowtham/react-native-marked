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
import { Slugger } from "marked";
import { Table, Cell, TableWrapper } from "react-native-table-component";
import MDImage from "./../components/MDImage";
import { onLinkPress } from "../utils/handlers";
import type { RendererInterface } from "./types";
import { getTableWidthArr } from "../utils/table";
import MDSvg from "./../components/MDSvg";

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

	table(
		header: ReactNode[][],
		rows: ReactNode[][][],
		tableStyle?: ViewStyle,
		rowStyle?: ViewStyle,
		cellStyle?: ViewStyle,
	): React.ReactNode {
		const widthArr = getTableWidthArr(header.length, this.windowWidth);
		const { borderWidth, borderColor, ...tableStyleRest } = tableStyle || {};
		return (
			<ScrollView horizontal={true}>
				<Table
					borderStyle={{ borderWidth, borderColor }}
					style={tableStyleRest}
				>
					<TableWrapper style={rowStyle}>
						{header.map((headerCol, index) => {
							return (
								<Cell
									width={widthArr[index]}
									key={`${index}`}
									data={<View style={cellStyle}>{headerCol}</View>}
								/>
							);
						})}
					</TableWrapper>
					{rows.map((rowData, index) => {
						return (
							<TableWrapper key={`${index}`} style={rowStyle}>
								{rowData.map((cellData, cellIndex) => {
									return (
										<Cell
											width={widthArr[cellIndex]}
											key={`${cellIndex}`}
											data={<View style={cellStyle}>{cellData}</View>}
										/>
									);
								})}
							</TableWrapper>
						);
					})}
				</Table>
			</ScrollView>
		);
	}

	custom(
		_identifier: string,
		_text: string,
		_raw: string,
		_children: ReactNode[],
	): ReactNode {
		return null;
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
