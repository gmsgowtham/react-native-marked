# react-native-marked

[![GitHub license](https://img.shields.io/github/license/gmsgowtham/react-native-marked)](https://github.com/gmsgowtham/react-native-marked/blob/main/LICENSE)
[![CI](https://github.com/gmsgowtham/react-native-marked/actions/workflows/build.yml/badge.svg)](https://github.com/gmsgowtham/react-native-marked/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/gmsgowtham/react-native-marked/badge.svg?branch=main)](https://coveralls.io/github/gmsgowtham/react-native-marked?branch=main)
[![npm](https://img.shields.io/npm/v/react-native-marked)](https://www.npmjs.com/package/react-native-marked)
[![npm](https://img.shields.io/npm/dw/react-native-marked)](https://www.npmjs.com/package/react-native-marked)

Markdown renderer for React Native powered by
[marked.js](https://marked.js.org/) with built-in theming support

## Installation

#### For React Native 0.76 and above, please use the latest version.
```sh
yarn add react-native-marked react-native-svg
```

#### For React Native 0.75 and below, please use version 6.
```sh
yarn add react-native-marked@6.0.7 react-native-svg
```

## Usage

### Using Component

```tsx
import * as React from "react";
import Markdown from "react-native-marked";

const ExampleComponent = () => {
  return (
    <Markdown
      value={`# Hello world`}
      flatListProps={{
        initialNumToRender: 8,
      }}
    />
  );
};

export default ExampleComponent;
```

#### [Props](https://github.com/gmsgowtham/react-native-marked/blob/main/src/lib/types.ts#L17)

| Prop          | Description                                                                                                                                  | Type                                                                                                                                                                           | Optional? |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| value         | Markdown value                                                                                                                               | string                                                                                                                                                                         | false     |
| flatListProps | Props for customizing the underlying FlatList used                                                                                           | `Omit<FlatListProps<ReactNode>, 'data' \| 'renderItem' \| 'horizontal'>`<br><br><br>(`'data'`, `'renderItem'`, and `'horizontal'` props are omitted and cannot be overridden.) | true      |
| styles        | Styles for parsed components                                                                                                                 | [MarkedStyles](src/theme/types.ts)                                                                                                                                             | true      |
| theme         | Props for customizing colors and spacing for all components,and it will get overridden with custom component style applied via 'styles' prop | [UserTheme](src/theme/types.ts)                                                                                                                                                | true      |
| baseUrl       | A prefix url for any relative link                                                                                                           | string                                                                                                                                                                         | true      |
| renderer      | Custom component Renderer                                                                                                                    | [RendererInterface](src/lib/types.ts)                                                                                                                                          | true      |


### Using hook

`useMarkdown` hook will return list of elements that can be rendered using a list component of your choice.

```tsx
import React, { Fragment } from "react";
import { ScrollView, useColorScheme } from "react-native";
import { useMarkdown, type useMarkdownHookOptions } from "react-native-marked";

const CustomComponent = () => {
  const colorScheme = useColorScheme();
  const options: useMarkdownHookOptions = {
    colorScheme
  }
  const elements = useMarkdown("# Hello world", options);
  return (
    <ScrollView>
      {elements.map((element, index) => {
        return <Fragment key={`demo_${index}`}>{element}</Fragment>
      })}
    </ScrollView>
  );
};
```

#### Options

| Option      | Description                                                                                                                                  | Type                                             | Optional? |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|-----------|
| colorScheme | Device color scheme ("dark" or "light")                                                                                                      | ColorSchemeName                                  | false     |
| styles      | Styles for parsed components                                                                                                                 | [MarkedStyles](src/theme/types.ts)               | true      |
| theme       | Props for customizing colors and spacing for all components,and it will get overridden with custom component style applied via 'styles' prop | [UserTheme](src/theme/types.ts)                  | true      |
| baseUrl     | A prefix url for any relative link                                                                                                           | string                                           | true      |
| renderer    | Custom component Renderer                                                                                                                    | [RendererInterface](src/lib/types.ts)            | true      |
| tokenizer   | Generate custom tokens                                                                                                                       | [MarkedTokenizer<CustomToken>](src/lib/types.ts) | true      |


## Examples

- CodeSandbox: https://codesandbox.io/s/react-native-marked-l2hpi3?file=/src/App.js

## Supported elements

- [x] Headings (1 to 6)
- [x] Paragraph
- [x] Emphasis (bold, italic, and strikethrough)
- [x] Link
- [x] Image
- [x] Blockquote
- [x] Inline Code
- [x] Code Block
- [x] List (ordered, unordered)
- [x] Horizontal Rule
- [x] Table
- [ ] HTML

Ref: [CommonMark](https://commonmark.org/help/)

> HTML will be treated as plain text. Please refer [issue#290](https://github.com/gmsgowtham/react-native-marked/issues/290) for a potential solution

## Advanced
### Using custom components

> Custom components can be used to override elements, i.e. Code Highlighting, Fast Image integration

#### Example

```tsx
import React, { ReactNode, Fragment } from "react";
import { Text, ScrollView } from "react-native";
import type { ImageStyle, TextStyle } from "react-native";
import Markdown, { Renderer, useMarkdown } from "react-native-marked";
import type { RendererInterface } from "react-native-marked";
import FastImage from "react-native-fast-image";

class CustomRenderer extends Renderer implements RendererInterface {
  constructor() {
    super();
  }

  codespan(text: string, _styles?: TextStyle): ReactNode {
    return (
      <Text key={this.getKey()} style={{ backgroundColor: "#ff0000" }}>
        {text}
      </Text>
    );
  }

  image(uri: string, _alt?: string, _style?: ImageStyle): ReactNode {
    return (
      <FastImage
        key={this.getKey()}
        style={{ width: 200, height: 200 }}
        source={{ uri: uri }}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
  }
}

const renderer = new CustomRenderer();

const ExampleComponent = () => {
  return (
    <Markdown
      value={"`Hello world`"}
      flatListProps={{
        initialNumToRender: 8,
      }}
      renderer={renderer}
    />
  );
};

// Alternate using hook
const ExampleComponentWithHook = () => {
  const elements = useMarkdown("`Hello world`", { renderer });

  return (
    <ScrollView>
      {elements.map((element, index) => {
        return <Fragment key={`demo_${index}`}>{element}</Fragment>
      })}
    </ScrollView>
  )
}

export default ExampleComponent;
```

> Please refer to [RendererInterface](src/lib/types.ts) for all the overrides

> Note:
>
> For `key` property for a component, you can use the `getKey` method from Renderer class.

#### Example

Overriding default codespan tokenizer to include LaTeX.

```tsx

import React, { ReactNode } from "react";
import Markdown, { Renderer, MarkedTokenizer, MarkedLexer } from "react-native-marked";
import type { RendererInterface, CustomToken } from "react-native-marked";

class CustomTokenizer extends Tokenizer {
  codespan(src: string): Tokens.Codespan | undefined {
    const match = src.match(/^\$+([^\$\n]+?)\$+/);
    if (match?.[1]) {
      return {
        type: "codespan",
        raw: match[0],
        text: match[1].trim(),
      };
    }

    return super.codespan(src);
  }
}

class CustomRenderer extends Renderer implements RendererInterface {
  codespan(text: string, styles?: TextStyle): ReactNode {
    return (
      <Text style={styles} key={"key-1"}>
        {text}
      </Text>
    )
  }
}

const renderer = new CustomRenderer();
const tokenizer = new CustomTokenizer();

const ExampleComponent = () => {
  return (
    <Markdown
      value={"$ latex code $\n\n` other code `"}
      flatListProps={{
        initialNumToRender: 8,
      }}
      renderer={renderer}
      tokenizer={tokenizer}
    />
  );
};
```

#### Example

## Screenshots

|                          Dark Theme                           |                           Light Theme                            |
|:-------------------------------------------------------------:|:----------------------------------------------------------------:|
| ![Dark theme](assets/dark-theme-01.png?raw=true 'Dark Theme') | ![Light theme](assets/light-theme-01.png?raw=true 'Light Theme') |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the
repository and the development workflow.

## License

MIT

---

Made with
[create-react-native-library](https://github.com/callstack/react-native-builder-bob)

## Built using

- [Marked](https://marked.js.org/)
- [@jsamr/react-native-li](https://github.com/jsamr/react-native-li)
- [react-native-reanimated-table](https://github.com/dohooo/react-native-reanimated-table)
- [react-native-svg](https://github.com/software-mansion/react-native-svg)
- [svg-parser](https://github.com/Rich-Harris/svg-parser)
- [github-slugger](https://github.com/Flet/github-slugger)
- [html-entities](https://github.com/mdevils/html-entities)


<a href="https://www.buymeacoffee.com/gmsgowtham" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="width: 120px !important;" ></a>
