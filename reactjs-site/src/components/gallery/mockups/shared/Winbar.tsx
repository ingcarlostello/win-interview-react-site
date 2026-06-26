import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/helpers/cn';

interface WinbarProps {
  plan: string;
  themeVariant?: 'dark' | 'glass';
  pinned?: boolean;
}

export function Winbar({ plan, themeVariant = 'dark', pinned = true }: WinbarProps) {
  const { t } = useLanguage();
  const isGlass = themeVariant === 'glass';

  return (
    <div
      className={cn(
        'flex h-[50px] flex-shrink-0 items-center justify-between px-3 mb-5 border-b border-white/10',
        isGlass ? 'bg-white/[0.06] border-white/[0.22]' : 'bg-white/[0.05]',
      )}
    >
      <div className="flex items-center gap-1.5">
        <span className="flex h-4 w-4 items-center justify-center rounded-full text-white/40">✕</span>
        <span className="flex h-4 w-4 items-center justify-center rounded-full text-white/40">−</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[11px] font-medium text-white select-none">wininterview</span>
        <span
          className={cn(
            'flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-medium text-white/60',
            isGlass && 'bg-white/[0.18] border-white/[0.28] text-white',
          )}
        >
          {isGlass ? '◑' : '◐'} <span>{isGlass ? t('ic.glass') : t('ic.dark')}</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        {pinned && <span className="text-accent">📌</span>}
        <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-medium">
          👑 {plan}
        </span>
      </div>
    </div>
  );
}
