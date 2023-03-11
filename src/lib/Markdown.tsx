import React, {
	memo,
	ReactElement,
	ReactNode,
	useCallback,
	useMemo,
} from "react";
import { FlatList, useColorScheme } from "react-native";
import { marked } from "marked";
import Parser from "./Parser";
import Renderer from "./Renderer";
import getStyles from "../theme/styles";
import type { MarkdownProps } from "./types";

const Markdown = ({
	value,
	flatListProps,
	theme,
	baseUrl,
	renderer: customRenderer,
	styles: userStyles,
}: MarkdownProps) => {
	const colorScheme = useColorScheme();
	const styles = useMemo(
		() => getStyles(userStyles, colorScheme, theme),
		[userStyles, colorScheme, theme],
	);

	const parser = useMemo(
		() =>
			new Parser({
				styles,
				baseUrl,
				renderer: customRenderer ?? new Renderer(),
			}),
		[styles, baseUrl],
	);

	const rnElements = useMemo(() => {
		const tokens = marked.lexer(value, { mangle: false, gfm: true });
		return parser.parse(tokens);
	}, [value, styles, baseUrl]);

	const renderItem = useCallback(({ item }: { item: ReactNode }) => {
		return item as ReactElement;
	}, []);

	const keyExtractor = useCallback(
		(_: ReactNode, index: number) => index.toString(),
		[],
	);

	return (
		<FlatList
			removeClippedSubviews
			keyExtractor={keyExtractor}
			maxToRenderPerBatch={8}
			initialNumToRender={8}
			style={styles.container}
			{...flatListProps}
			data={rnElements}
			renderItem={renderItem}
		/>
	);
};

export default memo(Markdown);
