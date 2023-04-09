import { Linking, type ColorSchemeName } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import Renderer from "../Renderer";
import getStyles from "./../../theme/styles";
import type { MarkedStyles } from "./../../theme/types";
import type { ReactElement } from "react";

jest.mock("react-native/Libraries/Linking/Linking", () => ({
	openURL: jest.fn(() => Promise.resolve("mockResolve")),
}));

const renderer = new Renderer();
const userStyles: MarkedStyles = {
	text: {
		fontSize: 24,
	},
	list: {
		padding: 24,
	},
};

describe("Renderer", () => {
	const themes: ColorSchemeName[] = ["light", "dark"];
	themes.forEach((theme) => {
		const styles = getStyles(userStyles, theme);
		describe(`${theme} theme`, () => {
			describe("Text Nodes", () => {
				it("returns a Text node", () => {
					const TextNode = renderer.text("Hello world", styles.text);

					const r = render(TextNode as ReactElement);
					expect(screen.queryByText("Hello world")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});

				it("returns a wrapped Text node", () => {
					const TextNodeChild = renderer.text("Hello world", {});
					const TextNode = renderer.text([TextNodeChild], styles.text);
					const r = render(TextNode as ReactElement);
					expect(screen.queryByText("Hello world")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});

				it("returns a wrapped Text node with styles", () => {
					const TextNodeChild = renderer.text("Hello world", styles.text);
					const TextNode = renderer.text([TextNodeChild], styles.text);
					const r = render(TextNode as ReactElement);
					expect(screen.queryByText("Hello world")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("Link Nodes", () => {
				it("returns a Text Link node", () => {
					const LinkNode = renderer.link(
						"Link",
						"https://example.com",
						styles.link,
					);
					const r = render(LinkNode as ReactElement);
					expect(screen.queryByText("Link")).toBeTruthy();
					fireEvent.press(screen.queryByText("Link"));
					expect(Linking.openURL).toHaveBeenCalled();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("getImageLinkNode", () => {
				it("returns a Image Link node", () => {
					const LinkNode = renderer.linkImage(
						"https://example.com",
						"https://dummyimage.com/100x100/fff/aaa",
						"Hello world",
					);
					const tree = render(LinkNode as ReactElement).toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("View Nodes", () => {
				it("returns a paragraph View node", () => {
					const TextNode = renderer.text("Hello world", styles.text);
					const LinkNode = renderer.link(
						"Link",
						"https://example.com",
						styles.link,
					);
					const ViewNode = renderer.paragraph(
						[TextNode, LinkNode],
						styles.paragraph,
					);

					const r = render(ViewNode as ReactElement);
					expect(screen.queryByText("Hello world")).toBeTruthy();
					expect(screen.queryByText("Link")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});

				it("returns a hr View node", () => {
					const ViewNode = renderer.hr(styles.hr);
					const r = render(ViewNode as ReactElement);
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("Table Nodes", () => {
				it("returns a Table", () => {
					const TextNode1 = renderer.text("Hello world 1");
					const TextNode2 = renderer.text("Hello world 2", styles.strong);
					const TextNode3 = renderer.text("Hello world 3", styles.em);
					const TextNode4 = renderer.text("Hello world 4", styles.text);
					const TextNode5 = renderer.text("Hello world 5", styles.link);
					const headers = [[TextNode1], [TextNode2]];
					const rows = [[[TextNode3]], [[TextNode4, TextNode5]]];
					const Table = renderer.table(
						headers,
						rows,
						styles.table,
						styles.tableRow,
						styles.tableCell,
					);
					const r = render(Table as ReactElement);
					expect(screen.queryByText("Hello world 1")).toBeTruthy();
					expect(screen.queryByText("Hello world 2")).toBeTruthy();
					expect(screen.queryByText("Hello world 3")).toBeTruthy();
					expect(screen.queryByText("Hello world 4")).toBeTruthy();
					expect(screen.queryByText("Hello world 5")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
				it("returns a Table without styles", () => {
					const TextNode1 = renderer.text("Hello world 1");
					const TextNode2 = renderer.text("Hello world 2", styles.strong);
					const TextNode3 = renderer.text("Hello world 3", styles.em);
					const TextNode4 = renderer.text("Hello world 4", styles.text);
					const TextNode5 = renderer.text("Hello world 5", styles.link);
					const headers = [[TextNode1], [TextNode2]];
					const rows = [[[TextNode3]], [[TextNode4, TextNode5]]];
					const Table = renderer.table(headers, rows);
					const r = render(Table as ReactElement);
					expect(screen.queryByText("Hello world 1")).toBeTruthy();
					expect(screen.queryByText("Hello world 2")).toBeTruthy();
					expect(screen.queryByText("Hello world 3")).toBeTruthy();
					expect(screen.queryByText("Hello world 4")).toBeTruthy();
					expect(screen.queryByText("Hello world 5")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("getCodeBlockNode", () => {
				it("returns a Code block (horizontal ScrollView)", () => {
					const CodeBlock = renderer.code(
						"print('hello')",
						"",
						styles.code,
						styles.em,
					);
					const r = render(CodeBlock as ReactElement);
					expect(screen.queryByText("print('hello')")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("getBlockquoteNode", () => {
				it("returns a Blockquote", () => {
					const TextNode = renderer.text("Hello world", styles.text);
					const LinkNode = renderer.link(
						"Link",
						"https://example.com",
						styles.link,
					);
					const Blockquote = renderer.blockquote(
						[TextNode, LinkNode],
						styles.blockquote,
					);

					const r = render(Blockquote as ReactElement);
					expect(screen.queryByText("Hello world")).toBeTruthy();
					expect(screen.queryByText("Link")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("getImageNode", () => {
				it("returns a Image", () => {
					const ImageNode = renderer.image(
						"https://picsum.photos/100/100",
						"Hello world",
					);
					const tree = render(ImageNode as ReactElement).toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("getListNode", () => {
				it("returns Ordered List", () => {
					const TextNode1 = renderer.text("Hello world 1", styles.li);
					const TextNode2 = renderer.text("Hello world 2", styles.li);
					const TextNode3 = renderer.text("Hello world 3", styles.li);
					const OL = renderer.list(
						true,
						[TextNode1, TextNode2, TextNode3],
						styles.list,
						styles.li,
					);
					const r = render(OL as ReactElement);
					expect(screen.queryByText("Hello world 1")).toBeTruthy();
					expect(screen.queryByText("Hello world 2")).toBeTruthy();
					expect(screen.queryByText("Hello world 3")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
				it("returns Un-Ordered List", () => {
					const TextNode1 = renderer.text("Hello world 1", styles.li);
					const TextNode2 = renderer.text("Hello world 2", styles.li);
					const TextNode3 = renderer.text("Hello world 3", styles.li);
					const OL = renderer.list(
						false,
						[TextNode1, TextNode2, TextNode3],
						styles.list,
						styles.li,
					);
					const r = render(OL as ReactElement);
					expect(screen.queryByText("Hello world 1")).toBeTruthy();
					expect(screen.queryByText("Hello world 2")).toBeTruthy();
					expect(screen.queryByText("Hello world 3")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
		});
	});
});
