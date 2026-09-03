import React, { useCallback } from "react";
import { FlatList, ScrollView, useColorScheme, View } from "react-native";
import useMarkdownBlocks from "../hooks/useMarkdownBlocks";
import MarkdownBlockView from "./MarkdownBlock";
import type { MarkdownBlock, MarkdownProps } from "./types";

const Markdown = ({
	value,
	flatListProps,
	theme,
	baseUrl,
	renderer,
	styles,
	tokenizer,
	hooks,
	selectable,
}: MarkdownProps) => {
	const colorScheme = useColorScheme();

	const { blocks, parser } = useMarkdownBlocks(value, {
		theme,
		baseUrl,
		renderer,
		colorScheme,
		styles,
		tokenizer,
		hooks,
		selectable,
	});

	const renderItem = useCallback(
		({ item }: { item: MarkdownBlock }) => {
			return (
				<MarkdownBlockView
					token={item.token}
					parser={parser}
					blockId={item.id}
				/>
			);
		},
		[parser],
	);

	const keyExtractor = useCallback((item: MarkdownBlock) => item.id, []);

	const backgroundStyle = {
		backgroundColor: colorScheme === "light" ? "#ffffff" : "#000000",
	};

	// Opt-out of virtualization: when flatListProps is explicitly null, render with ScrollView
	if (flatListProps === null) {
		return (
			<ScrollView style={backgroundStyle}>
				{blocks.map((block) => (
					<View key={block.id}>
						<MarkdownBlockView
							token={block.token}
							parser={parser}
							blockId={block.id}
						/>
					</View>
				))}
			</ScrollView>
		);
	}

	return (
		<FlatList
			removeClippedSubviews={false}
			keyExtractor={keyExtractor}
			maxToRenderPerBatch={8}
			initialNumToRender={8}
			style={backgroundStyle}
			{...flatListProps}
			data={blocks}
			renderItem={renderItem}
		/>
	);
};

export default Markdown;
