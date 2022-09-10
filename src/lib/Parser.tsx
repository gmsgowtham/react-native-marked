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
  constructor(options: ParserOptions) {
    this.styles = {
      ...options.styles,
    };
    this.renderer = new Renderer();
  }

  parse(tokens: marked.Token[]) {
    return this.parseBlocks(tokens);
  }

  parseBlocks(tokens: marked.Token[]) {
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
            this.parseBlocks(token.tokens),
            this.styles.blockquote
          );
        }
        case 'heading': {
          switch (token.depth) {
            case 1:
              return this.renderer.getHeadingNode(token.text, this.styles.h1);
            case 2:
              return this.renderer.getHeadingNode(token.text, this.styles.h2);
            case 3:
              return this.renderer.getHeadingNode(token.text, this.styles.h3);
            case 4:
              return this.renderer.getHeadingNode(token.text, this.styles.h4);
            case 5:
              return this.renderer.getHeadingNode(token.text, this.styles.h5);
            case 6:
              return this.renderer.getHeadingNode(token.text, this.styles.h6);
            default:
              return null;
          }
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
    styleObj: StyleProp<ViewStyle | TextStyle | ImageStyle> = {}
  ) {
    const elements: React.ReactNode[] = tokens.map((token) => {
      if (!token) return null;

      switch (token.type) {
        case 'escape': {
          return this.renderer.getTextNode(token.text, [
            styleObj,
            this.styles.text,
          ]);
        }
        case 'html': {
          console.log('html', token);
          return null;
        }
        case 'link': {
          return this.renderer.getLinkNode(token.text, token.href, [
            styleObj,
            this.styles.link,
          ]);
        }
        case 'image': {
          return this.renderer.getImageNode(token.href);
        }
        case 'strong': {
          return this.renderer.getTextNode(
            this.parseInline(token.tokens, this.styles.strong),
            [styleObj, this.styles.strong]
          );
        }
        case 'em': {
          return this.renderer.getTextNode(
            this.parseInline(token.tokens, this.styles.em),
            [styleObj, this.styles.em]
          );
        }
        case 'codespan': {
          return this.renderer.getTextNode(
            ` ${token.text} `,
            this.styles.codespan
          );
        }
        case 'br': {
          return this.renderer.getTextNode('\n', {});
        }
        case 'del': {
          return null;
        }
        case 'text': {
          return this.renderer.getTextNode(token.raw, [
            styleObj,
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
