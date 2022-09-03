import type { TextStyle, ViewStyle } from 'react-native';

export interface MarkedStyles {
  container?: ViewStyle;
  em?: TextStyle;
  strong?: TextStyle;
  text?: TextStyle;
  paragraph?: ViewStyle;
  link?: TextStyle;
  blockquote?: ViewStyle;
  h1?: TextStyle;
  h2?: TextStyle;
  h3?: TextStyle;
  h4?: TextStyle;
  h5?: TextStyle;
  h6?: TextStyle;
  codespan?: TextStyle;
  code?: ViewStyle;
}

export type ColorKeys = 'background' | 'code' | 'link' | 'text' | 'border';

export interface Theme {
  colors: Record<ColorKeys, string>;
}
