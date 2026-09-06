# Hooks

## useMarkdown (`src/hooks/useMarkdown.ts`)

Returns `ReactNode[]` for custom container:

```ts
function useMarkdown(value: string, options: useMarkdownHookOptions): ReactNode[]
```

`options.colorScheme` is required; rest mirrors `MarkdownProps` plus `tokenizer`.

## useMarkdownWithComponents (`src/hooks/useMarkdownWithComponents.tsx`)

```ts
function useMarkdownWithComponents(value: string, options?: useMarkdownHookOptions): ReactNode[]
```

Requires `ReactComponentRegistryProvider` ancestor (`src/lib/ReactComponentRegistry.tsx`).

```tsx
import { ReactComponentRegistryProvider, useMarkdownWithComponents } from "react-native-marked";
```

## Marked exports (`src/index.ts:3`)

Re-exported from `marked`:

- `MarkedHooks` (`Hooks`)
- `MarkedTokenizer` (`Tokenizer`)
- `MarkedLexer` (`marked.lexer`)

Use to customize tokenization / hooks as in [Tokenizer guide](/guide/advanced/tokenizer).
