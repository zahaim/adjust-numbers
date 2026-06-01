import * as ExpoHaptics from 'expo-haptics';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export async function hapticLight(): Promise<void> {
  if (isWeb) return;
  try {
    await ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Light);
  } catch { }
}

export async function hapticMedium(): Promise<void> {
  if (isWeb) return;
  try {
    await ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Medium);
  } catch { }
}

export async function hapticHeavy(): Promise<void> {
  if (isWeb) return;
  try {
    await ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Heavy);
  } catch { }
}
