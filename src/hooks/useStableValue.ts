import { useRef } from "react";
import isEqual from "./../utils/isEqual";

/** Keeps structurally equal inline styles and themes stable across renders. */
export default function useStableValue<T>(value: T): T {
	const stored = useRef(value);
	if (!isEqual(stored.current, value)) {
		stored.current = value;
	}
	return stored.current;
}
