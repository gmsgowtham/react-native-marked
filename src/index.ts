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
	ReactComponentRegistry,
	RendererInterface,
	Token,
	Tokens,
	useMarkdownHookOptions,
};

export {
	MarkedHooks,
	MarkedLexer,
	MarkedTokenizer,
	ReactComponentRegistryProvider,
	Renderer,
	useMarkdown,
	useMarkdownWithComponents,
};

export default Markdown;
