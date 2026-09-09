# Examples

- CodeSandbox: https://codesandbox.io/s/react-native-marked-l2hpi3?file=/src/App.js
- Local sample app: `examples/react-native-marked-sample` (Expo 53, RN 0.79.4)

```sh
cd examples/react-native-marked-sample
yarn install
yarn android | yarn ios | yarn web
```

## Common snippets

### Link handling

Links use `onLinkPress` (`src/utils/handlers.ts`) — override via renderer `link()` to integrate `Linking` or `expo-linking`.

### Images & SVG

`.svg` URIs auto-render via `MDSvg` (`src/components/MDSvg.tsx`), others via `MDImage` (`src/components/MDImage.tsx`).

Both use the markdown alt text — falling back to the title — as their `accessibilityLabel`.

### Tables

Rendered with `react-native-reanimated-table` (`src/components/MDTable.tsx`) — provide `table` / `tableRow` / `tableCell` styles.

### Lists

Ordered/unordered via `@jsamr/react-native-li` (`src/components/MDList.tsx`).
