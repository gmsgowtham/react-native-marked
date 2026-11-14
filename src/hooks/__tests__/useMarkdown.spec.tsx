import { render, screen } from "@testing-library/react-native";
import type { ReactNode } from "react";
import React from "react";
import { type ColorSchemeName, View } from "react-native";
import type { MarkedStyles, UserTheme } from "../../theme/types";
import useMarkdown, { areHookOptionsEqual } from "../useMarkdown";

const twoParagraphs = "First paragraph.\n\nSecond paragraph.";

interface HarnessProps {
	value: string;
	collector: ReactNode[][];
	styles?: MarkedStyles;
	theme?: UserTheme;
	colorScheme?: ColorSchemeName;
}

/**
 * Renders via the hook and records the element array reference on every
 * React render, so memos can be asserted on by identity (===).
 */
const MarkdownHarness = ({
	value,
	collector,
	styles,
	theme,
	colorScheme,
}: HarnessProps) => {
	const elements = useMarkdown(value, { styles, theme, colorScheme });
	collector.push(elements);
	return <View testID="use-markdown-harness-content">{elements}</View>;
};

describe("useMarkdown", () => {
	it("does not re-parse when the parent re-renders with constant value", async () => {
		const collector: ReactNode[][] = [];
		const { rerender } = await render(
			<MarkdownHarness value={twoParagraphs} collector={collector} />,
		);
		await rerender(
			<MarkdownHarness value={twoParagraphs} collector={collector} />,
		);

		expect(collector.length).toBe(2);
		expect(collector[0]).toBe(collector[1]);
	});

	it("keeps identities when options are inline object literals", async () => {
		const collector: ReactNode[][] = [];
		const inlineOptions = (
			props: { value: string } & { collector: ReactNode[][] },
		) => (
			<MarkdownHarness
				value={props.value}
				styles={{ paragraph: { marginTop: 2 } }}
				theme={{
					colors: {
						text: "#123456",
						code: "#f6f8fa",
						link: "#58a6ff",
						border: "#d0d7de",
					},
				}}
				collector={props.collector}
			/>
		);
		const { rerender } = await render(
			inlineOptions({ value: twoParagraphs, collector }),
		);
		await rerender(inlineOptions({ value: twoParagraphs, collector }));

		expect(collector.length).toBe(2);
		expect(collector[0]).toBe(collector[1]);
	});

	it("re-parses when style content actually changes", async () => {
		const collector: ReactNode[][] = [];
		const { rerender } = await render(
			<MarkdownHarness
				value={twoParagraphs}
				styles={{ paragraph: { marginTop: 2 } }}
				collector={collector}
			/>,
		);
		await rerender(
			<MarkdownHarness
				value={twoParagraphs}
				styles={{ paragraph: { marginTop: 4 } }}
				collector={collector}
			/>,
		);

		expect(collector.length).toBe(2);
		expect(collector[0]).not.toBe(collector[1]);
	});

	it("reuses unchanged elements when value grows (streaming)", async () => {
		const collector: ReactNode[][] = [];
		const { rerender } = await render(
			<MarkdownHarness value={twoParagraphs} collector={collector} />,
		);
		await rerender(
			<MarkdownHarness
				value={`${twoParagraphs}\n\nThird paragraph.`}
				collector={collector}
			/>,
		);

		expect(collector.length).toBe(2);
		const initial = collector[0];
		const grown = collector[1];
		if (!initial || !grown) throw new Error("Both renders must be captured");

		expect(grown.length).toBe(initial.length + 1);
		for (let i = 0; i < initial.length; i++) {
			expect(grown[i]).toBe(initial[i]);
		}
	});

	it("reuses elements after adding a token before unchanged ones", async () => {
		const collector: ReactNode[][] = [];
		const { rerender } = await render(
			<MarkdownHarness value={twoParagraphs} collector={collector} />,
		);
		await rerender(
			<MarkdownHarness
				value={`Intro heading.\n\n${twoParagraphs}`}
				collector={collector}
			/>,
		);

		expect(collector.length).toBe(2);
		const initial = collector[0];
		const grown = collector[1];
		if (!initial || !grown) throw new Error("Both renders must be captured");
		// The unchanged paragraphs keep their already rendered instances.
		for (const element of initial) {
			expect(grown).toContain(element);
		}
	});

	it("re-parses when colorScheme changes", async () => {
		const collector: ReactNode[][] = [];
		const { rerender } = await render(
			<MarkdownHarness
				value={twoParagraphs}
				colorScheme="light"
				collector={collector}
			/>,
		);
		await rerender(
			<MarkdownHarness
				value={twoParagraphs}
				colorScheme="dark"
				collector={collector}
			/>,
		);

		expect(collector.length).toBe(2);
		const initial = collector[0];
		const grown = collector[1];
		if (!initial || !grown) throw new Error("Both renders must be captured");

		expect(grown).not.toBe(initial);
		// Theme flip rebuilds styles + parser, so nothing is reused.
		for (const element of initial) {
			expect(grown).not.toContain(element);
		}
	});

	it("renders identical top-level tokens with distinct keys", async () => {
		const collector: ReactNode[][] = [];
		await render(
			<MarkdownHarness value={"Same.\n\nSame."} collector={collector} />,
		);

		const elements = collector[0] ?? [];
		const keys = elements.map((element) =>
			React.isValidElement(element) ? element.key : undefined,
		);
		expect(keys.length).toBe(2);
		// Content-identical tokens must not deduplicate into one keyed element.
		expect(new Set(keys).size).toBe(keys.length);
	});

	it("reuses the first instance when a duplicate token is added", async () => {
		const collector: ReactNode[][] = [];
		const { rerender } = await render(
			<MarkdownHarness value={"Same."} collector={collector} />,
		);
		await rerender(
			<MarkdownHarness value={"Same.\n\nSame."} collector={collector} />,
		);

		expect(collector.length).toBe(2);
		const initial = collector[0];
		const grown = collector[1];
		if (!initial || !grown) throw new Error("Both renders must be captured");

		// The original copy comes from cache; the duplicate is a fresh parse.
		expect(grown[0]).toBe(initial[0]);
		const keys = grown.map((element) =>
			React.isValidElement(element) ? element.key : undefined,
		);
		expect(new Set(keys).size).toBe(keys.length);
	});

	it("renders all markdown content", async () => {
		await render(<MarkdownHarness value={twoParagraphs} collector={[]} />);
		expect(screen.queryByText("First paragraph.")).toBeTruthy();
		expect(screen.queryByText("Second paragraph.")).toBeTruthy();
	});
});

