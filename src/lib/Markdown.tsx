import React, { ReactNode } from 'react';
import { marked } from 'marked';
import Parser from './Parser';
import { FlatList, FlatListProps } from 'react-native';

interface MarkdownProps {
  value: string;
  contentWidth: number;
  listProps?: Omit<
    FlatListProps<ReactNode>,
    'data' | 'renderItem' | 'horizontal'
  >;
}

const Markdown = ({ value, contentWidth, listProps }: MarkdownProps) => {
  const tokens = marked.lexer(value.trim());
  const parser = new Parser({ contentWidth });
  const rnElements = parser.parse(tokens);

  const renderItem = ({ item }: { item: ReactNode }) => {
    return <>{item}</>;
  };

  return (
    <FlatList
      keyExtractor={(_, index) => index.toString()}
      maxToRenderPerBatch={5}
      initialNumToRender={5}
      removeClippedSubviews
      {...listProps}
      data={rnElements}
      renderItem={renderItem}
    />
  );
};

export default Markdown;
