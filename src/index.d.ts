import { Tokenizer } from "marked";
import Markdown from "./lib/Markdown";
import Renderer from "./lib/Renderer";
import useMarkdown, { type useMarkdownHookOptions } from "./hooks/useMarkdown";
import type {
	MarkdownProps,
	ParserOptions,
	RendererInterface,
} from "./lib/types";
declare const MarkedLexer: typeof import("marked").Lexer.lex;
export type {
	MarkdownProps,
	ParserOptions,
	RendererInterface,
	useMarkdownHookOptions,
};
export { Renderer, useMarkdown, Tokenizer as MarkedTokenizer, MarkedLexer };
export default Markdown;
