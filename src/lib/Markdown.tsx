import React, { memo, ReactNode, useCallback } from 'react';
import { Dimensions, FlatList, FlatListProps } from 'react-native';
import { marked } from 'marked';
import Parser from './Parser';
import type { MarkedStyles } from '../types';

interface MarkdownProps {
  value: string;
  containerWidth?: number;
  flatListProps?: Omit<
    FlatListProps<ReactNode>,
    'data' | 'renderItem' | 'horizontal'
  >;
  styles?: MarkedStyles;
}

const Markdown = ({
  value,
  containerWidth,
  flatListProps,
  styles,
}: MarkdownProps) => {
  const { width } = Dimensions.get('window');
  const tokens = marked.lexer(value.trim());

  const parser = new Parser({
    containerWidth: containerWidth || width,
    styles,
  });
  const rnElements = parser.parse(tokens);

  const renderItem = useCallback(({ item }: { item: ReactNode }) => {
    return <>{item}</>;
  }, []);

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  return (
    <FlatList
      keyExtractor={keyExtractor}
      maxToRenderPerBatch={8}
      initialNumToRender={8}
      removeClippedSubviews
      {...flatListProps}
      data={rnElements}
      renderItem={renderItem}
    />
  );
};

export default memo(Markdown);
