import { Linking } from 'react-native';

export const onLinkPress = (url: string) => () => {
  try {
    Linking.openURL(url);
  } catch (e) {
    console.warn("URL can't be opened", e);
  }
};