describe("areHookOptionsEqual", () => {
	it("treats inline theme/styles literals with equal content as equal", () => {
		expect(
			areHookOptionsEqual(
				{
					theme: {
						colors: {
							text: "#123456",
							code: "#f6f8fa",
							link: "#58a6ff",
							border: "#d0d7de",
						},
					},
					styles: { paragraph: { marginTop: 2 } },
				},
				{
					theme: {
						colors: {
							text: "#123456",
							code: "#f6f8fa",
							link: "#58a6ff",
							border: "#d0d7de",
						},
					},
					styles: { paragraph: { marginTop: 2 } },
				},
			),
		).toBe(true);
	});

	it("treats differently styled content as unequal", () => {
		expect(
			areHookOptionsEqual(
				{ styles: { paragraph: { marginTop: 2 } } },
				{ styles: { paragraph: { marginTop: 4 } } },
			),
		).toBe(false);
	});

	it("treats a colorScheme change as unequal", () => {
		expect(
			areHookOptionsEqual({ colorScheme: "light" }, { colorScheme: "dark" }),
		).toBe(false);
		expect(
			areHookOptionsEqual({ colorScheme: "dark" }, { colorScheme: "dark" }),
		).toBe(true);
	});

	it("requires the same renderer instance", () => {
		const renderer = { paragraph: () => null } as never;
		expect(areHookOptionsEqual({ renderer }, { renderer })).toBe(true);
		expect(areHookOptionsEqual({ renderer }, { renderer: {} as never })).toBe(
			false,
		);
	});
});
