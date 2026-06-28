import { useQuery } from 'convex/react';
import { CreditCard, ExternalLink, XCircle } from 'lucide-react';
import { getCurrentUserSubscriptionRef } from '@/lib/convexApi';
import { isoDateParts, MONTH_KEYS } from '@/helpers/date.helper';
import { planLabel } from '@/helpers/plan.helper';
import { useLanguage } from '@/hooks/useLanguage';
import { Glass } from '@/components/ui/Glass';
import { Button } from '@/components/ui/Button';

// paddleStatus -> clave i18n. Estados no mapeados muestran el string crudo.
const STATUS_KEYS: Record<string, string> = {
  active: 'dash.sub.status.active',
  trialing: 'dash.sub.status.active',
  past_due: 'dash.sub.status.past_due',
  canceled: 'dash.sub.status.canceled',
};

function statusTone(status: string | null | undefined): string {
  if (status === 'active' || status === 'trialing') return 'bg-success-soft text-success';
  if (status === 'past_due' || status === 'canceled') return 'bg-danger-soft text-danger';
  return 'bg-bg-elev-2 text-text-secondary';
}

export function SubscriptionCard({ planId }: { planId: string }) {
  const { t } = useLanguage();
  const sub = useQuery(getCurrentUserSubscriptionRef, {});

  // Cargando o usuario sin suscripción de pago => no renderizar la tarjeta.
  if (sub == null) return null;
  const isPaid = planId !== 'free' && (sub.currentPeriodEnd != null || sub.status != null);
  if (!isPaid) return null;

  const parts = sub.currentPeriodEnd ? isoDateParts(sub.currentPeriodEnd) : null;
  const renewStr = parts ? `${parts.day} ${t(MONTH_KEYS[parts.monthIndex])} ${parts.year}` : '';

  const statusKey = sub.status ? STATUS_KEYS[sub.status] : undefined;
  const statusLabel = statusKey ? t(statusKey) : (sub.status ?? '');

  return (
    <Glass className="mt-6 w-full rounded-2xl p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 text-text-secondary">
          <CreditCard size={16} className="text-accent" />
          <span className="text-sm font-medium">{t('dash.sub.title')}</span>
        </div>
        {statusLabel && (
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusTone(sub.status)}`}
          >
            {statusLabel}
          </span>
        )}
      </div>

      <p className="mt-3 text-sm text-text-primary">
        Plan {planLabel(sub.planId || planId)}
        {renewStr && (
          <span className="text-text-muted">
            {' · '}
            {t('dash.sub.renews')} {renewStr}
          </span>
        )}
      </p>

      {(sub.updatePaymentUrl || sub.cancelUrl) && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {sub.updatePaymentUrl && (
            <Button
              as="a"
              href={sub.updatePaymentUrl}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              className="text-sm"
            >
              <ExternalLink size={14} />
              {t('dash.sub.managePayment')}
            </Button>
          )}
          {sub.cancelUrl && (
            <Button
              as="a"
              href={sub.cancelUrl}
              target="_blank"
              rel="noreferrer"
              variant="ghost"
              className="text-sm"
            >
              <XCircle size={14} />
              {t('dash.sub.cancel')}
            </Button>
          )}
        </div>
      )}
    </Glass>
  );
}
