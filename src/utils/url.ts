export const getValidURL = (prefix: string, path: string) => {
	let _prefix = prefix;
	// remove trailing slash from prefix
	if (_prefix.endsWith("/")) {
		_prefix = _prefix.slice(0, -1);
	}

	// path is valid url
	if (path.startsWith("https") || path.startsWith("http")) {
		return path;
	}

	// absolute path
	if (path.startsWith("/")) {
		return `${_prefix}${path}`;
	}

	// relative path
	return `${_prefix}/${path}`;
};
