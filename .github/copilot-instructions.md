# Copilot Instructions for react-native-marked

## Build, Test, and Lint Commands

### Setup
```bash
yarn               # Install dependencies
```

### Development & Testing
```bash
yarn typescript    # Type-check with TypeScript
yarn lint          # Lint with Biome
yarn format        # Auto-format with Biome
yarn test          # Run all Jest tests
yarn test --watch # Run tests in watch mode
yarn test <file>  # Run specific test file (e.g., src/lib/__tests__/Markdown.spec.tsx)
```

### Building
```bash
yarn build         # Build distribution files using react-native-builder-bob
```

### Example App
```bash
cd examples/react-native-marked-sample
yarn install
yarn android       # Run on Android
yarn ios           # Run on iOS
yarn web           # Run on web
```

### Pre-commit Hooks
The project uses `commitlint` and `biome` pre-commit hooks (via lefthook). Commits must follow [conventional commit format](#commit-conventions).

## High-Level Architecture

### Core Pipeline
1. **Markdown Input** → `<Markdown />` component or `useMarkdown()` hook
2. **Token Generation** → `marked.js` lexer produces tokens
3. **Token Parsing** → `Parser` class converts tokens to React elements using the `Renderer`
4. **Component Rendering** → Elements are rendered in a `FlatList` (component) or returned as array (hook)

### Key Classes & Interfaces

**`RendererInterface`** (src/lib/types.ts)
- Defines all markdown element rendering methods (paragraph, heading, code, link, image, table, etc.)
- Implement this interface to customize how markdown elements are rendered
- Example: `class CustomRenderer extends Renderer implements RendererInterface`

**`Renderer`** (src/lib/Renderer.tsx)
- Default implementation of `RendererInterface`
- Uses Biome slugger for ID generation across heading elements
- Handles React Native-specific rendering (ScrollView for code blocks, TouchableHighlight for links, etc.)
- See README for custom renderer examples

**`Parser`** (src/lib/Parser.tsx)
- Converts `marked` tokens recursively into ReactNode elements
- Maintains heading styles map for h1-h6 styling
- Handles HTML entity decoding for safety

**`Markdown` Component** (src/lib/Markdown.tsx)
- Main consumer component wrapping the `useMarkdown` hook
- Renders elements in a FlatList with lazy loading (maxToRenderPerBatch, initialNumToRender)

### Hooks

**`useMarkdown`** (src/hooks/useMarkdown.ts)
- Core hook that returns an array of ReactNode elements
- Accepts markdown string and options (theme, styles, renderer, baseUrl, tokenizer, hooks)
- Returns elements ready for rendering in any list component

**`useMarkdownWithComponents`** (src/hooks/useMarkdownWithComponents.tsx)
- Extends `useMarkdown` to support embedding React components in markdown
- Requires `ReactComponentRegistryProvider` context to register components
- Parses JSX-like syntax: `<ComponentName prop="value" />`

### Advanced Extensibility

**Custom Tokenizer**
- Extend `marked.Tokenizer` to customize token generation (example: LaTeX support)
- Pass via `tokenizer` prop to modify markdown syntax recognition

**Custom Renderer**
- Extend `Renderer` class and implement `RendererInterface` methods
- Override specific elements (e.g., code blocks for syntax highlighting, images for fast-image integration)
- Pass via `renderer` prop

**Marked Hooks**
- Pass `hooks` option to transform tokens before rendering (https://marked.js.org/using_pro#hooks)

**React Component Embedding**
- Use `ReactComponentRegistryProvider` + `useMarkdownWithComponents` to embed custom components
- Unregistered components are automatically stripped from output

## Key Conventions

### File Organization
- **src/lib** - Core parsing and rendering logic
- **src/components** - Reusable React Native components (MDImage, MDList, MDTable, MDSvg, etc.)
- **src/hooks** - Custom React hooks for markdown processing
- **src/theme** - Default theme, styles, and type definitions
- **src/utils** - Utility functions (URL validation, table width calculation, handlers, SVG parsing)
- **src/__tests__** - Unit tests (collocated with source files using `__tests__` directories)

### Testing Patterns
- Tests use Jest with `@testing-library/react-native`
- Snapshot testing for component output (`expect(tree).toMatchSnapshot()`)
- Test files named `*.spec.ts(x)` or `*.test.ts(x)`
- Run full test suite: `yarn test`
- Run single test file: `yarn test src/lib/__tests__/Markdown.spec.tsx`
- Update snapshots: `yarn test:updateSnapshot`

### TypeScript & Types
- All public APIs are fully typed
- Type exports: `RendererInterface`, `MarkdownProps`, `UserTheme`, `MarkedStyles`, `ParserOptions`
- Generic support for custom tokens: `MarkedTokenizer<CustomToken>`

### Styling & Theming
- Theme system defines colors, spacing, and typography via `UserTheme` interface
- Component styles override theme values via `MarkedStyles` interface
- Default light/dark themes based on `colorScheme` prop
- Styles accept standard React Native style objects (ViewStyle, TextStyle, ImageStyle)

### Commit Message Format
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code refactor
- `docs:` Documentation changes
- `test:` Test additions/changes
- `chore:` Build, CI, dependencies, tooling
- `perf:` Performance improvements

Pre-commit hooks verify format automatically.

### Code Quality Tools
- **Biome** - Unified linter and formatter (replaces ESLint + Prettier)
  - Config: `biome.json`
  - Rules: Recommended set with customizations (e.g., `noArrayIndexKey: "info"`)
- **TypeScript** - Strict type checking
- **Jest** - Unit testing with jsdom environment for React Native Web compatibility
- **release-it** - Automated npm publishing with semantic versioning

### Exported Public APIs
Check `src/index.ts` for exports:
- `Markdown` - Main component
- `useMarkdown` - Hook for elements array
- `useMarkdownWithComponents` - Hook with component support
- `ReactComponentRegistryProvider` - Context provider
- `Renderer` - Base class for custom renderers
- `Parser` - Token to element converter
- Type exports: `RendererInterface`, `MarkdownProps`, `MarkedTokenizer`, etc.

## Performance Considerations

- **FlatList Optimization** - Component uses `removeClippedSubviews={false}`, `maxToRenderPerBatch`, and `initialNumToRender` for large markdown documents
- **Reassure Tests** - Performance regression detection (run with `yarn reassure`)
- **Snapshot Performance** - See `src/lib/__perf__/` for performance testing examples
