import { StyleSheet, type ColorSchemeName } from "react-native";
import spacing from "./spacing";
import colors, { type ColorsPropType } from "./colors";
import type { MarkedStyles, UserTheme } from "./types";

const getFontStyles = (mdColors: ColorsPropType) => {
	return StyleSheet.create({
		regular: {
			fontSize: 16,
			lineHeight: 24,
			color: mdColors.text,
		},
		heading: {
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

	const fontStyle = getFontStyles(mdColors);
	return StyleSheet.create<MarkedStyles>({
		em: StyleSheet.flatten([
			fontStyle.regular,
			{
				fontStyle: "italic",
			},
			userStyles?.em,
		]),
		strong: StyleSheet.flatten([
			fontStyle.regular,
			{
				fontWeight: "bold",
			},
			userStyles?.strong,
		]),
		strikethrough: StyleSheet.flatten([
			fontStyle.regular,
			{
				textDecorationLine: "line-through",
				textDecorationStyle: "solid",
			},
			userStyles?.strikethrough,
		]),
		text: StyleSheet.flatten([fontStyle.regular, userStyles?.text]),
		paragraph: StyleSheet.flatten([
			fontStyle.regular,
			{
				paddingVertical: mdSpacing.m,
			},
			userStyles?.paragraph,
		]),
		link: StyleSheet.flatten([
			fontStyle.regular,
			{
				fontStyle: "italic",
				color: mdColors.link,
			},
			userStyles?.link,
		]),
		blockquote: StyleSheet.flatten([
			{
				borderLeftColor: mdColors.border,
				paddingLeft: mdSpacing.l,
				borderLeftWidth: mdSpacing.s,
				opacity: 0.8,
			},
			userStyles?.blockquote,
		]),
		h1: StyleSheet.flatten([
			fontStyle.heading,
			{
				fontSize: 32,
				lineHeight: 40,
				fontWeight: "bold",
				marginVertical: mdSpacing.m,
				letterSpacing: 0,
				paddingBottom: mdSpacing.s,
				borderBottomColor: mdColors.border,
				borderBottomWidth: 1,
			},
			userStyles?.h1,
		]),
		h2: StyleSheet.flatten([
			fontStyle.heading,
			{
				fontSize: 28,
				lineHeight: 36,
				marginVertical: mdSpacing.m,
				paddingBottom: mdSpacing.s,
				borderBottomColor: mdColors.border,
				borderBottomWidth: 1,
			},
			userStyles?.h2,
		]),
		h3: StyleSheet.flatten([
			fontStyle.heading,
			{
				fontSize: 24,
				lineHeight: 32,
				marginVertical: mdSpacing.s,
			},
			userStyles?.h3,
		]),
		h4: StyleSheet.flatten([
			fontStyle.heading,
			{
				fontSize: 22,
				lineHeight: 28,
				marginVertical: mdSpacing.s,
			},
			userStyles?.h4,
		]),
		h5: StyleSheet.flatten([
			fontStyle.regular,
			fontStyle.heading,
			{
				marginVertical: mdSpacing.xs,
			},
			userStyles?.h5,
		]),
		h6: StyleSheet.flatten([
			fontStyle.heading,
			{
				fontSize: 14,
				lineHeight: 20,
				marginVertical: mdSpacing.xs,
			},
			userStyles?.h6,
		]),
		codespan: StyleSheet.flatten([
			fontStyle.regular,
			{
				fontStyle: "italic",
				backgroundColor: mdColors.code,
				fontWeight: "300",
			},
			userStyles?.codespan,
		]),
		code: StyleSheet.flatten([
			{
				padding: mdSpacing.l,
				backgroundColor: mdColors.code,
				minWidth: "100%",
			},
			userStyles?.code,
		]),
		hr: StyleSheet.flatten([
			{
				borderBottomWidth: 1,
				borderBottomColor: mdColors.border,
				marginVertical: mdSpacing.s,
			},
			userStyles?.hr,
		]),
		li: StyleSheet.flatten([
			fontStyle.regular,
			{
				flexShrink: 1,
			},
			userStyles?.li,
		]),
		image: StyleSheet.flatten([
			{
				resizeMode: "cover",
			},
			userStyles?.image,
		]),
		table: StyleSheet.flatten([
			{
				borderWidth: 1,
				borderColor: mdColors.border,
			},
			userStyles?.table,
		]),
		tableRow: StyleSheet.flatten([
			{
				flexDirection: "row",
			},
			userStyles?.tableRow,
		]),
		tableCell: StyleSheet.flatten([
			{
				padding: mdSpacing.s,
			},
			userStyles?.tableCell,
		]),
	});
};

export default getStyles;
