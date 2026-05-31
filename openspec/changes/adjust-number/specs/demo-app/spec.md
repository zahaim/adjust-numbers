## ADDED Requirements

### Requirement: Demo app runs with Expo Router v6
The demo application SHALL be a valid Expo SDK ~54 project using Expo
Router v6 file-based navigation. It SHALL be runnable via
`expo start` from the `apps/demo` directory.

#### Scenario: Demo app starts without errors
- **WHEN** the developer runs `expo start` in `apps/demo`
- **THEN** the Metro bundler starts and the app loads on the target device without JS errors

### Requirement: Demo screen shows integer mode
The demo SHALL include a screen that mounts `<NumberAdjuster>` with an
integer value (no decimal separator) and displays the current value below
the component so the user can verify the output.

#### Scenario: Integer mode renders and updates
- **WHEN** the demo screen loads in integer mode
- **THEN** the number adjuster shows a multi-digit integer and the value label updates on every interaction

### Requirement: Demo screen shows decimal mode
The demo SHALL include a second example on the same screen (or a second
tab) that mounts `<NumberAdjuster>` with a decimal value and
`useComma={false}`.

#### Scenario: Decimal mode renders and updates
- **WHEN** the demo screen loads in decimal mode
- **THEN** the number adjuster shows a decimal value with a separator and the value label updates on every interaction

### Requirement: Demo links the local library package
The demo app SHALL reference `react-native-adjust-numbers` via a workspace
symlink (not a published npm version) so that local changes to the library
are immediately reflected in the demo without republishing.

#### Scenario: Local library changes are reflected
- **WHEN** the developer edits a file in `packages/adjust-numbers/src`
- **THEN** Metro hot-reloads the change in the demo app without requiring a publish step
