import type { ReactNode } from "react";
import type { TextStyle, ViewStyle, ImageStyle } from "react-native";
import type { marked } from "marked";
import { decode } from "html-entities";
import type { MarkedStyles } from "../theme/types";
import type { RendererInterface, ParserOptions, Token } from "./types";
import { getValidURL } from "./../utils/url";
import { getTableColAlignmentStyle } from "./../utils/table";
import React from "react";

class Parser {
	private renderer: RendererInterface;
	private styles: MarkedStyles;
	private headingStylesMap: Record<number, TextStyle | undefined>;
	private baseUrl: string;

	constructor(options: ParserOptions) {
		this.styles = { ...options.styles };
		this.baseUrl = options.baseUrl ?? "";
		this.renderer = options.renderer;
		this.headingStylesMap = {
			1: this.styles.h1,
			2: this.styles.h2,
			3: this.styles.h3,
			4: this.styles.h4,
			5: this.styles.h5,
			6: this.styles.h6,
		};
	}

	parse(tokens: Token[]) {
		return this._parse(tokens);
	}

	private _parse(tokens: Token[], styles?: ViewStyle | TextStyle | ImageStyle) {
		const elements: ReactNode[] = tokens.map((token, index) => {
			const element = this._parseToken(token, styles);
			if (React.isValidElement(element)) {
				return React.cloneElement(element, { key: `token-${index}` });
			}
			return element;
		});

		return elements.filter((element) => element !== null);
	}

	private _parseToken(
		token: Token,
		styles?: ViewStyle | TextStyle | ImageStyle,
	): ReactNode {
		switch (token.type) {
			case "paragraph": {
				const children = this.getNormalizedSiblingNodesForBlockAndInlineTokens(
					token.tokens,
					this.styles.text,
				);

				return this.renderer.paragraph(children, this.styles.paragraph);
			}
			case "blockquote": {
				const children = this.parse(token.tokens);
				return this.renderer.blockquote(children, this.styles.blockquote);
			}
			case "heading": {
				const styles = this.headingStylesMap[token.depth];

				if (this.hasDuplicateTextChildToken(token)) {
					return this.renderer.heading(token.text, styles, token.depth);
				}

				const children = this._parse(token.tokens, styles);
				return this.renderer.heading(children, styles, token.depth);
			}
			case "code": {
				return this.renderer.code(
					token.text,
					token.lang,
					this.styles.code,
					this.styles.em,
				);
			}
			case "hr": {
				return this.renderer.hr(this.styles.hr);
			}
			case "list": {
				let startIndex = Number.parseInt(token.start.toString());
				if (Number.isNaN(startIndex)) {
					startIndex = 1;
				}
				const li = token.items.map((item) => {
					const children = item.tokens.flatMap((cItem) => {
						if (cItem.type === "text") {
							/* getViewNode since tokens could contain a block like elements (i.e. img) */
							const childTokens = (cItem as marked.Tokens.Text).tokens || [];
							const listChildren =
								this.getNormalizedSiblingNodesForBlockAndInlineTokens(
									childTokens,
									this.styles.li,
								);
							// return this.renderer.listItem(listChildren, this.styles.li);
							return listChildren;
						}

						/* Parse the nested token */
						return this._parseToken(cItem);
					});

					return this.renderer.listItem(children, this.styles.li);
				});

				return this.renderer.list(
					token.ordered,
					li,
					this.styles.list,
					this.styles.li,
					startIndex,
				);
			}
			case "escape": {
				return this.renderer.escape(token.text, {
					...this.styles.text,
					...styles,
				});
			}
			case "link": {
				// Don't render anchors without text and children
				if (token.text.trim.length < 1 && token.tokens.length < 1) {
					return null;
				}

				// Note: Linking Images (https://www.markdownguide.org/basic-syntax/#linking-images) are wrapped
				// in paragraph token, so will be handled via `getNormalizedSiblingNodesForBlockAndInlineTokens`
				const linkStyle = {
					...this.styles.link,
					...styles,
					// To override color and fontStyle properties
					color: this.styles.link?.color,
					fontStyle: this.styles.link?.fontStyle,
				};
				const href = getValidURL(this.baseUrl, token.href);

				if (this.hasDuplicateTextChildToken(token)) {
					return this.renderer.link(token.text, href, linkStyle);
				}

				const children = this._parse(token.tokens, linkStyle);
				return this.renderer.link(children, href, linkStyle);
			}
			case "image": {
				return this.renderer.image(
					token.href,
					token.text || token.title,
					this.styles.image,
				);
			}
			case "strong": {
				const boldStyle = {
					...this.styles.strong,
					...styles,
				};
				if (this.hasDuplicateTextChildToken(token)) {
					return this.renderer.strong(token.text, boldStyle);
				}

				const children = this._parse(token.tokens, boldStyle);
				return this.renderer.strong(children, boldStyle);
			}
			case "em": {
				const italicStyle = {
					...this.styles.em,
					...styles,
				};
				if (this.hasDuplicateTextChildToken(token)) {
					return this.renderer.em(token.text, italicStyle);
				}

				const children = this._parse(token.tokens, italicStyle);
				return this.renderer.em(children, italicStyle);
			}
			case "codespan": {
				return this.renderer.codespan(decode(token.text), {
					...this.styles.codespan,
					...styles,
				});
			}
			case "br": {
				return this.renderer.br();
			}
			case "del": {
				const strikethroughStyle = {
					...this.styles.strikethrough,
					...styles,
				};
				if (this.hasDuplicateTextChildToken(token)) {
					return this.renderer.del(token.text, strikethroughStyle);
				}

				const children = this._parse(token.tokens, strikethroughStyle);
				return this.renderer.del(children, strikethroughStyle);
			}
			case "text":
				return this.renderer.text(token.raw, {
					...this.styles.text,
					...styles,
				});
			case "html": {
				console.warn(
					"react-native-marked: rendering html from markdown is not supported",
				);
				return this.renderer.html(token.raw, {
					...this.styles.text,
					...styles,
				});
			}
			case "table": {
				const header = token.header.map((row, i) =>
					this._parse(row.tokens, {
						...getTableColAlignmentStyle(token.align[i]),
					}),
				);

				const rows = token.rows.map((cols) =>
					cols.map((col, i) =>
						this._parse(col.tokens, {
							...getTableColAlignmentStyle(token.align[i]),
						}),
					),
				);

				return this.renderer.table(
					header,
					rows,
					this.styles.table,
					this.styles.tableRow,
					this.styles.tableCell,
				);
			}
			case "custom": {
				const children = this._parse(token.tokens ?? []);
				return this.renderer.custom(
					token.identifier,
					token.raw,
					children,
					token.args,
				);
			}
			default: {
				return null;
			}
		}
	}

