import type { ReactNode } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/helpers/cn';

type StatusKind = 'idle' | 'active' | 'paused' | 'error';

interface StatusPillProps {
  kind: StatusKind;
  dotPulse?: boolean;
  labelKey: string;
  mic?: boolean;
}

const statusClasses: Record<StatusKind, string> = {
  idle: 'border-white/10 bg-white/[0.05] text-white/60',
  active: 'border-[rgb(34_197_94/0.4)] bg-success-soft text-success',
  paused: 'border-[rgb(251_191_36/0.3)] bg-[rgb(251_191_36/0.2)] text-amber',
  error: 'border-[rgb(239_68_68/0.3)] bg-[rgb(239_68_68/0.1)] text-[#f87171]',
};

export function StatusPill({ kind, dotPulse = false, labelKey, mic = false }: StatusPillProps) {
  const { t } = useLanguage();
  return (
    <span
      className={cn(
        'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium',
        statusClasses[kind],
      )}
    >
      <span className={cn('relative h-2 w-2 rounded-full bg-current flex-shrink-0', dotPulse && 'animate-dot-ping')} />
      <span>{t(labelKey)}</span>
      {mic && <span>🎤</span>}
    </span>
  );
}

interface GhostBadgeProps {
  danger?: boolean;
  titleKey: string;
  subKey: string;
}

export function GhostBadge({ danger = false, titleKey, subKey }: GhostBadgeProps) {
  const { t } = useLanguage();
  return (
    <span
      className={cn(
        'flex items-center gap-2 rounded-xs bg-white/[0.05] border border-white/10 px-2.5 py-1.5',
        danger && 'bg-[rgb(239_68_68/0.07)] border-[rgb(239_68_68/0.2)]',
      )}
    >
      <span className={danger ? 'text-danger' : ''}>👁</span>
      <div>
        <div className={cn('text-[10px] font-medium leading-[1.2] text-white/60', danger && 'text-danger')}>
          {t(titleKey)}
        </div>
        <div className={cn('text-[9px] leading-[1.2] text-white/30', danger && 'text-[rgb(239_68_68/0.6)]')}>
          {t(subKey)}
        </div>
      </div>
    </span>
  );
}

interface BadgeProps {
  children: ReactNode;
  variant: 'time' | 'session';
}

export function Badge({ children, variant }: BadgeProps) {
  return (
    <span
      className={cn(
        'flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium',
        variant === 'time' && 'border-[rgb(34_197_94/0.4)] bg-success-soft text-success',
        variant === 'session' && 'border-accent-border bg-accent-soft text-accent',
      )}
    >
      {children}
    </span>
  );
}

interface ScreenToggleProps {
  active?: boolean;
}

export function ScreenToggle({ active = false }: ScreenToggleProps) {
  const { t } = useLanguage();
  return (
    <span
      className={cn(
        'flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-medium text-white/60',
        active && 'bg-success-soft border-[rgb(34_197_94/0.4)] text-success',
      )}
    >
      🖥 <span>{t('ic.screenReader')}</span>
    </span>
  );
}

interface LangSelectorProps {
  flag: string;
  label: string;
}

export function LangSelector({ flag, label }: LangSelectorProps) {
  return (
    <span className="flex items-center gap-1.5 rounded-xs border border-white/[0.15] bg-white/[0.05] px-2.5 py-1 text-xs font-medium text-white/70">
      {flag} {label} ▾
    </span>
  );
}

interface BotBoxProps {
  children?: ReactNode;
}

export function BotBox({ children = '🤖' }: BotBoxProps) {
  return (
    <span className="flex items-center justify-center rounded-xs border border-accent-border bg-accent-soft-2 p-1 text-accent">
      {children}
    </span>
  );
}
