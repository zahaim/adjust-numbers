import { Platform } from 'react-native';

export const defaultTheme = {
  backgroundColor: '#1A1A1A',
  digitColor: '#FFFDE7',
  separatorColor: '#FFFDE7',
  addButtonBorderColor: '#FFFDE7',
  digitCellHeight: 56,
  digitCellWidth: 40,
  fontSize: 32,
  fontFamily: Platform.select({
    ios: 'Courier New',
    android: 'monospace',
    default: 'monospace',
  }) as string,
  addButtonSize: 32,
  neighbourOpacity: 0.25,
  scrollThreshold: 28,
};
