## ADDED Requirements

### Requirement: Digit displays current value with neighbours
Each digit in the adjuster SHALL display its current value prominently
and show the digit immediately above (+1) and below (-1) it at reduced
opacity, communicating that the digit is scrollable.

#### Scenario: Digit renders with faint neighbours
- **WHEN** the component renders a digit with value 5
- **THEN** the digit "5" is displayed at full opacity, "6" is shown faintly above it, and "4" is shown faintly below it

### Requirement: Swipe up increments digit
The component SHALL increment a digit by 1 when the user swipes upward
on that digit. The digit wraps from 9 back to 0.

#### Scenario: Swipe up on mid-range digit
- **WHEN** the user swipes upward past the scroll threshold on a digit showing "4"
- **THEN** the digit changes to "5" and the displayed value updates accordingly

#### Scenario: Swipe up wraps at 9
- **WHEN** the user swipes upward past the scroll threshold on a digit showing "9"
- **THEN** the digit wraps to "0"

### Requirement: Swipe down decrements digit
The component SHALL decrement a digit by 1 when the user swipes downward
on that digit. The digit wraps from 0 back to 9.

#### Scenario: Swipe down on mid-range digit
- **WHEN** the user swipes downward past the scroll threshold on a digit showing "4"
- **THEN** the digit changes to "3" and the displayed value updates accordingly

#### Scenario: Swipe down wraps at 0
- **WHEN** the user swipes downward past the scroll threshold on a digit showing "0"
- **THEN** the digit wraps to "9"

### Requirement: Digit animates during scroll gesture
The digit SHALL translate vertically in sync with the user's finger during
the scroll gesture, snapping back to its resting position when the
gesture ends.

#### Scenario: Digit follows finger
- **WHEN** the user is actively dragging a digit
- **THEN** the digit moves vertically proportional to the drag offset

#### Scenario: Digit snaps back on release
- **WHEN** the user lifts their finger without crossing the increment/decrement threshold
- **THEN** the digit springs back to its resting position with a spring animation

### Requirement: Scroll threshold is half digit height
The component SHALL trigger an increment or decrement only when the
cumulative drag distance exceeds half the digit cell height (~28 dp),
preventing accidental triggers on minor touches.

#### Scenario: Short drag does not change digit
- **WHEN** the user drags a digit less than half the digit height
- **THEN** the digit value does not change
