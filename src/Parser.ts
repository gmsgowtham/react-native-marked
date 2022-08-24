import type { marked } from 'marked';
import {
  Dimensions,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Renderer from './Renderer';
import type { MarkedStyles } from './types';

class Parser {
  private renderer;
  private styles: MarkedStyles;
  private window = Dimensions.get('window');
  constructor(styles: MarkedStyles = {}) {
    this.renderer = new Renderer();
    this.styles = {
      ...defaultStyles,
      ...styles,
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
          return this.renderer.getParagraph(
            this.parseInline(token.tokens, this.renderer),
            [styleObj, this.styles.paragraph]
          );
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

  parseInline(tokens: marked.Token[], renderer: Renderer) {
    const elements: React.ReactNode[] = tokens.map((token) => {
      if (!token) return null;

      switch (token.type) {
        case 'escape': {
          return renderer.getTextNode(token.text, this.styles.text);
        }
        case 'html': {
          return null;
        }
        case 'link': {
          return renderer.getLinkNode(token.text, token.href, this.styles.link);
        }
        case 'image': {
          return renderer.getImage('https://picsum.photos/200/300', [
            {
              resizeMode: 'contain',
              width: this.window.width,
              height: 300,
            },
            this.styles.image,
          ]);
        }
        case 'strong': {
          return renderer.getTextNode(token.text, this.styles.strong);
        }
        case 'em': {
          return renderer.getTextNode(token.text, this.styles.em);
        }
        case 'codespan': {
          return null;
        }
        case 'br': {
          return renderer.getLineBreak();
        }
        case 'del': {
          return null;
        }
        case 'text': {
          return renderer.getTextNode(token.raw, this.styles.text);
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

const defaultStyles = StyleSheet.create<MarkedStyles>({
  em: {
    fontSize: 14,
    lineHeight: 21,
    fontStyle: 'italic',
  },
  strong: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 21,
    paddingVertical: 8,
  },
  link: {
    fontStyle: 'italic',
    fontSize: 14,
    lineHeight: 21,
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
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
    paddingVertical: 8,
  },
});

export default Parser;
