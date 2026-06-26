import type { TrustItem } from '@/types/content.type';
import type { Plan } from '@/types/pricing.type';

export const HERO_TRUST_ITEMS: readonly TrustItem[] = [
  { textKey: 'hero.trust1' },
  { textKey: 'hero.trust2' },
  { textKey: 'hero.trust3' },
] as const;

export const PLANS: readonly Plan[] = [
  {
    id: 'free',
    price: '$0',
    featured: false,
    features: [
      { key: 'pricing.feat.realtime', included: true },
      { key: 'pricing.feat.streaming', included: true },
      { key: 'pricing.feat.ontop', included: true },
      { key: 'pricing.feat.trans', value: '3 min', included: true },
      { key: 'pricing.feat.captures', value: '1', included: true },
      { key: 'pricing.feat.analyses', value: '1', included: true },
      { key: 'pricing.feat.prompts', included: false },
      { key: 'pricing.feat.simcap', included: false },
      { key: 'pricing.feat.siman', included: false },
      { key: 'pricing.feat.shortcuts', included: false },
      { key: 'pricing.feat.invisible', included: false },
      { key: 'pricing.feat.ghost', included: false },
      { key: 'pricing.feat.thinking', included: false },
    ],
  },
  {
    id: 'lite',
    price: '$4.99',
    featured: false,
    features: [
      { key: 'pricing.feat.realtime', included: true },
      { key: 'pricing.feat.streaming', included: true },
      { key: 'pricing.feat.ontop', included: true },
      { key: 'pricing.feat.trans', value: '20 min', included: true },
      { key: 'pricing.feat.captures', value: '2', included: true },
      { key: 'pricing.feat.analyses', value: '2', included: true },
      { key: 'pricing.feat.prompts', included: false },
      { key: 'pricing.feat.simcap', included: false },
      { key: 'pricing.feat.siman', included: false },
      { key: 'pricing.feat.shortcuts', included: false },
      { key: 'pricing.feat.invisible', included: false },
      { key: 'pricing.feat.ghost', included: false },
      { key: 'pricing.feat.thinking', included: false },
    ],
  },
  {
    id: 'pro',
    price: '$19.99',
    featured: true,
    features: [
      { key: 'pricing.feat.realtime', included: true },
      { key: 'pricing.feat.streaming', included: true },
      { key: 'pricing.feat.ontop', included: true },
      { key: 'pricing.feat.trans', value: '2 h', included: true },
      { key: 'pricing.feat.captures', value: '8', included: true },
      { key: 'pricing.feat.analyses', value: '8', included: true },
      { key: 'pricing.feat.prompts', included: true },
      { key: 'pricing.feat.simcap', included: true },
      { key: 'pricing.feat.siman', included: true },
      { key: 'pricing.feat.shortcuts', included: true },
      { key: 'pricing.feat.invisible', included: false },
      { key: 'pricing.feat.ghost', included: false },
      { key: 'pricing.feat.thinking', included: false },
    ],
  },
  {
    id: 'ultra',
    price: '$59.99',
    featured: false,
    features: [
      { key: 'pricing.feat.realtime', included: true },
      { key: 'pricing.feat.streaming', included: true },
      { key: 'pricing.feat.ontop', included: true },
      { key: 'pricing.feat.trans', value: '8 h', included: true },
      { key: 'pricing.feat.captures', value: '40', included: true },
      { key: 'pricing.feat.analyses', value: '40', included: true },
      { key: 'pricing.feat.prompts', included: true },
      { key: 'pricing.feat.simcap', included: true },
      { key: 'pricing.feat.siman', included: true },
      { key: 'pricing.feat.shortcuts', included: true },
      { key: 'pricing.feat.invisible', included: true },
      { key: 'pricing.feat.ghost', included: true },
      { key: 'pricing.feat.thinking', included: true },
    ],
  },
] as const;

export const FAQ_COUNT = 7;
export const FAQ_INDEXES: readonly number[] = Array.from({ length: FAQ_COUNT }, (_, i) => i);
