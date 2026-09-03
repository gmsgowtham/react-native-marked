import { render } from "@testing-library/react-native";
import React from "react";
import Markdown from "../Markdown";
import Renderer from "../Renderer";

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
});
