import { useMemo } from "react";
import { lexer, Tokenizer } from "marked";
import Parser from "../lib/Parser";
import Renderer from "../lib/Renderer";
import getStyles from "./../theme/styles";
const useMarkdown = (value, options) => {
	const styles = useMemo(
		() => getStyles(options?.styles, options?.colorScheme, options?.theme),
		[options?.styles, options?.theme, options?.colorScheme],
	);
	const parser = useMemo(
		() =>
			new Parser({
				styles: styles,
				baseUrl: options?.baseUrl,
				renderer: options?.renderer ?? new Renderer(),
			}),
		[options?.renderer, options?.baseUrl, styles],
	);
	const elements = useMemo(() => {
		const tokens = lexer(value, {
			gfm: true,
			tokenizer: options?.tokenizer,
		});
		return parser.parse(tokens);
	}, [value, parser, options?.tokenizer]);
	return elements;
};
export default useMarkdown;
