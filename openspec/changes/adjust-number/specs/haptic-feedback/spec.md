## ADDED Requirements

### Requirement: Digit scroll triggers light haptic
The component SHALL fire a light impact haptic feedback each time a digit
increments or decrements via the scroll gesture.

#### Scenario: Digit increments with haptic
- **WHEN** the user scrolls a digit up past the threshold
- **THEN** a light impact haptic fires at the moment the digit changes

#### Scenario: Digit decrements with haptic
- **WHEN** the user scrolls a digit down past the threshold
- **THEN** a light impact haptic fires at the moment the digit changes

### Requirement: Structural changes trigger medium haptic
Adding a digit (via `[+]`) or moving the decimal separator SHALL fire a
medium impact haptic to signal a structural value change.

#### Scenario: Add digit haptic
- **WHEN** the user taps a `[+]` button
- **THEN** a medium impact haptic fires

#### Scenario: Separator move haptic
- **WHEN** the user taps a gap to move the separator
- **THEN** a medium impact haptic fires

### Requirement: Long-press delete triggers heavy haptic
The component SHALL fire a heavy impact haptic at the moment a digit
removal is confirmed (after the 2 000 ms long-press threshold).

#### Scenario: Long-press delete haptic
- **WHEN** the user long-presses a digit for 2 000 ms and the digit is removed
- **THEN** a heavy impact haptic fires at the moment of removal

### Requirement: Haptics are silently skipped on web
The component SHALL NOT throw or warn when running on a web platform
where haptics are unavailable. All haptic calls SHALL be wrapped in a
no-op guard.

#### Scenario: Web platform does not crash
- **WHEN** the component runs on a web (browser) platform and the user scrolls a digit
- **THEN** no error is thrown and no warning is logged
