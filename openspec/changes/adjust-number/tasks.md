## 1. Monorepo and package scaffolding

- [ ] 1.1 Initialize root workspace config (`pnpm-workspace.yaml`, root `package.json`) with `packages/*` and `apps/*`
- [ ] 1.2 Configure `packages/adjust-numbers` package metadata, TypeScript config, and public export through `src/index.ts`
- [ ] 1.3 Create `apps/demo` Expo Router v6 app scaffold and wire it to consume the local workspace package

## 2. Core value model and public API

- [ ] 2.1 Define shared types for parsed digits, separator index, and component props
- [ ] 2.2 Implement value parse/serialize helpers for integer and decimal inputs with configurable separator character
- [ ] 2.3 Implement controlled `<NumberAdjuster>` shell that accepts `value` and emits `onChange(nextValue)` for all mutations

## 3. Digit wheel interaction

- [ ] 3.1 Implement `DigitWheel` rendering with current digit plus faint above/below neighbours
- [ ] 3.2 Add vertical pan gesture with half-cell threshold commit behavior for increment/decrement
- [ ] 3.3 Implement wrap logic (`9 -> 0`, `0 -> 9`) and spring-back animation when threshold is not crossed

## 4. Digit management interactions

- [ ] 4.1 Add left/right circular `[+]` controls to insert `0` at start/end of the digit list
- [ ] 4.2 Implement 2000ms long-press delete per digit and cancel the timer when drag starts
- [ ] 4.3 Enforce minimum one digit and apply layout animation for add/remove transitions

## 5. Decimal separator interaction

- [ ] 5.1 Render optional inline separator based on parsed value and `useComma` setting
- [ ] 5.2 Implement separator toggle button that enters/exits placement mode with visual highlight
- [ ] 5.3 Implement gap tap targets in placement mode to move separator, then exit placement mode
- [ ] 5.4 Hide separator controls when only one digit is present

## 6. Styling and haptic behavior

- [ ] 6.1 Apply odometer defaults (monospace per platform, dark background, light digits) with prop overrides
- [ ] 6.2 Add platform-safe haptics wrapper and map events to light/medium/heavy impacts
- [ ] 6.3 Ensure web platform uses no-op haptics without errors or warnings

## 7. Demo app integration

- [ ] 7.1 Build demo screen with integer example and live value output
- [ ] 7.2 Build decimal example (`useComma={false}`) and live value output on the same screen (or second route)
- [ ] 7.3 Verify demo hot-reloads local package edits via workspace linking

## 8. Validation and finishing

- [ ] 8.1 Add library tests for parse/serialize, digit wrap logic, digit add/remove constraints, and separator movement
- [ ] 8.2 Add tests for haptics guard behavior on web vs native
- [ ] 8.3 Run project lint/build/test commands and fix issues required for green baseline
