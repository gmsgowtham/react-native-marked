import { getTableColAlignmentStyle, getTableWidthArr } from "./../table";

describe("getTableWidthArr", () => {
	const windowWidth = 360;
	const colWidth = Math.floor(360 * (1.3 / 3));
	it("negative", () => {
		expect(getTableWidthArr(-2, windowWidth)).toStrictEqual([]);
	});
	it("zero", () => {
		expect(getTableWidthArr(0, windowWidth)).toStrictEqual([]);
	});
	it("positive", () => {
		expect(getTableWidthArr(2, windowWidth)).toStrictEqual(
			Array(2).fill(colWidth),
		);
	});
	it("random", () => {
		const random = Math.floor(100 * Math.random());
		expect(getTableWidthArr(random, windowWidth)).toStrictEqual(
			Array(random).fill(colWidth),
		);
	});
});

describe("getTableColAlignmentStyle", () => {
	it("center", () => {
		expect(getTableColAlignmentStyle("center")).toStrictEqual({
			textAlign: "center",
		});
	});
	it("left", () => {
		expect(getTableColAlignmentStyle("left")).toStrictEqual({
			textAlign: "left",
		});
	});
	it("right", () => {
		expect(getTableColAlignmentStyle("right")).toStrictEqual({
			textAlign: "right",
		});
	});
	it("undefined", () => {
		expect(getTableColAlignmentStyle()).toStrictEqual({
			textAlign: "left",
		});
	});
	it("null", () => {
		expect(getTableColAlignmentStyle(null)).toStrictEqual({
			textAlign: "left",
		});
	});
});
