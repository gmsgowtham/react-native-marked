import { createElement } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { generateRandomID } from './utils';

const onLinkPress = (href: string) => () => Linking.openURL(href);

class Renderer {
  text(text: string) {
    const key = generateRandomID();
    return createElement(
      Text,
      {
        key,
        style: [styles.text],
      },
      text
    );
  }

  em(text: string) {
    const key = generateRandomID();
    return createElement(
      Text,
      {
        key,
        style: [styles.em, styles.text],
      },
      text
    );
  }

  link(text: string, href: string) {
    const key = generateRandomID();
    return createElement(
      Text,
      {
        key,
        style: [styles.em, styles.text, styles.link],
        onPress: onLinkPress(href),
      },
      text
    );
  }

  paragraph(children: React.ReactNode[]) {
    const key = generateRandomID();
    return createElement(
      Text,
      {
        key,
        style: [styles.text, styles.paragraph],
      },
      children
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
