import { SectionShell, SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { PLANS } from '@/constants/pricing.constants';
import { PricingCard } from '@/components/cards/PricingCard';

export function PricingSection() {
  return (
    <SectionShell id="pricing">
      <Reveal>
        <SectionHeader
          labelKey="pricing.label"
          titleKey="pricing.title"
          subtitleKey="pricing.subtitle"
        />
      </Reveal>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((plan) => (
          <Reveal key={plan.id}>
            <PricingCard plan={plan} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
