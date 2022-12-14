import { Linking, ColorSchemeName } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import Renderer from "../Renderer";
import getStyles from "./../../theme/styles";
import type { MarkedStyles } from "./../../theme/types";

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
			describe("getTextNode", () => {
				it("returns a Text node", () => {
					const TextNode = renderer.getTextNode("Hello world", styles.text);

					const r = render(TextNode);
					expect(screen.queryByText("Hello world")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});

				it("returns a wrapped Text node", () => {
					const TextNodeChild = renderer.getTextNode("Hello world", {});
					const TextNode = renderer.getTextNode([TextNodeChild], styles.text);
					const r = render(TextNode);
					expect(screen.queryByText("Hello world")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});

				it("returns a wrapped Text node with styles", () => {
					const TextNodeChild = renderer.getTextNode(
						"Hello world",
						styles.text,
					);
					const TextNode = renderer.getTextNode([TextNodeChild], styles.text);
					const r = render(TextNode);
					expect(screen.queryByText("Hello world")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("getTextLinkNode", () => {
				it("returns a Text Link node", () => {
					const LinkNode = renderer.getTextLinkNode(
						"Link",
						"https://example.com",
						styles.link,
					);
					const r = render(LinkNode);
					expect(screen.queryByText("Link")).toBeTruthy();
					fireEvent.press(screen.queryByText("Link"));
					expect(Linking.openURL).toHaveBeenCalled();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("getImageLinkNode", () => {
				it("returns a Image Link node", () => {
					const LinkNode = renderer.getImageLinkNode(
						"https://example.com",
						"https://dummyimage.com/100x100/fff/aaa",
						"Hello world",
					);
					const tree = render(LinkNode).toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("getViewNode", () => {
				it("returns a paragraph View node", () => {
					const TextNode = renderer.getTextNode("Hello world", styles.text);
					const LinkNode = renderer.getTextLinkNode(
						"Link",
						"https://example.com",
						styles.link,
					);
					const ViewNode = renderer.getViewNode(
						[TextNode, LinkNode],
						styles.paragraph,
					);

					const r = render(ViewNode);
					expect(screen.queryByText("Hello world")).toBeTruthy();
					expect(screen.queryByText("Link")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});

				it("returns a hr View node", () => {
					const ViewNode = renderer.getViewNode(null, styles.hr);
					const r = render(ViewNode);
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("getCodeBlockNode", () => {
				it("returns a Code block (horizontal ScrollView)", () => {
					const CodeBlock = renderer.getCodeBlockNode(
						"print('hello')",
						styles.code,
						styles.em,
					);
					const r = render(CodeBlock);
					expect(screen.queryByText("print('hello')")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("getBlockquoteNode", () => {
				it("returns a Blockquote", () => {
					const TextNode = renderer.getTextNode("Hello world", styles.text);
					const LinkNode = renderer.getTextLinkNode(
						"Link",
						"https://example.com",
						styles.link,
					);
					const Blockquote = renderer.getBlockquoteNode(
						[TextNode, LinkNode],
						styles.blockquote,
					);

					const r = render(Blockquote);
					expect(screen.queryByText("Hello world")).toBeTruthy();
					expect(screen.queryByText("Link")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("getImageNode", () => {
				it("returns a Image", () => {
					const ImageNode = renderer.getImageNode(
						"https://picsum.photos/100/100",
						"Hello world",
					);
					const tree = render(ImageNode).toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("getListNode", () => {
				it("returns Ordered List", () => {
					const TextNode1 = renderer.getTextNode("Hello world 1", styles.li);
					const TextNode2 = renderer.getTextNode("Hello world 2", styles.li);
					const TextNode3 = renderer.getTextNode("Hello world 3", styles.li);
					const OL = renderer.getListNode(
						true,
						[TextNode1, TextNode2, TextNode3],
						styles.list,
						styles.li,
					);
					const r = render(OL);
					expect(screen.queryByText("Hello world 1")).toBeTruthy();
					expect(screen.queryByText("Hello world 2")).toBeTruthy();
					expect(screen.queryByText("Hello world 3")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
				it("returns Un-Ordered List", () => {
					const TextNode1 = renderer.getTextNode("Hello world 1", styles.li);
					const TextNode2 = renderer.getTextNode("Hello world 2", styles.li);
					const TextNode3 = renderer.getTextNode("Hello world 3", styles.li);
					const OL = renderer.getListNode(
						false,
						[TextNode1, TextNode2, TextNode3],
						styles.list,
						styles.li,
					);
					const r = render(OL);
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
