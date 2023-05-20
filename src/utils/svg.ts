import type { ElementNode } from "svg-parser";
import { parse } from "svg-parser";

export const getSvgDimensions = (svg: string) => {
	const parsed = parse(svg);

	const rootChild = parsed.children[0] as ElementNode;

	return {
		width: parseInt(String(rootChild.properties?.width ?? "0")),
		height: parseInt(String(rootChild.properties?.height ?? "0")),
		viewBox: String(rootChild.properties?.viewBox ?? ""),
	};
};
