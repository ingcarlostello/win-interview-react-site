import type { SubscriptionInfo } from '@/lib/convexApi';
import { isoDateParts, MONTH_KEYS } from '@/helpers/date.helper';

// Estados de facturación derivados de la suscripción (no es un campo del backend).
export type BillingState =
  | 'free' // sin plan de pago ni historial → invitar a elegir plan
  | 'active' // plan de pago vigente, sin cambios programados
  | 'cancel_pending' // cancelación programada al fin del ciclo (mantiene acceso)
  | 'downgrade_pending' // downgrade programado al fin del ciclo
  | 'past_due' // pago vencido
  | 'canceled'; // tuvo suscripción y terminó → reactivable con nuevo checkout

export function deriveBillingState(
  planId: string,
  sub: SubscriptionInfo | null,
): BillingState {
  const status = sub?.paddleStatus ?? null;
  const hasSubHistory = !!sub?.paddleSubscriptionId;

  if (planId === 'free') {
    // Free con historial de suscripción = canceló/expiró (reactivable).
    return hasSubHistory ? 'canceled' : 'free';
  }
  if (status === 'past_due') return 'past_due';
  if (sub?.scheduledChangeAction === 'cancel') return 'cancel_pending';
  if (sub?.pendingPlanId) return 'downgrade_pending';
  return 'active';
}

// "2026-07-12T..." -> "12 Jul 2026" (meses traducidos con t()).
export function formatBillingDate(
  iso: string | null | undefined,
  t: (key: string) => string,
): string {
  if (!iso) return '';
  const parts = isoDateParts(iso);
  if (!parts) return '';
  return `${parts.day} ${t(MONTH_KEYS[parts.monthIndex])} ${parts.year}`;
}

// "1234" + "USD" -> "$12.34". El monto viene en la menor denominación (centavos).
export function formatMoney(
  amount: string | null,
  currency: string | null,
  locale?: string,
): string | null {
  if (!amount || !currency) return null;
  const cents = Number(amount);
  if (!Number.isFinite(cents)) return null;
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(cents / 100);
  } catch {
    return `${(cents / 100).toFixed(2)} ${currency}`;
  }
}
