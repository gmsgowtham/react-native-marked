import Markdown from "./lib/Markdown";
import Renderer from "./lib/Renderer";
import useMarkdown, { type useMarkdownHookOptions } from "./hooks/useMarkdown";
import type {
	MarkdownProps,
	ParserOptions,
	RendererInterface,
} from "./lib/types";

export type {
	MarkdownProps,
	ParserOptions,
	RendererInterface,
	useMarkdownHookOptions,
};
export { Renderer, useMarkdown };
export default Markdown;
