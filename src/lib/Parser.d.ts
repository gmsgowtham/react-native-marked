import type { ReactNode } from "react";
import type { Token } from "marked";
import type { ParserOptions } from "./types";
declare class Parser {
	private renderer;
	private styles;
	private headingStylesMap;
	private baseUrl;
	constructor(options: ParserOptions);
	parse(tokens?: Token[]): ReactNode[];
	private _parse;
	private _parseToken;
	private getNormalizedSiblingNodesForBlockAndInlineTokens;
	private hasDuplicateTextChildToken;
}
export default Parser;
