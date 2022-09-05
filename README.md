# react-native-marked

Markdown support for React Native

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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
