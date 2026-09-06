# Tokenizer & Hooks

`marked` extensibility via `tokenizer` and `hooks` (from `marked`).

## Custom tokenizer — e.g. LaTeX via `$...$`

```tsx
import { Tokenizer, type Tokens } from "marked";
import Markdown, { Renderer } from "react-native-marked";

class CustomTokenizer extends Tokenizer {
  codespan(src: string): Tokens.Codespan | undefined {
    const match = src.match(/^\$+([^\$\n]+?)\$+/);
    if (match?.[1]) {
      return { type: "codespan", raw: match[0], text: match[1].trim() };
    }
    return super.codespan(src);
  }
}

const tokenizer = new CustomTokenizer();
const renderer = new Renderer();

export default () => (
  <Markdown value={"$ latex code $\n\n` other code `"} tokenizer={tokenizer} renderer={renderer} />
);
```

Also see `src/lib/types.ts:24` (`tokenizer?: Tokenizer`) and `src/index.ts:3` exports `MarkedTokenizer`, `MarkedHooks`, `MarkedLexer`.

## Hooks

Pass `hooks` to `Markdown` / `useMarkdown`. They run during parsing to transform tokens — e.g., sanitize, rewrite links, inject custom tokens.

```tsx
import { MarkedHooks } from "react-native-marked";
const hooks = new MarkedHooks({ /* override */ });
<Markdown value={md} hooks={hooks} />
```

See https://marked.js.org/using_pro#hooks
