jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn().mockResolvedValue(undefined),
  ImpactFeedbackStyle: { Light: 'Light', Medium: 'Medium', Heavy: 'Heavy' },
}));

jest.mock('react-native', () => ({
  Platform: { OS: 'ios' },
}));

describe('haptics wrapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('calls expo-haptics impactAsync on native', async () => {
    jest.mock('react-native', () => ({ Platform: { OS: 'ios' } }));
    const { hapticLight } = await import('../hooks/useHaptics');
    await expect(hapticLight()).resolves.not.toThrow();
    const ExpoHaptics = require('expo-haptics');
    expect(ExpoHaptics.impactAsync).toHaveBeenCalledWith('Light');
  });

  it('is a no-op on web — does not call impactAsync', async () => {
    jest.mock('react-native', () => ({ Platform: { OS: 'web' } }));
    const { hapticLight } = await import('../hooks/useHaptics');
    await expect(hapticLight()).resolves.not.toThrow();
    const ExpoHaptics = require('expo-haptics');
    expect(ExpoHaptics.impactAsync).not.toHaveBeenCalled();
  });

  it('does not throw if expo-haptics throws', async () => {
    jest.mock('expo-haptics', () => ({
      impactAsync: jest.fn().mockRejectedValue(new Error('haptics unavailable')),
      ImpactFeedbackStyle: { Light: 'Light', Medium: 'Medium', Heavy: 'Heavy' },
    }));
    jest.mock('react-native', () => ({ Platform: { OS: 'ios' } }));
    const { hapticLight } = await import('../hooks/useHaptics');
    await expect(hapticLight()).resolves.not.toThrow();
  });
});
