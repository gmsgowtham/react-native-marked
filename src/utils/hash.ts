/**
 * Fast, deterministic 32-bit string hash (32-bit "hash * 31" variant).
 *
 * Used to derive stable React keys from token content so that identical
 * tokens produce identical keys across parses. Collisions only cause a
 * benign replacement render, never data loss.
 */
const hashString = (value: string): number => {
	let hash = 0;
	for (let i = 0; i < value.length; i++) {
		hash = (hash << 5) - hash + value.charCodeAt(i);
		// Multiply the hash by 31 and keep it a 32-bit integer.
		hash &= 0xffffffff;
	}
	return hash >>> 0;
};

export default hashString;
