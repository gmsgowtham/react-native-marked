import { render } from "@testing-library/react-native";
import type { Hooks } from "marked";
import React, { type ReactNode } from "react";
import useMarkdown from "../../hooks/useMarkdown";
import useMarkdownBlocks from "../../hooks/useMarkdownBlocks";
import Markdown from "../Markdown";
import Renderer from "../Renderer";

const BlockIdsProbe = ({
	value,
	onBlocks,
}: {
	value: string;
	onBlocks: (ids: string[]) => void;
}) => {
	const { blocks } = useMarkdownBlocks(value);
	onBlocks(blocks.map((block) => block.id));
	return null;
};

const ElementsProbe = ({
	value,
	hooks,
	onElements,
}: {
	value: string;
	hooks?: Hooks;
	onElements: (elements: ReactNode[]) => void;
}) => {
	const elements = useMarkdown(value, { hooks });
	onElements(elements);
	return null;
};

describe("Prevent FlatList item re-rendering #451", () => {
	it("reuses existing blocks when appending content", () => {
		const paragraphSpy = jest.spyOn(Renderer.prototype, "paragraph");
		const headingSpy = jest.spyOn(Renderer.prototype, "heading");

		const { rerender } = render(<Markdown value={"# Hello\n\nParagraph 1"} />);

		// Reset spies to count only rerender calls
		paragraphSpy.mockClear();
		headingSpy.mockClear();

		rerender(<Markdown value={"# Hello\n\nParagraph 1\n\nParagraph 2"} />);

		// Only new paragraph should trigger paragraph renderer, heading should not re-render
		expect(paragraphSpy).toHaveBeenCalledTimes(1);
		expect(headingSpy).not.toHaveBeenCalled();

		paragraphSpy.mockRestore();
		headingSpy.mockRestore();
	});

	it("does not re-render unchanged blocks when editing middle block", () => {
		const paragraphSpy = jest.spyOn(Renderer.prototype, "paragraph");

		const { rerender } = render(
			<Markdown value={"Paragraph 1\n\nParagraph 2\n\nParagraph 3"} />,
		);
		paragraphSpy.mockClear();

		rerender(
			<Markdown value={"Paragraph 1\n\nEdited Paragraph 2\n\nParagraph 3"} />,
		);

		// Only edited block should re-render (at least 1 call), not all 3
		// With per-index reuse, 1 paragraph should be re-parsed
		expect(paragraphSpy.mock.calls.length).toBe(1);

		paragraphSpy.mockRestore();
	});

	it("supports disableVirtualization via flatListProps=null", () => {
		const { toJSON } = render(
			<Markdown value={"# Hello\n\nWorld"} flatListProps={null} />,
		);
		const tree = toJSON();
		expect(tree).toBeTruthy();
		// Should render via ScrollView, not FlatList
		// FlatList renders as RCTScrollView with VirtualizedList data prop; ScrollView renders simpler
		expect(JSON.stringify(tree)).not.toContain("VirtualizedList");
	});

	it("uses stable keys based on content hash not index", () => {
		const { rerender, toJSON } = render(<Markdown value={"A\n\nB\n\nC"} />);
		const firstTree = JSON.stringify(toJSON());
		rerender(<Markdown value={"A\n\nB\n\nC"} />);
		const secondTree = JSON.stringify(toJSON());
		// Trees should be structurally identical if keys stable
		expect(firstTree).toBe(secondTree);
	});

	it("reuses surviving blocks when prepending content", () => {
		const paragraphSpy = jest.spyOn(Renderer.prototype, "paragraph");

		const { rerender } = render(
			<Markdown value={"Paragraph B\n\nParagraph C"} />,
		);
		paragraphSpy.mockClear();

		rerender(<Markdown value={"Paragraph A\n\nParagraph B\n\nParagraph C"} />);

		// Only the new first block re-parses; B and C keep content-derived ids.
		expect(paragraphSpy).toHaveBeenCalledTimes(1);

		paragraphSpy.mockRestore();
	});

	it("reuses surviving blocks when inserting in the middle", () => {
		const paragraphSpy = jest.spyOn(Renderer.prototype, "paragraph");

		const { rerender } = render(
			<Markdown value={"Paragraph A\n\nParagraph C"} />,
		);
		paragraphSpy.mockClear();

		rerender(<Markdown value={"Paragraph A\n\nParagraph B\n\nParagraph C"} />);

		expect(paragraphSpy).toHaveBeenCalledTimes(1);

		paragraphSpy.mockRestore();
	});

	it("does not re-parse anything when deleting a block", () => {
		const paragraphSpy = jest.spyOn(Renderer.prototype, "paragraph");

		const { rerender } = render(
			<Markdown value={"Paragraph A\n\nParagraph B\n\nParagraph C"} />,
		);
		paragraphSpy.mockClear();

		rerender(<Markdown value={"Paragraph A\n\nParagraph C"} />);

		// A and C are reused by content id; nothing new to parse.
		expect(paragraphSpy).not.toHaveBeenCalled();

		paragraphSpy.mockRestore();
	});

	it("keeps stable ids for surviving blocks across prepend", () => {
		const seen: string[][] = [];
		const onBlocks = (ids: string[]) => {
			seen.push(ids);
		};

		const { rerender } = render(
			<BlockIdsProbe value={"B\n\nC"} onBlocks={onBlocks} />,
		);
		rerender(<BlockIdsProbe value={"A\n\nB\n\nC"} onBlocks={onBlocks} />);

		expect(seen).toHaveLength(2);
		// B and C keep their ids even though their indices shifted.
		expect(seen[1]?.slice(1)).toEqual(seen[0]);
		// All ids unique.
		expect(new Set(seen[1]).size).toBe(seen[1]?.length);
	});

	it("gives unique, stable ids to duplicate blocks", () => {
		const seen: string[][] = [];
		const onBlocks = (ids: string[]) => {
			seen.push(ids);
		};

		const { rerender } = render(
			<BlockIdsProbe value={"Same\n\nSame"} onBlocks={onBlocks} />,
		);
		rerender(<BlockIdsProbe value={"Same\n\nSame"} onBlocks={onBlocks} />);

		expect(seen[0]).toHaveLength(2);
		expect(new Set(seen[0]).size).toBe(2);
		expect(seen[1]).toEqual(seen[0]);
	});

	describe("useMarkdown caching", () => {
		it("bails out when lexer re-runs with identical tokens", () => {
			const seen: ReactNode[][] = [];
			const onElements = (elements: ReactNode[]) => {
				seen.push(elements);
			};

			const { rerender } = render(
				<ElementsProbe
					value={"Hello"}
					onElements={onElements}
					hooks={{} as Hooks}
				/>,
			);
			// New hooks identity forces the elements memo to recompute, but the
			// tokens are identical so the previous array is returned as-is.
			rerender(
				<ElementsProbe
					value={"Hello"}
					onElements={onElements}
					hooks={{} as Hooks}
				/>,
			);

			expect(seen).toHaveLength(2);
			expect(seen[1]).toBe(seen[0]);
		});

		it("only parses appended blocks when value grows", () => {
			const paragraphSpy = jest.spyOn(Renderer.prototype, "paragraph");
			const onElements = () => {};

			const { rerender } = render(
				<ElementsProbe value={"Para 1"} onElements={onElements} />,
			);
			paragraphSpy.mockClear();

			rerender(
				<ElementsProbe value={"Para 1\n\nPara 2"} onElements={onElements} />,
			);

			expect(paragraphSpy).toHaveBeenCalledTimes(1);

			paragraphSpy.mockRestore();
		});

		it("only re-parses the edited block for same-length edits", () => {
			const paragraphSpy = jest.spyOn(Renderer.prototype, "paragraph");
			const onElements = () => {};

			const { rerender } = render(
				<ElementsProbe value={"Para 1\n\nPara 2"} onElements={onElements} />,
			);
			paragraphSpy.mockClear();

			rerender(
				<ElementsProbe value={"Para 1\n\nEdited"} onElements={onElements} />,
			);

			expect(paragraphSpy).toHaveBeenCalledTimes(1);

			paragraphSpy.mockRestore();
		});
	});
});
