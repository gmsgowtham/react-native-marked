# Getting Started

`react-native-marked` is a Markdown renderer for React Native powered by [marked.js](https://marked.js.org/) with built-in theming.

- Headings, paragraph, emphasis, links, images, blockquote, lists, tables, code blocks — see [Supported Elements](./supported-elements)
- Theming via `theme` + `styles` props
- Custom rendering via `Renderer` class
- Embed interactive React components via `useMarkdownWithComponents`

## Quick Start

```sh
yarn add react-native-marked react-native-svg
```

```tsx
import Markdown from "react-native-marked";

export default function App() {
  return (
    <Markdown
      value={`# Hello\n\nWrite **markdown** here.`}
      flatListProps={{ initialNumToRender: 8 }}
    />
  );
}
```

## When to use which API?

| API | Use case |
|-----|----------|
| `Markdown` component | Drop-in FlatList wrapper, easiest |
| `useMarkdown` hook | You control ScrollView/FlatList/virtualization |
| `useMarkdownWithComponents` | Need JSX components inside markdown (`<Button />`, `<InfoBox>`) |

Continue to [Installation](./installation) or jump to [Component usage](./component).
