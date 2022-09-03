import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export interface MarkedStyles {
  em?: TextStyle;
  strong?: TextStyle;
  text?: TextStyle;
  paragraph?: ViewStyle;
  link?: TextStyle;
  blockquoteText?: TextStyle;
  blockquoteContainer?: ViewStyle;
  h1?: TextStyle;
  h2?: TextStyle;
  h3?: TextStyle;
  h4?: TextStyle;
  h5?: TextStyle;
  h6?: TextStyle;
  image?: ImageStyle;
  codespan?: TextStyle;
  code?: ViewStyle;
}
