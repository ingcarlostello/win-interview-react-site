import type { PlatformItem, MetricItem, TestimonialItem } from '@/types/content.type';

export const PLATFORMS: readonly PlatformItem[] = [
  { icon: '💻', label: 'Coding' },
  { icon: '🧩', label: 'Algorithms' },
  { icon: '🏛️', label: 'System Design' },
  { icon: '🗄️', label: 'SQL' },
  { icon: '🗣️', label: 'Behavioral' },
] as const;

export const METRICS: readonly MetricItem[] = [
  { value: '12K+', labelKey: 'social.metric1' },
  { value: '850K+', labelKey: 'social.metric2' },
  { value: '+37%', labelKey: 'social.metric3' },
] as const;

export const TESTIMONIALS: readonly TestimonialItem[] = [
  {
    stars: '★★★★★',
    textKey: 'social.t1_text',
    avatar: '👨‍💻',
    name: 'Carlos M.',
    roleKey: 'social.t1_role',
  },
  {
    stars: '★★★★★',
    textKey: 'social.t2_text',
    avatar: '👩‍💼',
    name: 'Sarah K.',
    roleKey: 'social.t2_role',
  },
  {
    stars: '★★★★★',
    textKey: 'social.t3_text',
    avatar: '🧑‍🚀',
    name: 'Diego R.',
    roleKey: 'social.t3_role',
  },
] as const;
