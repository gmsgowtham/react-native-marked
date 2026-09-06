# Deployment (Rspack + GitHub Pages)

This site is built with **Rspack** via **Rspress** (which uses Rsbuild → Rspack).

## Stack

- **Bundler:** `@rspack/core` `2.2.2` (explicit dep in `docs/package.json`)
- **Docs framework:** `@rspress/core` `2.0.19` (`rspress dev/build/preview` wrap Rspack)
- **Config:** `docs/rspress.config.ts` (`base: "/react-native-marked/"`, `builderConfig` forwarded to Rspack)
- **Output:** `docs/doc_build`

## Local

```sh
yarn docs:dev      # HMR dev server
yarn docs:build    # production build
yarn docs:preview
```

## GitHub Pages

Workflow `.github/workflows/docs.yml` runs on `push: main` (and PRs for build check):

1. `yarn install --frozen-lockfile` (root)
2. `yarn --cwd docs install --frozen-lockfile` (if `docs/yarn.lock` exists, else falls back to root)
3. `yarn docs:build` → `docs/doc_build`
4. `actions/upload-pages-artifact@v3` with `path: docs/doc_build`
5. `actions/deploy-pages@v4` (needs `Settings → Pages → Source: GitHub Actions`)

`rspress.config.ts` `base: "/react-native-marked/"` is required for project pages (`https://gmsgowtham.github.io/react-native-marked/`). For a custom domain, change `base: "/"` and add `docs/docs/public/CNAME` (served from the Rspress `root`-relative `public/` dir).

See also `rspack` docs: https://rspack.rs and `rspress` docs: https://rspress.rs
