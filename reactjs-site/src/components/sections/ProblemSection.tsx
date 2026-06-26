import { SectionShell, SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { PROBLEMS } from '@/constants/problems.constants';
import { ProblemCard } from '@/components/cards/ProblemCard';

export function ProblemSection() {
  return (
    <SectionShell id="problem">
      <Reveal>
        <SectionHeader
          labelKey="problem.label"
          titleKey="problem.title"
          subtitleKey="problem.subtitle"
        />
      </Reveal>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PROBLEMS.map((item) => (
          <Reveal key={item.titleKey}>
            <ProblemCard item={item} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
