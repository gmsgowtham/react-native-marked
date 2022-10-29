import type { ReactNode } from 'react';
import type { FlatListProps } from 'react-native';
import type { MarkedStyles, UserTheme } from './../theme/types';

export interface ParserOptions {
  styles?: MarkedStyles;
  baseUrl?: string;
}

export interface MarkdownProps extends ParserOptions {
  value: string;
  flatListProps?: Omit<
    FlatListProps<ReactNode>,
    'data' | 'renderItem' | 'horizontal'
  >;
  theme?: UserTheme;
}
