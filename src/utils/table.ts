import type { TextStyle } from "react-native";
import type { TableColAlignment } from "../lib/types";

export const getTableWidthArr = (totalCols: number, windowWidth: number) => {
	if (totalCols < 1) {
		return [];
	}

	return Array(totalCols)
		.fill(0)
		.map(() => {
			return Math.floor(windowWidth * (1.3 / 3));
		});
};

export const getTableColAlignmentStyle = (
	alignment?: TableColAlignment,
): TextStyle => {
	switch (alignment) {
		case "center":
			return { textAlign: "center" };
		case "left":
			return { textAlign: "left" };
		case "right":
			return { textAlign: "right" };
		default:
			return { textAlign: "left" };
	}
};
