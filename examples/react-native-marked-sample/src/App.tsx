import React, { type ReactNode } from "react";
import {
	SafeAreaView,
	StyleSheet,
	StatusBar,
	useColorScheme,
	Text,
	type TextStyle,
} from "react-native";
import Markdown, {
	Renderer,
	type RendererInterface,
} from "react-native-marked";
import { MD_STRING } from "./const";

class CustomRenderer extends Renderer implements RendererInterface {
	constructor() {
		super();
	}
	codespan(text: string, _styles?: TextStyle): ReactNode {
		return (
			<Text key={this.getKey()} style={{ backgroundColor: "#ff0000" }}>
				{text}
			</Text>
		);
	}
}

const renderer = new CustomRenderer();

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
					renderer={renderer}
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
