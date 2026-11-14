/**
 * Structural equality for plain, JSON-able data:
 * - primitives and functions: reference equality
 * - arrays: element-wise deep equality
 * - plain objects: unordered key-for-key deep equality
 * - other object kinds (class instances, Map, Date, …): reference equality
 *
 * Conservative by design: it never reports equality for non-plain objects,
 * so consumers only miss an optimization instead of reusing a wrong value.
 */
const isPlainObject = (value: object): boolean => {
	const prototype = Object.getPrototypeOf(value);
	return prototype === Object.prototype || prototype === null;
};

const isEqual = (a: unknown, b: unknown): boolean => {
	if (a === b) return true;

	if (Array.isArray(a)) {
		if (!Array.isArray(b) || a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) {
			if (!isEqual(a[i], b[i])) return false;
		}
		return true;
	}
	if (Array.isArray(b)) return false;

	if (
		typeof a !== "object" ||
		typeof b !== "object" ||
		a === null ||
		b === null
	) {
		return false;
	}

	if (!isPlainObject(a) || !isPlainObject(b)) return false;

	const aKeys = Object.keys(a);
	const bKeys = Object.keys(b);
	if (aKeys.length !== bKeys.length) return false;

	for (const key of aKeys) {
		if (
			!(key in b) ||
			!isEqual(
				(a as Record<string, unknown>)[key],
				(b as Record<string, unknown>)[key],
			)
		) {
			return false;
		}
	}
	return true;
};

export default isEqual;
