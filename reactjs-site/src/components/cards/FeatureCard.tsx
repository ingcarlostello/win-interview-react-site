import { Glass } from '@/components/ui/Glass';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/helpers/cn';
import type { FeatureItem } from '@/types/content.type';

interface FeatureCardProps {
  item: FeatureItem;
  className?: string;
}

export function FeatureCard({ item, className }: FeatureCardProps) {
  const { t } = useLanguage();
  return (
    <Glass
      elevated
      className={cn(
        'p-7 rounded-default transition-all duration-300 ease-glass hover:-translate-y-1 hover:border-accent-border hover:shadow-[0_0_24px_var(--color-accent-soft)]',
        className,
      )}
    >
      <div className="mb-[18px] flex h-12 w-12 items-center justify-center rounded-xs border border-accent-border bg-accent-soft text-[22px]">
        {item.icon}
      </div>
      <h3 className="mb-2 text-[1.1rem] font-bold">{t(item.titleKey)}</h3>
      <p className="text-[0.9rem] leading-relaxed text-text-secondary">{t(item.descKey)}</p>
      <span className="mt-3.5 inline-block font-mono text-[0.65rem] uppercase tracking-[0.08em] text-text-muted">
        {t(item.tagKey)}
      </span>
    </Glass>
  );
}
