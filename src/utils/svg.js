import { parse } from "svg-parser";
export const getSvgDimensions = (svg) => {
	const parsed = parse(svg);
	const rootChild = parsed.children[0];
	return {
		width: Number.parseInt(String(rootChild.properties?.width ?? "0")),
		height: Number.parseInt(String(rootChild.properties?.height ?? "0")),
		viewBox: String(rootChild.properties?.viewBox ?? ""),
	};
};
