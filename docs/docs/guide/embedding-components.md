# Embedding React Components

Render JSX components inside markdown with `useMarkdownWithComponents` + registry.

```tsx
import React, { Fragment } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import {
  ReactComponentRegistryProvider,
  useMarkdownWithComponents,
  type ReactComponentRegistry,
} from "react-native-marked";

const components: ReactComponentRegistry = {
  Button: ({ props }) => (
    <Pressable onPress={() => console.log("Pressed!")}>
      <Text>{String(props.label ?? "Click me")}</Text>
    </Pressable>
  ),
  InfoBox: ({ props, children }) => (
    <View style={{ backgroundColor: "#E3F2FD", padding: 16 }}>
      {props.title && <Text style={{ fontWeight: "bold" }}>{String(props.title)}</Text>}
      <Text>{children}</Text>
    </View>
  ),
};

const markdown = `
# Hello

<Button label="Get Started" />

<InfoBox title="Note">This has **markdown** inside.</InfoBox>
`;

function MarkdownContent() {
  const elements = useMarkdownWithComponents(markdown);
  return (
    <ScrollView>
      {elements.map((el, i) => (
        <Fragment key={i}>{el}</Fragment>
      ))}
    </ScrollView>
  );
}

export default function App() {
  return (
    <ReactComponentRegistryProvider components={components}>
      <MarkdownContent />
    </ReactComponentRegistryProvider>
  );
}
```

## Syntax

- Self-closing: `<ComponentName prop="value" />`
- With children: `<ComponentName>content</ComponentName>`
- Props: string `"value"`, number `{42}`, boolean `{true}`

Unregistered components are automatically removed. See `src/lib/ReactComponentRegistry.tsx` and `src/lib/ReactComponentTokenizer.ts`.
