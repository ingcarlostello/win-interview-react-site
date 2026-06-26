import { useLanguage } from '@/hooks/useLanguage';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Glass } from '@/components/ui/Glass';
import { Reveal } from '@/components/ui/Reveal';
import { SECTIONS } from '@/constants/routes.constants';

export function CtaSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <Glass className="relative overflow-hidden rounded-default px-12 py-16 text-center">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,var(--color-accent-soft)_0%,transparent_70%)]" />
            <div className="relative z-[1]">
              <h2 className="mb-3.5 text-[clamp(1.8rem,4vw,2.5rem)] font-bold">{t('cta.title')}</h2>
              <p className="mb-8 text-[1.1rem] text-text-secondary">{t('cta.subtitle')}</p>
              <Button as="a" href={SECTIONS.PRICING} variant="primary">
                {t('cta.button')}
              </Button>
            </div>
          </Glass>
        </Reveal>
      </Container>
    </section>
  );
}
