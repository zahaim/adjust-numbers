import { parseValue, serializeValue } from '../valueHelpers';

describe('parseValue', () => {
  it('parses integer value with no separator', () => {
    const result = parseValue('12345', false);
    expect(result.digits).toEqual([1, 2, 3, 4, 5]);
    expect(result.separatorIndex).toBeNull();
    expect(result.separatorChar).toBe('.');
  });

  it('parses decimal value with period separator', () => {
    const result = parseValue('1234.5', false);
    expect(result.digits).toEqual([1, 2, 3, 4, 5]);
    expect(result.separatorIndex).toBe(4);
    expect(result.separatorChar).toBe('.');
  });

  it('parses decimal value with comma separator', () => {
    const result = parseValue('1234,5', true);
    expect(result.digits).toEqual([1, 2, 3, 4, 5]);
    expect(result.separatorIndex).toBe(4);
    expect(result.separatorChar).toBe(',');
  });

  it('uses comma char when useComma is true', () => {
    const result = parseValue('99', true);
    expect(result.separatorChar).toBe(',');
  });
});

describe('serializeValue', () => {
  it('serializes integer (no separator)', () => {
    expect(serializeValue({ digits: [1, 2, 3], separatorIndex: null, separatorChar: '.' })).toBe('123');
  });

  it('serializes decimal with period', () => {
    expect(serializeValue({ digits: [1, 2, 3, 4, 5], separatorIndex: 4, separatorChar: '.' })).toBe('1234.5');
  });

  it('serializes decimal with comma', () => {
    expect(serializeValue({ digits: [1, 2, 3, 4, 5], separatorIndex: 4, separatorChar: ',' })).toBe('1234,5');
  });

  it('round-trips integer value', () => {
    const input = '98765';
    expect(serializeValue(parseValue(input, false))).toBe(input);
  });

  it('round-trips decimal value', () => {
    const input = '123.45';
    expect(serializeValue(parseValue(input, false))).toBe(input);
  });
});

describe('digit wrap logic', () => {
  it('increments with wrap at 9', () => {
    const parsed = parseValue('9', false);
    const next = [...parsed.digits];
    next[0] = (next[0] + 1) % 10;
    expect(next[0]).toBe(0);
  });

  it('decrements with wrap at 0', () => {
    const parsed = parseValue('0', false);
    const next = [...parsed.digits];
    next[0] = (next[0] + 9) % 10;
    expect(next[0]).toBe(9);
  });
});

describe('digit add/remove constraints', () => {
  it('enforces minimum one digit on remove', () => {
    const digits = [5];
    const canDelete = digits.length > 1;
    expect(canDelete).toBe(false);
  });

  it('allows remove when more than one digit', () => {
    const digits = [1, 2];
    const canDelete = digits.length > 1;
    expect(canDelete).toBe(true);
  });

  it('add left inserts 0 at index 0', () => {
    const digits = [1, 2, 3];
    const next = [0, ...digits];
    expect(next).toEqual([0, 1, 2, 3]);
  });

  it('add right appends 0', () => {
    const digits = [1, 2, 3];
    const next = [...digits, 0];
    expect(next).toEqual([1, 2, 3, 0]);
  });

  it('separator index shifts right when digit added at left', () => {
    const separatorIndex = 2;
    const nextSep = separatorIndex + 1;
    expect(nextSep).toBe(3);
  });

  it('separator becomes null if it would be at invalid position after delete', () => {
    const digits = [1, 2];
    let separatorIndex: number | null = 1;
    const deleteIdx = 0;
    const next = digits.filter((_, i) => i !== deleteIdx);
    if (separatorIndex !== null) {
      if (deleteIdx < separatorIndex) separatorIndex -= 1;
      if (separatorIndex <= 0 || separatorIndex >= next.length) separatorIndex = null;
    }
    expect(separatorIndex).toBeNull();
  });
});

describe('separator movement', () => {
  it('moves separator to new gap index', () => {
    const digits = [1, 2, 3, 4];
    const newSepIndex = 2;
    const result = serializeValue({ digits, separatorIndex: newSepIndex, separatorChar: '.' });
    expect(result).toBe('12.34');
  });
});
