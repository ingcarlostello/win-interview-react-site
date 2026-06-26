import { useLanguage } from '@/hooks/useLanguage';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { HERO_TRUST_ITEMS } from '@/constants/pricing.constants';
import { SECTIONS } from '@/constants/routes.constants';
import { HeroMockup } from '@/components/hero/HeroMockup';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative overflow-hidden pt-[140px] pb-20">
      <div className="pointer-events-none absolute left-1/2 top-[-20%] h-[600px] w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,var(--color-accent-soft)_0%,transparent_60%)]" />
      <Container className="relative z-[1]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-16 items-center">
          <Reveal className="max-w-[560px]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent-soft px-3.5 py-1.5 font-mono text-xs font-semibold tracking-[0.06em] text-accent">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)] animate-dot-pulse" />
              <span>{t('hero.badge')}</span>
            </div>
            <h1 className="mb-5 text-[clamp(2.2rem,5vw,3.5rem)] font-bold">
              {t('hero.headline')}
            </h1>
            <p className="mb-8 text-[1.15rem] text-text-secondary">{t('hero.subheadline')}</p>
            <div className="mb-8 flex flex-wrap gap-3">
              <Button as="a" href={SECTIONS.PRICING} variant="primary">
                {t('hero.cta_primary')}
              </Button>
              <Button as="a" href={SECTIONS.HOW} variant="secondary">
                {t('hero.cta_secondary')}
              </Button>
            </div>
            <div className="flex flex-wrap gap-6">
              {HERO_TRUST_ITEMS.map((item) => (
                <div key={item.textKey} className="flex items-center gap-2 text-[0.85rem] text-text-secondary">
                  <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-success-soft text-[11px] font-bold text-success">
                    ✓
                  </span>
                  <span>{t(item.textKey)}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <HeroMockup />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
