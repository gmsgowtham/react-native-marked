import React, { ReactNode } from "react";
import {
	SafeAreaView,
	StyleSheet,
	StatusBar,
	useColorScheme,
	Text,
	TextStyle,
} from "react-native";
import Markdown, { Renderer } from "react-native-marked";

import { MD_STRING } from "./const";

class CustomRenderer extends Renderer {
	constructor() {
		super();
	}

	link = (
		children: ReactNode[] | string,
		_href: string,
		styles?: TextStyle,
	) => {
		console.log("child");
		return (
			<Text key={this.getKey()} style={styles}>
				{children}
			</Text>
		);
	};
}

export default function App() {
	const theme = useColorScheme();
	const isLightTheme = theme === "light";
	return (
		<>
			<StatusBar
				barStyle={isLightTheme ? "dark-content" : "light-content"}
				backgroundColor={isLightTheme ? "#fff" : "#000"}
			/>
			<SafeAreaView>
				<Markdown
					value={MD_STRING}
					flatListProps={{
						contentContainerStyle: styles.container,
					}}
					renderer={new CustomRenderer()}
					styles={{
						link: {
							color: "#ff0000",
						},
					}}
				/>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
	},
});
