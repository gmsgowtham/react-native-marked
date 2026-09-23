# Installation

## Requirements

- React `>=16.8.6` / React Native `>=0.76.0` (`react-native-svg >=12.3.0`)
- Node `>=18` (docs need Node `>=20.19` for Rspress)
- npm (lockfiles: `package-lock.json` at repo root, `docs/`, and the example app)

## For React Native 0.76+

```sh
npm install react-native-marked react-native-svg
```

## For React Native 0.75 and below

```sh
npm install react-native-marked@6.0.7 react-native-svg
```

## Peer deps

`react-native-svg` is required — tables, lists and SVG images depend on it.

## Verify

```sh
npm ci
npm run typescript
npm run lint
npm test
```

## Docs site locally

```sh
npm run docs:dev      # Rspress dev server (Rspack) -> http://localhost:3000/react-native-marked/
npm run docs:build    # Rspress/Rspack production build -> docs/doc_build
npm run docs:preview  # preview production
```

The docs site lives in `docs/` (`docs/package.json`, `docs/rspress.config.ts`) and is built with **Rspack** via Rspress/Rsbuild.
