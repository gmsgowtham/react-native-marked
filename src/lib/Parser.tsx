import type { ReactNode } from 'react';
import type { marked } from 'marked';
import { decode } from 'entities';
import Renderer from './Renderer';
import type { MarkedStyles } from '../theme/types';
import type { CustomStyleProp, ParserOptions, TextStyleProp } from './types';

class Parser {
  private renderer;
  private styles: MarkedStyles;
  private headingStylesMap: Record<number, TextStyleProp>;
  constructor(options: ParserOptions) {
    this.styles = { ...options.styles };
    this.renderer = new Renderer();
    this.headingStylesMap = {
      1: this.styles.h1,
      2: this.styles.h2,
      3: this.styles.h3,
      4: this.styles.h4,
      5: this.styles.h5,
      6: this.styles.h6,
    };
  }

  parse(tokens: marked.Token[]) {
    const elements: ReactNode[] = tokens.map((token) => {
      switch (token.type) {
        case 'space': {
          return null;
        }
        case 'paragraph': {
          const paragraphChildren =
            this.getNormalizedSiblingNodesForBlockAndInlineTokens(
              token.tokens,
              this.styles.text
            );

          return this.renderer.getViewNode(
            paragraphChildren,
            this.styles.paragraph
          );
        }
        case 'blockquote': {
          return this.renderer.getBlockquoteNode(
            this.parse(token.tokens),
            this.styles.blockquote
          );
        }
        case 'heading': {
          const styles = this.headingStylesMap[token.depth] ?? this.styles.text;
          return this.renderer.getTextNode(
            this.parseInline(token.tokens, styles),
            styles
          );
        }
        case 'code': {
          return this.renderer.getCodeBlockNode(
            token.text,
            this.styles.code,
            this.styles.em
          );
        }
        case 'hr': {
          return this.renderer.getViewNode(null, this.styles.hr);
        }
        case 'list': {
          const li = token.items.map((item) => {
            const children = item.tokens.map((cItem) => {
              if (cItem.type === 'text') {
                /* getViewNode since tokens could contain a block like elements (i.e. img) */
                const childTokens = (cItem as marked.Tokens.Text).tokens || [];
                const listChildren =
                  this.getNormalizedSiblingNodesForBlockAndInlineTokens(
                    childTokens,
                    this.styles.li
                  );
                return this.renderer.getViewNode(listChildren, this.styles.li);
              }

              /* Parse the nested token */
              return this.parse([cItem]);
            });
            return this.renderer.getViewNode(children, this.styles.li);
          });
          return this.renderer.getListNode(
            token.ordered,
            li,
            this.styles.list,
            this.styles.li
          );
        }
        default:
          return this.parseInline([token]);
      }
    });
    return elements.filter((element) => element !== null);
  }

  parseInline(tokens: marked.Token[], styles?: CustomStyleProp) {
    const elements: ReactNode[] = tokens.map((token) => {
      if (!token) return null;

      switch (token.type) {
        case 'escape': {
          return this.renderer.getTextNode(token.text, {
            ...this.styles.text,
            ...styles,
          });
        }
        case 'link': {
          if (
            token.tokens &&
            token.tokens[0] &&
            token.tokens[0].type === 'image'
          ) {
            const imageToken = token.tokens[0];
            return this.renderer.getImageLinkNode(
              token.href,
              imageToken.href,
              imageToken.text || imageToken.title
            );
          }

          const linkStyle = {
            ...styles,
            ...this.styles.link, // To override color property
          };
          return this.renderer.getTextLinkNode(
            this.parseInline(token.tokens, linkStyle),
            token.href,
            linkStyle
          );
        }
        case 'image': {
          return this.renderer.getImageNode(
            token.href,
            token.text || token.title
          );
        }
        case 'strong': {
          const boldStyle = {
            ...this.styles.strong,
            ...styles,
          };
          return this.renderer.getTextNode(
            this.parseInline(token.tokens, boldStyle),
            boldStyle
          );
        }
        case 'em': {
          const italicStyle = {
            ...this.styles.em,
            ...styles,
          };
          return this.renderer.getTextNode(
            this.parseInline(token.tokens, italicStyle),
            italicStyle
          );
        }
        case 'codespan': {
          return this.renderer.getTextNode(token.text, {
            ...this.styles.codespan,
            ...styles,
          });
        }
        case 'br': {
          return this.renderer.getTextNode('\n', {});
        }
        case 'del': {
          return null;
        }
        case 'text':
        case 'html': {
          if (token.raw.trim().length < 1) {
            return null;
          }

          return this.renderer.getTextNode(decode(token.raw), {
            ...this.styles.text,
            ...styles,
          });
        }
        default: {
          console.warn(`Token with '${token.type}' type was not found.`);
          return null;
        }
      }
    });
    return elements.filter((element) => element !== null);
  }

  private getNormalizedSiblingNodesForBlockAndInlineTokens = (
    tokens: marked.Token[],
    textStyle: TextStyleProp
  ): ReactNode[] => {
    let tempTokens: marked.Token[] = [];
    const siblingNodes: ReactNode[] = [];
    tokens.forEach((t) => {
      /**
       * To avoid inlining images
       * Currently supports images, link images
       * Note: to be extend for other token types
       */
      if (
        t.type === 'image' ||
        (t.type === 'link' &&
          t.tokens &&
          t.tokens[0] &&
          t.tokens[0].type === 'image')
      ) {
        const parsed = this.parseInline(tempTokens);
        if (parsed.length > 0) {
          siblingNodes.push(this.renderer.getTextNode(parsed, textStyle));
        }

        if (t.type === 'image') {
          siblingNodes.push(this.parseInline([t]));
        } else if (t.type === 'link') {
          const imageToken = t.tokens[0] as marked.Tokens.Image;
          siblingNodes.push(
            this.renderer.getImageLinkNode(
              t.href,
              imageToken.href,
              imageToken.text || imageToken.title
            )
          );
        }

        tempTokens = [];
        return;
      }
      tempTokens = [...tempTokens, t];
    });

    /* Remaining temp tokens if any */
    if (tempTokens.length > 0) {
      siblingNodes.push(
        this.renderer.getTextNode(this.parseInline(tempTokens), {})
      );
    }

    return siblingNodes;
  };
}

export default Parser;
