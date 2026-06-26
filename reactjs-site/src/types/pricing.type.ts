export interface PlanFeature {
  key: string;
  value?: string;
  included: boolean;
}

export type PlanId = 'free' | 'lite' | 'pro' | 'ultra';

export interface Plan {
  id: PlanId;
  price: string;
  featured: boolean;
  features: PlanFeature[];
}
