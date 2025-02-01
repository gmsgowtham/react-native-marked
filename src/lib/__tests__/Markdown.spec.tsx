import React, { type ReactNode } from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import { Text, type TextStyle } from "react-native";
import Markdown from "../Markdown";
import Renderer from "../Renderer";
import type { RendererInterface } from "../types";
import { Tokenizer, type Tokens } from "marked";

// https://www.markdownguide.org/basic-syntax/#headings
describe("Headings", () => {
	it("Heading level 1", () => {
		const r = render(<Markdown value={"# Heading level 1"} />);
		expect(screen.queryByText("Heading level 1")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Heading level 2", () => {
		const r = render(<Markdown value={"## Heading level 2"} />);
		expect(screen.queryByText("Heading level 2")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Heading level 3", () => {
		const r = render(<Markdown value={"### Heading level 3"} />);
		expect(screen.queryByText("Heading level 3")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Heading level 4", () => {
		const r = render(<Markdown value={"#### Heading level 4"} />);
		expect(screen.queryByText("Heading level 4")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Heading level 5", () => {
		const r = render(<Markdown value={"##### Heading level 5"} />);
		expect(screen.queryByText("Heading level 5")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Heading level 6", () => {
		const r = render(<Markdown value={"###### Heading level 6"} />);
		expect(screen.queryByText("Heading level 6")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Alternate Syntax: Heading level 1", () => {
		const r = render(<Markdown value={"Heading level 1\n==============="} />);
		expect(screen.queryByText("Heading level 1")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Alternate Syntax: Heading level 2", () => {
		const r = render(<Markdown value={"Heading level 2\n---------------"} />);
		expect(screen.queryByText("Heading level 2")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Best Practice", () => {
		const r = render(
			<Markdown
				value={
					"Try to put a blank line before...\n\n# Heading\n\n...and after a heading."
				}
			/>,
		);
		expect(screen.queryByText("Heading")).toBeTruthy();
		expect(
			screen.queryByText("Try to put a blank line before..."),
		).toBeTruthy();
		expect(screen.queryByText("...and after a heading.")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Heading with text emphasis", () => {
		const r = render(<Markdown value={"## ~~_Heading level 2_~~"} />);
		expect(screen.queryByText("Heading level 2")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

// https://www.markdownguide.org/basic-syntax/#paragraphs-1
describe("Paragraphs", () => {
	it("Paragraph", () => {
		const r = render(
			<Markdown
				value={
					"I really like using Markdown.\n\nI think I'll use it to format all of my documents from now on."
				}
			/>,
		);
		expect(screen.queryByText("I really like using Markdown.")).toBeTruthy();
		expect(
			screen.queryByText(
				"I think I'll use it to format all of my documents from now on.",
			),
		).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Paragraph with Image", async () => {
		const r = render(
			<Markdown
				value={
					"Here, I'll guide you through sending desktop notifications to offline users when they have new chat messages.![Chat](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5kq947hwxmjvlmhrbnm6.png)"
				}
			/>,
		);
		await waitFor(() => {
			expect(
				screen.queryByText(
					"Here, I'll guide you through sending desktop notifications to offline users when they have new chat messages.",
				),
			).toBeTruthy();
			expect(
				screen.queryAllByTestId("react-native-marked-md-image"),
			).toBeDefined();
			const tree = r.toJSON();
			expect(tree).toMatchSnapshot();
		});
	});
});

describe("Line Breaks", () => {
	it("Trailing New Line Character", () => {
		const r = render(
			<Markdown
				value={"First line with a backslash after.\nAnd the next line."}
			/>,
		);
		expect(
			screen.queryByText(
				"First line with a backslash after. And the next line.",
			),
		).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("Trailing slash", () => {
		const r = render(
			<Markdown
				value={`First line with a backslash after.\\
      And the next line.`}
			/>,
		);
		expect(
			screen.queryByText("First line with a backslash after."),
		).toBeTruthy();
		expect(screen.queryByText("And the next line.")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

// https://www.markdownguide.org/basic-syntax/#emphasis
describe("Emphasis", () => {
	it("Bold", () => {
		const r = render(<Markdown value={"Love **is** bold"} />);
		expect(screen.queryByText("is")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Italic", () => {
		const r = render(<Markdown value={"A *cat* meow"} />);
		expect(screen.queryByText("cat")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Strikethrough", () => {
		const r = render(<Markdown value={"A ~~cat~~ meow"} />);
		expect(screen.queryByText("cat")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Bold and Italic", () => {
		const r = render(
			<Markdown value={"This is really ***very*** important text."} />,
		);
		expect(screen.queryByText("very")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

// https://www.markdownguide.org/basic-syntax/#blockquotes-1
describe("Blockquotes", () => {
	it("Blockquote", () => {
		const r = render(
			<Markdown
				value={
					"> Dorothy followed her through many of the beautiful rooms in her castle."
				}
			/>,
		);
		expect(
			screen.queryByText(
				"Dorothy followed her through many of the beautiful rooms in her castle.",
			),
		).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Blockquotes with Multiple Paragraphs", () => {
		const r = render(
			<Markdown
				value={
					"> Dorothy followed her through many of the beautiful rooms in her castle.\n>\n> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood."
				}
			/>,
		);
		expect(
			screen.queryByText(
				"Dorothy followed her through many of the beautiful rooms in her castle.",
			),
		).toBeTruthy();
		expect(
			screen.queryByText(
				"The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.",
			),
		).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Nested Blockquotes", () => {
		const r = render(
			<Markdown
				value={
					"> Dorothy followed her through many of the beautiful rooms in her castle.\n>\n\n>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood."
				}
			/>,
		);
		expect(
			screen.queryByText(
				"Dorothy followed her through many of the beautiful rooms in her castle.",
			),
		).toBeTruthy();
		expect(
			screen.queryByText(
				"The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.",
			),
		).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Blockquotes with Other Elements", () => {
		const r = render(
			<Markdown
				value={
					"> #### The quarterly results look great!\n>\n> - Revenue was off the chart.\n> - Profits were higher than ever.\n>\n>  *Everything* is going according to **plan**."
				}
			/>,
		);
		expect(
			screen.queryByText("The quarterly results look great!"),
		).toBeTruthy();
		expect(screen.queryByText("Revenue was off the chart.")).toBeTruthy();
		expect(screen.queryByText("Profits were higher than ever.")).toBeTruthy();
		expect(screen.queryByText("Everything")).toBeTruthy();
		expect(screen.queryByText("is going according to")).toBeTruthy();
		expect(screen.queryByText("plan")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

// https://www.markdownguide.org/basic-syntax/#lists-1
describe("Lists", () => {
	it("Ordered Lists", () => {
		const r = render(
			<Markdown
				value={
					"1. First item\n2. Second item\n3. Third item\n    1. Indented item1\n    2. Indented item2\n4. Fourth item"
				}
			/>,
		);
		expect(screen.queryByText("First item")).toBeTruthy();
		expect(screen.queryByText("Second item")).toBeTruthy();
		expect(screen.queryByText("Third item")).toBeTruthy();
		expect(screen.queryByText("Indented item1")).toBeTruthy();
		expect(screen.queryByText("Indented item2")).toBeTruthy();
		expect(screen.queryByText("Fourth item")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Ordered Lists: With Start Offset", () => {
		const r = render(<Markdown value={"57. foo\n1. bar\n2. baz"} />);
		expect(screen.queryByText("foo")).toBeTruthy();
		expect(screen.queryByText("bar")).toBeTruthy();
		expect(screen.queryByText("baz")).toBeTruthy();
		expect(screen.queryByText("57.")).toBeTruthy();
		expect(screen.queryByText("58.")).toBeTruthy();
		expect(screen.queryByText("59.")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Unordered Lists", () => {
		const r = render(
			<Markdown
				value={
					"- First item\n- Second item\n- Third item\n    - Indented item1\n    - Indented item2\n- Fourth item"
				}
			/>,
		);
		expect(screen.queryByText("First item")).toBeTruthy();
		expect(screen.queryByText("Second item")).toBeTruthy();
		expect(screen.queryByText("Third item")).toBeTruthy();
		expect(screen.queryByText("Indented item1")).toBeTruthy();
		expect(screen.queryByText("Indented item2")).toBeTruthy();
		expect(screen.queryByText("Fourth item")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Elements in Lists: Paragraphs", () => {
		const r = render(
			<Markdown
				value={
					"- This is the first list item.\n- Here's the second list item.\n\n    I need to add another paragraph below the second list item.\n\n- And here's the third list item."
				}
			/>,
		);
		expect(screen.queryByText("This is the first list item.")).toBeTruthy();
		expect(screen.queryByText("Here's the second list item.")).toBeTruthy();
		expect(
			screen.queryByText(
				"I need to add another paragraph below the second list item.",
			),
		).toBeTruthy();
		expect(screen.queryByText("And here's the third list item.")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Elements in Lists: Blockquotes", () => {
		const r = render(
			<Markdown
				value={
					"- This is the first list item.\n- Here's the second list item.\n\n    > A blockquote would look great below the second list item.\n\n- And here's the third list item."
				}
			/>,
		);
		expect(screen.queryByText("This is the first list item.")).toBeTruthy();
		expect(screen.queryByText("Here's the second list item.")).toBeTruthy();
		expect(
			screen.queryByText(
				"A blockquote would look great below the second list item.",
			),
		).toBeTruthy();
		expect(screen.queryByText("And here's the third list item.")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Elements in Lists: Code Blocks", () => {
		const r = render(
			<Markdown
				value={
					"* This is the first list item.\n* Here's the second list item.\n\n        <html>\n        <head>\n        </head>\n        </html>\n\n* And here's the third list item."
				}
			/>,
		);
		expect(screen.queryByText("This is the first list item.")).toBeTruthy();
		expect(screen.queryByText("Here's the second list item.")).toBeTruthy();
		expect(screen.queryByText("And here's the third list item.")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Elements in Lists: Images", async () => {
		const r = render(
			<Markdown
				value={
					"1. Open the file containing the Linux mascot.\n2. Marvel at its beauty.\n\n    ![](https://dummyimage.com/100x100/fff/aaa)\n\n3. Close the file."
				}
			/>,
		);
		await waitFor(() => {
			expect(
				screen.queryByText("Open the file containing the Linux mascot."),
			).toBeTruthy();
			expect(screen.queryByText("Marvel at its beauty.")).toBeTruthy();
			expect(screen.queryByText("Close the file.")).toBeTruthy();
			expect(
				screen.queryAllByTestId("react-native-marked-md-image"),
			).toBeDefined();
			const tree = r.toJSON();
			expect(tree).toMatchSnapshot();
		});
	});
	it("Elements in Lists: Lists", () => {
		const r = render(
			<Markdown
				value={
					"1. First item\n2. Second item\n3. Third item\n    - Indented item1\n    - Indented item2\n4. Fourth item"
				}
			/>,
		);
		expect(screen.queryByText("First item")).toBeTruthy();
		expect(screen.queryByText("Second item")).toBeTruthy();
		expect(screen.queryByText("Third item")).toBeTruthy();
		expect(screen.queryByText("Indented item1")).toBeTruthy();
		expect(screen.queryByText("Indented item2")).toBeTruthy();
		expect(screen.queryByText("Fourth item")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

// https://www.markdownguide.org/basic-syntax/#code
describe("Code", () => {
	it("Code Span", () => {
		const r = render(
			<Markdown value={"At the command prompt, type `'nano'`."} />,
		);
		expect(screen.queryByText("At the command prompt, type")).toBeTruthy();
		expect(screen.queryByText("'nano'")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Code Blocks", () => {
		const r = render(
			<Markdown
				value={"    <html>\n      <head>\n      </head>\n    </html>"}
			/>,
		);
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Code Blocks (backtick)", () => {
		const r = render(
			<Markdown
				value={"```<html>\n      <head>\n      </head>\n    </html>\n```"}
			/>,
		);
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Code Blocks (backtick), no ending backtick", () => {
		const r = render(
			<Markdown
				value={"```<html>\n      <head>\n      </head>\n    </html>"}
			/>,
		);

		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

// https://www.markdownguide.org/basic-syntax/#horizontal-rules
describe("Horizontal Rules", () => {
	it("Asterisks", () => {
		const r = render(<Markdown value={"***"} />);
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Dashes", () => {
		const r = render(<Markdown value={"---"} />);
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Underscores", () => {
		const r = render(<Markdown value={"_________________"} />);
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Horizontal Rule with Paragraph", () => {
		const r = render(
			<Markdown
				value={
					"Try to put a blank line before...\n\n---\n\n...and after a horizontal rule."
				}
			/>,
		);
		expect(
			screen.queryByText("Try to put a blank line before..."),
		).toBeTruthy();
		expect(screen.queryByText("...and after a horizontal rule.")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

// https://www.markdownguide.org/basic-syntax/#links
describe("Links", () => {
	it("Basic", () => {
		const r = render(
			<Markdown
				value={
					"My favorite search engine is [Duck Duck Go](https://duckduckgo.com)."
				}
			/>,
		);
		expect(screen.queryByText("My favorite search engine is")).toBeTruthy();
		expect(screen.queryByText("Duck Duck Go")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Titles", () => {
		const r = render(
			<Markdown
				value={
					'My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").'
				}
			/>,
		);
		expect(screen.queryByText("My favorite search engine is")).toBeTruthy();
		expect(screen.queryByText("Duck Duck Go")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("URLs and Email Addresses", () => {
		const r = render(
			<Markdown
				value={"<https://www.markdownguide.org>\n\n<fake@example.com>"}
			/>,
		);
		expect(screen.queryByText("https://www.markdownguide.org")).toBeTruthy();
		expect(screen.queryByText("fake@example.com")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Formatting Links", () => {
		const r = render(
			<Markdown
				value={
					"I love supporting the **[EFF](https://eff.org)**.\nThis is the *[Markdown Guide](https://www.markdownguide.org)*.\nSee the section on [`code`](#code)."
				}
			/>,
		);
		expect(screen.queryByText("EFF")).toBeTruthy();
		expect(screen.queryByText("Markdown Guide")).toBeTruthy();
		expect(screen.queryByText("code")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it("Links without text, (no render)", () => {
		const r = render(
			<Markdown
				value={
					"Table of Contents[](https://mastersoftwaretesting.com/testing-fundamentals/software-testing-101-what-is-software-testing#table-of-contents)\n-------------------------------------------------------------------------------------------------------------------------------------------\n"
				}
			/>,
		);
		expect(screen.queryByText("Table of Contents")).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

// https://www.markdownguide.org/basic-syntax/#images-1
describe("Images", () => {
	it("Render", async () => {
		const r = render(
			<Markdown
				value={
					'![The San Juan Mountains are beautiful!](https://dummyimage.com/100x100/fff/aaa "San Juan Mountains")'
				}
			/>,
		);
		await waitFor(() => {
			expect(
				screen.queryAllByTestId("react-native-marked-md-image"),
			).toBeDefined();
			const tree = r.toJSON();
			expect(tree).toMatchSnapshot();
		});
	});
	it("Linking Images", async () => {
		const r = render(
			<Markdown
				value={
					'[![An old rock in the desert](https://dummyimage.com/100x100/fff/aaa "Shiprock, New Mexico by Beau Rogers")](https://dummyimage.com/100x100/fff/aaa)'
				}
			/>,
		);
		await waitFor(() => {
			expect(
				screen.queryAllByTestId("react-native-marked-md-image"),
			).toBeDefined();
			const tree = r.toJSON();
			expect(tree).toMatchSnapshot();
		});
	});
	it("SVG images", async () => {
		const r = render(
			<Markdown
				value={"![svg](https://www.svgrepo.com/show/513268/beer.svg)"}
			/>,
		);
		await waitFor(() => {
			expect(
				screen.queryAllByTestId("react-native-marked-md-svg"),
			).toBeDefined();
			const tree = r.toJSON();
			expect(tree).toMatchSnapshot();
		});
	});
	it("SVG Linking", async () => {
		const r = render(
			<Markdown
				value={
					'[![SVG Repo](https://www.svgrepo.com/show/513268/beer.svg "SVG Repo")](https://www.svgrepo.com)'
				}
			/>,
		);
		await waitFor(() => {
			expect(
				screen.queryAllByTestId("react-native-marked-md-svg"),
			).toBeDefined();
			const tree = r.toJSON();
			expect(tree).toMatchSnapshot();
		});
	});
});

// https://www.markdownguide.org/basic-syntax/#escaping-characters
describe("Escaping Characters", () => {
	it("Render", () => {
		const r = render(
			<Markdown
				value={
					"\\* Without the backslash, this would be a bullet in an unordered list."
				}
			/>,
		);
		expect(screen.queryByText("*")).toBeTruthy();
		expect(
			screen.queryByText(
				"Without the backslash, this would be a bullet in an unordered list.",
			),
		).toBeTruthy();
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

// https://www.markdownguide.org/basic-syntax/#html
describe("HTML", () => {
	it("Render", () => {
		const r = render(
			<Markdown
				value={"This **word** is bold. This <em>word</em> is italic."}
			/>,
		);
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

// https://www.markdownguide.org/extended-syntax/#tables
describe("Tables", () => {
	it("Basic", () => {
		const r = render(
			<Markdown
				value={`
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
				`}
			/>,
		);
		const tree = r.toJSON();
		expect(screen.queryByText("Syntax")).toBeTruthy();
		expect(screen.queryByText("Description")).toBeTruthy();
		expect(screen.queryByText("Header")).toBeTruthy();
		expect(screen.queryByText("Title")).toBeTruthy();
		expect(screen.queryByText("Paragraph")).toBeTruthy();
		expect(screen.queryByText("Text")).toBeTruthy();
		expect(tree).toMatchSnapshot();
	});
	it("Different Cell Widths", () => {
		const r = render(
			<Markdown
				value={`
| Syntax | Description |
| --- | ----------- |
| Header | Title |
| Paragraph | Text |
				`}
			/>,
		);
		const tree = r.toJSON();
		expect(screen.queryByText("Syntax")).toBeTruthy();
		expect(screen.queryByText("Description")).toBeTruthy();
		expect(screen.queryByText("Header")).toBeTruthy();
		expect(screen.queryByText("Title")).toBeTruthy();
		expect(screen.queryByText("Paragraph")).toBeTruthy();
		expect(screen.queryByText("Text")).toBeTruthy();
		expect(tree).toMatchSnapshot();
	});
	it("Alignment", () => {
		const r = render(
			<Markdown
				value={`
| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |
				`}
			/>,
		);
		const tree = r.toJSON();
		expect(screen.queryByText("Syntax")).toBeTruthy();
		expect(screen.queryByText("Description")).toBeTruthy();
		expect(screen.queryByText("Test Text")).toBeTruthy();
		expect(screen.queryByText("Header")).toBeTruthy();
		expect(screen.queryByText("Title")).toBeTruthy();
		expect(screen.queryByText("Here's this")).toBeTruthy();
		expect(screen.queryByText("Paragraph")).toBeTruthy();
		expect(screen.queryByText("Text")).toBeTruthy();
		expect(screen.queryByText("And more")).toBeTruthy();
		expect(tree).toMatchSnapshot();
	});
	it("Pipe Character", () => {
		const r = render(
			<Markdown
				value={`
| Syntax    | Description |       Test Text |
| :-------- | :---------: | --------------: |
| Header    |    Title    | Here's \\| this |
| Paragraph |    Text     |        And more |
				`}
			/>,
		);
		const tree = r.toJSON();
		expect(screen.queryByText("Syntax")).toBeTruthy();
		expect(screen.queryByText("Description")).toBeTruthy();
		expect(screen.queryByText("Test Text")).toBeTruthy();
		expect(screen.queryByText("Header")).toBeTruthy();
		expect(screen.queryByText("Title")).toBeTruthy();
		expect(screen.queryByText("Here's | this")).toBeTruthy();
		expect(screen.queryByText("Paragraph")).toBeTruthy();
		expect(screen.queryByText("Text")).toBeTruthy();
		expect(screen.queryByText("And more")).toBeTruthy();
		expect(tree).toMatchSnapshot();
	});
	it("Emphasis, Code, Links", () => {
		const r = render(
			<Markdown
				value={`
| _This will also be italic_ |      _You **can** combine them_       |
| -------------------------- | :-----------------------------------: |
| **left foo**               |              _right foo_              |
| \`left bar\`               |               right bar               |
| ~~left baz~~               | right [link](https://duckduckgo.com). |
				`}
			/>,
		);
		const tree = r.toJSON();
		expect(screen.queryByText("This will also be italic")).toBeTruthy();
		expect(screen.queryByText("You can combine them")).toBeTruthy();
		expect(screen.queryByText("left foo")).toBeTruthy();
		expect(screen.queryByText("right foo")).toBeTruthy();
		expect(screen.queryByText("left bar")).toBeTruthy();
		expect(screen.queryByText("right bar")).toBeTruthy();
		expect(screen.queryByText("left baz")).toBeTruthy();
		expect(screen.queryByText("link")).toBeTruthy();
		expect(tree).toMatchSnapshot();
	});
	it("Images", async () => {
		const r = render(
			<Markdown
				value={`
|                                Hello                                |
| :-----------------------------------------------------------------: |
| Bingo ![](https://goo.gl/1R3T6h "Tonejito") This also works for me. |
				`}
			/>,
		);
		await waitFor(() => {
			expect(
				screen.queryAllByTestId("react-native-marked-md-image"),
			).toBeDefined();
			const tree = r.toJSON();
			expect(screen.queryByText("Hello")).toBeTruthy();
			expect(screen.queryByText("Bingo")).toBeTruthy();
			expect(screen.queryByText("This also works for me.")).toBeTruthy();
			expect(tree).toMatchSnapshot();
		});
	});
});

describe("Renderer override", () => {
	it("Custom", () => {
		const fn = jest.fn(
			(text: string, styles?: TextStyle): ReactNode => (
				<Text style={styles} key={"key-1"}>
					{text}
				</Text>
			),
		);
		const style: TextStyle = {
			color: "#ff0000",
		};
		class CustomRenderer extends Renderer implements RendererInterface {
			codespan = fn;
		}

		const r = render(
			<Markdown
				value={"`hello`"}
				renderer={new CustomRenderer()}
				styles={{ codespan: { ...style } }}
			/>,
		);
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
		expect(screen.queryByText("hello")).toBeTruthy();
	});
});
describe("Tokenizer", () => {
	it("Custom", () => {
		const codespanFn = jest.fn(
			(text: string, styles?: TextStyle): ReactNode => (
				<Text style={styles} key={"key-1"}>
					{text}
				</Text>
			),
		);
		const style: TextStyle = {
			color: "#ff0000",
		};
		class CustomRenderer extends Renderer implements RendererInterface {
			codespan = codespanFn;
		}

		class CustomTokenizer extends Tokenizer {
			codespan(src: string): Tokens.Codespan | undefined {
				const match = src.match(/^\$+([^\$\n]+?)\$+/);
				if (match?.[1]) {
					return {
						type: "codespan",
						raw: match[0],
						text: match[1].trim(),
					};
				}

				return super.codespan(src);
			}
		}

		const r = render(
			<Markdown
				value={"$ latex code $\n\n`hello`"}
				renderer={new CustomRenderer()}
				styles={{ codespan: { ...style } }}
				tokenizer={new CustomTokenizer()}
			/>,
		);
		const tree = r.toJSON();
		expect(tree).toMatchSnapshot();
		expect(screen.queryByText("hello")).toBeTruthy();
		expect(screen.queryByText("latex code")).toBeTruthy();
	});
});
