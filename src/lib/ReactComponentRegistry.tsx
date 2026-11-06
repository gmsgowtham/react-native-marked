import type { ReactNode } from "react";
import React, { createContext, useContext, useMemo } from "react";
import { useStableValue } from "./../hooks/useStableValue";
import type { ReactComponentProps } from "./ReactComponentTokenizer";

export interface ReactComponentRendererProps {
	props: ReactComponentProps;
	children?: ReactNode;
}

export type ReactComponentRenderer = (
	props: ReactComponentRendererProps,
) => ReactNode;

export type ReactComponentRegistry = Record<string, ReactComponentRenderer>;

interface ReactComponentRegistryContextValue {
	components: ReactComponentRegistry;
	getComponent: (name: string) => ReactComponentRenderer | undefined;
	hasComponent: (name: string) => boolean;
}

const ReactComponentRegistryContext =
	createContext<ReactComponentRegistryContextValue | null>(null);

interface ReactComponentRegistryProviderProps {
	components: ReactComponentRegistry;
	children: ReactNode;
}

export function ReactComponentRegistryProvider({
	components,
	children,
}: ReactComponentRegistryProviderProps) {
	/* Stable reference for inline `components={{...}}` object literals, so
	 * context consumers do not invalidate their parse on every render. */
	const stableComponents = useStableValue(components);

	const contextValue = useMemo<ReactComponentRegistryContextValue>(
		() => ({
			components: stableComponents,
			getComponent: (name: string) => stableComponents[name],
			hasComponent: (name: string) => name in stableComponents,
		}),
		[stableComponents],
	);

	return (
		<ReactComponentRegistryContext.Provider value={contextValue}>
			{children}
		</ReactComponentRegistryContext.Provider>
	);
}

export function useReactComponentRegistry(): ReactComponentRegistryContextValue | null {
	return useContext(ReactComponentRegistryContext);
}
