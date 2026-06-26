import { Glass } from '@/components/ui/Glass';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/helpers/cn';
import type { TestimonialItem } from '@/types/content.type';

interface TestimonialCardProps {
  item: TestimonialItem;
  className?: string;
}

export function TestimonialCard({ item, className }: TestimonialCardProps) {
  const { t } = useLanguage();
  return (
    <Glass elevated className={cn('rounded-default p-7', className)}>
      <div className="mb-3.5 text-base tracking-[2px] text-amber">{item.stars}</div>
      <p className="mb-5 text-[0.95rem] leading-relaxed text-text-secondary">{t(item.textKey)}</p>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-elev-3 text-[1.1rem]">
          {item.avatar}
        </div>
        <div>
          <div className="text-[0.9rem] font-semibold">{item.name}</div>
          <div className="text-[0.8rem] text-text-muted">{t(item.roleKey)}</div>
        </div>
      </div>
    </Glass>
  );
}
