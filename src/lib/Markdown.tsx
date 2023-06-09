import React, { memo, useCallback } from "react";
import { FlatList, useColorScheme } from "react-native";
import type { MarkdownProps, Token } from "./types";
import useMarkdown from "../hooks/useMarkdown";
import colors from "../theme/colors";
import type Parser from "./Parser";

const MemoItem = memo(
	({ item, parser }: { item: Token; parser: Parser }) => {
		const elements = parser.parse([item]);
		console.log("elements", elements);
		return <>{elements}</>;
	},
	(prevProps, nextProps) => prevProps.item.raw === nextProps.item.raw,
);

const keyExtractor = (item: Token, index: number) => `${index}.${item.raw}`;

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

	const { tokens, parser } = useMarkdown(value, {
		theme,
		baseUrl,
		renderer,
		colorScheme,
		styles,
		tokenizer,
	});

	const renderItem = useCallback(
		({ item }: { item: Token }) => <MemoItem item={item} parser={parser} />,
		[parser],
	);

	return (
		<FlatList
			removeClippedSubviews={false}
			keyExtractor={keyExtractor}
			maxToRenderPerBatch={8}
			initialNumToRender={8}
			style={{
				backgroundColor:
					colorScheme === "light"
						? colors.light.background
						: colors.dark.background,
			}}
			{...flatListProps}
			data={tokens}
			renderItem={renderItem}
		/>
	);
};

export default memo(Markdown);
