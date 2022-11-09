import { getValidURL } from "../url";

describe("getValidURL", () => {
	it("abs with http prefix", () => {
		expect(
			getValidURL("https://www.example.com", "http://www.example.com/path"),
		).toBe("http://www.example.com/path");
	});
	it("abs with https prefix", () => {
		expect(
			getValidURL("https://www.example.com", "https://www.example.com/path"),
		).toBe("https://www.example.com/path");
	});
	it("abs with no prefix", () => {
		expect(getValidURL("https://www.example.com", "/path")).toBe(
			"https://www.example.com/path",
		);
	});
	it("relative with no prefix", () => {
		expect(getValidURL("https://www.example.com", "path")).toBe(
			"https://www.example.com/path",
		);
	});
	it("prefix with trailing slash", () => {
		expect(getValidURL("https://www.example.com/", "path")).toBe(
			"https://www.example.com/path",
		);
	});
	it("empty prefix", () => {
		expect(getValidURL("", "path")).toBe("/path");
	});
});
