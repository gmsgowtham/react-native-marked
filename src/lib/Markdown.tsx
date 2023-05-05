import React, {
	memo,
	useCallback,
	type ReactElement,
	type ReactNode,
} from "react";
import { FlatList, useColorScheme } from "react-native";
import type { MarkdownProps } from "./types";
import useMarkdown from "../hooks/useMarkdown";
import colors from "../theme/colors";

const Markdown = ({
	value,
	flatListProps,
	theme,
	baseUrl,
	renderer,
	styles,
}: MarkdownProps) => {
	const colorScheme = useColorScheme();

	const rnElements = useMarkdown(value, {
		theme,
		baseUrl,
		renderer,
		colorScheme,
		styles,
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
				backgroundColor:
					colorScheme === "light"
						? colors.light.background
						: colors.dark.background,
			}}
			{...flatListProps}
			data={rnElements}
			renderItem={renderItem}
		/>
	);
};

export default memo(Markdown);
