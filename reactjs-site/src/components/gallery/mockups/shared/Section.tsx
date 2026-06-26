import type { ReactNode } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/helpers/cn';

type BadgeKind = 'ready' | 'listening' | 'thinking' | 'responding';

interface SectionProps {
  children: ReactNode;
  flex?: boolean;
}

export function Section({ children, flex = false }: SectionProps) {
  return (
    <div className={cn('px-3 pb-2', flex && 'flex flex-1 flex-col min-h-0 overflow-hidden pt-2')}>
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  icon: string;
  labelKey: string;
  badge?: ReactNode;
  charBadge?: string;
  spin?: boolean;
}

export function SectionHeader({ icon, labelKey, badge, charBadge, spin = false }: SectionHeaderProps) {
  const { t } = useLanguage();
  return (
    <div className="mb-1.5 flex items-center justify-between">
      <div className="mt-1 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.05em] text-[rgb(163_230_53/0.8)]">
        {icon} <span>{t(labelKey)}</span>
        {spin && <span className="animate-spin-slow">✨</span>}
      </div>
      {charBadge && (
        <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.05em] text-white/30">
          {charBadge}
        </span>
      )}
      {badge}
    </div>
  );
}

interface ResponseBadgeProps {
  kind: BadgeKind;
  labelKey: string;
}

const badgeClasses: Record<BadgeKind, string> = {
  ready: 'bg-white/[0.05] text-white/30',
  listening: 'bg-[rgb(34_197_94/0.2)] text-[#4ade80]',
  thinking: 'bg-[rgb(251_191_36/0.2)] text-amber',
  responding: 'bg-[rgb(163_230_53/0.2)] text-accent',
};

export function ResponseBadge({ kind, labelKey }: ResponseBadgeProps) {
  const { t } = useLanguage();
  return (
    <span
      className={cn(
        'rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.05em]',
        badgeClasses[kind],
      )}
    >
      {t(labelKey)}
    </span>
  );
}
