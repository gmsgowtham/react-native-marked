import React, { type ReactNode } from "react";
import {
	SafeAreaView,
	StyleSheet,
	StatusBar,
	useColorScheme,
	Text,
	type TextStyle,
	View,
} from "react-native";
import Markdown, {
	Renderer,
	MarkedTokenizer,
	type RendererInterface,
	type CustomToken,
	MarkedLexer,
} from "react-native-marked";
import { MD_STRING } from "./const";

class CustomTokenizer extends MarkedTokenizer<CustomToken> {
	codespan(this: MarkedTokenizer<CustomToken>, src: string) {
		const match = src.match(/^\$+([^\$\n]+?)\$+/);
		if (match?.[1]) {
			const token: CustomToken = {
				type: "custom",
				raw: match[0],
				identifier: "latex",
				args: {
					text: match[1].trim(),
				},
			};
			return token;
		}

		return super.codespan(src);
	}
}

const tokenizer = new CustomTokenizer();

class CustomRenderer extends Renderer implements RendererInterface {
	codespan(text: string, _styles?: TextStyle): ReactNode {
		return (
			<Text key={this.getKey()} style={{ backgroundColor: "#ff0000" }}>
				{text}
			</Text>
		);
	}
	custom(
		identifier: string,
		_raw: string,
		_children: ReactNode[] = [],
		args: Record<string, unknown> = {},
	): ReactNode {
		if (identifier === "latex" && args.text) {
			return this.code(args.text as string, "latex", {
				flex: 1,
				width: "100%",
				padding: 16,
				minWidth: "100%",
				backgroundColor: "#f6f8fa",
			});
		}
		return null;
	}

	link(uri: string) {
		return (
			<View style={{ width: "100%" }} key={this.getKey()}>
				<Text style={{ textDecorationLine: "underline" }}>{uri}</Text>
				<View style={{ width: "100%", height: 150, backgroundColor: "blue" }} />
			</View>
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
					tokenizer={tokenizer}
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
