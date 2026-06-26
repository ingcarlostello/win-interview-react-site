import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/helpers/cn';
import type { MetricItem } from '@/types/content.type';

interface MetricCardProps {
  item: MetricItem;
  className?: string;
}

export function MetricCard({ item, className }: MetricCardProps) {
  const { t } = useLanguage();
  return (
    <div className={cn('text-center', className)}>
      <div className="mb-2 text-[2.5rem] font-extrabold leading-none tracking-[-0.03em] text-accent">
        {item.value}
      </div>
      <div className="text-[0.85rem] text-text-secondary">{t(item.labelKey)}</div>
    </div>
  );
}
