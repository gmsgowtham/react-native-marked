# react-native-marked

[![CI](https://github.com/gmsgowtham/react-native-marked/actions/workflows/build.yml/badge.svg)](https://github.com/gmsgowtham/react-native-marked/actions/workflows/build.yml)

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
      value={`#Hello world`}
      flatListProps={{
        initialNumToRender: 8,
      }}
    />
  );
};

export default ExampleComponent;
```

## Screenshots

|                              Dark Theme                               |                               Light Theme                               |
| :-------------------------------------------------------------------: | :---------------------------------------------------------------------: |
| ![Dark theme](assets/Screenshot_1662875200.png?raw=true 'Dark Theme') | ![Light theme](assets/Screenshot_1662875206.png?raw=true 'Light Theme') |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

## External Libraries

- [Marked](https://marked.js.org/)
- [React Native Fit Image](https://github.com/huiseoul/react-native-fit-image)
- [@jsamr/react-native-li](https://github.com/jsamr/react-native-li)
