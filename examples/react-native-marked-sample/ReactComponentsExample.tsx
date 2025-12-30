import React, { Fragment, type ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
	type ReactComponentRegistry,
	ReactComponentRegistryProvider,
	useMarkdownWithComponents,
} from "react-native-marked";
import { MARKDOWN_WITH_COMPONENTS } from "./const";

const components: ReactComponentRegistry = {
	Button: ({ props }) => (
		<Pressable
			style={styles.button}
			onPress={() => console.log(`Button pressed: ${props.label}`)}
		>
			<Text style={styles.buttonText}>{String(props.label ?? "Click me")}</Text>
		</Pressable>
	),
	InfoBox: ({ props, children }) => (
		<View style={styles.infoBox}>
			{props.title && (
				<Text style={styles.infoTitle}>{String(props.title)}</Text>
			)}
			<Text style={styles.infoContent}>{children as ReactNode}</Text>
		</View>
	),
	Highlight: ({ children }) => (
		<View style={styles.highlight}>
			<Text>{children as ReactNode}</Text>
		</View>
	),
};

function MarkdownContent() {
	const elements = useMarkdownWithComponents(MARKDOWN_WITH_COMPONENTS);

	return (
		<>
			{elements.map((element, index) => (
				<Fragment key={`el_${index}`}>{element as ReactNode}</Fragment>
			))}
		</>
	);
}

export default function ReactComponentsExample() {
	return (
		<ReactComponentRegistryProvider components={components}>
			<MarkdownContent />
		</ReactComponentRegistryProvider>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#007AFF",
		borderRadius: 8,
		marginVertical: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	buttonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
		textAlign: "center",
	},
	infoBox: {
		backgroundColor: "#E3F2FD",
		borderRadius: 8,
		marginVertical: 8,
		padding: 16,
	},
	infoTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 4,
	},
	infoContent: {
		fontSize: 14,
	},
	highlight: {
		backgroundColor: "#FFF3E0",
		borderLeftColor: "#FF9800",
		borderLeftWidth: 4,
		marginVertical: 8,
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
});
