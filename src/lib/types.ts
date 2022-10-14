import type { ReactNode } from 'react';
import type {
  ImageStyle,
  TextStyle,
  ViewStyle,
  FlatListProps,
} from 'react-native';
import type { MarkedStyles } from './../theme/types';

export type TextStyleProp = TextStyle | undefined;
export type ViewStyleProp = ViewStyle | undefined;
export type ImageStyleProp = ImageStyle | undefined;
export type CustomStyleProp = ViewStyle | TextStyle | ImageStyle | undefined;

export interface ParserOptions {
  styles?: MarkedStyles;
}

export interface MarkdownProps {
  value: string;
  flatListProps?: Omit<
    FlatListProps<ReactNode>,
    'data' | 'renderItem' | 'horizontal'
  >;
  styles?: MarkedStyles;
}
