## Why

In the "Don't Forget Oil" mobile app, users scan numbers from fuel pump
and car displays (e.g. odometer readings, fuel quantities). OCR of
physical number displays is imprecise, so scanned values frequently
contain small errors. Correcting them with the standard mobile keyboard
is cumbersome: the user must tap into a text field, clear the value,
and retype it from scratch.

The number adjuster replaces that flow with a purpose-built, touch-first
editor that feels like interacting with a physical odometer – no keyboard
needed, zero friction, naturally discoverable.

Because the interaction pattern is useful beyond the oil app, the
component is published as a standalone, reusable React Native / Expo
library (`react-native-adjust-numbers`).

## What Changes

A new package `react-native-adjust-numbers` is created from scratch.
It exposes a single `<NumberAdjuster>` component that the host app
renders modally (or inline) when a scanned number needs correction.

The repository is a monorepo containing:
- `packages/adjust-numbers` – the publishable library
- `apps/demo` – a minimal Expo Router v6 demo app that exercises the
  component and serves as a living integration test

## Capabilities

### New Capabilities

- `digit-wheel`: A vertical scroll/drum-roll interaction per digit.
  Swiping up increments the digit, swiping down decrements it (0–9
  wrapping). The digit above and below the current value are shown
  faintly to signal scrollability.

- `digit-management`: Users can add or remove individual digits.
  Tapping the `[+]` affordance on either side of the number inserts a
  new `0` digit at that edge. Long-pressing a digit for 2 seconds
  removes it (minimum 1 digit enforced).

- `decimal-separator`: An optional decimal separator (period or comma,
  configurable). The separator is displayed inline between digits.
  Tapping the separator indicator activates "placement mode"; while
  active, tapping a gap between any two digits moves the separator
  there. Tapping the separator again cancels placement mode.

- `haptic-feedback`: Every meaningful interaction (digit change,
  digit add, digit remove, separator move) triggers a platform haptic
  response scaled to the action weight (light for scroll steps, medium
  for structural changes, heavy for long-press delete confirmation).

- `odometer-display`: The number is rendered in a retro, odometer-style
  monospace font on a dark background. The layout is
  `[+] [d] [d] [,] [d] [+]` where `[,]` is the separator control and
  `[+]` are the add-digit buttons.

- `demo-app`: A minimal Expo Router v6 app in `apps/demo` with a single
  screen showing the component in both integer and decimal modes, along
  with the current value output.

### Modified Capabilities

<!-- none – this is a greenfield project -->

## Impact

- New top-level monorepo (`pnpm` workspaces)
- New package: `packages/adjust-numbers` (TypeScript, peer-deps: react,
  react-native, expo, expo-haptics, react-native-gesture-handler,
  react-native-reanimated)
- New app: `apps/demo` (Expo SDK ~54, Expo Router v6)
- OpenSpec specs to be created for each capability listed above
- Beads issues to be created from the tasks artifact
