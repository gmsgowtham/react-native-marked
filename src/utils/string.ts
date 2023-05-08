export const replaceNewLines = (str: string, replaceWith: string) => {
	return str.replace(/(?:\r\n|\r|\n)/gm, replaceWith);
};
