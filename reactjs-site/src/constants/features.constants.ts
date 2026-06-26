import type { FeatureItem } from '@/types/content.type';

export const FEATURES: readonly FeatureItem[] = [
  { icon: '🎙️', titleKey: 'features.0.title', descKey: 'features.0.desc', tagKey: 'features.0.tag' },
  { icon: '⚡', titleKey: 'features.1.title', descKey: 'features.1.desc', tagKey: 'features.1.tag' },
  { icon: '🖥️', titleKey: 'features.2.title', descKey: 'features.2.desc', tagKey: 'features.2.tag' },
  { icon: '👻', titleKey: 'features.3.title', descKey: 'features.3.desc', tagKey: 'features.3.tag' },
  { icon: '🛡️', titleKey: 'features.4.title', descKey: 'features.4.desc', tagKey: 'features.4.tag' },
  { icon: '✏️', titleKey: 'features.5.title', descKey: 'features.5.desc', tagKey: 'features.5.tag' },
  { icon: '⌨️', titleKey: 'features.6.title', descKey: 'features.6.desc', tagKey: 'features.6.tag' },
  { icon: '📌', titleKey: 'features.7.title', descKey: 'features.7.desc', tagKey: 'features.7.tag' },
] as const;
