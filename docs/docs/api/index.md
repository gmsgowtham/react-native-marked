# API Overview

Entry: `src/index.ts:1` re-exports:

- Default `Markdown` (`src/lib/Markdown.tsx` — FlatList wrapper)
- `useMarkdown` (`src/hooks/useMarkdown.ts`)
- `useMarkdownWithComponents` (`src/hooks/useMarkdownWithComponents.tsx`)
- `Renderer` (`src/lib/Renderer.tsx`) + `ReactComponentRegistry`/`Provider` (`src/lib/ReactComponentRegistry.tsx`)
- `MarkedHooks` / `MarkedTokenizer` / `MarkedLexer` from `marked`

Core flow: `marked.lexer` → `src/lib/Parser.tsx` → `RendererInterface` (`src/lib/types.ts:36`) → theming (`src/theme/styles.ts`, `src/theme/types.ts`).

- [Markdown Props](./markdown-props)
- [Renderer Interface](./renderer)
- [Theme & Styles](./theme)
- [Hooks](./hooks)
