import { ColorSchemeName, StyleSheet } from 'react-native';
import { getTheme } from './theme';
import type { MarkedStyles, Theme } from './types';

const getFontStyles = (theme: Theme) => {
  return StyleSheet.create({
    regular: {
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.text,
    },
    heading: {
      fontWeight: '500',
      color: theme.colors.text,
    },
  });
};

const getStyles = (
  userStyles?: MarkedStyles,
  colorScheme?: ColorSchemeName
): MarkedStyles => {
  const theme = getTheme(colorScheme || 'light');
  const fontStyle = getFontStyles(theme);
  const defaultStyles = StyleSheet.create<MarkedStyles>({
    container: {
      backgroundColor: theme.colors.background,
    },
    em: {
      ...fontStyle.regular,
      fontStyle: 'italic',
    },
    strong: {
      ...fontStyle.regular,
      fontWeight: 'bold',
    },
    text: { ...fontStyle.regular },
    paragraph: {
      ...fontStyle.regular,
      paddingVertical: 8,
    },
    link: {
      ...fontStyle.regular,
      fontStyle: 'italic',
      color: theme.colors.link,
    },
    blockquote: {
      borderLeftColor: theme.colors.border,
      paddingLeft: 16,
      borderLeftWidth: 5,
      opacity: 0.8,
    },
    h1: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: 'bold',
      paddingVertical: 8,
      letterSpacing: 0,
    },
    h2: {
      ...fontStyle.heading,
      fontSize: 28,
      lineHeight: 36,
      paddingVertical: 8,
    },
    h3: {
      ...fontStyle.heading,
      fontSize: 24,
      lineHeight: 32,
    },
    h4: {
      ...fontStyle.heading,
      fontSize: 22,
      lineHeight: 28,
    },
    h5: {
      ...fontStyle.regular,
      ...fontStyle.heading,
    },
    h6: {
      ...fontStyle.heading,
      fontSize: 14,
      lineHeight: 20,
    },
    codespan: {
      ...fontStyle.regular,
      fontStyle: 'italic',
      backgroundColor: theme.colors.code,
      fontWeight: '300',
    },
    code: {
      padding: 16,
      backgroundColor: theme.colors.code,
      minWidth: '100%',
    },
    hr: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      marginVertical: 4,
    },
    li: {
      ...fontStyle.regular,
      flexShrink: 1,
    },
  });

  return {
    ...defaultStyles,
    ...userStyles,
  };
};

export default getStyles;
