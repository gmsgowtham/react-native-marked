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
          switch (token.depth) {
            case 1:
              return this.renderer.getHeading(token.text, this.styles.h1);
            case 2:
              return this.renderer.getHeading(token.text, this.styles.h2);
            case 3:
              return this.renderer.getHeading(token.text, this.styles.h3);
            case 4:
              return this.renderer.getHeading(token.text, this.styles.h4);
            case 5:
              return this.renderer.getHeading(token.text, this.styles.h5);
            case 6:
              return this.renderer.getHeading(token.text, this.styles.h6);
            default:
              return null;
          }
        }
        case 'code': {
          return this.renderer.getCodeBlock(
            token.text,
            this.styles.code,
            this.styles.em
          );
        }
        default:
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
          return this.renderer.getImage(
            token.href,
            this.options.containerWidth
          );
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
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 'bold',
    paddingVertical: 8,
    letterSpacing: 0,
  },
  h2: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '500',
    paddingVertical: 8,
  },
  h3: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '500',
  },
  h4: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '500',
  },
  h5: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  h6: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  codespan: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
    backgroundColor: '#afb8c133',
    fontWeight: '300',
  },
  code: {
    padding: 16,
    backgroundColor: '#afb8c133',
    minWidth: '100%',
  },
});

export default Parser;
