import type { ReactComponentToken } from "../ReactComponentTokenizer";
import {
	isReactComponentToken,
	ReactComponentTokenizer,
} from "../ReactComponentTokenizer";

describe("ReactComponentTokenizer", () => {
	let tokenizer: ReactComponentTokenizer;

	beforeEach(() => {
		tokenizer = new ReactComponentTokenizer();
	});

	describe("self-closing components", () => {
		it("parses a simple self-closing component", () => {
			const result = tokenizer.html("<Button />");

			expect(result).toBeDefined();
			if (!result) throw new Error("Expected result");
			expect(isReactComponentToken(result)).toBe(true);

			const token = result as ReactComponentToken;
			expect(token.componentName).toBe("Button");
			expect(token.componentProps).toEqual({});
			expect(token.componentChildren).toBe("");
		});

		it("parses a self-closing component with string props", () => {
			const result = tokenizer.html('<Button label="Click me" />');

			expect(result).toBeDefined();
			const token = result as ReactComponentToken;
			expect(token.componentName).toBe("Button");
			expect(token.componentProps).toEqual({ label: "Click me" });
		});

		it("parses props with single quotes", () => {
			const result = tokenizer.html("<Button label='Click me' />");

			expect(result).toBeDefined();
			const token = result as ReactComponentToken;
			expect(token.componentProps).toEqual({ label: "Click me" });
		});

		it("parses boolean props in braces", () => {
			const result = tokenizer.html("<Button disabled={true} />");

			expect(result).toBeDefined();
			const token = result as ReactComponentToken;
			expect(token.componentProps).toEqual({ disabled: true });
		});

		it("parses numeric props in braces", () => {
			const result = tokenizer.html("<Counter count={42} />");

			expect(result).toBeDefined();
			const token = result as ReactComponentToken;
			expect(token.componentProps).toEqual({ count: 42 });
		});

		it("parses shorthand boolean props", () => {
			const result = tokenizer.html("<Button disabled />");

			expect(result).toBeDefined();
			const token = result as ReactComponentToken;
			expect(token.componentProps).toEqual({ disabled: true });
		});

		it("parses multiple props", () => {
			const result = tokenizer.html(
				'<Button label="Submit" disabled size={2} />',
			);

			expect(result).toBeDefined();
			const token = result as ReactComponentToken;
			expect(token.componentProps).toEqual({
				label: "Submit",
				disabled: true,
				size: 2,
			});
		});
	});

	describe("components with children", () => {
		it("parses a component with text children", () => {
			const result = tokenizer.html("<InfoBox>Hello World</InfoBox>");

			expect(result).toBeDefined();
			const token = result as ReactComponentToken;
			expect(token.componentName).toBe("InfoBox");
			expect(token.componentChildren).toBe("Hello World");
		});

		it("parses a component with props and children", () => {
			const result = tokenizer.html(
				'<InfoBox title="Note">This is important</InfoBox>',
			);

			expect(result).toBeDefined();
			const token = result as ReactComponentToken;
			expect(token.componentName).toBe("InfoBox");
			expect(token.componentProps).toEqual({ title: "Note" });
			expect(token.componentChildren).toBe("This is important");
		});

		it("preserves markdown in children", () => {
			const result = tokenizer.html("<InfoBox>**Bold** and *italic*</InfoBox>");

			expect(result).toBeDefined();
			const token = result as ReactComponentToken;
			expect(token.componentChildren).toBe("**Bold** and *italic*");
		});

		it("handles multiline children", () => {
			const result = tokenizer.html("<InfoBox>\nLine 1\nLine 2\n</InfoBox>");

			expect(result).toBeDefined();
			const token = result as ReactComponentToken;
			expect(token.componentChildren).toBe("Line 1\nLine 2");
		});
	});

	describe("nested components", () => {
		it("handles nested components of same type", () => {
			const result = tokenizer.html("<Box><Box>Inner</Box></Box>");

			expect(result).toBeDefined();
			const token = result as ReactComponentToken;
			expect(token.componentName).toBe("Box");
			expect(token.componentChildren).toBe("<Box>Inner</Box>");
		});
	});

	describe("component name validation", () => {
		it("matches PascalCase component names", () => {
			const button = tokenizer.html("<Button />");
			const myComponent = tokenizer.html("<MyComponent />");
			const a = tokenizer.html("<A />");
			const component123 = tokenizer.html("<Component123 />");

			expect(button && isReactComponentToken(button)).toBe(true);
			expect(myComponent && isReactComponentToken(myComponent)).toBe(true);
			expect(a && isReactComponentToken(a)).toBe(true);
			expect(component123 && isReactComponentToken(component123)).toBe(true);
		});
	});

	describe("isReactComponentToken", () => {
		it("returns true for ReactComponentToken", () => {
			const result = tokenizer.html("<Button />");
			expect(result && isReactComponentToken(result)).toBe(true);
		});

		it("returns false for regular HTML token", () => {
			const regularToken = {
				type: "html" as const,
				raw: "<div></div>",
				text: "<div></div>",
				block: true,
				pre: false,
			};
			expect(isReactComponentToken(regularToken)).toBe(false);
		});
	});
});
