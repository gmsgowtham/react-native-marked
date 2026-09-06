# Component Usage

`Markdown` is a FlatList wrapper — simplest way to render markdown.

```tsx
import * as React from "react";
import Markdown from "react-native-marked";

export default function Example() {
  return (
    <Markdown
      value={`# Hello world\n\n- item 1\n- item 2`}
      flatListProps={{ initialNumToRender: 8 }}
      styles={{
        h1: { color: "#111" },
        paragraph: { marginBottom: 12 },
      }}
      theme={{ colors: { text: "#222", background: "#fff" } }}
      baseUrl="https://example.com"
      selectable
    />
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Markdown source (**required**) |
| `flatListProps` | `Omit<FlatListProps, 'data'|'renderItem'|'horizontal'>` | Customize underlying FlatList |
| `styles` | `MarkedStyles` | Per-element View/Text styles |
| `theme` | `UserTheme` | Colors + spacing tokens |
| `baseUrl` | `string` | Prefix for relative links |
| `renderer` | `RendererInterface` | Custom renderer (see [Custom Renderer](./custom-renderer)) |
| `hooks` | `MarkedHooks` | marked hooks |
| `selectable` | `boolean` | Text selectable (default `true`; ignored if custom `renderer` passed — use `new Renderer({selectable})`) |

See `src/lib/types.ts:17` for `MarkdownProps`.
