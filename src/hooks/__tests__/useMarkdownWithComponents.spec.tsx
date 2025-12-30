import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Text, View } from "react-native";
import {
	type ReactComponentRegistry,
	ReactComponentRegistryProvider,
} from "../../lib/ReactComponentRegistry";
import useMarkdownWithComponents from "../useMarkdownWithComponents";

const TestRenderer = ({
	value,
	components,
}: {
	value: string;
	components?: ReactComponentRegistry;
}) => {
	const content = components ? (
		<ReactComponentRegistryProvider components={components}>
			<InnerRenderer value={value} />
		</ReactComponentRegistryProvider>
	) : (
		<InnerRenderer value={value} />
	);

	return content;
};

const InnerRenderer = ({ value }: { value: string }) => {
	const elements = useMarkdownWithComponents(value);
	return <>{elements}</>;
};

describe("useMarkdownWithComponents", () => {
	describe("without registry", () => {
		it("renders regular markdown without components", () => {
			render(<TestRenderer value="# Hello World" />);
			expect(screen.queryByText("Hello World")).toBeTruthy();
		});

		it("removes unregistered components from output", () => {
			render(<TestRenderer value="Before <Button /> After" />);
			expect(screen.queryByText("Before")).toBeTruthy();
			expect(screen.queryByText("After")).toBeTruthy();
		});
	});

	describe("with registry", () => {
		const components: ReactComponentRegistry = {
			Button: ({ props }) => (
				<View testID="custom-button">
					<Text>{String(props.label ?? "Default")}</Text>
				</View>
			),
			InfoBox: ({ props, children }) => (
				<View testID="info-box">
					{props.title && (
						<Text testID="info-title">{String(props.title)}</Text>
					)}
					<Text testID="info-children">{children}</Text>
				</View>
			),
		};

		it("renders a self-closing component", () => {
			render(
				<TestRenderer
					value='<Button label="Click me" />'
					components={components}
				/>,
			);
			expect(screen.queryByTestId("custom-button")).toBeTruthy();
			expect(screen.queryByText("Click me")).toBeTruthy();
		});

		it("renders a component with children", () => {
			render(
				<TestRenderer
					value='<InfoBox title="Note">Important info</InfoBox>'
					components={components}
				/>,
			);
			expect(screen.queryByTestId("info-box")).toBeTruthy();
			expect(screen.queryByText("Note")).toBeTruthy();
			expect(screen.queryByText("Important info")).toBeTruthy();
		});

		it("renders components mixed with markdown", () => {
			const markdown = `# Title

Some text before.

<Button label="Action" />

Some text after.`;

			render(<TestRenderer value={markdown} components={components} />);

			expect(screen.queryByText("Title")).toBeTruthy();
			expect(screen.queryByText("Some text before.")).toBeTruthy();
			expect(screen.queryByTestId("custom-button")).toBeTruthy();
			expect(screen.queryByText("Action")).toBeTruthy();
			expect(screen.queryByText("Some text after.")).toBeTruthy();
		});

		it("removes components not in registry", () => {
			const markdown = `<Button label='Yes' />

<Unknown />

<InfoBox>Hi</InfoBox>`;

			render(<TestRenderer value={markdown} components={components} />);
			expect(screen.queryByTestId("custom-button")).toBeTruthy();
			expect(screen.queryByTestId("info-box")).toBeTruthy();
		});

		it("passes props correctly to components", () => {
			const propsComponents: ReactComponentRegistry = {
				TestProps: ({ props }) => (
					<View testID="test-props">
						<Text testID="string-prop">{String(props.str)}</Text>
						<Text testID="num-prop">{String(props.num)}</Text>
						<Text testID="bool-prop">{String(props.bool)}</Text>
					</View>
				),
			};

			render(
				<TestRenderer
					value='<TestProps str="hello" num={42} bool={true} />'
					components={propsComponents}
				/>,
			);

			expect(screen.queryByText("hello")).toBeTruthy();
			expect(screen.queryByText("42")).toBeTruthy();
			expect(screen.queryByText("true")).toBeTruthy();
		});
	});

	describe("edge cases", () => {
		it("handles empty markdown", () => {
			const components: ReactComponentRegistry = {};
			render(<TestRenderer value="" components={components} />);
		});

		it("handles markdown with only components", () => {
			const components: ReactComponentRegistry = {
				A: () => <Text>Component A</Text>,
				B: () => <Text>Component B</Text>,
			};

			render(<TestRenderer value="<A /><B />" components={components} />);

			expect(screen.queryByText("Component A")).toBeTruthy();
			expect(screen.queryByText("Component B")).toBeTruthy();
		});
	});
});
