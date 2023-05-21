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
	MarkedTokenizer,
	type RendererInterface,
	type CustomToken,
	MarkedLexer,
} from "react-native-marked";
import { MD_STRING } from "./const";

class CustomTokenizer extends MarkedTokenizer<CustomToken> {
	paragraph(this: MarkedTokenizer<CustomToken>, src: string) {
		const match = src.match(/^{%(.*?)%}$/);
		if (match?.[1]) {
			const value = match[1].trim();
			const [identifier = "", text = ""] = value.split(" ");
			const token: CustomToken = {
				text,
				identifier,
				type: "custom",
				raw: src,
				tokens: MarkedLexer(text, {
					tokenizer: this as MarkedTokenizer<never>,
				}),
			};
			return token;
		}

		return super.paragraph(src);
	}

	codespan(this: MarkedTokenizer<CustomToken>, src: string) {
		const match = src.match(/^\$+([^\$\n]+?)\$+/);
		if (match?.[1]) {
			const token: CustomToken = {
				type: "custom",
				raw: src,
				text: match[1].trim(),
				identifier: "latex",
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
		text: string,
		_raw: string,
		_children: ReactNode[],
	): ReactNode {
		if (identifier === "latex") {
			return this.code(text.trim(), "latex", {
				flex: 1,
				width: "100%",
				padding: 16,
				minWidth: "100%",
				backgroundColor: "#f6f8fa",
			});
		}
		return null;
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
