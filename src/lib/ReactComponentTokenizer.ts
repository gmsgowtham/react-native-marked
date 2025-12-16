import type { Tokens } from "marked";
import { Tokenizer } from "marked";

const SELF_CLOSING_REGEX = /^<([A-Z][a-zA-Z0-9]*)([^>]*?)\s*\/>/;
const OPENING_TAG_REGEX = /^<([A-Z][a-zA-Z0-9]*)([^>]*)>/;
const PROP_REGEX = /(\w+)(?:=(?:"([^"]*)"|'([^']*)'|\{([^}]*)\}))?/g;

export type ReactComponentProps = Record<string, string | boolean | number>;

export interface ReactComponentToken extends Tokens.HTML {
	componentName: string;
	componentProps: ReactComponentProps;
	componentChildren: string;
}

function parseProps(propsString: string): ReactComponentProps {
	const props: ReactComponentProps = {};
	if (!propsString) return props;

	let match: RegExpExecArray | null;

	match = PROP_REGEX.exec(propsString);
	while (match !== null) {
		const [, propName, doubleQuoted, singleQuoted, braced] = match;
		if (propName) {
			if (doubleQuoted !== undefined) {
				props[propName] = doubleQuoted;
			} else if (singleQuoted !== undefined) {
				props[propName] = singleQuoted;
			} else if (braced !== undefined) {
				const trimmed = braced.trim();
				if (trimmed === "true") {
					props[propName] = true;
				} else if (trimmed === "false") {
					props[propName] = false;
				} else if (!Number.isNaN(Number(trimmed))) {
					props[propName] = Number(trimmed);
				} else {
					props[propName] = trimmed;
				}
			} else {
				props[propName] = true;
			}
		}
		match = PROP_REGEX.exec(propsString);
	}

	PROP_REGEX.lastIndex = 0;
	return props;
}

function findClosingTag(
	src: string,
	componentName: string,
	startIndex: number,
): { endIndex: number; children: string } | null {
	const openingTag = new RegExp(`<${componentName}(?:\\s[^>]*)?>`, "g");
	const closingTag = `</${componentName}>`;

	let depth = 1;
	let currentIndex = startIndex;

	while (depth > 0 && currentIndex < src.length) {
		const closingIndex = src.indexOf(closingTag, currentIndex);
		if (closingIndex === -1) return null;

		openingTag.lastIndex = currentIndex;
		let nestedMatch: RegExpExecArray | null;
		nestedMatch = openingTag.exec(src);
		while (nestedMatch !== null && nestedMatch.index < closingIndex) {
			depth++;
			nestedMatch = openingTag.exec(src);
		}

		depth--;
		if (depth === 0) {
			return {
				endIndex: closingIndex + closingTag.length,
				children: src.slice(startIndex, closingIndex),
			};
		}
		currentIndex = closingIndex + closingTag.length;
	}

	return null;
}

export class ReactComponentTokenizer extends Tokenizer {
	override html(src: string): Tokens.HTML | undefined {
		const selfClosingMatch = SELF_CLOSING_REGEX.exec(src);
		if (selfClosingMatch) {
			const [raw, componentName, propsString] = selfClosingMatch;
			return this.createReactComponentToken(
				raw,
				componentName ?? "",
				propsString ?? "",
				"",
			);
		}

		const openingMatch = OPENING_TAG_REGEX.exec(src);
		if (openingMatch) {
			const [openingTag, componentName, propsString] = openingMatch;
			const result = findClosingTag(
				src,
				componentName ?? "",
				openingTag?.length ?? 0,
			);

			if (result) {
				const raw = src.slice(0, result.endIndex);
				return this.createReactComponentToken(
					raw,
					componentName ?? "",
					propsString ?? "",
					result.children,
				);
			}
		}

		return super.html(src);
	}

	private createReactComponentToken(
		raw: string,
		componentName: string,
		propsString: string,
		children: string,
	): ReactComponentToken {
		return {
			type: "html",
			raw,
			text: raw,
			block: true,
			pre: false,
			componentName,
			componentProps: parseProps(propsString),
			componentChildren: children.trim(),
		};
	}
}

export function isReactComponentToken(
	token: Tokens.HTML,
): token is ReactComponentToken {
	return "componentName" in token && typeof token.componentName === "string";
}

export default ReactComponentTokenizer;
