import { useRef } from "react";
import isEqual from "./../utils/isEqual";

/**
 * Comparator over two values. Returning `true` keeps the previous reference.
 */
type EqualityCheck<T> = (previous: T, next: T) => boolean;

/**
 * Returns a reference-stable version of `value`.
 *
 * While the comparator (structural equality by default) reports no change,
 * the previously stored reference is returned so that `useMemo` dependency
 * chains do not collapse when consumers pass inline object literals, e.g.
 * `styles={{...}}` or `theme={{...}}` in JSX.
 *
 * Content grows are observed through the comparator; mutation-only updates
 * are intentionally not (same semantics as current memo dependencies).
 */
export function useStableValue<T>(value: T, comparator?: EqualityCheck<T>): T {
	const areEqual = comparator ?? isEqual;
	const stored = useRef<T>(value);
	const hasStored = useRef<boolean>(false);

	if (!hasStored.current) {
		hasStored.current = true;
		stored.current = value;
	} else if (!areEqual(stored.current, value)) {
		stored.current = value;
	}

	return stored.current;
}

export default useStableValue;
