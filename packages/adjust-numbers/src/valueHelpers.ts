import type { ParsedValue } from './types';

export function parseValue(value: string, useComma: boolean): ParsedValue {
  const separatorChar = useComma ? ',' : '.';
  const sepIndex = value.indexOf(separatorChar);

  if (sepIndex !== -1) {
    const raw = value.replace(separatorChar, '');
    const digits = raw.split('').map(Number);
    return { digits, separatorIndex: sepIndex, separatorChar };
  }

  const digits = value.split('').map(Number);
  return { digits, separatorIndex: null, separatorChar };
}

export function serializeValue(parsed: ParsedValue): string {
  const { digits, separatorIndex, separatorChar } = parsed;
  if (separatorIndex === null) {
    return digits.join('');
  }
  const left = digits.slice(0, separatorIndex).join('');
  const right = digits.slice(separatorIndex).join('');
  return `${left}${separatorChar}${right}`;
}
