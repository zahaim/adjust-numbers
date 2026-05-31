## ADDED Requirements

### Requirement: Odometer-style monospace font
Digits SHALL be rendered in a monospace font that evokes a physical
odometer or fuel-pump counter. On iOS the system font "Courier New" SHALL
be used; on Android "monospace"; on web a CSS monospace stack.

#### Scenario: Digits use monospace font
- **WHEN** the component renders on iOS
- **THEN** digits are displayed in "Courier New"

#### Scenario: Digits use monospace font on Android
- **WHEN** the component renders on Android
- **THEN** digits are displayed in the system monospace font

### Requirement: Dark background with light digits
The component SHALL default to a dark background (`#1A1A1A`) with warm
light-yellow digit colour (`#FFFDE7`), evoking a backlit number display.
Both colours SHALL be overridable via props.

#### Scenario: Default colours applied
- **WHEN** the component renders without `digitColor` or `backgroundColor` props
- **THEN** the background is "#1A1A1A" and digits are "#FFFDE7"

#### Scenario: Custom colours applied
- **WHEN** `digitColor="#FF0000"` and `backgroundColor="#FFFFFF"` are provided
- **THEN** the background renders white and digits render red

### Requirement: Layout order is [+] digits [sep] [+]
The component SHALL render its children in the following horizontal order
from left to right: left add-button, digit row (with inline separator),
separator toggle button, right add-button.

#### Scenario: Layout order is correct
- **WHEN** the component renders with a decimal value
- **THEN** elements appear left-to-right as: [+], digits-with-separator, separator-toggle, [+]

### Requirement: Add buttons are circular affordances
The `[+]` buttons SHALL be rendered as circular buttons with a visible
border so they are easily identifiable as interactive targets.

#### Scenario: Add button has circular shape
- **WHEN** the component renders
- **THEN** each [+] button is circular with a visible border

### Requirement: Component fits within its container width
The component SHALL use `alignSelf: 'center'` and SHALL NOT impose a
fixed width, allowing the host layout to constrain it. It SHALL scroll
horizontally if digit count grows beyond the viewport width.

#### Scenario: Narrow screen does not clip content
- **WHEN** the device screen is narrow and many digits are present
- **THEN** the digit row is scrollable horizontally and no digits are clipped
