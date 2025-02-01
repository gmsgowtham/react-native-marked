import type { TextStyle } from "react-native";
import type { TableColAlignment } from "../lib/types";
export declare const getTableWidthArr: (
	totalCols: number,
	windowWidth: number,
) => number[];
export declare const getTableColAlignmentStyle: (
	alignment?: TableColAlignment,
) => TextStyle;
