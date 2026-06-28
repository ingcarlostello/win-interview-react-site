import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAction, useConvexAuth, useQuery } from 'convex/react';
import { PLANS } from '@/constants/pricing.constants';
import type { Plan } from '@/types/pricing.type';
import { ROUTES } from '@/constants/routes.constants';
import { createCheckoutRef, getCurrentUserRef } from '@/lib/convexApi';
import { useLanguage } from '@/hooks/useLanguage';
import { usePaddle } from '@/hooks/usePaddle';
import { cn } from '@/helpers/cn';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionShell, SectionHeader } from '@/components/ui/SectionHeader';
import { PricingCard } from '@/components/cards/PricingCard';

const disabledBtn =
  'opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0';

export function UpgradePage() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  // Ruta pública: solo leemos el plan del usuario si hay sesión; si no, `'skip'`
  // evita ejecutar la query (que requiere auth). `currentPlanId` queda en null.
  const { isAuthenticated } = useConvexAuth();
  const user = useQuery(getCurrentUserRef, isAuthenticated ? {} : 'skip');
  const currentPlanId = user?.planId ?? null;

  const paddle = usePaddle();
  const createCheckout = useAction(createCheckoutRef);
  const [pendingPlan, setPendingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubscribe(planId: string) {
    setError(null);
    // El checkout requiere sesión (la action deriva el usuario de Clerk). Si no
    // hay sesión, mandamos a sign-in y volvemos a /upgrade tras autenticarse.
    if (!isAuthenticated) {
      navigate(`${ROUTES.SIGN_IN}?redirect_url=${encodeURIComponent(ROUTES.UPGRADE)}`);
      return;
    }
    if (!paddle) {
      setError(t('upgrade.checkoutError'));
      return;
    }
    try {
      setPendingPlan(planId);
      const { transactionId } = await createCheckout({ planId });
      paddle.Checkout.open({
        transactionId,
        settings: {
          displayMode: 'overlay',
          theme: 'dark',
          locale: lang,
          // Al completar el pago, Paddle redirige al dashboard; el webhook ya
          // habrá actualizado (o actualizará reactivamente) la suscripción.
          successUrl: `${window.location.origin}${ROUTES.DASHBOARD}`,
        },
      });
    } catch (err) {
      console.error('[Paddle checkout]', err);
      setError(t('upgrade.checkoutError'));
    } finally {
      setPendingPlan(null);
    }
  }

  function renderCta(plan: Plan, isCurrent: boolean) {
    if (isCurrent) {
      return (
        <Button as="button" disabled variant="secondary" className={disabledBtn}>
          {t('upgrade.current')}
        </Button>
      );
    }
    // El plan free no pasa por checkout (`createCheckout` lo rechaza). Sin sesión
    // invita a registrarse; con sesión (usuario de pago) queda deshabilitado: el
    // downgrade a free se gestiona cancelando la suscripción en el dashboard.
    if (plan.id === 'free') {
      return isAuthenticated ? (
        <Button as="button" disabled variant="secondary" className={disabledBtn}>
          {t('upgrade.startFree')}
        </Button>
      ) : (
        <Button as="a" href={ROUTES.SIGN_UP} variant="secondary">
          {t('upgrade.startFree')}
        </Button>
      );
    }

    const isPending = pendingPlan === plan.id;
    const busy = pendingPlan !== null;
    // Mientras Paddle.js carga, deshabilitamos solo a usuarios autenticados; los
    // no autenticados deben poder pulsar para ser redirigidos a sign-in.
    const disabled = busy || (isAuthenticated && !paddle);
    return (
      <Button
        as="button"
        type="button"
        variant={plan.featured ? 'primary' : 'secondary'}
        disabled={disabled}
        onClick={() => handleSubscribe(plan.id)}
        className={cn(disabled && disabledBtn)}
      >
        {isPending ? t('upgrade.processing') : t('pricing.cta')}
      </Button>
    );
  }

  return (
    <SectionShell id="upgrade">
      <Reveal>
        <SectionHeader
          labelKey="upgrade.label"
          titleKey="upgrade.title"
          subtitleKey="upgrade.subtitle"
        />
      </Reveal>
      {error && (
        <Reveal>
          <p
            role="alert"
            className="mx-auto mb-6 max-w-md rounded-xs border border-border-danger bg-danger-soft px-4 py-3 text-center text-sm text-text-primary"
          >
            {error}
          </p>
        </Reveal>
      )}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((plan) => {
          const isCurrent = plan.id === currentPlanId;
          return (
            <Reveal key={plan.id}>
              <PricingCard
                plan={plan}
                className={cn(isCurrent && 'ring-2 ring-accent-border')}
                cta={renderCta(plan, isCurrent)}
              />
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
