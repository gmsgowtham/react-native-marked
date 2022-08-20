// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { marked } from 'marked';
import Renderer from './Renderer';

class Parser {
  renderer;
  constructor() {
    this.renderer = new Renderer();
  }

  parse(tokens: marked.TokensList) {
    const elements: React.ReactNode[] = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (!token) continue;
      switch (token.type) {
        case 'space': {
          break;
        }
        case 'paragraph': {
          elements.push(
            this.renderer.paragraph(
              this.parseInline(token.tokens, this.renderer)
            )
          );
          break;
        }
      }
    }
    return elements;
  }

  parseInline(tokens: marked.Token[], renderer: Renderer) {
    const elements: React.ReactNode[] = [];
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (!token) continue;

      switch (token.type) {
        case 'escape': {
          elements.push(renderer.text(token.text));
          break;
        }
        case 'html': {
          break;
        }
        case 'link': {
          elements.push(renderer.link(token.text, token.href));
          break;
        }
        case 'image': {
          break;
        }
        case 'strong': {
          break;
        }
        case 'em': {
          elements.push(renderer.em(token.text));
          break;
        }
        case 'codespan': {
          break;
        }
        case 'br': {
          break;
        }
        case 'del': {
          break;
        }
        case 'text': {
          elements.push(renderer.text(token.raw));
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          console.error(errMsg);
          break;
        }
      }
    }
    return elements;
  }
}

export default Parser;
