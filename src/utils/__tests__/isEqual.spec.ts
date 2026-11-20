import isEqual from "../isEqual";

describe("isEqual", () => {
	it("matches identical references and primitives", () => {
		const obj = { a: 1 };
		expect(isEqual(obj, obj)).toBe(true);
		expect(isEqual(1, 1)).toBe(true);
		expect(isEqual("x", "x")).toBe(true);
		expect(isEqual(null, null)).toBe(true);
	});

	it("rejects different primitives", () => {
		expect(isEqual(1, 2)).toBe(false);
		expect(isEqual("x", "y")).toBe(false);
		expect(isEqual(1, "1")).toBe(false);
		expect(isEqual(null, 1)).toBe(false);
	});

	it("compares arrays element-wise", () => {
		expect(isEqual([1, { a: 2 }], [1, { a: 2 }])).toBe(true);
		expect(isEqual([1, 2], [2, 1])).toBe(false);
		expect(isEqual([1], [1, 2])).toBe(false);
		expect(isEqual([1], "not-array")).toBe(false);
	});

	it("compares plain objects unordered by key list", () => {
		expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
		expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
		expect(isEqual({ a: 1 }, { b: 1 })).toBe(false);
	});

	it("compares nested structures", () => {
		expect(
			isEqual({ list: [1, { deep: "x" }] }, { list: [1, { deep: "x" }] }),
		).toBe(true);
	});

	it("falls back to reference equality for non-plain objects", () => {
		const map = new Map();
		expect(isEqual(map, new Map())).toBe(false);
		expect(isEqual(map, map)).toBe(true);
		expect(isEqual(new Date(), new Date(0))).toBe(false);
	});

	it("treats functions by reference", () => {
		const f = () => "x";
		const g = () => "x";
		expect(isEqual(f, f)).toBe(true);
		expect(isEqual({ fn: f }, { fn: f })).toBe(true);
		expect(isEqual({ fn: f }, { fn: g })).toBe(false);
	});
});
