import { Glass } from '@/components/ui/Glass';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/helpers/cn';
import type { StepItem } from '@/types/content.type';

interface StepCardProps {
  item: StepItem;
  index: number;
  className?: string;
}

export function StepCard({ item, index, className }: StepCardProps) {
  const { t } = useLanguage();
  const num = String(index + 1).padStart(2, '0');
  return (
    <Glass elevated className={cn('relative rounded-default p-9', className)}>
      <span className="mb-4 block font-mono text-[2.5rem] font-bold leading-none text-accent opacity-30">
        {num}
      </span>
      <h3 className="mb-2.5 text-[1.25rem] font-bold">{t(item.titleKey)}</h3>
      <p className="text-[0.95rem] text-text-secondary">{t(item.descKey)}</p>
    </Glass>
  );
}
