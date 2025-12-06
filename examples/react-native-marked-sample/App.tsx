import React, { type ReactNode } from "react";
import {
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	type TextStyle,
	useColorScheme,
} from "react-native";
import Markdown, {
	MarkedHooks,
	MarkedTokenizer,
	Renderer,
	type RendererInterface,
	type Tokens,
} from "react-native-marked";
import { MD_STRING } from "./const";

class CustomTokenizer extends MarkedTokenizer {
	codespan(this: MarkedTokenizer, src: string): Tokens.Codespan | undefined {
		const match = src.match(/^\$+([^$\n]+?)\$+/);
		if (match?.[1]) {
			return {
				type: "codespan",
				raw: match[0],
				text: match[1].trim(),
			};
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
}

const renderer = new CustomRenderer();

class CustomHooks extends MarkedHooks {
	emStrongMask(src: string): string {
		// mask part of the content that should not be interpreted as Markdown em/strong delimiters.
		return src;
	}
}

const hooks = new CustomHooks();

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
					hooks={hooks}
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
