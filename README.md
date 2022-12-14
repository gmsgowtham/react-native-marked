# react-native-marked

[![GitHub license](https://img.shields.io/github/license/gmsgowtham/react-native-marked)](https://github.com/gmsgowtham/react-native-marked/blob/main/LICENSE)
[![CI](https://github.com/gmsgowtham/react-native-marked/actions/workflows/build.yml/badge.svg)](https://github.com/gmsgowtham/react-native-marked/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/gmsgowtham/react-native-marked/badge.svg?branch=main)](https://coveralls.io/github/gmsgowtham/react-native-marked?branch=main)
[![npm](https://img.shields.io/npm/v/react-native-marked)](https://www.npmjs.com/package/react-native-marked)
[![npm](https://img.shields.io/npm/dw/react-native-marked)](https://www.npmjs.com/package/react-native-marked)

Markdown renderer for React Native powered by [marked.js](https://marked.js.org/) with built-in theming support

## Installation

```sh
yarn add react-native-marked
```

## Usage

```jsx
import * as React from 'react';
import Markdown from 'react-native-marked';

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
- Snack: https://snack.expo.dev/@gmsgowtham/react-native-marked

## [Props](https://github.com/gmsgowtham/react-native-marked/blob/main/src/lib/types.ts#L9)

| Prop          | Description                                                                                                                                  | Type                                                                                                                                                                           | Optional? |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| value         | Markdown value                                                                                                                               | string                                                                                                                                                                         | false     |
| flatListProps | Props for customizing the underlying FlatList used                                                                                           | `Omit<FlatListProps<ReactNode>, 'data' \| 'renderItem' \| 'horizontal'>`<br><br><br>(`'data'`, `'renderItem'`, and `'horizontal'` props are omitted and cannot be overridden.) | true      |
| styles        | Styles for parsed components                                                                                                                 | [MarkedStyles](https://github.com/gmsgowtham/react-native-marked/blob/4ef070931b7d309a7490c41e45129e12525d12d9/src/theme/types.ts#L3)                                          | true      |
| theme         | Props for customizing colors and spacing for all components,and it will get overridden with custom component style applied via 'styles' prop | [UserTheme](https://github.com/gmsgowtham/react-native-marked/blob/6eba804c617099ffb574aa97c57a71ea3e0184fb/src/theme/types.ts#L28)                                            | true      |
| baseUrl       | A prefix url for any relative link                                                                                                           | string                                                                                                                                                                         | true      |

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

## Screenshots

|                          Dark Theme                           |                           Light Theme                            |
| :-----------------------------------------------------------: | :--------------------------------------------------------------: |
| ![Dark theme](assets/dark-theme-01.png?raw=true 'Dark Theme') | ![Light theme](assets/light-theme-01.png?raw=true 'Light Theme') |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

## Built with

- [Marked](https://marked.js.org/)
- [React Native Fit Image](https://github.com/huiseoul/react-native-fit-image)
- [@jsamr/react-native-li](https://github.com/jsamr/react-native-li)
