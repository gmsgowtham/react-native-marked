import React, { Fragment, type ReactNode } from "react";
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	type TextStyle,
	useColorScheme,
	View,
} from "react-native";
import {
	MarkedHooks,
	MarkedTokenizer,
	Renderer,
	type RendererInterface,
	type Tokens,
	useMarkdown,
} from "react-native-marked";
import { MD_STRING } from "./const";
import ReactComponentsExample from "./ReactComponentsExample";

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
		return src;
	}
}

const hooks = new CustomHooks();

function StandardMarkdownSection() {
	const elements = useMarkdown(MD_STRING, {
		renderer,
		tokenizer,
		hooks,
	});

	return (
		<>
			{elements.map((element, index) => (
				<Fragment key={`md_${index}`}>{element as ReactNode}</Fragment>
			))}
		</>
	);
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
			<SafeAreaView style={styles.safeArea}>
				<ScrollView contentContainerStyle={styles.container}>
					<StandardMarkdownSection />
					<View style={styles.divider} />
					<ReactComponentsExample />
				</ScrollView>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	container: {
		paddingHorizontal: 16,
		paddingBottom: 32,
	},
	divider: {
		borderTopColor: "#ccc",
		borderTopWidth: 1,
		marginVertical: 24,
	},
});
