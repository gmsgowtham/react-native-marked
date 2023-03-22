# react-native-marked

[![GitHub license](https://img.shields.io/github/license/gmsgowtham/react-native-marked)](https://github.com/gmsgowtham/react-native-marked/blob/main/LICENSE)
[![CI](https://github.com/gmsgowtham/react-native-marked/actions/workflows/build.yml/badge.svg)](https://github.com/gmsgowtham/react-native-marked/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/gmsgowtham/react-native-marked/badge.svg?branch=main)](https://coveralls.io/github/gmsgowtham/react-native-marked?branch=main)
[![npm](https://img.shields.io/npm/v/react-native-marked)](https://www.npmjs.com/package/react-native-marked)
[![npm](https://img.shields.io/npm/dw/react-native-marked)](https://www.npmjs.com/package/react-native-marked)

Markdown renderer for React Native powered by
[marked.js](https://marked.js.org/) with built-in theming support

## Installation

```sh
yarn add react-native-marked
```

## Usage

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

## Examples

- RN App: https://github.com/gmsgowtham/react-native-marked-test

## [Props](https://github.com/gmsgowtham/react-native-marked/blob/main/src/lib/types.ts#L9)

| Prop          | Description                                                                                                                                  | Type                                                                                                                                                                           | Optional? |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| value         | Markdown value                                                                                                                               | string                                                                                                                                                                         | false     |
| flatListProps | Props for customizing the underlying FlatList used                                                                                           | `Omit<FlatListProps<ReactNode>, 'data' \| 'renderItem' \| 'horizontal'>`<br><br><br>(`'data'`, `'renderItem'`, and `'horizontal'` props are omitted and cannot be overridden.) | true      |
| styles        | Styles for parsed components                                                                                                                 | [MarkedStyles](https://github.com/gmsgowtham/react-native-marked/blob/main/src/theme/types.ts#L5)                                                                              | true      |
| theme         | Props for customizing colors and spacing for all components,and it will get overridden with custom component style applied via 'styles' prop | [UserTheme](https://github.com/gmsgowtham/react-native-marked/blob/main/src/theme/types.ts#L28)                                                                                | true      |
| baseUrl       | A prefix url for any relative link                                                                                                           | string                                                                                                                                                                         | true      |
| renderer      | Custom component Renderer                                                                                                                    | [RendererInterface](https://github.com/gmsgowtham/react-native-marked/blob/main/src/lib/types.ts#L25)                                                                          | true      |

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
- [ ] Table
- [ ] HTML

Ref: [CommonMark](https://commonmark.org/help/)

> HTML will be treated as plain text

## Using custom components

```tsx
import React, { ReactNode } from "react";
import { Text } from "react-native";
import type { ImageStyle, TextStyle } from "react-native";
import Markdown, { Renderer } from "react-native-marked";
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

export default ExampleComponent;
```

## Screenshots

|                          Dark Theme                           |                           Light Theme                            |
| :-----------------------------------------------------------: | :--------------------------------------------------------------: |
| ![Dark theme](assets/dark-theme-01.png?raw=true 'Dark Theme') | ![Light theme](assets/light-theme-01.png?raw=true 'Light Theme') |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the
repository and the development workflow.

## License

MIT

---

Made with
[create-react-native-library](https://github.com/callstack/react-native-builder-bob)

## Built with

- [Marked](https://marked.js.org/)
- [React Native Fit Image](https://github.com/huiseoul/react-native-fit-image)
- [@jsamr/react-native-li](https://github.com/jsamr/react-native-li)
