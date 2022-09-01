import React, { ReactNode, useCallback } from 'react';
import { marked } from 'marked';
import Parser from './Parser';
import { FlatList, FlatListProps } from 'react-native';

interface MarkdownProps {
  value: string;
  contentWidth: number;
  flatListProps?: Omit<
    FlatListProps<ReactNode>,
    'data' | 'renderItem' | 'horizontal'
  >;
}

const Markdown = ({ value, contentWidth, flatListProps }: MarkdownProps) => {
  const tokens = marked.lexer(value.trim());
  const parser = new Parser({ contentWidth });
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

export default Markdown;
