import React, { useCallback, useMemo } from "react";
import {
	FlatList,
	type FlatListProps,
	ScrollView,
	useColorScheme,
} from "react-native";
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

	const backgroundStyle = useMemo(
		() => ({
			backgroundColor: colorScheme === "light" ? "#ffffff" : "#000000",
		}),
		[colorScheme],
	);

	// Opt-out of virtualization: when flatListProps is explicitly null, render with ScrollView
	if (flatListProps === null) {
		return (
			<ScrollView style={backgroundStyle}>
				{blocks.map((block) => (
					<MarkdownBlockView
						key={block.id}
						token={block.token}
						parser={parser}
						blockId={block.id}
					/>
				))}
			</ScrollView>
		);
	}

	// `ReactNode`-flavored props are accepted for backward compatibility (see
	// `MarkdownProps.flatListProps`); at runtime the items are always
	// `MarkdownBlock`s and the remaining list props don't depend on the item
	// type, so narrowing here is safe.
	const restListProps = flatListProps as
		| Omit<FlatListProps<MarkdownBlock>, "data" | "renderItem" | "horizontal">
		| undefined;

	return (
		<FlatList
			removeClippedSubviews={false}
			keyExtractor={keyExtractor}
			maxToRenderPerBatch={8}
			initialNumToRender={8}
			style={backgroundStyle}
			{...restListProps}
			data={blocks}
			renderItem={renderItem}
		/>
	);
};

export default Markdown;
