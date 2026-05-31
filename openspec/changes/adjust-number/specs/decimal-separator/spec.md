## ADDED Requirements

### Requirement: Decimal separator is optional
The component SHALL support an optional decimal separator. When the
`value` prop contains no separator character, none is rendered. When it
does, the separator is displayed at the correct position between digits.

#### Scenario: Integer value renders no separator
- **WHEN** the `value` prop is "12345" (no separator)
- **THEN** no separator symbol is rendered in the digit row

#### Scenario: Decimal value renders separator at correct position
- **WHEN** the `value` prop is "1234.5"
- **THEN** a separator is rendered between the 4th and 5th digit

### Requirement: Separator character is configurable
The component SHALL accept a `useComma` boolean prop. When `false`
(default), the separator character is `.`. When `true`, it is `,`.

#### Scenario: Default separator is period
- **WHEN** `useComma` is not provided or is `false`
- **THEN** the separator character displayed is "."

#### Scenario: Comma separator
- **WHEN** `useComma` is `true`
- **THEN** the separator character displayed is ","

### Requirement: Tapping separator activates placement mode
The component SHALL render a separator indicator button. Tapping it SHALL
activate "placement mode". In placement mode the button is visually
highlighted and gap tap targets between digits become active.

#### Scenario: Tap separator enters placement mode
- **WHEN** the user taps the separator indicator
- **THEN** the separator button is highlighted and gap targets between digits are shown

#### Scenario: Tap separator again exits placement mode
- **WHEN** placement mode is active and the user taps the separator indicator again
- **THEN** placement mode is deactivated without moving the separator

### Requirement: Tapping a gap moves the separator
The component SHALL move the separator to the tapped gap position when
placement mode is active. The component SHALL then exit placement mode
automatically.

#### Scenario: Tap gap moves separator
- **WHEN** placement mode is active and the user taps the gap between digit 2 and digit 3
- **THEN** the separator is moved to between digit 2 and digit 3, and placement mode exits

### Requirement: Separator hidden when digit count is 1
The component SHALL not render the separator indicator button when only
one digit is present, as a separator between digits would be meaningless.

#### Scenario: Single digit hides separator button
- **WHEN** the digit row contains exactly one digit
- **THEN** the separator indicator button is not rendered
