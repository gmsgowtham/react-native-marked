import React, {} from "react";
import {
	ScrollView,
	View,
	Text,
	TouchableHighlight,
	Dimensions,
} from "react-native";
import MarkedList from "@jsamr/react-native-li";
import Disc from "@jsamr/counter-style/presets/disc";
import Decimal from "@jsamr/counter-style/presets/decimal";
import Slugger from "github-slugger";
import { Table, Cell, TableWrapper } from "react-native-table-component";
import MDImage from "./../components/MDImage";
import { onLinkPress } from "../utils/handlers";
import { getTableWidthArr } from "../utils/table";
import MDSvg from "./../components/MDSvg";
class Renderer {
	slugPrefix = "react-native-marked-ele";
	slugger;
	windowWidth;
	constructor() {
		this.slugger = new Slugger();
		const { width } = Dimensions.get("window");
		this.windowWidth = width;
	}
	paragraph(children, styles) {
		return this.getViewNode(children, styles);
	}
	blockquote(children, styles) {
		return this.getBlockquoteNode(children, styles);
	}
	heading(text, styles) {
		return this.getTextNode(text, styles);
	}
	code(text, _language, containerStyle, textStyle) {
		return React.createElement(
			ScrollView,
			{
				horizontal: true,
				key: this.getKey(),
				contentContainerStyle: containerStyle,
			},
			React.createElement(View, null, this.getTextNode(text, textStyle)),
		);
	}
	hr(styles) {
		return this.getViewNode(null, styles);
	}
	listItem(children, styles) {
		return this.getViewNode(children, styles);
	}
	list(ordered, li, listStyle, textStyle, startIndex) {
		return React.createElement(
			MarkedList,
			{
				counterRenderer: ordered ? Decimal : Disc,
				markerTextStyle: textStyle,
				markerBoxStyle: listStyle,
				key: this.getKey(),
				startIndex: startIndex,
			},
			li.map((node) => node),
		);
	}
	escape(text, styles) {
		return this.getTextNode(text, styles);
	}
	link(children, href, styles) {
		return React.createElement(
			Text,
			{
				selectable: true,
				accessibilityRole: "link",
				accessibilityHint: "Opens in a new window",
				key: this.getKey(),
				onPress: onLinkPress(href),
				style: styles,
			},
			children,
		);
	}
	image(uri, alt, style) {
		const key = this.getKey();
		if (uri.endsWith(".svg")) {
			return React.createElement(MDSvg, { uri: uri, key: key });
		}
		return React.createElement(MDImage, {
			key: key,
			uri: uri,
			alt: alt,
			style: style,
		});
	}
	strong(children, styles) {
		return this.getTextNode(children, styles);
	}
	em(children, styles) {
		return this.getTextNode(children, styles);
	}
	codespan(text, styles) {
		return this.getTextNode(text, styles);
	}
	br() {
		return this.getTextNode("\n", {});
	}
	del(children, styles) {
		return this.getTextNode(children, styles);
	}
	text(text, styles) {
		return this.getTextNode(text, styles);
	}
	html(text, styles) {
		return this.getTextNode(text, styles);
	}
	linkImage(href, imageUrl, alt, style) {
		const imageNode = this.image(imageUrl, alt, style);
		return React.createElement(
			TouchableHighlight,
			{
				accessibilityRole: "link",
				accessibilityHint: "Opens in a new window",
				onPress: onLinkPress(href),
				key: this.getKey(),
			},
			imageNode,
		);
	}
	table(header, rows, tableStyle, rowStyle, cellStyle) {
		const widthArr = getTableWidthArr(header.length, this.windowWidth);
		const { borderWidth, borderColor, ...tableStyleRest } = tableStyle || {};
		return React.createElement(
			ScrollView,
			{ horizontal: true },
			React.createElement(
				Table,
				{ borderStyle: { borderWidth, borderColor }, style: tableStyleRest },
				React.createElement(
					TableWrapper,
					{ style: rowStyle },
					header.map((headerCol, index) => {
						return React.createElement(Cell, {
							width: widthArr[index],
							key: `${index}`,
							data: React.createElement(View, { style: cellStyle }, headerCol),
						});
					}),
				),
				rows.map((rowData, index) => {
					return React.createElement(
						TableWrapper,
						{ key: `${index}`, style: rowStyle },
						rowData.map((cellData, cellIndex) => {
							return React.createElement(Cell, {
								width: widthArr[cellIndex],
								key: `${cellIndex}`,
								data: React.createElement(View, { style: cellStyle }, cellData),
							});
						}),
					);
				}),
			),
		);
	}
	custom(_identifier, _raw, _children, _args) {
		return null;
	}
	getKey() {
		return this.slugger.slug(this.slugPrefix);
	}
	getTextNode(children, styles) {
		return React.createElement(
			Text,
			{ selectable: true, key: this.getKey(), style: styles },
			children,
		);
	}
	getViewNode(children, styles) {
		return React.createElement(
			View,
			{ key: this.getKey(), style: styles },
			children,
		);
	}
	getBlockquoteNode(children, styles) {
		return React.createElement(
			View,
			{ key: this.getKey(), style: styles },
			children,
		);
	}
}
export default Renderer;
