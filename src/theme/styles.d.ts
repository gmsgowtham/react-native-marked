import type { ColorSchemeName } from "react-native";
import type { MarkedStyles, UserTheme } from "./types";
declare const getStyles: (
	userStyles?: MarkedStyles,
	colorScheme?: ColorSchemeName,
	userTheme?: UserTheme,
) => MarkedStyles;
export default getStyles;
