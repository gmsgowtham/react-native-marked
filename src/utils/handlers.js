import { Linking } from "react-native";
export const onLinkPress = (url) => () => {
	Linking.openURL(url)
		.then(() => null)
		.catch((e) => {
			console.warn("URL can't be opened", e);
		});
};
