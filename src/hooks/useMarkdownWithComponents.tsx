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
import { getStableKeyOf } from "../utils/stableKeys";
import type { useMarkdownHookOptions } from "./useMarkdown";
import useMarkdown, { areHookOptionsEqual } from "./useMarkdown";
import useStableValue from "./useStableValue";

export interface useMarkdownWithComponentsOptions
	extends Omit<useMarkdownHookOptions, "tokenizer"> {}

export function useMarkdownWithComponents(
	value: string,
	options?: useMarkdownWithComponentsOptions,
): ReactNode[] {
	const registry = useReactComponentRegistry();

	/* Stable options snapshot: inline `renderer`/`styles` object literals must
	 * not invalidate the base renderer (and with it the whole parse). */
	const stableOptions = useStableValue(options, areHookOptionsEqual);

	const { tokenizer, tokenDataMap } = useMemo(() => {
		const map = new Map<string, ReactComponentToken>();

		const customTokenizer = new ReactComponentTokenizer();
		const originalHtml = customTokenizer.html.bind(customTokenizer);

		customTokenizer.html = (src: string) => {
			const token = originalHtml(src);
			if (token && isReactComponentToken(token)) {
				map.set(token.raw, token);
			}
			return token;
		};

		return { tokenizer: customTokenizer, tokenDataMap: map };
	}, []);

	const baseRenderer = useMemo<Renderer>(
		() =>
			(stableOptions?.renderer as Renderer) ??
			new Renderer({ selectable: stableOptions?.selectable }),
		[stableOptions?.renderer, stableOptions?.selectable],
	);

	const renderer = useMemo<RendererInterface>(() => {
		// Use prototype delegation so all Renderer methods (text, link, getTextNode -> selectable,
		// getKey -> slugger) resolve via baseRenderer's prototype. Only `html` is overridden here
		// for component registry handling. Avoids copying private fields and keeps `this` binding
		// consistent. If Renderer ever uses #private fields this pattern will need revisiting.
		const wrappedRenderer = Object.create(baseRenderer) as typeof baseRenderer;

		wrappedRenderer.html = (text, styles, token): ReactNode => {
			if (typeof text === "string") {
				const data = tokenDataMap.get(text);
				if (data) {
					if (registry?.hasComponent(data.componentName)) {
						const Component = registry.getComponent(data.componentName);
						if (Component) {
							/*
							 * Key from the assigned stable token key, so component
							 * instances keep their identity (and internal state)
							 * across re-parses and streaming updates.
							 */
							return (
								<Component
									key={getStableKeyOf(token) ?? data.raw}
									props={data.componentProps}
								>
									{data.componentChildren || undefined}
								</Component>
							);
						}
					}
					return null;
				}
			}

			return baseRenderer.html(text, styles, token);
		};

		return wrappedRenderer;
	}, [baseRenderer, tokenDataMap, registry]);

	const elements = useMarkdown(value, {
		...stableOptions,
		tokenizer,
		renderer,
	});

	return elements;
}

export default useMarkdownWithComponents;
