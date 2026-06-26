import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/helpers/cn';

interface QuotaMessageProps {
  icon?: string;
}

export function QuotaMessage({ icon = '⚠️' }: QuotaMessageProps) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center gap-2.5 p-5 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(239_68_68/0.15)] text-[#f87171]">
        {icon}
      </div>
      <h4 className="text-sm font-semibold text-white/90">{t('ic.quotaTitle')}</h4>
      <p className="text-xs leading-[1.5] text-white/50">{t('ic.quotaText')}</p>
      <span className="mt-1 rounded-xs bg-accent px-5 py-2 text-xs font-bold text-[#0a0a0a] shadow-[0_0_16px_var(--color-accent-glow)]">
        {t('ic.upgrade')}
      </span>
    </div>
  );
}

interface QuestionCounterProps {
  count: number;
}

export function QuestionCounter({ count }: QuestionCounterProps) {
  const { t } = useLanguage();
  return (
    <div className={cn('px-3 py-1.5 text-[11px] text-[rgb(163_230_53/0.5)]')}>
      • {count} {t('ic.questionsAnswered')}
    </div>
  );
}
