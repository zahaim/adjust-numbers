import type { ViewStyle } from 'react-native';

export type ParsedValue = {
  digits: number[];
  separatorIndex: number | null;
  separatorChar: '.' | ',';
};

export type NumberAdjusterProps = {
  value: string;
  onChange: (next: string) => void;
  useComma?: boolean;
  digitColor?: string;
  backgroundColor?: string;
  style?: ViewStyle;
};
