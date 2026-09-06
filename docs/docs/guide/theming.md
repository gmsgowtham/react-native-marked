# Theming & Styles

Two complementary props control appearance:

- `theme` — palette + spacing tokens (applied via `src/theme/styles.ts`)
- `styles` — direct React Native `TextStyle`/`ViewStyle` overrides per element (wins over theme)

## Theme Shape (`src/theme/types.ts`)

```ts
interface UserTheme {
  colors?: {
    text?: string;
    background?: string;
    border?: string;
    link?: string;
    // ...
  };
  spacing?: Record<SpacingKeysType, number>;
}

interface MarkedStyles {
  h1?: TextStyle; h2?: TextStyle; h3?: TextStyle; h4?: TextStyle; h5?: TextStyle; h6?: TextStyle;
  paragraph?: ViewStyle;
  strong?: TextStyle; em?: TextStyle; strikethrough?: TextStyle;
  link?: TextStyle; blockquote?: ViewStyle;
  code?: ViewStyle;      // container
  codeText?: TextStyle;  // block code text
  codespan?: TextStyle;  // inline code
  hr?: ViewStyle;
  list?: ViewStyle; li?: TextStyle;
  image?: ImageStyle;
  table?: ViewStyle; tableRow?: ViewStyle; tableCell?: ViewStyle;
  text?: TextStyle;
}
```

## Example: Code blocks

```tsx
<Markdown
  value={"```js\nconsole.log('hello')\n```\n\nUse `inline` code"}
  styles={{
    code: { backgroundColor: "#f6f8fa", padding: 16 },
    codeText: { fontFamily: "Menlo", fontSize: 14 },
    codespan: { fontFamily: "Menlo", backgroundColor: "#f6f8fa" },
  }}
/>
```

`code` = container (`ViewStyle`), `codeText` / `codespan` = text (`TextStyle`). Ensures `fontFamily` wins.

## Dark mode

Pass `colorScheme` (hook) or let `Markdown` read styles via `theme`. Example with `useColorScheme`:

```tsx
const scheme = useColorScheme();
const elements = useMarkdown(md, { colorScheme: scheme });
```

See `src/theme/styles.ts` for defaults.
