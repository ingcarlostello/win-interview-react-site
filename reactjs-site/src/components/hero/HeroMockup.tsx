import { useLanguage } from '@/hooks/useLanguage';
import { Glass } from '@/components/ui/Glass';

export function HeroMockup() {
  const { t } = useLanguage();

  return (
    <div className="relative">
      <Glass className="scan-line overflow-hidden rounded-default p-0">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ef4444]" />
          <span className="h-3 w-3 rounded-full bg-[#fbbf24]" />
          <span className="h-3 w-3 rounded-full bg-[#22c55e]" />
        </div>
        <div className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)] animate-dot-pulse" />
            <span className="font-mono text-[0.7rem] font-semibold tracking-[0.1em] text-accent">
              {t('hero.tag_listening')}
            </span>
          </div>
          <div className="mb-3.5 rounded-xs border border-border bg-bg-inset px-3.5 py-3 text-[0.8rem] text-text-secondary">
            <div className="mb-1.5 font-mono text-[0.65rem] tracking-[0.1em] text-text-muted">
              {t('hero.tag_interviewer')}
            </div>
            <span>{t('hero.mock_question')}</span>
          </div>
          <div className="rounded-xs border border-accent-border bg-accent-soft-2 px-3.5 py-3.5 font-mono text-[0.78rem] leading-relaxed text-text-primary">
            <div className="mb-2 font-mono text-[0.65rem] font-semibold tracking-[0.1em] text-accent">
              {t('hero.tag_copilot')}
            </div>
            <span>{t('hero.mock_response')}</span>
            <span className="ml-0.5 inline-block w-2 bg-accent animate-blink">▎</span>
          </div>
        </div>
      </Glass>
    </div>
  );
}
