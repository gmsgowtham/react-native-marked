// Paul Hsieh's SuperFastHash
// Ref: https://mojoauth.com/hashing/paul-hsiehs-superfasthash-in-javascript-in-browser/
const superFastHash = (str: string): number => {
	let hash = 0;
	let i: number;
	let chr: number;
	if (str.length === 0) return hash;
	for (i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr; // hash * 31 + chr
		hash |= 0; // Convert to 32bit integer
	}
	return hash >>> 0; // Ensure a positive integer
};

export { superFastHash };
