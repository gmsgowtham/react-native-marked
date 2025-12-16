import type { ReactNode } from "react";
import React, { createContext, useContext, useMemo } from "react";
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
	const contextValue = useMemo<ReactComponentRegistryContextValue>(
		() => ({
			components,
			getComponent: (name: string) => components[name],
			hasComponent: (name: string) => name in components,
		}),
		[components],
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
