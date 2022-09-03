import * as React from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import Markdown from 'react-native-marked';

import json from './samples.json';

const PADDING_HORIZONTAL = 16;

export default function App() {
  const { width } = Dimensions.get('window');
  return (
    <SafeAreaView>
      <Markdown
        value={json.body_markdown_2}
        containerWidth={width - PADDING_HORIZONTAL * 2}
        flatListProps={{
          contentContainerStyle: styles.container,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING_HORIZONTAL,
  },
});
