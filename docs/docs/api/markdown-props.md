# Markdown Props (`src/lib/types.ts:17`)

```ts
interface ParserOptions {
  styles?: MarkedStyles;
  baseUrl?: string;
  renderer: RendererInterface;
}

interface MarkdownProps extends Partial<ParserOptions> {
  value: string;
  flatListProps?: Omit<FlatListProps<MarkdownBlock>, "data"|"renderItem"|"horizontal">
    | Omit<FlatListProps<ReactNode>, "data"|"renderItem"|"horizontal">
    | null;
  theme?: UserTheme;
  tokenizer?: Tokenizer;
  hooks?: Hooks;
  selectable?: boolean; // default true; ignored if renderer provided
}
```

FlatList note: `data` / `renderItem` / `horizontal` are omitted and managed internally.
`ReactNode` item props remain accepted for backward compatibility with v8 and
earlier. Pass `flatListProps={null}` to disable virtualization and render with
`ScrollView` (useful for small docs). Blocks are keyed by content-derived
`MarkdownBlock.id` (`src/lib/types.ts`), so only new/changed blocks re-parse
when `value` changes (#451).

## Hook options (`src/hooks/useMarkdown.ts`)

```ts
interface useMarkdownHookOptions extends Partial<ParserOptions> {
  colorScheme: ColorSchemeName; // required
  // + theme, styles, baseUrl, renderer, tokenizer, hooks, selectable
}
```
