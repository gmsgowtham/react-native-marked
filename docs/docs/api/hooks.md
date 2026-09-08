# Hooks

## useMarkdown (`src/hooks/useMarkdown.ts`)

Returns `ReactNode[]` for custom container:

```ts
function useMarkdown(value: string, options: useMarkdownHookOptions): ReactNode[]
```

`options.colorScheme` is required; rest mirrors `MarkdownProps` plus `tokenizer`.

## useMarkdownBlocks (`src/hooks/useMarkdownBlocks.ts`)

Returns `{ blocks: MarkdownBlock[], parser }` for FlatList-optimized rendering
with stable content-derived `id` keys. Only new/changed blocks re-parse when
`value` changes (#451):

```tsx
import { MarkdownBlockView, useMarkdownBlocks } from "react-native-marked";

const { blocks, parser } = useMarkdownBlocks(value, { theme, styles });
<FlatList
  data={blocks}
  keyExtractor={(block) => block.id}
  renderItem={({ item }) => (
    <MarkdownBlockView token={item.token} parser={parser} blockId={item.id} />
  )}
/>
```

> Memoize `styles` / `theme` / `renderer` objects with `useMemo` — new object
> identities force full re-parse.

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
