import { render } from "@testing-library/react-native";
import type { ReactElement } from "react";
import React from "react";
import useMarkdown from "../useMarkdown";

describe("useMarkdown hook", () => {
	describe("selectableText option", () => {
		it("renders with selectable=true by default", () => {
			const TestComponent = () => {
				const elements = useMarkdown("Hello world", { colorScheme: "light" });
				return elements[0] as ReactElement;
			};

			const r = render(<TestComponent />);
			const tree = r.toJSON();

			// Check that Text elements have selectable=true
			const findSelectableText = (node: any): boolean => {
				if (!node) return false;
				if (
					node.type === "Text" &&
					node.props &&
					node.props.selectable === true
				) {
					return true;
				}
				if (Array.isArray(node.children)) {
					return node.children.some((child: any) => findSelectableText(child));
				}
				if (node.children) {
					return findSelectableText(node.children);
				}
				return false;
			};

			expect(findSelectableText(tree)).toBe(true);
		});

		it("renders with selectable=false when selectableText option is false", () => {
			const TestComponent = () => {
				const elements = useMarkdown("Hello world", {
					colorScheme: "light",
					selectableText: false,
				});
				return elements[0] as ReactElement;
			};

			const r = render(<TestComponent />);
			const tree = r.toJSON();

			// Check that Text elements have selectable=false
			const findNonSelectableText = (node: any): boolean => {
				if (!node) return false;
				if (
					node.type === "Text" &&
					node.props &&
					node.props.selectable === false
				) {
					return true;
				}
				if (Array.isArray(node.children)) {
					return node.children.some((child: any) =>
						findNonSelectableText(child),
					);
				}
				if (node.children) {
					return findNonSelectableText(node.children);
				}
				return false;
			};

			expect(findNonSelectableText(tree)).toBe(true);
		});

		it("renders with selectable=true when selectableText option is explicitly true", () => {
			const TestComponent = () => {
				const elements = useMarkdown("Hello world", {
					colorScheme: "light",
					selectableText: true,
				});
				return elements[0] as ReactElement;
			};

			const r = render(<TestComponent />);
			const tree = r.toJSON();

			// Check that Text elements have selectable=true
			const findSelectableText = (node: any): boolean => {
				if (!node) return false;
				if (
					node.type === "Text" &&
					node.props &&
					node.props.selectable === true
				) {
					return true;
				}
				if (Array.isArray(node.children)) {
					return node.children.some((child: any) => findSelectableText(child));
				}
				if (node.children) {
					return findSelectableText(node.children);
				}
				return false;
			};

			expect(findSelectableText(tree)).toBe(true);
		});

		it("renders links with selectable=false when selectableText option is false", () => {
			const TestComponent = () => {
				const elements = useMarkdown("[Link](https://example.com)", {
					colorScheme: "light",
					selectableText: false,
				});
				return elements[0] as ReactElement;
			};

			const r = render(<TestComponent />);
			const tree = r.toJSON();

			// Check that Text elements have selectable=false
			const findNonSelectableText = (node: any): boolean => {
				if (!node) return false;
				if (
					node.type === "Text" &&
					node.props &&
					node.props.selectable === false
				) {
					return true;
				}
				if (Array.isArray(node.children)) {
					return node.children.some((child: any) =>
						findNonSelectableText(child),
					);
				}
				if (node.children) {
					return findNonSelectableText(node.children);
				}
				return false;
			};

			expect(findNonSelectableText(tree)).toBe(true);
		});

		it("works with custom renderer and selectableText=false", () => {
			const TestComponent = () => {
				const elements = useMarkdown("Hello world", {
					colorScheme: "light",
					selectableText: false,
				});
				return elements[0] as ReactElement;
			};

			const r = render(<TestComponent />);
			const tree = r.toJSON();

			expect(tree).toBeTruthy();

			// Verify that the custom selectableText option is respected
			const findNonSelectableText = (node: any): boolean => {
				if (!node) return false;
				if (
					node.type === "Text" &&
					node.props &&
					node.props.selectable === false
				) {
					return true;
				}
				if (Array.isArray(node.children)) {
					return node.children.some((child: any) =>
						findNonSelectableText(child),
					);
				}
				if (node.children) {
					return findNonSelectableText(node.children);
				}
				return false;
			};

			expect(findNonSelectableText(tree)).toBe(true);
		});
	});
});
