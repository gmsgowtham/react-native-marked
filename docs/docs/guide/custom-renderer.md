# Custom Renderer

Subclass `Renderer` (`src/lib/Renderer.tsx`) and override any `RendererInterface` method (`src/lib/types.ts:36`).

```tsx
import React, { type ReactNode, Fragment } from "react";
import { Text, ScrollView, type TextStyle, type ImageStyle } from "react-native";
import Markdown, { Renderer, type RendererInterface } from "react-native-marked";
import FastImage from "react-native-fast-image";

class CustomRenderer extends Renderer implements RendererInterface {
  codespan(text: string, _styles?: TextStyle): ReactNode {
    return (
      <Text key={this.getKey()} style={{ backgroundColor: "#ff0" }}>
        {text}
      </Text>
    );
  }
  image(uri: string, _alt?: string, _style?: ImageStyle): ReactNode {
    return (
      <FastImage
        key={this.getKey()}
        style={{ width: 200, height: 200 }}
        source={{ uri }}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
  }
}

const renderer = new CustomRenderer();

export default function App() {
  return <Markdown value={"`Hello`"} renderer={renderer} />;
}

// Hook variant
function WithHook() {
  const els = useMarkdown("`Hello`", { renderer } as any);
  return <ScrollView>{els.map((e, i) => <Fragment key={i}>{e}</Fragment>)}</ScrollView>;
}
```

## Available overrides

`paragraph`, `blockquote`, `heading`, `code`, `hr`, `list`, `listItem`, `escape`, `link`, `image`, `strong`, `em`, `codespan`, `br`, `del`, `text`, `html`, `linkImage`, `table`.

> Use `this.getKey()` for stable keys (`src/lib/Renderer.tsx:209`).

## Selectable texts

`new Renderer({ selectable: false })` disables `Text selectable`. When you pass a custom `renderer`, the `selectable` prop on `Markdown` is ignored — configure the renderer instead.
