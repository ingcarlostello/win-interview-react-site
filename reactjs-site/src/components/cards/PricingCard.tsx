import { Glass } from '@/components/ui/Glass';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/hooks/useLanguage';
import { SECTIONS } from '@/constants/routes.constants';
import { cn } from '@/helpers/cn';
import type { Plan } from '@/types/pricing.type';

interface PricingCardProps {
  plan: Plan;
  className?: string;
}

export function PricingCard({ plan, className }: PricingCardProps) {
  const { t } = useLanguage();
  const featured = plan.featured;

  return (
    <Glass
      elevated
      className={cn(
        'relative flex flex-col rounded-default p-8 transition-all duration-300 ease-glass hover:-translate-y-1',
        featured &&
          'border-amber bg-[linear-gradient(to_bottom,rgb(251_191_36/0.06),transparent)] shadow-[0_0_40px_rgb(251_191_36/0.08)]',
        className,
      )}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber px-4 py-1 text-[0.7rem] font-bold tracking-[0.05em] text-[#0a0a0a] whitespace-nowrap">
          ★ {t('pricing.pro.desc')}
        </span>
      )}
      <h3 className="mb-2 text-[1.3rem] font-bold">{t(`pricing.${plan.id}.name`)}</h3>
      <p className="mb-5 text-[0.8rem] text-text-muted">{t(`pricing.${plan.id}.desc`)}</p>
      <div className="mb-6 flex items-baseline gap-1">
        <span className="text-[2.2rem] font-extrabold tracking-[-0.03em]">{plan.price}</span>
        <span className="text-[0.9rem] text-text-muted">{t('pricing.month')}</span>
      </div>
      <ul className="mb-7 flex-1 list-none">
        {plan.features.map((f) => (
          <li
            key={f.key}
            className={cn(
              'flex items-start gap-2.5 border-b border-border py-[7px] text-[0.85rem] last:border-b-0',
              f.included ? 'text-text-primary' : 'text-text-muted',
            )}
          >
            <span className={cn('flex-shrink-0 w-4', f.included ? 'text-success font-bold' : 'text-text-muted')}>
              {f.included ? '✓' : '—'}
            </span>
            <span>
              {t(f.key)}
              {f.value && <strong className="ml-1 font-semibold text-accent">{f.value}</strong>}
            </span>
          </li>
        ))}
      </ul>
      <Button as="a" href={SECTIONS.PRICING} variant={featured ? 'primary' : 'secondary'}>
        {t('pricing.cta')}
      </Button>
    </Glass>
  );
}
