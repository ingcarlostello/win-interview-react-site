import { useLanguage } from '@/hooks/useLanguage';
import { IcMain } from '../shared/IcMain';
import { Winbar } from '../shared/Winbar';
import { NavTabs } from '../shared/NavTabs';

function Stars({ filled }: { filled: number }) {
  return (
    <span className="tracking-[0.15em] text-accent">
      {'★'.repeat(filled)}
      <span className="text-white/20">{'★'.repeat(5 - filled)}</span>
    </span>
  );
}

export function PracticeMockup() {
  const { t } = useLanguage();

  return (
    <IcMain>
      <Winbar plan="Pro" />
      <NavTabs active="practice" />

      <div className="flex items-center justify-between px-5 pb-3">
        <span className="text-[13px] font-semibold text-white/80">
          {t('ic.practiceSession')} · {t('ic.skill.system')}
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[12px] text-white/50">
          {t('ic.question')} 3 {t('ic.of')} 8
        </span>
      </div>

      <div className="grid grid-cols-[1fr_220px] gap-4 px-5">
        {/* Question + actions */}
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5">
          <p className="text-[17px] font-medium leading-snug text-white/90">
            {t('ic.practiceQuestion')}
          </p>
          <div className="mt-auto flex gap-3">
            <span className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-semibold text-black shadow-[0_0_16px_var(--color-accent-glow)]">
              ● {t('ic.recordAnswer')}
            </span>
            <span className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-[13px] font-medium text-white/70">
              💡 {t('ic.viewHint')}
            </span>
          </div>
        </div>

        {/* Progress panel */}
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5">
          <div>
            <span className="text-[12px] uppercase tracking-[0.08em] text-white/40">
              {t('ic.progress')}
            </span>
            <div className="mt-2 flex gap-1.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < 3
                      ? 'h-2.5 w-2.5 rounded-full bg-accent'
                      : 'h-2.5 w-2.5 rounded-full bg-white/15'
                  }
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-white/50">{t('ic.time')}</span>
            <span className="font-mono text-white/80">12:40</span>
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-white/50">{t('ic.clarity')}</span>
            <Stars filled={4} />
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-white/50">{t('ic.structure')}</span>
            <Stars filled={3} />
          </div>
        </div>
      </div>

      <div className="mx-5 mt-4 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 text-center text-[12px] text-white/40">
        🗂️ {t('ic.bankNote')}
      </div>
    </IcMain>
  );
}
