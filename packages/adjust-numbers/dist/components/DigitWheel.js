import React, { useRef } from 'react';
import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native';
import { defaultTheme } from '../theme/defaultTheme';
import { hapticLight } from '../hooks/useHaptics';
export function DigitWheel({ value, digitColor, onIncrement, onDecrement, onLongPressDelete, canDelete, }) {
    const translateY = useRef(new Animated.Value(0)).current;
    const accumulatedDrag = useRef(0);
    const longPressTimer = useRef(null);
    const above = (value + 1) % 10;
    const below = (value + 9) % 10;
    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            accumulatedDrag.current = 0;
            longPressTimer.current = setTimeout(() => {
                if (canDelete) {
                    hapticHeavy();
                    onLongPressDelete();
                }
                longPressTimer.current = null;
            }, 2000);
        },
        onPanResponderMove: (_evt, gestureState) => {
            if (longPressTimer.current) {
                clearTimeout(longPressTimer.current);
                longPressTimer.current = null;
            }
            translateY.setValue(gestureState.dy);
            accumulatedDrag.current = gestureState.dy;
        },
        onPanResponderRelease: () => {
            if (longPressTimer.current) {
                clearTimeout(longPressTimer.current);
                longPressTimer.current = null;
            }
            const drag = accumulatedDrag.current;
            if (Math.abs(drag) >= defaultTheme.scrollThreshold) {
                if (drag < 0) {
                    hapticLight();
                    onIncrement();
                }
                else {
                    hapticLight();
                    onDecrement();
                }
            }
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
            accumulatedDrag.current = 0;
        },
        onPanResponderTerminate: () => {
            if (longPressTimer.current) {
                clearTimeout(longPressTimer.current);
                longPressTimer.current = null;
            }
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
            accumulatedDrag.current = 0;
        },
    })).current;
    const cellH = defaultTheme.digitCellHeight;
    const cellW = defaultTheme.digitCellWidth;
    return (<View style={[styles.container, { width: cellW, height: cellH }]} {...panResponder.panHandlers}>
      {/* Neighbour above */}
      <Text style={[
            styles.digit,
            {
                color: digitColor,
                fontFamily: defaultTheme.fontFamily,
                fontSize: defaultTheme.fontSize,
                opacity: defaultTheme.neighbourOpacity,
                position: 'absolute',
                top: -cellH,
                width: cellW,
                textAlign: 'center',
            },
        ]}>
        {above}
      </Text>

      {/* Current digit */}
      <Animated.Text style={[
            styles.digit,
            {
                color: digitColor,
                fontFamily: defaultTheme.fontFamily,
                fontSize: defaultTheme.fontSize,
                transform: [{ translateY }],
            },
        ]}>
        {value}
      </Animated.Text>

      {/* Neighbour below */}
      <Text style={[
            styles.digit,
            {
                color: digitColor,
                fontFamily: defaultTheme.fontFamily,
                fontSize: defaultTheme.fontSize,
                opacity: defaultTheme.neighbourOpacity,
                position: 'absolute',
                top: cellH,
                width: cellW,
                textAlign: 'center',
            },
        ]}>
        {below}
      </Text>
    </View>);
}
function hapticHeavy() {
    import('../hooks/useHaptics').then(({ hapticHeavy: h }) => h());
}
const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    digit: {
        textAlign: 'center',
    },
});
//# sourceMappingURL=DigitWheel.js.map