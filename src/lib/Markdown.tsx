import React, { useCallback, type ReactElement, type ReactNode } from "react";
import { FlatList, useColorScheme } from "react-native";
import type { MarkdownProps } from "./types";
import useMarkdown from "../hooks/useMarkdown";

const Markdown = ({
	value,
	flatListProps,
	theme,
	baseUrl,
	renderer,
	styles,
	tokenizer,
}: MarkdownProps) => {
	const colorScheme = useColorScheme();

	const rnElements = useMarkdown(value, {
		theme,
		baseUrl,
		renderer,
		colorScheme,
		styles,
		tokenizer,
	});

	const renderItem = useCallback(({ item }: { item: ReactNode }) => {
		return item as ReactElement;
	}, []);

	const keyExtractor = useCallback(
		(_: ReactNode, index: number) => index.toString(),
		[],
	);

	return (
		<FlatList
			removeClippedSubviews={false}
			keyExtractor={keyExtractor}
			maxToRenderPerBatch={8}
			initialNumToRender={8}
			style={{
				backgroundColor: colorScheme === "light" ? "#ffffff" : "#000000",
			}}
			{...flatListProps}
			data={rnElements}
			renderItem={renderItem}
		/>
	);
};

export default Markdown;