	private getNormalizedSiblingNodesForBlockAndInlineTokens(
		tokens: Token[],
		textStyle?: TextStyle,
	): ReactNode[] {
		let tokenRenderQueue: Token[] = [];
		const siblingNodes: ReactNode[] = [];
		for (const t of tokens) {
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
				const parsed = this._parse(tokenRenderQueue);
				if (parsed.length > 0) {
					siblingNodes.push(this.renderer.text(parsed, textStyle));
				}

				// Render the current block token
				if (t.type === "image") {
					siblingNodes.push(this._parseToken(t));
				} else if (t.type === "link") {
					const imageToken = t.tokens[0] as marked.Tokens.Image;
					const href = getValidURL(this.baseUrl, t.href);
					siblingNodes.push(
						this.renderer.linkImage(
							href,
							imageToken.href,
							imageToken.text || imageToken.title,
							this.styles.image,
						),
					);
				}

				tokenRenderQueue = [];
				continue;
			}
			tokenRenderQueue = [...tokenRenderQueue, t];
		}

		/* Remaining temp tokens if any */
		if (tokenRenderQueue.length > 0) {
			siblingNodes.push(this.renderer.text(this.parse(tokenRenderQueue), {}));
		}

		return siblingNodes;
	}

	// To avoid duplicate text node nesting when there are no child tokens with text emphasis (i.e., italic)
	// ref: https://github.com/gmsgowtham/react-native-marked/issues/522
	private hasDuplicateTextChildToken(token: Token): boolean {
		if (!("tokens" in token)) {
			return false;
		}

		if (
			token.tokens &&
			token.tokens.length === 1 &&
			token.tokens[0]?.type === "text"
		) {
			return true;
		}

		return false;
	}
}

export default Parser;
