import { useConvexAuth, useQuery } from 'convex/react';
import { PLANS } from '@/constants/pricing.constants';
import { getCurrentUserRef } from '@/lib/convexApi';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/helpers/cn';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionShell, SectionHeader } from '@/components/ui/SectionHeader';
import { PricingCard } from '@/components/cards/PricingCard';

export function UpgradePage() {
  const { t } = useLanguage();
  // Ruta pública: solo leemos el plan del usuario si hay sesión; si no, `'skip'`
  // evita ejecutar la query (que requiere auth). `currentPlanId` queda en null.
  const { isAuthenticated } = useConvexAuth();
  const user = useQuery(getCurrentUserRef, isAuthenticated ? {} : 'skip');
  const currentPlanId = user?.planId ?? null;

  return (
    <SectionShell id="upgrade">
      <Reveal>
        <SectionHeader
          labelKey="upgrade.label"
          titleKey="upgrade.title"
          subtitleKey="upgrade.subtitle"
        />
      </Reveal>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((plan) => {
          const isCurrent = plan.id === currentPlanId;
          return (
            <Reveal key={plan.id}>
              <PricingCard
                plan={plan}
                className={cn(isCurrent && 'ring-2 ring-accent-border')}
                cta={
                  isCurrent ? (
                    <Button
                      as="button"
                      disabled
                      variant="secondary"
                      className="opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {t('upgrade.current')}
                    </Button>
                  ) : (
                    <Button
                      as="button"
                      type="button"
                      variant={plan.featured ? 'primary' : 'secondary'}
                      onClick={() => {
                        // TODO: iniciar checkout de Paddle para `plan.id`
                      }}
                    >
                      {t('pricing.cta')}
                    </Button>
                  )
                }
              />
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
