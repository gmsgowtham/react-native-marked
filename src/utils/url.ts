export const getValidURL = (prefix: string, path: string) => {
	// remove trailing slash from prefix
	if (prefix.endsWith("/")) {
		prefix = prefix.slice(0, -1);
	}

	// path is valid url
	if (path.startsWith("https") || path.startsWith("http")) {
		return path;
	}

	// absolute path
	if (path.startsWith("/")) {
		return `${prefix}${path}`;
	}

	// relative path
	return `${prefix}/${path}`;
};
