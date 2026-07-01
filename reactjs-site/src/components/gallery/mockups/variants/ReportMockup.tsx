import { useLanguage } from '@/hooks/useLanguage';
import { IcMain } from '../shared/IcMain';
import { Winbar } from '../shared/Winbar';
import { NavTabs } from '../shared/NavTabs';

export function ReportMockup() {
  const { t } = useLanguage();
  const score = 84;

  return (
    <IcMain>
      <Winbar plan="Pro" />
      <NavTabs active="reports" />

      <div className="flex items-center justify-between px-5 pb-3">
        <span className="text-[13px] font-semibold text-white/80">{t('ic.sessionReport')}</span>
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[12px] text-white/50">
          System Design
        </span>
      </div>

      {/* Overall score */}
      <div className="mx-5 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5">
        <div className="flex items-baseline justify-between">
          <span className="text-[13px] uppercase tracking-[0.08em] text-white/40">
            {t('ic.overallScore')}
          </span>
          <span className="font-mono text-3xl font-bold text-accent">
            {score}
            <span className="text-lg text-white/35"> / 100</span>
          </span>
        </div>
        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-accent shadow-[0_0_10px_var(--color-accent-glow)]"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Strengths / improve */}
      <div className="mx-5 mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-accent-border bg-accent-soft-2 px-4 py-4">
          <span className="text-[12px] uppercase tracking-[0.08em] text-accent">
            {t('ic.strengths')}
          </span>
          <p className="mt-1.5 text-[14px] text-white/80">{t('ic.strengthsText')}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
          <span className="text-[12px] uppercase tracking-[0.08em] text-amber">
            {t('ic.toImprove')}
          </span>
          <p className="mt-1.5 text-[14px] text-white/80">{t('ic.toImproveText')}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-5 mt-4 grid grid-cols-3 gap-4">
        {[
          { label: t('ic.questionsLabel'), value: '8' },
          { label: t('ic.timeLabel'), value: '41m' },
          { label: t('ic.streakLabel'), value: '5' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-center"
          >
            <div className="font-mono text-xl font-semibold text-white/85">{s.value}</div>
            <div className="mt-0.5 text-[12px] text-white/45">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recommended */}
      <div className="mx-5 mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5">
        <span className="text-[12px] uppercase tracking-[0.08em] text-white/40">
          {t('ic.recommended')}
        </span>
        <div className="mt-2 flex flex-col gap-1.5 text-[13px] text-white/70">
          <span>· {t('ic.rec.bigo')}</span>
          <span>· {t('ic.rec.dsa')}</span>
        </div>
      </div>
    </IcMain>
  );
}
