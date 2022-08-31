# react-native-marked

Markdown support for React Native

## Installation

```sh
npm install react-native-marked
```

## Usage

```jsx
import * as React from 'react';
import { Dimensions } from 'react-native';
import Markdown from 'react-native-marked';

const ExampleComponent = () => {
  const { width: windowWidth } = Dimensions.get('window');
  return (
    <Markdown
      value={`#Hello world`}
      contentWidth={windowWidth}
      listProps={{
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
