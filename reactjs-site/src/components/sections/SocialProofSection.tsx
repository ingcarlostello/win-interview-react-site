import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { PLATFORMS, METRICS, TESTIMONIALS } from '@/constants/social-proof.constants';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { MetricCard } from '@/components/cards/MetricCard';

export function SocialProofSection() {
  return (
    <section className="border-y border-border py-16">
      <Container>
        <Reveal className="mb-12 flex flex-wrap items-center justify-center gap-12">
          {PLATFORMS.map((p) => (
            <div
              key={p.label}
              className="flex items-center gap-2 text-[1.1rem] font-bold text-text-muted transition-colors duration-300 hover:text-text-secondary"
            >
              <span>{p.icon}</span>
              <span>{p.label}</span>
            </div>
          ))}
        </Reveal>

        <Reveal className="mx-auto grid max-w-3xl grid-cols-1 gap-10 text-center md:grid-cols-3 md:gap-8">
          {METRICS.map((m) => (
            <MetricCard key={m.labelKey} item={m} />
          ))}
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <Reveal key={item.name}>
              <TestimonialCard item={item} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
