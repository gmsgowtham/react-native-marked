import React, {
	memo,
	type ReactElement,
	type ReactNode,
	useCallback,
} from "react";
import { FlatList, useColorScheme } from "react-native";
import useMarkdown from "../hooks/useMarkdown";
import type { MarkdownProps } from "./types";

/**
 * FlatList cell renderer for a single top-level markdown element.
 *
 * Memoized: `useMarkdown` reuses element instances whose tokens are unchanged
 * (see its element cache), so all unchanged items skip re-rendering on every
 * streaming update instead of re-rendering the whole visible list.
 */
const MarkdownItem = memo(({ node }: { node: ReactNode }) => {
	return node as ReactElement;
});

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

	const rnElements = useMarkdown(value, {
		theme,
		baseUrl,
		renderer,
		colorScheme,
		styles,
		tokenizer,
		hooks,
		selectable,
	});

	const renderItem = useCallback(({ item }: { item: ReactNode }) => {
		return <MarkdownItem node={item} />;
	}, []);

	const keyExtractor = useCallback((item: ReactNode, index: number) => {
		/* Top-level elements carry stable, content-derived keys; prefer them
		 * so insertions above the viewport don't shift every cell. Nulls
		 * (e.g. separators) and foreign nodes fall back to the index. */
		if (React.isValidElement(item) && item.key !== null) {
			return String(item.key);
		}
		return index.toString();
	}, []);

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

/* Memoized: identical props (same value, stable option references) skip the
 * component render entirely, even when a parent triggers a re-render. */
export default memo(Markdown);
