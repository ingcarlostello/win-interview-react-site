import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/helpers/cn';

type Tab = 'dashboard' | 'practice' | 'reports' | 'bank';

const TABS: readonly { id: Tab; icon: string; labelKey: string }[] = [
  { id: 'dashboard', icon: '📊', labelKey: 'ic.nav.dashboard' },
  { id: 'practice', icon: '🎯', labelKey: 'ic.nav.practice' },
  { id: 'reports', icon: '📈', labelKey: 'ic.nav.reports' },
  { id: 'bank', icon: '🗂️', labelKey: 'ic.nav.bank' },
];

export function NavTabs({ active }: { active: Tab }) {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-1.5 px-5 pb-4">
      {TABS.map((tab) => (
        <span
          key={tab.id}
          className={cn(
            'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium',
            tab.id === active
              ? 'border-accent-border bg-accent-soft-2 text-accent'
              : 'border-white/10 bg-white/[0.04] text-white/45',
          )}
        >
          <span>{tab.icon}</span>
          <span>{t(tab.labelKey)}</span>
        </span>
      ))}
    </div>
  );
}
