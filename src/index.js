import { Tokenizer, marked } from "marked";
import Markdown from "./lib/Markdown";
import Renderer from "./lib/Renderer";
import useMarkdown, {} from "./hooks/useMarkdown";
const MarkedLexer = marked.lexer;
export { Renderer, useMarkdown, Tokenizer as MarkedTokenizer, MarkedLexer };
export default Markdown;
