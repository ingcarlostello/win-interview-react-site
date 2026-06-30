import { CreditCard } from 'lucide-react';
import type { SubscriptionInfo } from '@/lib/convexApi';
import type { BillingState } from '@/helpers/billing.helper';
import { formatBillingDate } from '@/helpers/billing.helper';
import { planLabel } from '@/helpers/plan.helper';
import { useLanguage } from '@/hooks/useLanguage';

const TONE: Record<BillingState, string> = {
  active: 'bg-success-soft text-success',
  downgrade_pending: 'bg-accent-soft text-accent',
  cancel_pending: 'bg-danger-soft text-danger',
  past_due: 'bg-danger-soft text-danger',
  canceled: 'bg-danger-soft text-danger',
  free: 'bg-bg-elev-2 text-text-secondary',
};

const STATUS_KEY: Record<BillingState, string> = {
  active: 'dash.sub.status.active',
  downgrade_pending: 'billing.status.downgradePending',
  cancel_pending: 'billing.status.cancelPending',
  past_due: 'dash.sub.status.past_due',
  canceled: 'dash.sub.status.canceled',
  free: 'billing.status.free',
};

// Presentacional: plan actual + badge de estado + mensaje contextual del estado.
export function CurrentPlanPanel({
  state,
  planId,
  sub,
}: {
  state: BillingState;
  planId: string;
  sub: SubscriptionInfo;
}) {
  const { t } = useLanguage();

  let banner: string;
  if (state === 'active') {
    const date = formatBillingDate(sub.subscriptionCurrentPeriodEnd, t);
    banner = date ? `${t('dash.sub.renews')} ${date}` : '';
  } else if (state === 'cancel_pending') {
    banner = `${t('billing.banner.cancelPending')} ${formatBillingDate(
      sub.scheduledChangeEffectiveAt ?? sub.subscriptionCurrentPeriodEnd,
      t,
    )}`;
  } else if (state === 'downgrade_pending') {
    banner = t('billing.banner.downgradePending')
      .replace('{plan}', planLabel(sub.pendingPlanId ?? ''))
      .replace('{date}', formatBillingDate(sub.pendingPlanEffectiveAt, t));
  } else if (state === 'past_due') {
    banner = t('billing.banner.pastDue');
  } else if (state === 'canceled') {
    banner = t('billing.banner.canceled');
  } else {
    banner = t('billing.banner.free');
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 text-text-secondary">
          <CreditCard size={16} className="text-accent" />
          <span className="text-sm font-medium text-text-primary">
            {t('billing.currentLabel')} {planLabel(planId)}
          </span>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${TONE[state]}`}
        >
          {t(STATUS_KEY[state])}
        </span>
      </div>
      {banner && <p className="mt-3 text-sm text-text-muted">{banner}</p>}
    </div>
  );
}
