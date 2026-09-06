# Installation

## Requirements

- React `>=16.8.6` / React Native `>=0.76.0` (`react-native-svg >=12.3.0`)
- Node `>=18` (docs need Node `>=20.19` for Rspress)
- Yarn Classic (`yarn.lock` v1) at repo root

## For React Native 0.76+

```sh
yarn add react-native-marked react-native-svg
```

## For React Native 0.75 and below

```sh
yarn add react-native-marked@6.0.7 react-native-svg
```

## Peer deps

`react-native-svg` is required — tables, lists and SVG images depend on it.

## Verify

```sh
yarn install --frozen-lockfile
yarn typescript
yarn lint
yarn test
```

## Docs site locally

```sh
yarn docs:dev      # Rspress dev server (Rspack) -> http://localhost:3000/react-native-marked/
yarn docs:build    # Rspress/Rspack production build -> docs/doc_build
yarn docs:preview  # preview production
```

The docs site lives in `docs/` (`docs/package.json`, `docs/rspress.config.ts`) and is built with **Rspack** via Rspress/Rsbuild.
