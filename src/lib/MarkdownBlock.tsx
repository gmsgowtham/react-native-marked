import type { Token } from "marked";
import { memo, type ReactElement, type ReactNode, useMemo } from "react";
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
	// Compare token raw and type to avoid re-render when content unchanged
	// Token objects are new each lexer call, so compare by value
	const prevRaw = (prev.token as { raw?: string }).raw ?? "";
	const nextRaw = (next.token as { raw?: string }).raw ?? "";
	if (prevRaw !== nextRaw) return false;
	if (prev.token.type !== next.token.type) return false;
	return true;
};

const MarkdownBlock = memo(MarkdownBlockComponent, areEqual);

export default MarkdownBlock;
