import { defineConfig } from "@rspress/core";

export default defineConfig({
	root: "docs",
	base: "/react-native-marked/",
	title: "react-native-marked",
	description:
		"Markdown renderer for React Native powered by marked.js with theming support",
	icon: "/logo.png",
	// Rsbuild (Rspack) customization — forwarded to Rsbuild/Rspack.
	// Rspress runs on Rsbuild, which runs on Rspack; `tools.rspack`
	// is the escape hatch for raw Rspack config.
	builderConfig: {
		tools: {
			rspack: {
				// Raw Rspack config merged by Rsbuild.
				// Keep minimal: docs are static, no extra splitting needed.
			},
		},
	},
	themeConfig: {
		nav: [
			{ text: "Guide", link: "/guide/" },
			{ text: "API", link: "/api/" },
			{ text: "Examples", link: "/guide/examples" },
		],
		sidebar: {
			"/guide/": [
				{
					text: "Introduction",
					items: [
						{ text: "Getting Started", link: "/guide/" },
						{ text: "Installation", link: "/guide/installation" },
					],
				},
				{
					text: "Usage",
					items: [
						{ text: "Component", link: "/guide/component" },
						{ text: "Hook", link: "/guide/hook" },
						{ text: "Custom Renderer", link: "/guide/custom-renderer" },
						{ text: "Theming & Styles", link: "/guide/theming" },
						{
							text: "Embedding Components",
							link: "/guide/embedding-components",
						},
						{ text: "Examples", link: "/guide/examples" },
					],
				},
				{
					text: "Advanced",
					items: [
						{ text: "Tokenizer & Hooks", link: "/guide/advanced/tokenizer" },
						{ text: "Supported Elements", link: "/guide/supported-elements" },
						{ text: "Deployment", link: "/guide/advanced/deployment" },
					],
				},
			],
			"/api/": [
				{
					text: "API Reference",
					items: [
						{ text: "Overview", link: "/api/" },
						{ text: "Markdown Props", link: "/api/markdown-props" },
						{ text: "Renderer Interface", link: "/api/renderer" },
						{ text: "Theme & Styles", link: "/api/theme" },
						{ text: "Hooks", link: "/api/hooks" },
					],
				},
			],
		},
		socialLinks: [
			{
				icon: "github",
				mode: "link",
				content: "https://github.com/gmsgowtham/react-native-marked",
			},
		],
		editLink: {
			docRepoBaseUrl:
				"https://github.com/gmsgowtham/react-native-marked/tree/main/docs/docs",
			text: "Edit this page on GitHub",
		},
		lastUpdated: true,
		search: true,
		footer: {
			message: "Released under the MIT License.",
		},
	},
});
