import * as React from 'react';
import { Linking, ScrollView, View, ViewStyle } from 'react-native';
import { Text, StyleProp, TextStyle } from 'react-native';
import MDImage from './../components/MDImage';
import { generateRandomString } from '../utils/string';

class Renderer {
  private onLinkPress = (href: string) => () => Linking.openURL(href);

  getTextNode = (
    children: string | React.ReactNode[],
    styles: StyleProp<TextStyle>
  ) => {
    return (
      <Text key={generateRandomString()} style={styles}>
        {children}
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

  getViewNode(
    children: React.ReactNode[] | null,
    styles: StyleProp<ViewStyle>
  ) {
    return (
      <View key={generateRandomString()} style={styles}>
        {children}
      </View>
    );
  }

  getCodeBlock(
    text: string,
    containerStyle: StyleProp<ViewStyle>,
    textStyle: StyleProp<TextStyle>
  ) {
    return (
      <ScrollView contentContainerStyle={containerStyle} horizontal>
        <Text style={textStyle}>{text}</Text>
      </ScrollView>
    );
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

  getImage(uri: string) {
    return <MDImage key={generateRandomString()} uri={uri} />;
  }
}

export default Renderer;
