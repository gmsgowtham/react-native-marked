import type { marked } from 'marked';
import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import Renderer from './Renderer';
import type { MarkedStyles } from '../theme/types';

interface ParserOptions {
  styles?: MarkedStyles;
}

class Parser {
  private renderer;
  private styles: MarkedStyles;
  private headingStylesMap: Record<number, TextStyle | undefined>;
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
    const elements: React.ReactNode[] = tokens.map((token) => {
      switch (token.type) {
        case 'space': {
          return null;
        }
        case 'paragraph': {
          let tempTokens: marked.Token[] = [];
          const paragraphChildren: React.ReactNode[] = [];
          token.tokens.forEach((t) => {
            if (t.type === 'image') {
              paragraphChildren.push(
                this.renderer.getTextNode(
                  this.parseInline(tempTokens),
                  this.styles.text
                )
              );
              paragraphChildren.push(this.parseInline([t]));
              tempTokens = [];
              return;
            }
            tempTokens = [...tempTokens, t];
          });

          if (tempTokens.length > 0) {
            paragraphChildren.push(
              this.renderer.getTextNode(this.parseInline(tempTokens), {})
            );
          }

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
          return this.renderer.getTextNode(token.text, styles);
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
          const li = token.items.map((item) => item.text);
          return this.renderer.getListNode(
            token.ordered,
            li,
            this.styles.list,
            this.styles.li
          );
        }
        default:
          console.warn(`Token with '${token.type}' type was not found.`);
          return null;
      }
    });
    return elements;
  }

  parseInline(
    tokens: marked.Token[],
    styles: StyleProp<ViewStyle | TextStyle | ImageStyle> = {}
  ) {
    const elements: React.ReactNode[] = tokens.map((token) => {
      if (!token) return null;

      switch (token.type) {
        case 'escape': {
          return this.renderer.getTextNode(token.text, [
            styles,
            this.styles.text,
          ]);
        }
        case 'html': {
          console.log('html', token);
          return null;
        }
        case 'link': {
          return this.renderer.getLinkNode(token.text, token.href, [
            styles,
            this.styles.link,
          ]);
        }
        case 'image': {
          return this.renderer.getImageNode(token.href);
        }
        case 'strong': {
          return this.renderer.getTextNode(
            this.parseInline(token.tokens, this.styles.strong),
            [styles, this.styles.strong]
          );
        }
        case 'em': {
          return this.renderer.getTextNode(
            this.parseInline(token.tokens, this.styles.em),
            [styles, this.styles.em]
          );
        }
        case 'codespan': {
          return this.renderer.getTextNode(token.text, this.styles.codespan);
        }
        case 'br': {
          return this.renderer.getTextNode('\n', {});
        }
        case 'del': {
          return null;
        }
        case 'text': {
          return this.renderer.getTextNode(token.raw, [
            styles,
            this.styles.text,
          ]);
        }
        default: {
          console.warn(`Token with '${token.type}' type was not found.`);
          return null;
        }
      }
    });
    return elements;
  }
}

export default Parser;
