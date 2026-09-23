# AGENTS.md

## Package manager & setup
- npm (`package-lock.json`) — use `npm`, not yarn. `npm ci` on CI.
- Node `>=18` required; CI uses `24.20.0`. Pinned via `packageManager` in root `package.json`.
- `npm install` at repo root installs all deps. Example app has its own lockfile: `npm install --prefix examples/react-native-marked-sample`. Docs site: `npm install --prefix docs`.

## Build
- `npm run build` → `react-native-builder-bob` from `src/` to `dist/` (`commonjs` + `module` + `typescript`). `dist/` is gitignored — never edit.
- `package.json` fields: `main`/`module`/`types` point to `dist/`, `react-native`/`source` point to `src/index.ts`. `prepare` runs `npm run build`.
- `bob` config in `package.json:react-native-builder-bob` (`tsconfig.json` as project).
- Version pinning uses npm `overrides` in root `package.json` (replaces Yarn `resolutions`).

## Verify (run before PR)
```sh
npm run typescript   # tsc --noEmit — strict, rootDir src/, excludes examples/ + dangerfile.ts + docs/
npm run lint         # biome check ./
npm test -- --collectCoverage --silent  # CI command; plain `npm test` is `jest --passWithNoTests`
npm run format       # biome format ./ --write (auto-fixes)
npm run docs:dev     # rspress dev (Rspack) — docs site at http://localhost:3000/react-native-marked/
npm run docs:build   # rspress build (Rspack) → docs/doc_build (GitHub Pages artifact)
```
- Single test/file: `npm test -- src/lib/__tests__/Renderer.spec.tsx -t "test name"` (Jest args pass through); update snapshots: `npm run test:updateSnapshot`.
- Perf: `npm run reassure` (baseline comparison via `./reassure-tests.sh` + `dangerfile.ts` on `perf.yml`).

## Tests & config quirks
- Jest config lives in `package.json:jest` (no `jest.config.js`): `preset: react-native`, `testEnvironment: jsdom`, `modulePathIgnorePatterns: dist/, examples/*/node_modules`, `transformIgnorePatterns: react-native|@react-native|github-slugger|marked`.
- Tests under `src/**/__tests__/` + `__perf__/Markdown.perf-test.tsx`. Coverage uploaded via `coverallsapp/github-action`.
- React `19.2.8` / RN `0.78.2` at root, example app uses RN `0.79.4` + Expo `53`.

## Lint / format / style
- Biome `2.5.11` for both lint and format (`biome.json`). Included paths: `src/**`, `examples/**`, `docs/rspress.config.ts`, `docs/package.json`, `docs/tsconfig.json` (plus `!docs/doc_build`, `!docs/node_modules`, `!docs/.rspress`, `!docs/.temp` excludes), `dangerfile.ts`, `biome.json`, `package.json`, `renovate.json`, `tsconfig.json`, `babel.config.js`. `jsxRuntime: reactClassic`.
- Overrides: `correctness.noRenderReturnValue: off`, `suspicious.noArrayIndexKey: info`.
- EditorConfig: 2-space indent, `lf`, `utf-8`, trim trailing whitespace.
- TS `paths` alias: `react-native-marked` → `./src/index`.

## Architecture
- Entry `src/index.ts:1` re-exports: default `Markdown` (`src/lib/Markdown.tsx` — FlatList wrapper), `useMarkdown` (`src/hooks/useMarkdown.ts`), `useMarkdownWithComponents` (`src/hooks/useMarkdownWithComponents.tsx`), `Renderer` (`src/lib/Renderer.tsx`), `ReactComponentRegistry`/`Provider` (`src/lib/ReactComponentRegistry.tsx`), plus `MarkedHooks`/`MarkedTokenizer`/`MarkedLexer` from `marked`.
- Core flow: `marked.lexer` → `src/lib/Parser.tsx` (token → RN nodes via `RendererInterface` `src/lib/types.ts:36`) → theming via `src/theme/styles.ts` + `src/theme/types.ts`.
- Deps: `marked`, `react-native-svg`, `react-native-reanimated-table`, `@jsamr/react-native-li`, `github-slugger`, `svg-parser`, `html-entities`.

## Git hooks & release
- `lefthook.yml`: `pre-commit` runs `biome check` + `biome format --write && git add` on staged files; `commit-msg` runs `commitlint --edit`.
- `commitlint` (`@commitlint/config-conventional`): allowed types `build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|todo|bump`.
- Release: `npm run release` / `npm run release:rc` / `npm run release:exclude-pre` → `npm run build && release-it` (conventional-changelog, tag `v${version}`).

## Gotchas
- Babel is `@react-native/babel-preset` only (`babel.config.js:2`) — no extra plugins at root.
- Example app (`examples/react-native-marked-sample/`, Expo) is not part of root Jest/Biome `dist` ignores — don't `npm install` it from root during repro (it has its own lockfile; use `npm install --prefix`).
- `.reassure/current.perf` is gitignored; `reassure-tests.sh` switches branches to collect baselines — don't run blindly on dirty worktree.
