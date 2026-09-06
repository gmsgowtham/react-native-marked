# Hook Usage

`useMarkdown` returns an array of elements — you choose the container.

```tsx
import React, { Fragment } from "react";
import { ScrollView, useColorScheme } from "react-native";
import { useMarkdown, type useMarkdownHookOptions } from "react-native-marked";

export default function CustomComponent() {
  const colorScheme = useColorScheme();
  const options: useMarkdownHookOptions = { colorScheme };
  const elements = useMarkdown("# Hello world", options);

  return (
    <ScrollView>
      {elements.map((el, i) => (
        <Fragment key={`demo_${i}`}>{el}</Fragment>
      ))}
    </ScrollView>
  );
}
```

## Options

| Option | Type | Notes |
|--------|------|-------|
| `colorScheme` | `ColorSchemeName` | `dark` \| `light` (required for auto theming) |
| `styles` | `MarkedStyles` | Same as component |
| `theme` | `UserTheme` | Same as component |
| `baseUrl` | `string` | |
| `renderer` | `RendererInterface` | |
| `tokenizer` | `MarkedTokenizer` | Custom tokenization |
| `hooks` | `Hooks` | |
| `selectable` | `boolean` | |

Source: `src/hooks/useMarkdown.ts`.

## When to use

- Need `ScrollView`, `SectionList`, custom virtualization
- Want to measure/layout before render
- Embedding inside existing FlatList
