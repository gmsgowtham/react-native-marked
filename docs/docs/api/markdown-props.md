# Markdown Props (`src/lib/types.ts:17`)

```ts
interface ParserOptions {
  styles?: MarkedStyles;
  baseUrl?: string;
  renderer: RendererInterface;
}

interface MarkdownProps extends Partial<ParserOptions> {
  value: string;
  flatListProps?: Omit<FlatListProps<ReactNode>, "data"|"renderItem"|"horizontal">;
  theme?: UserTheme;
  tokenizer?: Tokenizer;
  hooks?: Hooks;
  selectable?: boolean; // default true; ignored if renderer provided
}
```

FlatList note: `data` / `renderItem` / `horizontal` are omitted and managed internally.

## Hook options (`src/hooks/useMarkdown.ts`)

```ts
interface useMarkdownHookOptions extends Partial<ParserOptions> {
  colorScheme: ColorSchemeName; // required
  // + theme, styles, baseUrl, renderer, tokenizer, hooks, selectable
}
```
