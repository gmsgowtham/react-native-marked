import { Tokenizer as MarkedTokenizer, marked } from "marked";
import type { Token, Tokens } from "marked";
import Markdown from "./lib/Markdown";
import Renderer from "./lib/Renderer";
import useMarkdown, { type useMarkdownHookOptions } from "./hooks/useMarkdown";
import type {
	MarkdownProps,
	ParserOptions,
	RendererInterface,
} from "./lib/types";

const MarkedLexer = marked.lexer;

export type {
	MarkdownProps,
	ParserOptions,
	RendererInterface,
	useMarkdownHookOptions,
	Token,
	Tokens,
};

export { useMarkdown, MarkedLexer, Renderer, MarkedTokenizer };

export default Markdown;
