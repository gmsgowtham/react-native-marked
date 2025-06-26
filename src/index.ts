import type { Token, Tokens } from "marked";
import { Tokenizer as MarkedTokenizer, marked } from "marked";
import useMarkdown, { type useMarkdownHookOptions } from "./hooks/useMarkdown";
import Markdown from "./lib/Markdown";
import Renderer from "./lib/Renderer";
import type {
	MarkdownProps,
	ParserOptions,
	RendererInterface,
} from "./lib/types";
import type { MarkedStyles } from "./theme/types";

const MarkedLexer = marked.lexer;

export type {
	MarkdownProps,
	MarkedStyles,
	ParserOptions,
	RendererInterface,
	useMarkdownHookOptions,
	Token,
	Tokens,
};

export { useMarkdown, MarkedLexer, Renderer, MarkedTokenizer };

export default Markdown;
