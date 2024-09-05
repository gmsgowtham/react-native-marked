import { Tokenizer, marked } from "marked";
import Markdown from "./lib/Markdown";
import Renderer from "./lib/Renderer";
import useMarkdown, { type useMarkdownHookOptions } from "./hooks/useMarkdown";
import type {
	MarkdownProps,
	ParserOptions,
	RendererInterface,
	// CustomToken,
} from "./lib/types";

const MarkedLexer = marked.lexer;

export type {
	MarkdownProps,
	ParserOptions,
	RendererInterface,
	useMarkdownHookOptions,
	// CustomToken,
};

export { Renderer, useMarkdown, Tokenizer as MarkedTokenizer, MarkedLexer };
export default Markdown;
