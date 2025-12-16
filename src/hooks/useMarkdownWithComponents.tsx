import type { ReactNode } from "react";
import React, { useMemo } from "react";
import { useReactComponentRegistry } from "../lib/ReactComponentRegistry";
import type { ReactComponentToken } from "../lib/ReactComponentTokenizer";
import {
	isReactComponentToken,
	ReactComponentTokenizer,
} from "../lib/ReactComponentTokenizer";
import Renderer from "../lib/Renderer";
import type { RendererInterface } from "../lib/types";
import type { useMarkdownHookOptions } from "./useMarkdown";
import useMarkdown from "./useMarkdown";

export interface useMarkdownWithComponentsOptions
	extends Omit<useMarkdownHookOptions, "tokenizer"> {}

interface ComponentData {
	token: ReactComponentToken;
	id: string;
}

export function useMarkdownWithComponents(
	value: string,
	options?: useMarkdownWithComponentsOptions,
): ReactNode[] {
	const registry = useReactComponentRegistry();

	const { tokenizer, componentMap } = useMemo(() => {
		const map = new Map<string, ComponentData>();

		const customTokenizer = new ReactComponentTokenizer();
		const originalHtml = customTokenizer.html.bind(customTokenizer);

		let componentCounter = 0;

		customTokenizer.html = (src: string) => {
			const token = originalHtml(src);
			if (token && isReactComponentToken(token)) {
				const id = `${token.componentName}-${componentCounter++}`;
				map.set(token.raw, { token, id });
			}
			return token;
		};

		return { tokenizer: customTokenizer, componentMap: map };
	}, []);

	const baseRenderer = useMemo(
		() => options?.renderer ?? new Renderer(),
		[options?.renderer],
	);

	const renderer = useMemo<RendererInterface>(() => {
		const wrappedRenderer = Object.create(baseRenderer) as typeof baseRenderer;

		wrappedRenderer.html = (text: string | ReactNode[], styles): ReactNode => {
			if (typeof text === "string") {
				const data = componentMap.get(text);
				if (data) {
					if (registry?.hasComponent(data.token.componentName)) {
						const Component = registry.getComponent(data.token.componentName);
						if (Component) {
							return (
								<Component key={data.id} props={data.token.componentProps}>
									{data.token.componentChildren || undefined}
								</Component>
							);
						}
					}
					return null;
				}
			}

			return baseRenderer.html(text, styles);
		};

		return wrappedRenderer;
	}, [baseRenderer, componentMap, registry]);

	const elements = useMarkdown(value, {
		...options,
		tokenizer,
		renderer,
	});

	return elements;
}

export default useMarkdownWithComponents;
