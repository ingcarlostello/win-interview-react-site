import type { PlanId } from '@/types/pricing.type';

export type QuotaType = 'transcription' | 'captures' | 'analyses';

export interface PlanLimits {
  analyses: number;
  captures: number;
  transcriptionSeconds: number;
}

// Totales mensuales por plan. La tabla `quotas` solo almacena *remaining*, así que
// el total para las barras de uso sale de aquí.
// MANTENER EN SYNC con src/constants/pricing.constants.ts (PLANS[].features): ese
// archivo guarda strings de display ("3 min"), este guarda segundos numéricos.
export const PLAN_LIMITS: Record<PlanId, PlanLimits> = {
  free: { analyses: 1, captures: 1, transcriptionSeconds: 180 }, // 3 min
  lite: { analyses: 2, captures: 2, transcriptionSeconds: 1200 }, // 20 min
  pro: { analyses: 8, captures: 8, transcriptionSeconds: 7200 }, // 2 h
  ultra: { analyses: 40, captures: 40, transcriptionSeconds: 28800 }, // 8 h
};

export const DEFAULT_PLAN_LIMITS: PlanLimits = PLAN_LIMITS.free;

// planId desconocido => no romper la UI; usa los límites del plan free.
export function getPlanLimits(planId: string): PlanLimits {
  return (PLAN_LIMITS as Record<string, PlanLimits>)[planId] ?? DEFAULT_PLAN_LIMITS;
}

// Planes a los que se les muestra el CTA de "Mejorar plan".
export const UPGRADEABLE_PLANS: ReadonlySet<string> = new Set<string>(['free', 'lite']);
