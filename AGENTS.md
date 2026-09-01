# AGENTS.md

## Package manager & setup
- Yarn Classic (`yarn.lock` v1) — use `yarn`, not npm. `yarn install --frozen-lockfile` on CI.
- Node `>=18` required; CI uses `24.20.0`.
- `yarn` at repo root installs all deps. Example app has its own lockfile: `examples/react-native-marked-sample/yarn install`.

## Build
- `yarn build` → `react-native-builder-bob` from `src/` to `dist/` (`commonjs` + `module` + `typescript`). `dist/` is gitignored — never edit.
- `package.json` fields: `main`/`module`/`types` point to `dist/`, `react-native`/`source` point to `src/index.ts`. `prepare` runs `yarn build`.
- `bob` config in `package.json:react-native-builder-bob` (`tsconfig.json` as project).

## Verify (run before PR)
```sh
yarn typescript   # tsc --noEmit — strict, rootDir src/, excludes examples/ + dangerfile.ts
yarn lint         # biome check ./
yarn test --collectCoverage --silent  # CI command; plain `yarn test` is `jest --passWithNoTests`
yarn format       # biome format ./ --write (auto-fixes)
```
- Single test/file: `yarn test src/lib/__tests__/Renderer.spec.tsx -t "test name"` (Jest args pass through); update snapshots: `yarn test:updateSnapshot`.
- Perf: `yarn reassure` (baseline comparison via `./reassure-tests.sh` + `dangerfile.ts` on `perf.yml`).

## Tests & config quirks
- Jest config lives in `package.json:jest` (no `jest.config.js`): `preset: react-native`, `testEnvironment: jsdom`, `modulePathIgnorePatterns: dist/, examples/*/node_modules`, `transformIgnorePatterns: react-native|@react-native|github-slugger|marked`.
- Tests under `src/**/__tests__/` + `__perf__/Markdown.perf-test.tsx`. Coverage uploaded via `coverallsapp/github-action`.
- React `19.2.8` / RN `0.78.2` at root, example app uses RN `0.79.4` + Expo `53`.

## Lint / format / style
- Biome `2.5.11` for both lint and format (`biome.json`). Included paths: `src/**`, `examples/**`, `dangerfile.ts`, `biome.json`, `package.json`, `renovate.json`, `tsconfig.json`, `babel.config.js`. `jsxRuntime: reactClassic`.
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
- Release: `yarn release` / `yarn release:rc` / `yarn release:exclude-pre` → `yarn build && release-it` (conventional-changelog, tag `v${version}`).

## Gotchas
- Babel is `@react-native/babel-preset` only (`babel.config.js:2`) — no extra plugins at root.
- Example app (`examples/react-native-marked-sample/`, Expo) is not part of root Jest/Biome `dist` ignores — don't `yarn install` it from root during repro.
- `.reassure/current.perf` is gitignored; `reassure-tests.sh` switches branches to collect baselines — don't run blindly on dirty worktree.
