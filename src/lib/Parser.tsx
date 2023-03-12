import type { ReactNode } from "react";
import type { TextStyle, ViewStyle, ImageStyle } from "react-native";
import type { marked } from "marked";
import type { MarkedStyles } from "../theme/types";
import type { ParserOptions } from "./types";
import { getValidURL } from "./../utils/url";
import Renderer from "./Renderer";

class Parser {
	#renderer: Renderer;
	#styles: MarkedStyles;
	#headingStylesMap: Record<number, TextStyle | undefined>;
	#baseUrl: string;

	constructor(options: ParserOptions) {
		if (
			typeof options.renderer === "undefined" ||
			!(options.renderer instanceof Renderer)
		) {
			throw new Error("Renderer provided is not valid");
		}

		this.#styles = { ...options.styles };
		this.#baseUrl = options.baseUrl ?? "";
		this.#renderer = options.renderer;
		this.#headingStylesMap = {
			1: this.#styles.h1,
			2: this.#styles.h2,
			3: this.#styles.h3,
			4: this.#styles.h4,
			5: this.#styles.h5,
			6: this.#styles.h6,
		};
	}

	parse = (tokens: marked.Token[]) => {
		return this.#parse(tokens);
	};

	#parse = (
		tokens: marked.Token[],
		styles?: ViewStyle | TextStyle | ImageStyle,
	) => {
		const elements: ReactNode[] = tokens.map((token) => {
			return this.#parseToken(token, styles);
		});
		return elements.filter((element) => element !== null);
	};

	#parseToken = (
		token: marked.Token,
		styles?: ViewStyle | TextStyle | ImageStyle,
	): ReactNode => {
		switch (token.type) {
			case "space": {
				return null;
			}
			case "paragraph": {
				const children = this.#getNormalizedSiblingNodesForBlockAndInlineTokens(
					token.tokens,
					this.#styles.text,
				);

				return this.#renderer.paragraph(children, this.#styles.paragraph);
			}
			case "blockquote": {
				const children = this.#parse(token.tokens);
				return this.#renderer.blockquote(children, this.#styles.blockquote);
			}
			case "heading": {
				const styles = this.#headingStylesMap[token.depth];
				const children = this.#parse(token.tokens, styles);
				return this.#renderer.heading(children, styles);
			}
			case "code": {
				return this.#renderer.code(
					token.text,
					this.#styles.code,
					this.#styles.em,
				);
			}
			case "hr": {
				return this.#renderer.hr(this.#styles.hr);
			}
			case "list": {
				const li = token.items.map((item) => {
					const children = item.tokens.flatMap((cItem) => {
						if (cItem.type === "text") {
							/* getViewNode since tokens could contain a block like elements (i.e. img) */
							const childTokens = (cItem as marked.Tokens.Text).tokens || [];
							const listChildren =
								this.#getNormalizedSiblingNodesForBlockAndInlineTokens(
									childTokens,
									this.#styles.li,
								);
							// return this.#renderer.listItem(listChildren, this.#styles.li);
							return listChildren;
						}

						/* Parse the nested token */
						return this.#parseToken(cItem);
					});

					return this.#renderer.listItem(children, this.#styles.li);
				});

				return this.#renderer.list(
					token.ordered,
					li,
					this.#styles.list,
					this.#styles.li,
				);
			}
			case "escape": {
				return this.#renderer.escape(token.text, {
					...this.#styles.text,
					...styles,
				});
			}
			case "link": {
				// Note: Linking Images (https://www.markdownguide.org/basic-syntax/#linking-images) are wrapped
				// in paragraph token, so will be handled via `getNormalizedSiblingNodesForBlockAndInlineTokens`
				const linkStyle = {
					...styles,
					...this.#styles.link, // To override color property
				};
				const href = getValidURL(this.#baseUrl, token.href);
				const children = this.#parse(token.tokens, linkStyle);
				return this.#renderer.link(children, href, linkStyle);
			}
			case "image": {
				return this.#renderer.image(
					token.href,
					token.text || token.title,
					this.#styles.image,
				);
			}
			case "strong": {
				const boldStyle = {
					...this.#styles.strong,
					...styles,
				};
				const children = this.#parse(token.tokens, boldStyle);
				return this.#renderer.strong(children, boldStyle);
			}
			case "em": {
				const italicStyle = {
					...this.#styles.em,
					...styles,
				};
				const children = this.#parse(token.tokens, italicStyle);
				return this.#renderer.em(children, italicStyle);
			}
			case "codespan": {
				return this.#renderer.codespan(token.text, {
					...this.#styles.codespan,
					...styles,
				});
			}
			case "br": {
				return this.#renderer.br();
			}
			case "del": {
				const strikethroughStyle = {
					...this.#styles.strikethrough,
					...styles,
				};
				const children = this.#parse(token.tokens, strikethroughStyle);
				return this.#renderer.del(children, strikethroughStyle);
			}
			case "text":
				return this.#renderer.text(token.raw, {
					...this.#styles.text,
					...styles,
				});
			case "html": {
				if (token.type === "html") {
					console.warn(
						"react-native-marked: rendering html from markdown is not supported",
					);
				}
				return this.#renderer.html(token.raw, {
					...this.#styles.text,
					...styles,
				});
			}
			// TODO: add 'table' case for custom elements
			default: {
				console.warn(
					`react-native-marked: token with '${token.type}' type was not found.`,
				);
				return null;
			}
		}
	};

	#getNormalizedSiblingNodesForBlockAndInlineTokens = (
		tokens: marked.Token[],
		textStyle?: TextStyle,
	): ReactNode[] => {
		let tokenRenderQueue: marked.Token[] = [];
		const siblingNodes: ReactNode[] = [];
		tokens.forEach((t) => {
			/**
			 * To avoid inlining images
			 * Currently supports images, link images
			 * Note: to be extend for other token types
			 */
			if (
				t.type === "image" ||
				(t.type === "link" &&
					t.tokens &&
					t.tokens[0] &&
					t.tokens[0].type === "image")
			) {
				// Render existing inline tokens in the queue
				const parsed = this.#parse(tokenRenderQueue);
				if (parsed.length > 0) {
					siblingNodes.push(this.#renderer.text(parsed, textStyle));
				}

				// Render the current block token
				if (t.type === "image") {
					siblingNodes.push(this.#parseToken(t));
				} else if (t.type === "link") {
					const imageToken = t.tokens[0] as marked.Tokens.Image;
					const href = getValidURL(this.#baseUrl, t.href);
					siblingNodes.push(
						this.#renderer.linkImage(
							href,
							imageToken.href,
							imageToken.text || imageToken.title,
							this.#styles.image,
						),
					);
				}

				tokenRenderQueue = [];
				return;
			}
			tokenRenderQueue = [...tokenRenderQueue, t];
		});

		/* Remaining temp tokens if any */
		if (tokenRenderQueue.length > 0) {
			siblingNodes.push(this.#renderer.text(this.#parse(tokenRenderQueue), {}));
		}

		return siblingNodes;
	};
}

export default Parser;
