import { replaceNewLines } from "./string";

export const isSVGUri = (uri: string): boolean => {
	return uri?.includes(".svg");
};

export const getSvgWidthAndHeightFromString = (svg: string) => {
	const svgProcessed = replaceNewLines(svg, " ");
	const viewBox = getSvgViewBoxFromString(svgProcessed);
	if (viewBox) {
		const viewBoxArr = viewBox.split(" ");
		if (viewBoxArr.length === 4) {
			const height = Number(viewBoxArr.pop()) || 0;
			const width = Number(viewBoxArr.pop()) || 0;
			return {
				width,
				height,
			};
		}
	}

	return {
		width: Number(getSvgAttrValue(svgProcessed, "width") ?? 0),
		height: Number(getSvgAttrValue(svgProcessed, "height") ?? 0),
	};
};

const getSvgViewBoxFromString = (svg: string): string | undefined => {
	const regex =
		/<svg.*?viewBox=["'](-?[\d\.]+[, ]+-?[\d\.]+[, ][\d\.]+[, ][\d\.]+)["']/;
	const matches = svg.match(regex);
	return matches && matches.length >= 2 ? matches[1] : undefined;
};

const getSvgAttrValue = (svg: string, attr: string): string | undefined => {
	const regex = new RegExp(`<svg.*?${attr}="(.*?)"`, "gmi");
	const matches = regex.exec(svg);
	return matches && matches.length >= 2 ? matches[1] : undefined;
};
