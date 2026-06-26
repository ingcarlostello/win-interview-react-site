import { useLanguage } from '@/hooks/useLanguage';

export function ScreenPanel() {
  const { t } = useLanguage();

  return (
    <div className="hidden flex-col h-full border-l border-white/10 bg-bg-elev-1 [[data-variant=screen-analysis]_&]:flex">
      <div className="flex items-center justify-between px-3 py-4 flex-shrink-0">
        <div className="flex items-center gap-2 text-white font-semibold text-xs">
          🖥 <span>{t('ic.screenPanel')}</span>
        </div>
        <span className="text-[10px] text-white/50 font-medium">{t('ic.clear')}</span>
      </div>
      <div className="border-b border-white/10" />

      <div className="flex gap-2 px-3 py-2 overflow-hidden flex-shrink-0">
        <div className="h-[120px] w-[120px] flex-shrink-0 rounded-xs overflow-hidden border border-white/15 bg-black/20">
          <div className="flex h-full w-full items-center justify-center text-[24px]">📷</div>
        </div>
        <div className="h-[120px] w-[120px] flex-shrink-0 rounded-xs overflow-hidden border border-white/15 bg-black/20">
          <div className="flex h-full w-full items-center justify-center text-[24px]">📷</div>
        </div>
        <div className="h-[120px] w-[120px] flex-shrink-0 rounded-xs bg-white/[0.05] border border-white/10" />
        <div className="h-[120px] w-[120px] flex-shrink-0 rounded-xs bg-white/[0.05] border border-white/10" />
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-3 py-3 min-h-0">
        <div>
          <div className="mb-2 flex items-center gap-1.5">
            ✨ <span className="text-[10px] font-medium uppercase tracking-[0.05em] text-white/60">{t('ic.promptForLLM')}</span>
          </div>
          <div className="rounded-xs border border-white/10 overflow-hidden">
            <div className="min-h-20 bg-black/20 px-3 py-2 text-xs text-white/80 leading-relaxed">
              {t('ic.screenPromptText')}
            </div>
            <div className="flex items-center justify-between border-t border-white/10 px-3 py-2">
              <span className="text-[10px] text-white/40">6 {t('ic.analysesRemaining')}</span>
              <span className="flex items-center gap-2 rounded-xs bg-[rgb(163_230_53/0.2)] border border-accent-border px-4 py-1.5 text-accent text-xs font-medium">
                ✨ <span>{t('ic.analyze')}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col min-h-0">
          <div className="mb-2 flex items-center gap-1.5">
            ✨ <span className="text-[10px] font-medium uppercase tracking-[0.05em] text-white/60">{t('ic.solution')}</span>
          </div>
          <div className="flex-1 rounded-xs border border-white/10 overflow-y-auto overflow-hidden px-3 py-3 min-h-0">
            <div
              className="text-xs text-white/85 [&_p]:mb-2 [&_strong]:font-bold [&_code]:font-mono [&_code]:bg-[rgb(163_230_53/0.1)] [&_code]:px-1 [&_code]:rounded [&_code]:text-accent-hover"
              dangerouslySetInnerHTML={{ __html: t('ic.mock.rlSolution') }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
