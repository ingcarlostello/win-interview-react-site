import type { LegalDocId } from '@/types/legal.type';

export const ROUTES = {
  HOME: '/',
  PRIVACY: '/privacy',
  REFUNDS: '/refunds',
  TERMS: '/terms',
} as const;

export const LEGAL_DOCS: readonly LegalDocId[] = ['privacy', 'refunds', 'terms'] as const;

export const SECTIONS = {
  FEATURES: '#features',
  HOW: '#how',
  PRICING: '#pricing',
  FAQ: '#faq',
} as const;
