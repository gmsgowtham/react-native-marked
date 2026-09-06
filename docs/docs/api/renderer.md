# Renderer Interface (`src/lib/types.ts:36`)

```ts
interface RendererInterface {
  paragraph(children: ReactNode[], styles?: ViewStyle): ReactNode;
  blockquote(children: ReactNode[], styles?: ViewStyle): ReactNode;
  heading(text: string | ReactNode[], styles?: TextStyle, depth?: number): ReactNode;
  code(text: string, language?: string, containerStyle?: ViewStyle, textStyle?: TextStyle): ReactNode;
  hr(styles?: ViewStyle): ReactNode;
  listItem(children: ReactNode[], styles?: ViewStyle): ReactNode;
  list(ordered: boolean, li: ReactNode[], listStyle?: ViewStyle, textStyle?: TextStyle, startIndex?: number): ReactNode;
  escape(text: string, styles?: TextStyle): ReactNode;
  link(children: string|ReactNode[], href: string, styles?: TextStyle, title?: string): ReactNode;
  image(uri: string, alt?: string, style?: ImageStyle, title?: string): ReactNode;
  strong(children: string|ReactNode[], styles?: TextStyle): ReactNode;
  em(children: string|ReactNode[], styles?: TextStyle): ReactNode;
  codespan(text: string, styles?: TextStyle): ReactNode;
  br(): ReactNode;
  del(children: string|ReactNode[], styles?: TextStyle): ReactNode;
  text(text: string|ReactNode[], styles?: TextStyle): ReactNode;
  html(text: string|ReactNode[], styles?: TextStyle): ReactNode;
  linkImage(href: string, imageUrl: string, alt?: string, style?: ImageStyle, title?: string|null): ReactNode;
  table(header: ReactNode[][], rows: ReactNode[][][], tableStyle?: ViewStyle, rowStyle?: ViewStyle, cellStyle?: ViewStyle): ReactNode;
}
```

Implement via `class MyRenderer extends Renderer implements RendererInterface { ... }` (`src/lib/Renderer.tsx:28`).

Use `this.getKey()` (`src/lib/Renderer.tsx:209`) for keys — it uses `github-slugger`.
