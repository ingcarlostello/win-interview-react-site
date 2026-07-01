import { useLanguage } from '@/hooks/useLanguage';
import { IcMain } from '../shared/IcMain';
import { Winbar } from '../shared/Winbar';
import { NavTabs } from '../shared/NavTabs';

const SKILLS = [
  { key: 'ic.skill.system', score: 82 },
  { key: 'ic.skill.algorithms', score: 71 },
  { key: 'ic.skill.behavioral', score: 90 },
  { key: 'ic.skill.coding', score: 64 },
  { key: 'ic.skill.databases', score: 58 },
];

const TREND = [30, 48, 42, 66, 55, 80, 72, 92];

export function DashboardMockup() {
  const { t } = useLanguage();
  const readiness = 78;

  return (
    <IcMain>
      <Winbar plan="Pro" />
      <NavTabs active="dashboard" />

      <div className="grid grid-cols-[240px_1fr] gap-4 px-5">
        {/* Readiness dial */}
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] py-6">
          <div
            className="relative flex h-40 w-40 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(var(--color-accent) ${readiness * 3.6}deg, rgb(255 255 255 / 0.08) 0deg)`,
            }}
          >
            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-[#0e0f13]">
              <span className="font-mono text-4xl font-bold text-accent">{readiness}%</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                {t('ic.readiness')}
              </span>
            </div>
          </div>
          <span className="max-w-[11rem] text-center text-[13px] leading-tight text-white/60">
            {t('ic.readinessReady')}
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-col justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5">
          <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/40">
            {t('ic.skillsTitle')}
          </span>
          {SKILLS.map((s) => (
            <div key={s.key} className="flex items-center gap-3">
              <span className="w-28 flex-shrink-0 text-[13px] text-white/70">{t(s.key)}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-accent shadow-[0_0_10px_var(--color-accent-glow)]"
                  style={{ width: `${s.score}%` }}
                />
              </div>
              <span className="w-7 flex-shrink-0 text-right font-mono text-[12px] text-white/50">
                {s.score}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Trend */}
      <div className="mx-5 mt-4 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
        <div className="flex flex-col">
          <span className="text-[13px] text-white/60">{t('ic.trend')}</span>
          <span className="mt-0.5 text-[12px] text-white/35">14 {t('ic.sessions')} · 5 {t('ic.streak')}</span>
        </div>
        <div className="flex flex-1 items-end justify-center gap-1.5">
          {TREND.map((h, i) => (
            <span
              key={i}
              className="w-3.5 rounded-sm bg-accent-soft-2"
              style={{ height: `${Math.max(8, (h / 100) * 44)}px` }}
            />
          ))}
        </div>
        <span className="font-mono text-[14px] font-semibold text-accent">+12%</span>
      </div>
    </IcMain>
  );
}
