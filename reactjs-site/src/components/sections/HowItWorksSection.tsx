import { SectionShell, SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { STEPS } from '@/constants/steps.constants';
import { StepCard } from '@/components/cards/StepCard';

export function HowItWorksSection() {
  return (
    <SectionShell id="how">
      <Reveal>
        <SectionHeader labelKey="how.label" titleKey="how.title" subtitleKey="how.subtitle" />
      </Reveal>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {STEPS.map((item, i) => (
          <Reveal key={item.titleKey}>
            <StepCard item={item} index={i} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
