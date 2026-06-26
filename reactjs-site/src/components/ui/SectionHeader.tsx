import type { ReactNode } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/helpers/cn';
import { Container } from './Container';
import { SectionLabel } from './SectionLabel';

interface SectionHeaderProps {
  labelKey: string;
  titleKey: string;
  subtitleKey: string;
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({
  labelKey,
  titleKey,
  subtitleKey,
  className,
  children,
}: SectionHeaderProps) {
  const { t } = useLanguage();
  return (
    <div className={cn('text-center', className)}>
      <SectionLabel labelKey={labelKey} />
      <h2 className="mb-3 text-[clamp(1.8rem,4vw,2.5rem)] font-bold">{t(titleKey)}</h2>
      <p className="mx-auto mb-12 max-w-[600px] text-[1.05rem] text-text-secondary">
        {t(subtitleKey)}
      </p>
      {children}
    </div>
  );
}

interface SectionShellProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export function SectionShell({ id, children, className }: SectionShellProps) {
  return (
    <section id={id} className={cn('relative py-24', className)}>
      <Container>{children}</Container>
    </section>
  );
}
