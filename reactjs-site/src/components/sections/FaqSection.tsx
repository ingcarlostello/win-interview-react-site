import { SectionShell, SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { FAQ_INDEXES } from '@/constants/pricing.constants';
import { FaqItem } from '@/components/cards/FaqItem';
import { useFaqAccordion } from '@/hooks/useFaqAccordion';

export function FaqSection() {
  const { openIndex, toggle } = useFaqAccordion();

  return (
    <SectionShell id="faq">
      <Reveal>
        <SectionHeader labelKey="faq.label" titleKey="faq.title" subtitleKey="faq.subtitle" />
      </Reveal>
      <Reveal>
        <div className="mx-auto max-w-[760px]">
          {FAQ_INDEXES.map((i) => (
            <FaqItem
              key={i}
              questionKey={`faq.${i}.q`}
              answerKey={`faq.${i}.a`}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </Reveal>
    </SectionShell>
  );
}
