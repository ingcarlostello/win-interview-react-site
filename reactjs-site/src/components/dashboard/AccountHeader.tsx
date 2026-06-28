import { planLabel } from '@/helpers/plan.helper';
import { useLanguage } from '@/hooks/useLanguage';

interface AccountHeaderProps {
  email: string;
  planId: string;
}

export function AccountHeader({ email, planId }: AccountHeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold text-text-primary">{t('dash.greeting')}</h1>
        {email && <p className="truncate text-sm text-text-muted">{email}</p>}
      </div>
      <span className="shrink-0 rounded-full bg-accent-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
        Plan {planLabel(planId)}
      </span>
    </header>
  );
}
