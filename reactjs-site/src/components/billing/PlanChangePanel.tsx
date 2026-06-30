import { PLANS, PLAN_RANK } from '@/constants/pricing.constants';
import type { PlanId } from '@/types/pricing.type';
import { planLabel } from '@/helpers/plan.helper';
import { cn } from '@/helpers/cn';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/Button';

const disabledCls = 'opacity-60 cursor-not-allowed hover:translate-y-0';

// Presentacional: lista de planes de pago con acción Mejorar/Bajar según el rango.
// El plan actual queda deshabilitado; un downgrade programado se marca "Programado".
export function PlanChangePanel({
  currentPlanId,
  pendingPlanId,
  disabled,
  onSelect,
}: {
  currentPlanId: string;
  pendingPlanId: string | null;
  disabled: boolean;
  onSelect: (planId: PlanId) => void;
}) {
  const { t } = useLanguage();
  const currentRank = PLAN_RANK[currentPlanId as PlanId] ?? 0;
  const plans = PLANS.filter((p) => p.id !== 'free');

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">
        {t('billing.changePlan')}
      </h3>
      <div className="mt-3 flex flex-col gap-2">
        {plans.map((plan) => {
          const isCurrent = plan.id === currentPlanId;
          const isPending = plan.id === pendingPlanId;
          const isUpgrade = PLAN_RANK[plan.id] > currentRank;
          return (
            <div
              key={plan.id}
              className="flex items-center justify-between gap-4 rounded-xs border border-border bg-bg-elev-1 px-4 py-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-text-primary">{planLabel(plan.id)}</span>
                <span className="text-xs text-text-muted">{plan.price}/mes</span>
                {isPending && (
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase text-accent">
                    {t('billing.scheduled')}
                  </span>
                )}
              </div>
              {isCurrent ? (
                <span className="text-xs font-semibold text-text-muted">
                  {t('billing.currentPlan')}
                </span>
              ) : (
                <Button
                  as="button"
                  type="button"
                  variant={isUpgrade ? 'primary' : 'secondary'}
                  disabled={disabled}
                  onClick={() => onSelect(plan.id)}
                  className={cn('px-4 py-2 text-xs', disabled && disabledCls)}
                >
                  {isUpgrade ? t('billing.upgrade') : t('billing.downgrade')}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
