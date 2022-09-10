import * as React from 'react';
import { Linking, ScrollView, View, ViewStyle } from 'react-native';
import { Text, StyleProp, TextStyle } from 'react-native';
import MarkedList from '@jsamr/react-native-li';
import Disc from '@jsamr/counter-style/presets/disc';
import Decimal from '@jsamr/counter-style/presets/decimal';
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

  getCodeBlockNode(
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

  getBlockquoteNode(children: React.ReactNode[], styles: StyleProp<ViewStyle>) {
    return (
      <View key={generateRandomString()} style={styles}>
        {children}
      </View>
    );
  }

  getImageNode(uri: string) {
    return <MDImage key={generateRandomString()} uri={uri} />;
  }

  getListNode(
    ordered: boolean,
    li: string[],
    listStyle: ViewStyle | undefined,
    textStyle: TextStyle | undefined
  ) {
    return (
      <MarkedList
        counterRenderer={ordered ? Decimal : Disc}
        markerTextStyle={textStyle}
        markerBoxStyle={listStyle}
      >
        {li.map((text, index) => (
          <Text key={index} style={textStyle}>
            {text}
          </Text>
        ))}
      </MarkedList>
    );
  }
}

export default Renderer;
