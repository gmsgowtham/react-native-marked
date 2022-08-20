import * as React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { generateRandomString } from './utils';

class Renderer {
  private onLinkPress = (href: string) => () => Linking.openURL(href);

  text(text: string) {
    return (
      <Text key={generateRandomString()} style={[styles.text]}>
        {text}
      </Text>
    );
  }

  em(text: string) {
    return (
      <Text key={generateRandomString()} style={[styles.em, styles.text]}>
        {text}
      </Text>
    );
  }

  link(text: string, href: string) {
    return (
      <Text
        key={generateRandomString()}
        onPress={this.onLinkPress(href)}
        style={[styles.em, styles.text, styles.link]}
      >
        {text}
      </Text>
    );
  }

  paragraph(children: React.ReactNode[]) {
    return (
      <Text
        key={generateRandomString()}
        style={[styles.text, styles.paragraph]}
      >
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  em: {
    fontStyle: 'italic',
  },
  text: {
    fontSize: 14,
  },
  paragraph: {
    padding: 8,
  },
  link: {
    color: '#0074cc',
  },
});

export default Renderer;
