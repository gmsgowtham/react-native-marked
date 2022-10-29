import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  useColorScheme,
} from 'react-native';
import Markdown from 'react-native-marked';

import { MD_STRING } from './const';

export default function App() {
  const theme = useColorScheme();
  const isLightTheme = theme === 'light';
  return (
    <>
      <StatusBar
        barStyle={isLightTheme ? 'dark-content' : 'light-content'}
        backgroundColor={isLightTheme ? '#fff' : '#000'}
      />
      <SafeAreaView>
        <Markdown
          value={MD_STRING}
          flatListProps={{
            contentContainerStyle: styles.container,
          }}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
