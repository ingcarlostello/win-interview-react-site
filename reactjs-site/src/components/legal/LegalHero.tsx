import { useLanguage } from '@/hooks/useLanguage';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';

interface LegalHeroProps {
  labelKey: string;
  titleKey: string;
  updatedKey: string;
}

export function LegalHero({ labelKey, titleKey, updatedKey }: LegalHeroProps) {
  const { t } = useLanguage();
  return (
    <section className="relative px-0 pt-20 pb-12 text-center">
      <div className="pointer-events-none absolute left-1/2 top-[-20%] h-[400px] w-[600px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,var(--color-accent-soft)_0%,transparent_60%)]" />
      <Container className="relative z-[1]">
        <SectionLabel labelKey={labelKey} />
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold">{t(titleKey)}</h1>
        <p className="mt-3 text-[0.9rem] text-text-muted">{t(updatedKey)}</p>
      </Container>
    </section>
  );
}
