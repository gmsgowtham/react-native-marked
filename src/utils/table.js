export const getTableWidthArr = (totalCols, windowWidth) => {
	if (totalCols < 1) {
		return [];
	}
	return Array(totalCols)
		.fill(0)
		.map(() => {
			return Math.floor(windowWidth * (1.3 / 3));
		});
};
export const getTableColAlignmentStyle = (alignment) => {
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
