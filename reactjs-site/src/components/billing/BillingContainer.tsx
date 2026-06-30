import { useState } from 'react';
import { useAction, useQuery } from 'convex/react';
import {
  getCurrentUserSubscriptionRef,
  changeSubscriptionPlanRef,
  previewSubscriptionChangeRef,
  cancelSubscriptionRef,
  reactivateSubscriptionRef,
  updatePaymentMethodRef,
  type SubscriptionInfo,
  type PreviewResult,
} from '@/lib/convexApi';
import { PLAN_RANK } from '@/constants/pricing.constants';
import type { PlanId } from '@/types/pricing.type';
import { ROUTES } from '@/constants/routes.constants';
import { useLanguage } from '@/hooks/useLanguage';
import { usePaddle } from '@/hooks/usePaddle';
import { deriveBillingState, formatBillingDate, formatMoney } from '@/helpers/billing.helper';
import { planLabel } from '@/helpers/plan.helper';
import { Glass } from '@/components/ui/Glass';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { CurrentPlanPanel } from './CurrentPlanPanel';
import { PlanChangePanel } from './PlanChangePanel';
import { CancelReactivatePanel } from './CancelReactivatePanel';
import { PaymentMethodPanel } from './PaymentMethodPanel';

type Confirm =
  | { kind: 'cancel' }
  | { kind: 'change'; planId: PlanId; direction: 'upgrade' | 'downgrade' }
  | null;

// CONTAINER: concentra la lógica del portal de facturación (queries/acciones de
// Convex + overlay de Paddle) y compone los paneles presentacionales. Vive dentro
// del dashboard, en el lugar de la antigua SubscriptionCard.
export function BillingContainer({ planId }: { planId: string }) {
  const { t, lang } = useLanguage();
  const sub = useQuery(getCurrentUserSubscriptionRef, {});
  const paddle = usePaddle();

  const changePlan = useAction(changeSubscriptionPlanRef);
  const previewChange = useAction(previewSubscriptionChangeRef);
  const cancelSub = useAction(cancelSubscriptionRef);
  const reactivateSub = useAction(reactivateSubscriptionRef);
  const updatePayment = useAction(updatePaymentMethodRef);

  const [confirm, setConfirm] = useState<Confirm>(null);
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // `undefined` = cargando la query; no renderizamos (el dashboard ya tuvo su spinner).
  if (sub === undefined) return null;

  const subData: SubscriptionInfo = sub ?? { planId };
  const state = deriveBillingState(planId, sub);
  const isPaid = state !== 'free' && state !== 'canceled';

  function openChange(targetId: PlanId) {
    setError(null);
    const direction = PLAN_RANK[targetId] > (PLAN_RANK[planId as PlanId] ?? 0) ? 'upgrade' : 'downgrade';
    setConfirm({ kind: 'change', planId: targetId, direction });
    setPreview(null);
    // Solo los upgrades cobran hoy: previsualizamos el prorrateo para el diálogo.
    if (direction === 'upgrade') {
      setPreviewLoading(true);
      previewChange({ planId: targetId })
        .then((p) => setPreview(p))
        .catch(() => setPreview(null))
        .finally(() => setPreviewLoading(false));
    }
  }

  async function runAction(fn: () => Promise<unknown>) {
    setBusy(true);
    setError(null);
    try {
      await fn();
      setConfirm(null);
      setPreview(null);
    } catch (err) {
      console.error('[Billing]', err);
      setError(t('billing.error'));
    } finally {
      setBusy(false);
    }
  }

  async function handleConfirm() {
    if (!confirm) return;
    if (confirm.kind === 'cancel') {
      await runAction(() => cancelSub({}));
    } else {
      await runAction(() => changePlan({ planId: confirm.planId }));
    }
  }

  async function handleUpdatePayment() {
    setError(null);
    if (!paddle) {
      setError(t('billing.error'));
      return;
    }
    setBusy(true);
    try {
      const { transactionId } = await updatePayment({});
      paddle.Checkout.open({
        transactionId,
        settings: {
          displayMode: 'overlay',
          theme: 'dark',
          locale: lang,
          successUrl: `${window.location.origin}${ROUTES.DASHBOARD}`,
        },
      });
    } catch (err) {
      console.error('[Billing updatePayment]', err);
      setError(t('billing.error'));
    } finally {
      setBusy(false);
    }
  }

  const modalTitle =
    confirm?.kind === 'cancel'
      ? t('billing.cancel.title')
      : confirm?.direction === 'upgrade'
        ? t('billing.upgrade.title')
        : t('billing.downgrade.title');

  return (
    <Glass className="mt-6 w-full rounded-2xl p-7">
      <h2 className="text-sm font-medium text-text-secondary">{t('billing.title')}</h2>

      <div className="mt-4">
        <CurrentPlanPanel state={state} planId={planId} sub={subData} />
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xs border border-border-danger bg-danger-soft px-4 py-3 text-sm text-text-primary"
        >
          {error}
        </p>
      )}

      {(state === 'free' || state === 'canceled') && (
        <div className="mt-5">
          <Button as="a" href={ROUTES.UPGRADE} variant="primary">
            {state === 'canceled' ? t('billing.reactivateExpired') : t('billing.choosePlan')}
          </Button>
        </div>
      )}

      {isPaid && (
        <>
          {(state === 'active' || state === 'downgrade_pending') && (
            <div className="mt-6">
              <PlanChangePanel
                currentPlanId={planId}
                pendingPlanId={subData.pendingPlanId ?? null}
                disabled={busy}
                onSelect={openChange}
              />
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <CancelReactivatePanel
              state={state}
              busy={busy}
              onCancel={() => {
                setError(null);
                setConfirm({ kind: 'cancel' });
              }}
              onReactivate={() => runAction(() => reactivateSub({}))}
              onUndoDowngrade={() => runAction(() => changePlan({ planId }))}
            />
            <PaymentMethodPanel busy={busy || !paddle} onUpdate={handleUpdatePayment} />
          </div>
        </>
      )}

      <Modal
        open={confirm !== null}
        title={modalTitle}
        confirmLabel={confirm?.kind === 'cancel' ? t('billing.cancel.confirm') : t('billing.confirm')}
        cancelLabel={t('billing.back')}
        danger={confirm?.kind === 'cancel'}
        loading={busy}
        onClose={() => {
          if (busy) return;
          setConfirm(null);
          setPreview(null);
        }}
        onConfirm={handleConfirm}
      >
        {confirm?.kind === 'cancel' && (
          <p>
            {t('billing.cancel.body')} {formatBillingDate(subData.subscriptionCurrentPeriodEnd, t)}.
          </p>
        )}
        {confirm?.kind === 'change' && confirm.direction === 'upgrade' && (
          <div>
            <p>{t('billing.upgrade.body').replace('{plan}', planLabel(confirm.planId))}</p>
            <p className="mt-2 font-medium text-text-primary">
              {previewLoading
                ? t('billing.preview.loading')
                : (() => {
                    const money = preview
                      ? formatMoney(preview.immediateAmount, preview.currencyCode, lang)
                      : null;
                    return money
                      ? `${t('billing.preview.dueToday')} ${money}`
                      : t('billing.preview.unavailable');
                  })()}
            </p>
          </div>
        )}
        {confirm?.kind === 'change' && confirm.direction === 'downgrade' && (
          <p>
            {t('billing.downgrade.body')
              .replace('{plan}', planLabel(confirm.planId))
              .replace('{date}', formatBillingDate(subData.subscriptionCurrentPeriodEnd, t))}
          </p>
        )}
      </Modal>
    </Glass>
  );
}
