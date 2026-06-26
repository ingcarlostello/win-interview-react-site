import { Glass } from '@/components/ui/Glass';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/helpers/cn';
import type { ProblemItem } from '@/types/content.type';

interface ProblemCardProps {
  item: ProblemItem;
  className?: string;
}

export function ProblemCard({ item, className }: ProblemCardProps) {
  const { t } = useLanguage();
  return (
    <Glass elevated className={cn('p-8 rounded-default text-center', className)}>
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-[14px] bg-danger-soft text-[26px]">
        {item.icon}
      </div>
      <h3 className="mb-2.5 text-[1.25rem] font-bold">{t(item.titleKey)}</h3>
      <p className="text-[0.95rem] text-text-secondary">{t(item.descKey)}</p>
    </Glass>
  );
}
