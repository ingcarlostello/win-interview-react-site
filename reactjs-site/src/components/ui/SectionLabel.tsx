import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/helpers/cn';

interface SectionLabelProps {
  labelKey: string;
  className?: string;
}

export function SectionLabel({ labelKey, className }: SectionLabelProps) {
  const { t } = useLanguage();
  return (
    <span
      className={cn(
        'inline-block font-mono text-xs font-semibold uppercase tracking-[0.12em] text-accent px-3.5 py-1.5 border border-accent-border rounded-full bg-accent-soft mb-4',
        className,
      )}
    >
      {t(labelKey)}
    </span>
  );
}
