import * as React from 'react';
import { Image, ImageStyle, Linking, View, ViewStyle } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';
import { Text } from 'react-native';
import { generateRandomString } from './utils';

class Renderer {
  private onLinkPress = (href: string) => () => Linking.openURL(href);

  getTextNode = (text: string, styles: StyleProp<TextStyle>) => {
    return (
      <Text key={generateRandomString()} style={styles}>
        {text}
      </Text>
    );
  };

  getLinkNode = (text: string, href: string, styles: StyleProp<TextStyle>) => {
    return (
      <Text
        key={generateRandomString()}
        onPress={this.onLinkPress(href)}
        style={styles}
      >
        {text}
      </Text>
    );
  };

  getParagraph(children: React.ReactNode[], styles: StyleProp<TextStyle>) {
    return (
      <Text key={generateRandomString()} style={styles}>
        {children}
      </Text>
    );
  }

  getLineBreak() {
    return <Text key={generateRandomString()}>{'\n'}</Text>;
  }

  getBlockquote(children: React.ReactNode[], styles: StyleProp<ViewStyle>) {
    return (
      <View key={generateRandomString()} style={styles}>
        {children}
      </View>
    );
  }

  getHeading(text: string, styles: StyleProp<TextStyle>) {
    return (
      <Text key={generateRandomString()} style={styles}>
        {text}
      </Text>
    );
  }

  getImage(uri: string, styles: StyleProp<ImageStyle>) {
    // TODO: custom image component with proper width and height
    return (
      <Image style={styles} source={{ uri }} key={generateRandomString()} />
    );
  }
}

export default Renderer;
