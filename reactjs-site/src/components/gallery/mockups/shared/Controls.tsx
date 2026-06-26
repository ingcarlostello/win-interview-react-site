import type { ReactNode } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/helpers/cn';

type ControlVariant = 'listen' | 'pause' | 'end' | 'locked';

interface ControlButtonProps {
  variant: ControlVariant;
  labelKey: string;
  icon: string;
}

const controlClasses: Record<ControlVariant, string> = {
  listen: 'bg-accent-soft border-accent-border text-accent',
  pause: 'border-[rgb(251_191_36/0.3)] bg-[rgb(251_191_36/0.2)] text-amber',
  end: 'rounded-xs border-[rgb(239_68_68/0.3)] bg-[rgb(239_68_68/0.2)] text-[#f87171]',
  locked: 'border-[rgb(239_68_68/0.3)] bg-[rgb(239_68_68/0.15)] text-[#f87171] cursor-not-allowed',
};

export function ControlButton({ variant, labelKey, icon }: ControlButtonProps) {
  const { t } = useLanguage();
  return (
    <span
      className={cn(
        'flex items-center gap-1.5 rounded-xs px-3 py-1.5 text-xs font-bold border',
        controlClasses[variant],
        variant === 'end' && 'rounded-xs',
      )}
    >
      {icon} <span>{t(labelKey)}</span>
    </span>
  );
}

type ProtectionState = 'on' | 'off' | 'locked';

interface ProtectionProps {
  state: ProtectionState;
}

export function Protection({ state }: ProtectionProps) {
  return (
    <span
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded-full',
        state === 'on' && 'bg-accent-soft text-accent',
        state === 'off' && 'bg-[rgb(239_68_68/0.2)] text-[#f87171]',
        state === 'locked' && 'bg-[rgb(239_68_68/0.2)] text-[#f87171] opacity-40',
      )}
    >
      {state === 'locked' ? '🔒' : '👁'}
    </span>
  );
}

interface ControlsProps {
  children: ReactNode;
  protection: ProtectionProps['state'];
}

export function Controls({ children, protection }: ControlsProps) {
  return (
    <div className="flex items-center justify-between px-3 pb-2">
      <div className="mt-1 mb-1 flex items-center gap-2">{children}</div>
      <Protection state={protection} />
    </div>
  );
}
