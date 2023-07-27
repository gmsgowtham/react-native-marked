export const getValidURL = (prefix: string, path: string) => {
	let _prefix = prefix;
	// remove trailing slash from prefix
	if (_prefix.endsWith("/")) {
		_prefix = _prefix.slice(0, -1);
	}

	// consider path a valid url if it starts with a scheme name followed by a semicolon
	// i.e. https://example.com, mailto:person@example.com, tel:1234567, slack://open
	const urlPattern = /^[a-z]+:/i;
	if (urlPattern.test(path)) {
		return path;
	}

	// absolute path
	if (path.startsWith("/")) {
		return `${_prefix}${path}`;
	}

	// relative path
	return `${_prefix}/${path}`;
};
