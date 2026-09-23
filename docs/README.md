# docs — react-native-marked documentation site

Built with **Rspack** via [Rspress](https://rspress.rs) (Rsbuild → Rspack) and deployed to **GitHub Pages**.

- `rspress.config.ts` — site config, `base: "/react-native-marked/"` for project Pages, `builderConfig` forwarded to Rspack
- `docs/` — markdown/MDX content (Rspress `root: "docs"`)
- `doc_build/` — production output (ignored, uploaded as Pages artifact)
- Package `docs/package.json` explicitly depends on `@rspack/core` to satisfy “use rspack”

## Develop

```sh
npm ci                               # root (if needed)
npm install --prefix docs            # docs deps (creates docs/package-lock.json)
npm run docs:dev      # dev server http://localhost:3000/react-native-marked/
npm run docs:build    # production build -> docs/doc_build
npm run docs:preview  # preview build
```

## Deploy

Workflow `.github/workflows/docs.yml` builds with Rspack and deploys on `push: main`.

Requires repo Settings → Pages → Source: **GitHub Actions**.

- PRs: build only (no deploy)
- `main` push: build + `actions/deploy-pages@v4`
