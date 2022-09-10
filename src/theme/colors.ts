import type { ColorKeys } from './types';

const colors: Record<'light' | 'dark', Record<ColorKeys, string>> = {
  light: {
    background: '#ffffff',
    code: '#f6f8fa',
    link: '#58a6ff',
    text: '#333333',
    border: '#d0d7de',
  },
  dark: {
    background: '#000000',
    code: '#161b22',
    link: '#58a6ff',
    text: '#ffffff',
    border: '#30363d',
  },
};

export default colors;
