import React, { memo, ReactNode, useCallback } from 'react';
import { Dimensions, FlatList, FlatListProps } from 'react-native';
import { marked } from 'marked';
import Parser from './Parser';

interface MarkdownProps {
  value: string;
  containerWidth?: number;
  flatListProps?: Omit<
    FlatListProps<ReactNode>,
    'data' | 'renderItem' | 'horizontal'
  >;
}

const Markdown = ({ value, containerWidth, flatListProps }: MarkdownProps) => {
  const { width } = Dimensions.get('window');
  const tokens = marked.lexer(value.trim());

  const parser = new Parser({ containerWidth: containerWidth || width });
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
