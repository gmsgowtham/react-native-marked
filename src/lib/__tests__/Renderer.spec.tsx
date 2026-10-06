import {
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react-native";
import React, { type ReactElement } from "react";
import { type ColorSchemeName, Linking } from "react-native";
import getStyles from "../../theme/styles";
import type { MarkedStyles } from "../../theme/types";
import Markdown from "../Markdown";
import Renderer from "../Renderer";

jest.mock("react-native/Libraries/Linking/Linking", () => ({
	openURL: jest.fn(() => Promise.resolve("mockResolve")),
}));

const renderer = new Renderer();
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="64px" height="64px" viewBox="0 0 64 64"><path d="M0 0h64v64H0z"/></svg>`;
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
	for (const theme of themes) {
		const styles = getStyles(userStyles, theme);
		describe(`${theme} theme`, () => {
			describe("Text Nodes", () => {
				it("returns a Text node", async () => {
					const TextNode = renderer.text("Hello world", styles.text);

					const r = await render(TextNode as ReactElement);
					expect(screen.queryByText("Hello world")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});

				it("returns a wrapped Text node", async () => {
					const TextNodeChild = renderer.text("Hello world", {});
					const TextNode = renderer.text([TextNodeChild], styles.text);
					const r = await render(TextNode as ReactElement);
					expect(screen.queryByText("Hello world")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});

				it("returns a wrapped Text node with styles", async () => {
					const TextNodeChild = renderer.text("Hello world", styles.text);
					const TextNode = renderer.text([TextNodeChild], styles.text);
					const r = await render(TextNode as ReactElement);
					expect(screen.queryByText("Hello world")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("Link Nodes", () => {
				it("returns a Text Link node", async () => {
					const LinkNode = renderer.link(
						"Link",
						"https://example.com",
						styles.link,
					);
					const r = await render(LinkNode as ReactElement);
					expect(screen.queryByText("Link")).toBeTruthy();
					const link = screen.queryByText("Link");
					if (link) {
						await fireEvent.press(link);
					}
					expect(Linking.openURL).toHaveBeenCalled();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("getImageLinkNode", () => {
				it("returns a Image Link node", async () => {
					const LinkNode = renderer.linkImage(
						"https://example.com",
						"https://dummyimage.com/100x100/fff/aaa",
						"Hello world",
					);
					await render(LinkNode as ReactElement);
					await waitFor(() => {
						expect(screen.toJSON()).toMatchSnapshot();
					});
				});
			});
			describe("View Nodes", () => {
				it("returns a paragraph View node", async () => {
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

					const r = await render(ViewNode as ReactElement);
					expect(screen.queryByText("Hello world")).toBeTruthy();
					expect(screen.queryByText("Link")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});

				it("returns a hr View node", async () => {
					const ViewNode = renderer.hr(styles.hr);
					const r = await render(ViewNode as ReactElement);
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("Table Nodes", () => {
				it("returns a Table", async () => {
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
					const r = await render(Table as ReactElement);
					expect(screen.queryByText("Hello world 1")).toBeTruthy();
					expect(screen.queryByText("Hello world 2")).toBeTruthy();
					expect(screen.queryByText("Hello world 3")).toBeTruthy();
					expect(screen.queryByText("Hello world 4")).toBeTruthy();
					expect(screen.queryByText("Hello world 5")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
				it("returns a Table without styles", async () => {
					const TextNode1 = renderer.text("Hello world 1");
					const TextNode2 = renderer.text("Hello world 2", styles.strong);
					const TextNode3 = renderer.text("Hello world 3", styles.em);
					const TextNode4 = renderer.text("Hello world 4", styles.text);
					const TextNode5 = renderer.text("Hello world 5", styles.link);
					const headers = [[TextNode1], [TextNode2]];
					const rows = [[[TextNode3]], [[TextNode4, TextNode5]]];
					const Table = renderer.table(headers, rows);
					const r = await render(Table as ReactElement);
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
				it("returns a Code block (horizontal ScrollView)", async () => {
					const CodeBlock = renderer.code(
						"print('hello')",
						"",
						styles.code,
						styles.em,
					);
					const r = await render(CodeBlock as ReactElement);
					expect(screen.queryByText("print('hello')")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("getBlockquoteNode", () => {
				it("returns a Blockquote", async () => {
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

					const r = await render(Blockquote as ReactElement);
					expect(screen.queryByText("Hello world")).toBeTruthy();
					expect(screen.queryByText("Link")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
			describe("getImageNode", () => {
				const originalFetch = global.fetch;

				const mockSvgFetch = () => {
					global.fetch = jest.fn(() =>
						Promise.resolve({
							status: 200,
							text: () => Promise.resolve(SVG),
						} as Response),
					);
				};

				afterEach(() => {
					global.fetch = originalFetch;
				});

				it("returns a Image", async () => {
					const ImageNode = renderer.image(
						"https://picsum.photos/100/100",
						"Hello world",
					);
					await render(ImageNode as ReactElement);
					await waitFor(() => {
						expect(screen.toJSON()).toMatchSnapshot();
					});
				});

				it("returns a SVG with the alt text as accessibility label", async () => {
					mockSvgFetch();
					const ImageNode = renderer.image(
						"https://example.com/logo.svg",
						"Logo",
					);
					await render(ImageNode as ReactElement);
					const Svg = await screen.findByTestId("react-native-marked-md-svg");
					expect(Svg.props.accessibilityLabel).toBe("Logo");
				});

				it("returns a SVG with the title as accessibility label when alt is absent", async () => {
					mockSvgFetch();
					const ImageNode = renderer.image(
						"https://example.com/logo.svg",
						undefined,
						undefined,
						"Logo title",
					);
					await render(ImageNode as ReactElement);
					const Svg = await screen.findByTestId("react-native-marked-md-svg");
					expect(Svg.props.accessibilityLabel).toBe("Logo title");
				});

				it("returns a SVG for a uri with a query string", async () => {
					mockSvgFetch();
					const ImageNode = renderer.image(
						"https://example.com/logo.svg?v=1",
						"Logo",
					);
					await render(ImageNode as ReactElement);
					expect(
						await screen.findByTestId("react-native-marked-md-svg"),
					).toBeTruthy();
				});

				it("returns a SVG for a uri with an upper case extension and a fragment", async () => {
					mockSvgFetch();
					const ImageNode = renderer.image(
						"https://example.com/LOGO.SVG#top",
						"Logo",
					);
					await render(ImageNode as ReactElement);
					expect(
						await screen.findByTestId("react-native-marked-md-svg"),
					).toBeTruthy();
				});
			});
			describe("getListNode", () => {
				it("returns Ordered List", async () => {
					const TextNode1 = renderer.text("Hello world 1", styles.li);
					const TextNode2 = renderer.text("Hello world 2", styles.li);
					const TextNode3 = renderer.text("Hello world 3", styles.li);
					const OL = renderer.list(
						true,
						[TextNode1, TextNode2, TextNode3],
						styles.list,
						styles.li,
					);
					const r = await render(OL as ReactElement);
					expect(screen.queryByText("Hello world 1")).toBeTruthy();
					expect(screen.queryByText("Hello world 2")).toBeTruthy();
					expect(screen.queryByText("Hello world 3")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
				it("returns Un-Ordered List", async () => {
					const TextNode1 = renderer.text("Hello world 1", styles.li);
					const TextNode2 = renderer.text("Hello world 2", styles.li);
					const TextNode3 = renderer.text("Hello world 3", styles.li);
					const OL = renderer.list(
						false,
						[TextNode1, TextNode2, TextNode3],
						styles.list,
						styles.li,
					);
					const r = await render(OL as ReactElement);
					expect(screen.queryByText("Hello world 1")).toBeTruthy();
					expect(screen.queryByText("Hello world 2")).toBeTruthy();
					expect(screen.queryByText("Hello world 3")).toBeTruthy();
					const tree = r.toJSON();
					expect(tree).toMatchSnapshot();
				});
			});
		});
	}
});

describe("code and codespan styles #873", () => {
	it("code block uses codeText style", async () => {
		const r = await render(
			<Markdown
				value={"```\nhello\n```"}
				styles={{ codeText: { fontFamily: "Menlo" } }}
			/>,
		);
		expect(r.toJSON()).toMatchSnapshot();
	});

	it("code block with all TextStyle props via codeText", async () => {
		const r = await render(
			<Markdown
				value={"```\ncode\n```"}
				styles={{
					codeText: {
						fontFamily: "Menlo",
						fontSize: 14,
						color: "#ff0000",
						fontWeight: "700",
					},
				}}
			/>,
		);
		expect(r.toJSON()).toMatchSnapshot();
	});

	it("code block uses codeText instead of em (not italic)", async () => {
		const r = await render(<Markdown value={"```\ncode\n```"} />);
		expect(r.toJSON()).toMatchSnapshot();
	});

	it("code container ViewStyle and codeText TextStyle", async () => {
		const styles = getStyles(
			{
				code: { padding: 10, backgroundColor: "#fff" },
				codeText: { fontFamily: "Menlo" },
			},
			"light",
		);
		expect(styles.code?.padding).toBe(10);
		expect(styles.codeText?.fontFamily).toBe("Menlo");
	});

	it("codespan preserves style inside strong", async () => {
		const r = await render(
			<Markdown
				value={"**some `code` inside**"}
				styles={{
					codespan: { fontFamily: "Menlo" },
					strong: { fontFamily: "Helvetica-Bold" } as never,
				}}
			/>,
		);
		expect(r.toJSON()).toMatchSnapshot();
	});

	it("codespan preserves style inside em", async () => {
		const r = await render(
			<Markdown
				value={"*some `code` inside*"}
				styles={{
					codespan: { fontFamily: "Menlo" },
					em: { fontFamily: "Helvetica-Oblique" } as never,
				}}
			/>,
		);
		expect(r.toJSON()).toMatchSnapshot();
	});

	it("codespan with all TextStyle props", async () => {
		const r = await render(
			<Markdown
				value={"Use `code` here"}
				styles={{
					codespan: {
						fontFamily: "Menlo",
						fontSize: 14,
						color: "#ff0000",
						fontWeight: "700",
					},
				}}
			/>,
		);
		expect(r.toJSON()).toMatchSnapshot();
	});
});
