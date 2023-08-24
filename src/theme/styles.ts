import { StyleSheet, type ColorSchemeName } from "react-native";
import spacing from "./spacing";
import colors, { type ColorsPropType } from "./colors";
import type { MarkedStyles, UserTheme } from "./types";

const getFontStyles = (mdColors: ColorsPropType, fontFamily?: string) => {
	return StyleSheet.create({
		regular: {
			fontFamily: fontFamily,
			fontSize: 16,
			lineHeight: 24,
			color: mdColors.text,
		},
		heading: {
			fontFamily: fontFamily,
			fontWeight: "500",
			color: mdColors.text,
		},
	});
};

const getStyles = (
	userStyles?: MarkedStyles,
	colorScheme?: ColorSchemeName,
	userTheme?: UserTheme,
): MarkedStyles => {
	const mdColors = { ...colors[colorScheme || "light"], ...userTheme?.colors };
	const mdSpacing = { ...spacing, ...userTheme?.spacing };

	const fontStyle = getFontStyles(mdColors, userTheme?.fontFamily);
	const defaultStyles = StyleSheet.create<MarkedStyles>({
		em: {
			...fontStyle.regular,
			fontStyle: "italic",
		},
		strong: {
			...fontStyle.regular,
			fontWeight: "bold",
		},
		strikethrough: {
			...fontStyle.regular,
			textDecorationLine: "line-through",
			textDecorationStyle: "solid",
		},
		text: {
			...fontStyle.regular,
		},
		paragraph: {
			...fontStyle.regular,
			paddingVertical: mdSpacing.m,
		},
		link: {
			...fontStyle.regular,
			fontStyle: "italic",
			color: mdColors.link,
		},
		blockquote: {
			borderLeftColor: mdColors.border,
			paddingLeft: mdSpacing.l,
			borderLeftWidth: mdSpacing.s,
			opacity: 0.8,
		},
		h1: {
			fontFamily: userTheme?.fontFamily,
			fontSize: 32,
			lineHeight: 40,
			fontWeight: "bold",
			marginVertical: mdSpacing.m,
			letterSpacing: 0,
			paddingBottom: mdSpacing.s,
			borderBottomColor: mdColors.border,
			borderBottomWidth: 1,
		},
		h2: {
			...fontStyle.heading,
			fontSize: 28,
			lineHeight: 36,
			marginVertical: mdSpacing.m,
			paddingBottom: mdSpacing.s,
			borderBottomColor: mdColors.border,
			borderBottomWidth: 1,
		},
		h3: {
			...fontStyle.heading,
			fontSize: 24,
			lineHeight: 32,
			marginVertical: mdSpacing.s,
		},
		h4: {
			...fontStyle.heading,
			fontSize: 22,
			lineHeight: 28,
			marginVertical: mdSpacing.s,
		},
		h5: {
			...fontStyle.regular,
			...fontStyle.heading,
			marginVertical: mdSpacing.xs,
		},
		h6: {
			...fontStyle.heading,
			fontSize: 14,
			lineHeight: 20,
			marginVertical: mdSpacing.xs,
		},
		codespan: {
			...fontStyle.regular,
			fontStyle: "italic",
			backgroundColor: mdColors.code,
			fontWeight: "300",
		},
		code: {
			padding: mdSpacing.l,
			backgroundColor: mdColors.code,
			minWidth: "100%",
		},
		hr: {
			borderBottomWidth: 1,
			borderBottomColor: mdColors.border,
			marginVertical: mdSpacing.s,
		},
		li: {
			...fontStyle.regular,
			flexShrink: 1,
		},
		image: {
			resizeMode: "cover",
		},
		table: {
			borderWidth: 1,
			borderColor: mdColors.border,
		},
		tableRow: {
			flexDirection: "row",
		},
		tableCell: {
			padding: mdSpacing.s,
		},
	});

	return {
		...defaultStyles,
		...userStyles,
	};
};

export default getStyles;
