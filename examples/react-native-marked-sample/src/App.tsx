import * as React from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import Markdown from 'react-native-marked';

import json from './sample.json';

const PADDING_HORIZONTAL = 16;

export default function App() {
  const { width } = Dimensions.get('window');
  // const markdown =
  //   "Trusting frontend validation logic is like trusting a thief when he says he won't steal your wallet.";
  // const markdown =
  //   "Trusting frontend validation logic is like trusting a thief when he says he won't steal your wallet. Frontend validation is for _convenience_, to reduce HTTP requests, not for ensuring data quality. You can add TypeScript validators until your face turns red, and the moment some guy creates another frontend to consume your API, your validators are basically useless. [Hyperlambda](https://aista.com/hyperlambda/) validators on the other side are executing on your server, which makes them much more valuable.\n\n";
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Markdown
        value={json.body_markdown}
        contentWidth={width - PADDING_HORIZONTAL * 2}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
