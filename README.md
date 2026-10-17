# Tritium

A React component library built on [React Aria Components](https://react-aria.adobe.com/), vanilla CSS and [Bezel](https://bezel.new) design tokens, documented in Storybook. The component set follows [shadcn/ui](https://ui.shadcn.com/docs/components).

## Getting started

```sh
npm install
npm run dev     # generates tokens, then starts Storybook on :6006
npm run lint
npm run tokens  # regenerate src/bezel/* from design-tokens.json
```

`src/bezel/variables.css`, `contexts.ts` and `fonts.ts` are generated and gitignored, so run `npm run tokens` before the first build.

## Usage

Components are exported from `src/index.ts` (a source export for now; there is no library build yet).

```tsx
import '<path-to>/src/bezel/variables.css'; // consumer loads the Bezel tokens
import { Button, TextField } from 'tritium';
```

## Conventions

- One folder per component in `src/components/<kebab-name>/` with `<name>.tsx`, `<name>.css` and `<name>.stories.tsx`. Export the component and its types from `src/index.ts`.
- Wrap one React Aria Components primitive, derive the props type from it, and document custom props with JSDoc.
- Plain CSS, one file per component. Classes are `.tritium-<component>`, `--variant`, `--size-*` and `__part`. State styles key off React Aria data attributes such as `[data-hovered]` and `[data-focus-visible]`.
- Values come from Bezel tokens. Component-local values are custom properties named `--tritium-<component>-*`.
- Shared styles for field parts (label, description, error) live in `src/components/_shared/field.css`.
- Stories are the tests (`Components/<Name>`, autodocs, Default plus state stories).

## Token wishlist

We are not adding new Bezel tokens yet. When a component needs a value that has no token, it defines a local `--tritium-<component>-*` custom property (or a literal) instead, and the value is recorded here so the tokens can be created later. Add a row whenever you do this.

| Category | Suggested token | Value used | Where |
|---|---|---|---|
| Motion / duration | `--duration-spinner` | `0.7s` (`2s` with reduced motion) | `spinner.css` (`--tritium-spinner-duration`) |
| Motion / easing | `--ease-linear` | `linear` | `spinner.css` |
| Color | `--accent-active` (or a neutral step alias) | `var(--neutral-800)` | `button.css` outline and ghost pressed background |
| Motion / duration | `--duration-pulse` | `2s` | `skeleton.css` (`--tritium-skeleton-duration`) |
| Motion / easing | `--ease-in-out` | `ease-in-out` | `skeleton.css` |
| Opacity | `--opacity-pulse-low` | `0.5` | `skeleton.css` (`--tritium-skeleton-opacity-low`) |
| Size | `--size-kbd` (control height) | `var(--size-5)` | `kbd.css` (`--tritium-kbd-height`) |
| Radius | `--radius-xs` | `var(--size-1)` (4px) | `checkbox.css` (`--tritium-checkbox-radius`) |
| Motion / duration | `--duration-fast` | `0.15s` | `switch.css` (`--tritium-switch-duration`) |
| Motion / easing | `--ease-out` | `ease-out` | `switch.css` |
| Color | `--input-hover` (or neutral step alias) | `var(--neutral-600)` | `switch.css` unselected track hover |
| Size | `--size-textarea-min-height` | `var(--size-16)` (64px) | `textarea.css` (`--tritium-textarea-min-height`) |
| Motion / duration | `--duration-indeterminate` | `1.5s` (`4s` with reduced motion) | `progress.css` (`--tritium-progress-duration`) |
| Motion / duration | `--duration-quick` | `0.2s` | `progress.css` fill width transition |
