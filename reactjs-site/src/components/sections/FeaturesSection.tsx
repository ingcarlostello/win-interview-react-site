import { SectionShell, SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { FEATURES } from '@/constants/features.constants';
import { FeatureCard } from '@/components/cards/FeatureCard';

export function FeaturesSection() {
  return (
    <SectionShell id="features">
      <Reveal>
        <SectionHeader
          labelKey="features.label"
          titleKey="features.title"
          subtitleKey="features.subtitle"
        />
      </Reveal>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((item) => (
          <Reveal key={item.titleKey}>
            <FeatureCard item={item} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
