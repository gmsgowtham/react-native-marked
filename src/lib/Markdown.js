import React, { memo, useCallback } from "react";
import { FlatList, useColorScheme } from "react-native";
import useMarkdown from "../hooks/useMarkdown";
const Markdown = ({
	value,
	flatListProps,
	theme,
	baseUrl,
	renderer,
	styles,
	tokenizer,
}) => {
	const colorScheme = useColorScheme();
	const rnElements = useMarkdown(value, {
		theme,
		baseUrl,
		renderer,
		colorScheme,
		styles,
		tokenizer,
	});
	const renderItem = useCallback(({ item }) => {
		return item;
	}, []);
	const keyExtractor = useCallback((_, index) => index.toString(), []);
	return React.createElement(FlatList, {
		removeClippedSubviews: false,
		keyExtractor: keyExtractor,
		maxToRenderPerBatch: 8,
		initialNumToRender: 8,
		style: {
			backgroundColor: colorScheme === "light" ? "#ffffff" : "#000000",
		},
		...flatListProps,
		data: rnElements,
		renderItem: renderItem,
	});
};
export default memo(Markdown);
