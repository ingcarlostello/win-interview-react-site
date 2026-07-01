import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/helpers/cn';
import { IcMain } from '../shared/IcMain';
import { Winbar } from '../shared/Winbar';
import { NavTabs } from '../shared/NavTabs';

type Diff = 'easy' | 'medium' | 'hard';

const QUESTIONS: readonly { key: string; topic: string; diff: Diff }[] = [
  { key: 'ic.bankQ0', topic: 'Databases', diff: 'medium' },
  { key: 'ic.bankQ1', topic: 'System Design', diff: 'hard' },
  { key: 'ic.bankQ2', topic: 'Concurrency', diff: 'hard' },
  { key: 'ic.bankQ3', topic: 'System Design', diff: 'medium' },
  { key: 'ic.bankQ4', topic: 'Behavioral', diff: 'easy' },
];

const diffStyles: Record<Diff, string> = {
  easy: 'bg-[rgb(34_197_94/0.18)] text-[#4ade80]',
  medium: 'bg-[rgb(163_230_53/0.2)] text-accent',
  hard: 'bg-[rgb(251_191_36/0.2)] text-amber',
};

const diffKey: Record<Diff, string> = {
  easy: 'ic.diff.easy',
  medium: 'ic.diff.medium',
  hard: 'ic.diff.hard',
};

export function QuestionBankMockup() {
  const { t } = useLanguage();

  return (
    <IcMain>
      <Winbar plan="Pro" />
      <NavTabs active="bank" />

      {/* Filters */}
      <div className="flex items-center gap-2.5 px-5 pb-4">
        <span className="flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-soft-2 px-3 py-1.5 text-[12px] font-medium text-accent">
          {t('ic.filterRole')}: {t('ic.role.backend')}
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] font-medium text-white/50">
          {t('ic.filterDifficulty')}: {t('ic.diff.medium')}
        </span>
        <span className="ml-auto text-[12px] text-white/35">🗂️ {t('ic.bankNote')}</span>
      </div>

      {/* Question list */}
      <div className="flex flex-col gap-2.5 px-5">
        {QUESTIONS.map((q) => (
          <div
            key={q.key}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5"
          >
            <span className="flex-1 text-[14px] leading-snug text-white/80">{t(q.key)}</span>
            <span className="flex-shrink-0 rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px] text-white/45">
              {q.topic}
            </span>
            <span
              className={cn(
                'flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.04em]',
                diffStyles[q.diff],
              )}
            >
              {t(diffKey[q.diff])}
            </span>
          </div>
        ))}
      </div>
    </IcMain>
  );
}
