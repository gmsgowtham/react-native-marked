import type { marked } from 'marked';
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Renderer from './Renderer';
import type { MarkedStyles, ParserOptions } from '../types/types';

class Parser {
  private renderer;
  private styles: MarkedStyles;
  private options: ParserOptions;
  constructor(options: ParserOptions) {
    this.renderer = new Renderer();
    this.options = options;
    this.styles = {
      ...defaultStyles,
      ...options.styles,
    };
  }

  parse(tokens: marked.Token[]) {
    return this.parseBlocks(tokens);
  }

  parseBlocks(
    tokens: marked.Token[],
    styleObj: StyleProp<ViewStyle | TextStyle | ImageStyle> = {}
  ) {
    const elements: React.ReactNode[] = tokens.map((token) => {
      switch (token.type) {
        case 'space': {
          return null;
        }
        case 'paragraph': {
          let tempTokens: marked.Token[] = [];
          const paragraphChildren: React.ReactNode[] = [];
          token.tokens.forEach((t) => {
            // TODO: move type checking value to const
            if (t.type === 'image') {
              paragraphChildren.push(
                this.renderer.getTextNode(
                  this.parseInline(tempTokens),
                  styleObj
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
              this.renderer.getTextNode(this.parseInline(tempTokens), styleObj)
            );
          }

          return this.renderer.getParagraph(paragraphChildren, [
            styleObj,
            this.styles.paragraph,
          ]);
        }
        case 'blockquote': {
          return this.renderer.getBlockquote(
            this.parseBlocks(token.tokens, this.styles.blockquoteText),
            this.styles.blockquoteContainer
          );
        }
        case 'heading': {
          if (token.depth === 2) {
            return this.renderer.getHeading(token.text, this.styles.h2);
          }
          return null;
        }
        default:
          return null;
      }
    });
    return elements;
  }

  parseInline(tokens: marked.Token[]) {
    const elements: React.ReactNode[] = tokens.map((token) => {
      if (!token) return null;

      switch (token.type) {
        case 'escape': {
          return this.renderer.getTextNode(token.text, this.styles.text);
        }
        case 'html': {
          return null;
        }
        case 'link': {
          return this.renderer.getLinkNode(
            token.text,
            token.href,
            this.styles.link
          );
        }
        case 'image': {
          return this.renderer.getImage(token.href, this.options.contentWidth);
        }
        case 'strong': {
          return this.renderer.getTextNode(token.text, this.styles.strong);
        }
        case 'em': {
          return this.renderer.getTextNode(token.text, this.styles.em);
        }
        case 'codespan': {
          return null;
        }
        case 'br': {
          return this.renderer.getTextNode('\n', {});
        }
        case 'del': {
          return null;
        }
        case 'text': {
          return this.renderer.getTextNode(token.raw, this.styles.text);
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          console.error(errMsg);
          return null;
        }
      }
    });
    return elements;
  }
}

// TODO: material typography for font size
const defaultStyles = StyleSheet.create<MarkedStyles>({
  em: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  strong: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 8,
  },
  link: {
    fontStyle: 'italic',
    fontSize: 16,
    lineHeight: 24,
    color: '#0074cc',
  },
  blockquoteText: {
    color: '#6a737d',
  },
  blockquoteContainer: {
    borderLeftColor: '#dfe2e5',
    paddingLeft: 16,
    borderLeftWidth: 5,
  },
  h2: {
    fontSize: 22,
    fontWeight: '500',
    lineHeight: 33,
    paddingVertical: 8,
  },
});

export default Parser;
