import { useLanguage } from '@/hooks/useLanguage';
import type { LegalDoc } from '@/types/legal.type';
import { Container } from '@/components/ui/Container';
import { LegalSection } from './LegalSection';

interface LegalContentProps {
  doc: LegalDoc;
}

export function LegalContent({ doc }: LegalContentProps) {
  const { t } = useLanguage();

  return (
    <section className="pb-24">
      <Container>
        <div className="mx-auto max-w-legal rounded-default border border-border-strong bg-bg-elev-1 p-12 backdrop-blur-md [&_a]:text-accent [&_a]:underline [&_a:hover]:text-accent-hover [&_strong]:text-text-primary">
          <p className="mb-4 text-text-secondary" dangerouslySetInnerHTML={{ __html: t(doc.introKey) }} />
          {doc.sections.map((section) => (
            <LegalSection key={section.titleKey} section={section} />
          ))}
        </div>
      </Container>
    </section>
  );
}
