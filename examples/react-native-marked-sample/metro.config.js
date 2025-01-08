const path = require("node:path");
const fs = require("node:fs");
const blacklist = require("metro-config/src/defaults/exclusionList");
const escapeString = require("escape-string-regexp");

const root = path.resolve(__dirname, "../..");
const pak = JSON.parse(
	fs.readFileSync(path.join(root, "package.json"), "utf8"),
);

const modules = [
	"@babel/runtime",
	"react-native-web",
	...Object.keys(pak.dependencies),
	...Object.keys(pak.peerDependencies),
];

module.exports = {
	projectRoot: __dirname,
	watchFolders: [root],

	resolver: {
		blacklistRE: blacklist([
			new RegExp(`^${escapeString(path.join(root, "node_modules"))}\\/.*$`),
		]),

		extraNodeModules: modules.reduce((acc, name) => {
			acc[name] = path.join(__dirname, "node_modules", name);
			return acc;
		}, {}),
	},

	transformer: {
		getTransformOptions: async () => ({
			transform: {
				experimentalImportSupport: false,
				inlineRequires: true,
			},
		}),
	},
};
