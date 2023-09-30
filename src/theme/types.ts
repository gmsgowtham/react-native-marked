import type { ImageStyle, TextStyle, ViewStyle } from "react-native";
import type { ColorsPropType } from "./colors";
import type { SpacingKeysType } from "./spacing";

export interface MarkedStyles {
	em?: TextStyle;
	strong?: TextStyle;
	strikethrough?: TextStyle;
	text?: TextStyle;
	paragraph?: ViewStyle;
	link?: TextStyle;
	blockquote?: ViewStyle;
	h1?: TextStyle;
	h2?: TextStyle;
	h3?: TextStyle;
	h4?: TextStyle;
	h5?: TextStyle;
	h6?: TextStyle;
	codespan?: TextStyle;
	code?: ViewStyle;
	hr?: ViewStyle;
	list?: ViewStyle;
	li?: TextStyle;
	image?: ImageStyle;
	table?: ViewStyle;
	tableRow?: ViewStyle;
	tableCell?: ViewStyle;
}

export interface UserTheme {
	colors?: ColorsPropType;
	spacing?: Record<SpacingKeysType, number>;
}
