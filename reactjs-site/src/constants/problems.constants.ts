import type { ProblemItem } from '@/types/content.type';

export const PROBLEMS: readonly ProblemItem[] = [
  { icon: '❓', titleKey: 'problem.0.title', descKey: 'problem.0.desc' },
  { icon: '😰', titleKey: 'problem.1.title', descKey: 'problem.1.desc' },
  { icon: '💻', titleKey: 'problem.2.title', descKey: 'problem.2.desc' },
] as const;
