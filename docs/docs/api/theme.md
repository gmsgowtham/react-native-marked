# Theme & Styles

## MarkedStyles (`src/theme/types.ts:5`)

```ts
interface MarkedStyles {
  em?: TextStyle; strong?: TextStyle; strikethrough?: TextStyle;
  text?: TextStyle; paragraph?: ViewStyle; link?: TextStyle; blockquote?: ViewStyle;
  h1?: TextStyle; h2?: TextStyle; h3?: TextStyle; h4?: TextStyle; h5?: TextStyle; h6?: TextStyle;
  codespan?: TextStyle;
  code?: ViewStyle; codeText?: TextStyle;
  hr?: ViewStyle; list?: ViewStyle; li?: TextStyle;
  image?: ImageStyle;
  table?: ViewStyle; tableRow?: ViewStyle; tableCell?: ViewStyle;
}
```

## UserTheme (`src/theme/types.ts:31`)

```ts
interface UserTheme {
  colors?: ColorsPropType; // see src/theme/colors.ts
  spacing?: Record<SpacingKeysType, number>; // see src/theme/spacing.ts
}
```

`styles` prop overrides `theme`-derived defaults (`src/theme/styles.ts`). Example: [Theming](/guide/theming).
