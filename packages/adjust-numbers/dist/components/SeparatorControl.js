import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { defaultTheme } from '../theme/defaultTheme';
export function SeparatorControl({ separatorChar, isPlacementMode, onToggle, visible }) {
    if (!visible)
        return null;
    return (<TouchableOpacity onPress={onToggle} style={styles.wrapper} activeOpacity={0.7}>
      <View style={[styles.button, isPlacementMode && styles.active]}>
        <Text style={styles.label}>{separatorChar}</Text>
      </View>
    </TouchableOpacity>);
}
export function SeparatorGap({ onPress, visible }) {
    if (!visible)
        return null;
    return (<TouchableOpacity onPress={onPress} style={styles.gap} activeOpacity={0.5}>
      <View style={styles.gapLine}/>
    </TouchableOpacity>);
}
const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: defaultTheme.separatorColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundColor: defaultTheme.separatorColor,
    },
    label: {
        color: defaultTheme.backgroundColor,
        fontSize: 14,
        fontFamily: defaultTheme.fontFamily,
    },
    gap: {
        width: 16,
        height: defaultTheme.digitCellHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gapLine: {
        width: 2,
        height: 20,
        backgroundColor: defaultTheme.separatorColor,
        opacity: 0.6,
        borderRadius: 1,
    },
});
//# sourceMappingURL=SeparatorControl.js.map