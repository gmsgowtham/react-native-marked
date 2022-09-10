import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Markdown from 'react-native-marked';

import json from './samples.json';

export default function App() {
  return (
    <SafeAreaView>
      <Markdown
        value={json.body_markdown_1}
        flatListProps={{
          contentContainerStyle: styles.container,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
