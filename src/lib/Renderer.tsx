import React, { ReactNode } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  TextStyle,
  ViewStyle,
} from 'react-native';
import MarkedList from '@jsamr/react-native-li';
import Disc from '@jsamr/counter-style/presets/disc';
import Decimal from '@jsamr/counter-style/presets/decimal';
import MDImage from './../components/MDImage';
import { generateRandomString } from '../utils/string';
import { onLinkPress } from '../utils/handlers';

class Renderer {
  getTextNode = (children: string | ReactNode[], styles?: TextStyle) => {
    return (
      <Text key={generateRandomString()} style={styles}>
        {children}
      </Text>
    );
  };

  getTextLinkNode = (
    children: string | ReactNode[],
    href: string,
    styles?: TextStyle
  ) => {
    return (
      <Text
        accessibilityRole="link"
        accessibilityHint="Opens in a new window"
        key={generateRandomString()}
        onPress={onLinkPress(href)}
        style={styles}
      >
        {children}
      </Text>
    );
  };

  getImageLinkNode = (href: string, imageUrl: string, alt?: string) => {
    const imageNode = this.getImageNode(imageUrl, alt);
    return (
      <TouchableHighlight
        accessibilityRole="link"
        accessibilityHint="Opens in a new window"
        onPress={onLinkPress(href)}
        key={generateRandomString()}
      >
        {imageNode}
      </TouchableHighlight>
    );
  };

  getViewNode(children: ReactNode[] | null, styles?: ViewStyle) {
    return (
      <View key={generateRandomString()} style={styles}>
        {children}
      </View>
    );
  }

  getCodeBlockNode(
    text: string,
    containerStyle?: ViewStyle,
    textStyle?: TextStyle
  ) {
    return (
      <ScrollView
        key={generateRandomString()}
        contentContainerStyle={containerStyle}
        horizontal
      >
        <Text style={textStyle}>{text}</Text>
      </ScrollView>
    );
  }

  getBlockquoteNode(children: ReactNode[], styles?: ViewStyle) {
    return (
      <View key={generateRandomString()} style={styles}>
        {children}
      </View>
    );
  }

  getImageNode(uri: string, alt?: string) {
    return <MDImage key={generateRandomString()} uri={uri} alt={alt} />;
  }

  getListNode(
    ordered: boolean,
    li: ReactNode[],
    listStyle?: ViewStyle,
    textStyle?: TextStyle
  ) {
    return (
      <MarkedList
        counterRenderer={ordered ? Decimal : Disc}
        markerTextStyle={textStyle}
        markerBoxStyle={listStyle}
        key={generateRandomString()}
      >
        {li.map((node) => node)}
      </MarkedList>
    );
  }
}

export default Renderer;
