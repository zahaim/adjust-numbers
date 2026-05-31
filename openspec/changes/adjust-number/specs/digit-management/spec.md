## ADDED Requirements

### Requirement: Add digit on the left
The component SHALL provide a `[+]` button on the left side of the digit
row. Tapping it SHALL insert a new digit `0` at the leftmost position,
shifting all existing digits one position to the right.

#### Scenario: Tap left add button
- **WHEN** the user taps the `[+]` button on the left
- **THEN** a new digit "0" appears at the leftmost position and the existing digits shift right

### Requirement: Add digit on the right
The component SHALL provide a `[+]` button on the right side of the digit
row. Tapping it SHALL append a new digit `0` at the rightmost position.

#### Scenario: Tap right add button
- **WHEN** the user taps the `[+]` button on the right
- **THEN** a new digit "0" is appended after the last digit

### Requirement: Remove digit by long-press
The component SHALL remove a digit when the user long-presses it for
2 000 ms. The gesture MUST be detected via a timer that starts on touch
down and is cancelled if the finger moves (scroll gesture takes priority).

#### Scenario: Long-press removes digit
- **WHEN** the user holds a finger on a digit for 2 000 ms without moving
- **THEN** the digit is removed and the remaining digits close the gap with animation

#### Scenario: Scroll cancels long-press timer
- **WHEN** the user begins dragging a digit before 2 000 ms elapses
- **THEN** the long-press timer is cancelled and no digit is removed

### Requirement: Minimum one digit enforced
The component SHALL never remove the last remaining digit. If only one
digit is present, long-press on it SHALL have no effect.

#### Scenario: Long-press on sole digit
- **WHEN** the component displays exactly one digit and the user long-presses it
- **THEN** no digit is removed and the value remains unchanged

### Requirement: Structural changes animate
Adding or removing digits SHALL trigger a layout animation so the
transition is smooth rather than a hard jump.

#### Scenario: Adding a digit animates
- **WHEN** a digit is added via a `[+]` button
- **THEN** the new digit appears with an animated transition

#### Scenario: Removing a digit animates
- **WHEN** a digit is removed via long-press
- **THEN** the remaining digits close the gap with an animated transition
