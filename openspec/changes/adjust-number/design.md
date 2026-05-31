## Overview

This change introduces a reusable React Native / Expo package,
`react-native-adjust-numbers`, built around a single `<NumberAdjuster>`
component that replaces keyboard-based numeric correction with direct,
touch-first digit manipulation.

The component is optimized for OCR correction flows (odometer, fuel
quantity, etc.) and is shipped with an Expo demo app in the same monorepo
for local integration testing.

## Goals

- Deliver odometer-like digit editing without opening the keyboard
- Support both integer and decimal values
- Keep interaction model simple: swipe to change, tap to add, long-press to remove
- Expose a controlled, library-friendly API for host apps
- Keep behavior consistent across iOS/Android/Web, with graceful web fallbacks

## Non-goals

- General-purpose text or numeric input replacement outside fixed-digit editing
- Locale-aware parsing/formatting beyond a configurable decimal separator
- Accessibility-perfect parity in this first change (baseline support only)
- Persisting values, state sync, or backend concerns

## Architecture

### Monorepo layout

- `packages/adjust-numbers`: publishable library package
- `apps/demo`: Expo Router v6 app consuming the workspace-linked library

### Library internal structure

Suggested internal module split in `packages/adjust-numbers/src`:

- `NumberAdjuster.tsx`: public component and layout composition
- `components/DigitWheel.tsx`: per-digit gesture and visual state
- `components/SeparatorControl.tsx`: placement mode toggle and separator rendering
- `hooks/useParsedValue.ts`: parse/serialize string value into editable model
- `hooks/useHaptics.ts`: platform-safe haptic wrappers
- `theme/defaultTheme.ts`: default colors, sizing, typography
- `types.ts`: shared public/internal types

`src/index.ts` re-exports only public API.

## Data model

The component uses a normalized model derived from controlled `value`.

```ts
type ParsedValue = {
  digits: number[]; // always length >= 1
  separatorIndex: number | null; // gap position in [1, digits.length - 1]
  separatorChar: "." | ",";
};
```

### Parsing rules

- Input `value` is interpreted as digits plus optional one separator
- If no separator exists, `separatorIndex = null`
- `useComma` selects display/serialization char (`.` default, `,` when true)
- Invalid characters are out of scope in this change (host should provide valid value)

### Serialization rules

- Digits are joined into a string
- If `separatorIndex !== null`, separator is inserted between digits
- All mutations emit `onChange(nextValue: string)`

## Public API

```ts
export type NumberAdjusterProps = {
  value: string;
  onChange: (next: string) => void;
  useComma?: boolean;
  digitColor?: string;
  backgroundColor?: string;
  style?: ViewStyle;
};
```

Behavior is controlled-only: parent owns `value`, component emits updates.

## Interaction design

### Layout

`[+] [digit row with inline separator] [separator toggle] [+]`

- Outer container centers itself and avoids fixed width
- Digit row scrolls horizontally for long numbers
- Add buttons are circular with visible border

### Digit wheel gesture

- Vertical pan on a digit drives temporary translateY motion
- Commit threshold: absolute drag distance >= half digit height (~28dp)
- Swipe up increments, swipe down decrements
- Wrap behavior: `9 -> 0` and `0 -> 9`
- On release without commit, spring back to resting position

### Add/remove digits

- Left `+`: insert `0` at index `0`
- Right `+`: append `0` at end
- Long-press digit for 2000ms removes that digit
- Drag start cancels pending long-press timer
- Minimum one digit enforced (no-op on delete when one digit remains)
- Add/remove use layout animation for smooth transitions

### Decimal separator placement

- Separator is optional (hidden for integer values)
- Separator toggle enters/leaves placement mode
- In placement mode, gaps between digits become tap targets
- Tapping a gap moves separator and exits placement mode
- Separator toggle hidden when digit count is `1`

## Haptic strategy

Use `expo-haptics` through a guarded wrapper:

- Light impact: digit increment/decrement
- Medium impact: add digit, move separator
- Heavy impact: long-press delete confirmation
- Web: no-op (never throw/warn)

## Platform and styling decisions

- iOS font: `"Courier New"`
- Android font: `"monospace"`
- Web font stack: CSS monospace fallback
- Defaults: background `#1A1A1A`, digits `#FFFDE7`
- Colors overridable via props

## Demo app design

Single screen (or two simple sections) demonstrates:

- Integer example (`value="12345"`)
- Decimal example (`value="1234.5"` with `useComma={false}`)
- Live value text under each example

Demo consumes local workspace package to ensure immediate reflection of library edits.

## Error handling and constraints

- Component assumes syntactically valid numeric string input
- If separator would be invalid after mutation, normalize to `null`
- Mutations that violate invariants are prevented (e.g., delete last digit)
- No silent crashes on unsupported haptics platforms

## Testing strategy

### Unit/component tests (library)

- Parse/serialize round-trips for integer and decimal values
- Digit increment/decrement including wrap logic
- Add/remove logic including minimum digit rule
- Separator placement mode transitions and relocation
- Haptics wrapper behavior on native vs web

### Manual/integration checks (demo)

- Gesture feel and threshold correctness on iOS/Android
- Horizontal scrolling with long values on narrow screens
- Workspace-link live reload from package changes

## Open questions

- Whether to expose threshold/timing constants as props in a future change
- Whether to support initial separator insertion for integer input
- Accessibility improvements (screen reader labels, larger touch targets)
