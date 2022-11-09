export type ColorKeysType = "background" | "code" | "link" | "text" | "border";
export type ColorsPropType = Record<ColorKeysType, string>;

const colors: Record<"light" | "dark", ColorsPropType> = {
	light: {
		background: "#ffffff",
		code: "#f6f8fa",
		link: "#58a6ff",
		text: "#333333",
		border: "#d0d7de",
	},
	dark: {
		background: "#000000",
		code: "#161b22",
		link: "#58a6ff",
		text: "#ffffff",
		border: "#30363d",
	},
};

export default colors;
