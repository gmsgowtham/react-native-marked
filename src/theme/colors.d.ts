import type { ColorValue } from "react-native";
export interface ColorsPropType {
	code: ColorValue;
	link: ColorValue;
	text: ColorValue;
	border: ColorValue;
	/**
	 * @deprecated Use flatlist containerStyle or style prop for setting background color
	 */
	background?: ColorValue;
}
declare const colors: Record<"light" | "dark", ColorsPropType>;
export default colors;
