import colors from "../colors";
import getStyles from "./../styles";
import type { MarkedStyles } from "../types";

describe("getStyles", () => {
	it("light scheme", () => {
		const styles = getStyles({}, "light");
		expect(styles.text?.color).toBe(colors.light.text);
	});
	it("dark scheme", () => {
		const styles = getStyles({}, "dark");
		expect(styles.text?.color).toBe(colors.dark.text);
	});
	it("default scheme", () => {
		const styles = getStyles({}, null);
		expect(styles.text?.color).toBe(colors.light.text);
	});
	it("user styles, light scheme", () => {
		const styles = getStyles(
			{
				text: {
					color: "#aaa",
					padding: 2,
				},
			},
			"light",
		);
		expect(styles.text?.color).toBe("#aaa");
		expect(styles.text?.padding).toBe(2);
	});
	it("user styles, dark scheme", () => {
		const styles = getStyles(
			{
				text: {
					color: "#aaa",
					padding: 2,
				},
			},
			"dark",
		);
		expect(styles.text?.color).toBe("#aaa");
		expect(styles.text?.padding).toBe(2);
	});
	it("user styles, default scheme", () => {
		const styles = getStyles(
			{
				text: {
					color: "#aaa",
					padding: 2,
				},
			},
			null,
		);
		expect(styles.text?.color).toBe("#aaa");
		expect(styles.text?.padding).toBe(2);
	});
	it("light scheme, custom theme", () => {
		const customColors = {
			background: "#aaa",
			code: "#bbb",
			text: "#ccc",
			link: "#ddd",
			border: "#eee",
		};
		const styles = getStyles({}, "light", { colors: customColors });
		expect(styles.code?.backgroundColor).toBe(customColors.code);
		expect(styles.text?.color).toBe(customColors.text);
		expect(styles.link?.color).toBe(customColors.link);
		expect(styles.hr?.borderBottomColor).toBe(customColors.border);
	});
	it("dark scheme, custom theme", () => {
		const customColors = {
			background: "#aaa",
			code: "#bbb",
			text: "#ccc",
			link: "#ddd",
			border: "#eee",
		};
		const styles = getStyles({}, "dark", { colors: customColors });
		expect(styles.code?.backgroundColor).toBe(customColors.code);
		expect(styles.text?.color).toBe(customColors.text);
		expect(styles.link?.color).toBe(customColors.link);
		expect(styles.hr?.borderBottomColor).toBe(customColors.border);
	});
	it("default scheme, custom theme", () => {
		const customColors = {
			background: "#aaa",
			code: "#bbb",
			text: "#ccc",
			link: "#ddd",
			border: "#eee",
		};
		const styles = getStyles({}, null, { colors: customColors });
		expect(styles.code?.backgroundColor).toBe(customColors.code);
		expect(styles.text?.color).toBe(customColors.text);
		expect(styles.link?.color).toBe(customColors.link);
		expect(styles.hr?.borderBottomColor).toBe(customColors.border);
	});
	it("light scheme, custom theme, spacing", () => {
		const customColors = {
			background: "#aaa",
			code: "#bbb",
			text: "#ccc",
			link: "#ddd",
			border: "#eee",
		};
		const spacing = { xs: 10, s: 20, m: 30, l: 40 };
		const styles = getStyles({}, "light", { spacing, colors: customColors });
		expect(styles.code?.backgroundColor).toBe(customColors.code);
		expect(styles.text?.color).toBe(customColors.text);
		expect(styles.link?.color).toBe(customColors.link);
		expect(styles.hr?.borderBottomColor).toBe(customColors.border);

		expect(styles.h6?.marginVertical).toBe(spacing.xs);
		expect(styles.h1?.paddingBottom).toBe(spacing.s);
		expect(styles.h1?.marginVertical).toBe(spacing.m);
		expect(styles.code?.padding).toBe(spacing.l);
	});
	it("dark scheme, custom theme, spacing", () => {
		const customColors = {
			background: "#aaa",
			code: "#bbb",
			text: "#ccc",
			link: "#ddd",
			border: "#eee",
		};
		const spacing = { xs: 10, s: 20, m: 30, l: 40 };
		const styles = getStyles({}, "dark", { spacing, colors: customColors });
		expect(styles.code?.backgroundColor).toBe(customColors.code);
		expect(styles.text?.color).toBe(customColors.text);
		expect(styles.link?.color).toBe(customColors.link);
		expect(styles.hr?.borderBottomColor).toBe(customColors.border);

		expect(styles.h6?.marginVertical).toBe(spacing.xs);
		expect(styles.h1?.paddingBottom).toBe(spacing.s);
		expect(styles.h1?.marginVertical).toBe(spacing.m);
		expect(styles.code?.padding).toBe(spacing.l);
	});
	it("default scheme, custom theme, spacing", () => {
		const customColors = {
			background: "#aaa",
			code: "#bbb",
			text: "#ccc",
			link: "#ddd",
			border: "#eee",
		};
		const spacing = { xs: 10, s: 20, m: 30, l: 40 };
		const styles = getStyles({}, null, { spacing, colors: customColors });
		expect(styles.code?.backgroundColor).toBe(customColors.code);
		expect(styles.text?.color).toBe(customColors.text);
		expect(styles.link?.color).toBe(customColors.link);
		expect(styles.hr?.borderBottomColor).toBe(customColors.border);

		expect(styles.h6?.marginVertical).toBe(spacing.xs);
		expect(styles.h1?.paddingBottom).toBe(spacing.s);
		expect(styles.h1?.marginVertical).toBe(spacing.m);
		expect(styles.code?.padding).toBe(spacing.l);
	});
	it("user styles, custom theme, spacing", () => {
		const customColors = {
			background: "#aaa",
			code: "#bbb",
			text: "#ccc",
			link: "#ddd",
			border: "#eee",
		};
		const spacing = { xs: 10, s: 20, m: 30, l: 40 };

		const userStyles: MarkedStyles = {
			code: {
				backgroundColor: "#222",
				padding: 4,
			},
			text: {
				color: "#333",
			},
			link: {
				color: "#444",
			},
			hr: {
				borderBottomColor: "#555",
			},
			h1: {
				paddingBottom: 2,
				marginVertical: 3,
			},
			h6: {
				marginVertical: 1,
			},
		};

		const styles = getStyles(userStyles, "light", {
			spacing,
			colors: customColors,
		});
		expect(styles.code?.backgroundColor).toBe("#222");
		expect(styles.text?.color).toBe("#333");
		expect(styles.link?.color).toBe("#444");
		expect(styles.hr?.borderBottomColor).toBe("#555");

		expect(styles.h6?.marginVertical).toBe(1);
		expect(styles.h1?.paddingBottom).toBe(2);
		expect(styles.h1?.marginVertical).toBe(3);
		expect(styles.code?.padding).toBe(4);
	});
});
