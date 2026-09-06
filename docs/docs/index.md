---
pageType: home

hero:
  name: react-native-marked
  text: Markdown for React Native
  tagline: Beautiful Markdown renderer powered by marked.js — with theming, custom renderers and Rspack-built docs
  actions:
    - theme: brand
      text: Quick Start
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/gmsgowtham/react-native-marked
features:
  - title: ⚡ Powered by marked.js
    details: Fast, CommonMark-compliant parsing with extensible tokenizer & hooks.
    icon: 📝
  - title: 🎨 Built-in Theming
    details: Light/dark colors + spacing tokens, fully overridable via styles & theme props.
    icon: 🎨
  - title: 🧩 Custom Renderers
    details: Override any element — code highlighting, images (FastImage), tables, SVG and more.
    icon: 🧩
  - title: 🧬 Embed React Components
    details: Use useMarkdownWithComponents to render interactive JSX inside markdown.
    icon: 🧬
  - title: 📦 Rspack Built Docs
    details: Docs site bundled with Rspack (via Rspress/Rsbuild) and deployed to GitHub Pages.
    icon: 📦
  - title: ✅ Typed & Tested
    details: First-class TypeScript, Jest coverage and Biome linted.
    icon: ✅
---

## Install

```sh
yarn add react-native-marked react-native-svg
# RN <=0.75 use v6
# yarn add react-native-marked@6.0.7 react-native-svg
```

## Hello World

```tsx
import Markdown from "react-native-marked";

export default function App() {
  return (
    <Markdown
      value={`# Hello world\n\nThis is **react-native-marked**!`}
      flatListProps={{ initialNumToRender: 8 }}
    />
  );
}
```

## Why Rspack?

This documentation site is built with **Rspack** (through [Rspress](https://rspress.rs) / [Rsbuild](https://rsbuild.rs)) for lightning-fast builds and HMR. See [Deployment](/guide/advanced/deployment) for the GitHub Pages workflow.

> Next: [Getting Started →](/guide/)
