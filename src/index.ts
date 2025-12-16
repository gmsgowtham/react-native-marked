import type { Token, Tokens } from "marked";
import {
	Hooks as MarkedHooks,
	Tokenizer as MarkedTokenizer,
	marked,
} from "marked";
import useMarkdown, { type useMarkdownHookOptions } from "./hooks/useMarkdown";
import useMarkdownWithComponents from "./hooks/useMarkdownWithComponents";
import Markdown from "./lib/Markdown";
import type { ReactComponentRegistry } from "./lib/ReactComponentRegistry";
import { ReactComponentRegistryProvider } from "./lib/ReactComponentRegistry";
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
	ReactComponentRegistry,
};

export {
	useMarkdown,
	useMarkdownWithComponents,
	MarkedLexer,
	Renderer,
	MarkedTokenizer,
	MarkedHooks,
	ReactComponentRegistryProvider,
};

export default Markdown;
