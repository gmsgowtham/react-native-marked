import type { Token } from "marked";
import { memo, type ReactElement, type ReactNode, useMemo } from "react";
import { isSameBlockToken } from "./blockUtils";
import type Parser from "./Parser";

type MarkdownBlockProps = {
	token: Token;
	parser: Parser;
	blockId: string;
};

const MarkdownBlockComponent = ({
	token,
	parser,
}: MarkdownBlockProps): ReactNode => {
	const element = useMemo(() => {
		const result = parser.parse([token]);
		return (result[0] ?? null) as ReactNode;
	}, [token, parser]);

	if (!element) return null;
	return element as ReactElement;
};

const areEqual = (
	prev: MarkdownBlockProps,
	next: MarkdownBlockProps,
): boolean => {
	if (prev.blockId !== next.blockId) return false;
	if (prev.parser !== next.parser) return false;
	// Compare token value (not identity): token objects are recreated on
	// every lexer call, so identity comparison would never bail out.
	return isSameBlockToken(prev.token, next.token);
};

const MarkdownBlock = memo(MarkdownBlockComponent, areEqual);

export default MarkdownBlock;
