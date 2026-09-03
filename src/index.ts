import type { Token, Tokens } from "marked";
import {
	Hooks as MarkedHooks,
	Tokenizer as MarkedTokenizer,
	marked,
} from "marked";
import useMarkdown, { type useMarkdownHookOptions } from "./hooks/useMarkdown";
import useMarkdownBlocks, {
	type UseMarkdownBlocksOptions,
} from "./hooks/useMarkdownBlocks";
import useMarkdownWithComponents from "./hooks/useMarkdownWithComponents";
import Markdown from "./lib/Markdown";
import type { ReactComponentRegistry } from "./lib/ReactComponentRegistry";
import { ReactComponentRegistryProvider } from "./lib/ReactComponentRegistry";
import Renderer, { type RendererOptions } from "./lib/Renderer";
import type {
	MarkdownBlock,
	MarkdownProps,
	ParserOptions,
	RendererInterface,
} from "./lib/types";
import type { MarkedStyles } from "./theme/types";

const MarkedLexer = marked.lexer;

export type {
	MarkdownBlock,
	MarkdownProps,
	MarkedStyles,
	ParserOptions,
	ReactComponentRegistry,
	RendererInterface,
	RendererOptions,
	Token,
	Tokens,
	UseMarkdownBlocksOptions,
	useMarkdownHookOptions,
};

export {
	MarkedHooks,
	MarkedLexer,
	MarkedTokenizer,
	ReactComponentRegistryProvider,
	Renderer,
	useMarkdown,
	useMarkdownBlocks,
	useMarkdownWithComponents,
};

export default Markdown;
