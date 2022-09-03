import type { ColorSchemeName } from 'react-native';
import colors from './colors';
import type { Theme } from './types';

export const getTheme = (theme: ColorSchemeName): Theme => {
  return {
    colors: colors[theme || 'light'],
  };
};
