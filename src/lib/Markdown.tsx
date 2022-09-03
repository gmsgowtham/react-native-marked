import React, { memo, ReactNode, useCallback, useMemo } from 'react';
import {
  Dimensions,
  FlatList,
  FlatListProps,
  useColorScheme,
} from 'react-native';
import { marked } from 'marked';
import Parser from './Parser';
import getStyles from '../theme/styles';
import type { MarkedStyles } from '../theme/types';

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
  styles: userStyles,
}: MarkdownProps) => {
  const { width } = Dimensions.get('window');
  const systemTheme = useColorScheme();
  const styles = useMemo(
    () => getStyles(userStyles, systemTheme),
    [userStyles, systemTheme]
  );

  const rnElements = useMemo(() => {
    const parser = new Parser({
      styles,
      containerWidth: containerWidth || width,
    });
    const tokens = marked.lexer(value.trim());

    return parser.parse(tokens);
  }, [value, styles, containerWidth, width]);

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
      style={styles.container}
      {...flatListProps}
      data={rnElements}
      renderItem={renderItem}
    />
  );
};

export default memo(Markdown);
