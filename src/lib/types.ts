import type { ReactNode } from 'react';
import type { FlatListProps } from 'react-native';
import type { MarkedStyles } from './../theme/types';

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
