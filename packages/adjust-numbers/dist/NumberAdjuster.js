import React, { useCallback, useState } from 'react';
import { LayoutAnimation, Platform, ScrollView, StyleSheet, TouchableOpacity, Text, UIManager, View } from 'react-native';
import { defaultTheme } from './theme/defaultTheme';
import { DigitWheel } from './components/DigitWheel';
import { SeparatorControl, SeparatorGap } from './components/SeparatorControl';
import { hapticMedium } from './hooks/useHaptics';
import { parseValue, serializeValue } from './valueHelpers';
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
export function NumberAdjuster({ value, onChange, useComma = false, digitColor, backgroundColor, style, }) {
    const [placementMode, setPlacementMode] = useState(false);
    const resolvedBg = backgroundColor ?? defaultTheme.backgroundColor;
    const resolvedDigitColor = digitColor ?? defaultTheme.digitColor;
    const parsed = parseValue(value, useComma);
    const { digits, separatorIndex, separatorChar } = parsed;
    const emit = useCallback((nextDigits, nextSepIndex) => {
        onChange(serializeValue({ digits: nextDigits, separatorIndex: nextSepIndex, separatorChar }));
    }, [onChange, separatorChar]);
    const handleIncrement = (idx) => {
        const next = [...digits];
        next[idx] = (next[idx] + 1) % 10;
        emit(next, separatorIndex);
    };
    const handleDecrement = (idx) => {
        const next = [...digits];
        next[idx] = (next[idx] + 9) % 10;
        emit(next, separatorIndex);
    };
    const handleAddLeft = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        hapticMedium();
        const next = [0, ...digits];
        const nextSep = separatorIndex !== null ? separatorIndex + 1 : null;
        emit(next, nextSep);
    };
    const handleAddRight = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        hapticMedium();
        emit([...digits, 0], separatorIndex);
    };
    const handleDeleteDigit = (idx) => {
        if (digits.length <= 1)
            return;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const next = digits.filter((_, i) => i !== idx);
        let nextSep = separatorIndex;
        if (nextSep !== null) {
            if (idx < nextSep)
                nextSep -= 1;
            if (nextSep <= 0 || nextSep >= next.length)
                nextSep = null;
        }
        emit(next, nextSep);
    };
    const handleSeparatorToggle = () => {
        setPlacementMode((m) => !m);
    };
    const handleGapPress = (gapIndex) => {
        hapticMedium();
        setPlacementMode(false);
        emit(digits, gapIndex);
    };
    return (<View style={[styles.outer, { backgroundColor: resolvedBg }, style]}>
      {/* Left add button */}
      <TouchableOpacity onPress={handleAddLeft} style={styles.addButton} activeOpacity={0.7}>
        <Text style={[styles.addLabel, { color: resolvedDigitColor }]}>+</Text>
      </TouchableOpacity>

      {/* Digit row */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.digitRow} scrollEnabled={true}>
        {digits.map((digit, idx) => (<React.Fragment key={idx}>
            {/* Gap before each digit (except first) for separator placement */}
            {idx > 0 && (<SeparatorGap visible={placementMode} onPress={() => handleGapPress(idx)}/>)}

            {/* Inline separator rendered between digits */}
            {separatorIndex === idx && !placementMode && (<Text style={[styles.inlineSep, { color: resolvedDigitColor, fontFamily: defaultTheme.fontFamily }]}>
                {separatorChar}
              </Text>)}

            <DigitWheel value={digit} digitColor={resolvedDigitColor} onIncrement={() => handleIncrement(idx)} onDecrement={() => handleDecrement(idx)} onLongPressDelete={() => handleDeleteDigit(idx)} canDelete={digits.length > 1}/>
          </React.Fragment>))}
      </ScrollView>

      {/* Separator toggle */}
      <SeparatorControl separatorChar={separatorChar} isPlacementMode={placementMode} onToggle={handleSeparatorToggle} visible={digits.length > 1}/>

      {/* Right add button */}
      <TouchableOpacity onPress={handleAddRight} style={styles.addButton} activeOpacity={0.7}>
        <Text style={[styles.addLabel, { color: resolvedDigitColor }]}>+</Text>
      </TouchableOpacity>
    </View>);
}
const styles = StyleSheet.create({
    outer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 8,
        padding: 8,
    },
    digitRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButton: {
        width: defaultTheme.addButtonSize,
        height: defaultTheme.addButtonSize,
        borderRadius: defaultTheme.addButtonSize / 2,
        borderWidth: 1,
        borderColor: defaultTheme.addButtonBorderColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
    },
    addLabel: {
        fontSize: 18,
        lineHeight: 22,
    },
    inlineSep: {
        fontSize: defaultTheme.fontSize,
        alignSelf: 'center',
        marginHorizontal: 2,
    },
});
//# sourceMappingURL=NumberAdjuster.js.map