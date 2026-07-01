import { useLanguage } from '@/hooks/useLanguage';
import { Glass } from '@/components/ui/Glass';

interface Skill {
  key: string;
  score: number;
}

const SKILLS: readonly Skill[] = [
  { key: 'hero.rd.skill.system', score: 82 },
  { key: 'hero.rd.skill.algorithms', score: 71 },
  { key: 'hero.rd.skill.behavioral', score: 90 },
  { key: 'hero.rd.skill.coding', score: 64 },
];

const TREND = [30, 45, 40, 62, 78, 70, 88];

export function HeroMockup() {
  const { t } = useLanguage();
  const readiness = 78;

  return (
    <div className="relative">
      <Glass className="scan-line overflow-hidden rounded-default p-0">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ef4444]" />
          <span className="h-3 w-3 rounded-full bg-[#fbbf24]" />
          <span className="h-3 w-3 rounded-full bg-[#22c55e]" />
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-5 p-5">
          {/* Readiness dial */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div
              className="relative flex h-24 w-24 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(var(--color-accent) ${readiness * 3.6}deg, var(--color-bg-inset) 0deg)`,
              }}
            >
              <div className="flex h-[76px] w-[76px] flex-col items-center justify-center rounded-full bg-bg-base">
                <span className="font-mono text-xl font-bold text-accent">{readiness}%</span>
                <span className="text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-text-muted">
                  {t('hero.rd.title')}
                </span>
              </div>
            </div>
            <span className="max-w-[8rem] text-center text-[0.7rem] leading-tight text-text-secondary">
              {t('hero.rd.ready')}
            </span>
          </div>

          {/* Skills */}
          <div className="flex flex-col justify-center gap-2.5">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-text-muted">
              {t('hero.rd.skills')}
            </span>
            {SKILLS.map((s) => (
              <div key={s.key} className="flex items-center gap-2.5">
                <span className="w-[5.5rem] flex-shrink-0 text-[0.68rem] text-text-secondary">
                  {t(s.key)}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bg-inset">
                  <div
                    className="h-full rounded-full bg-accent shadow-[0_0_8px_var(--color-accent-glow)]"
                    style={{ width: `${s.score}%` }}
                  />
                </div>
                <span className="w-6 flex-shrink-0 text-right font-mono text-[0.65rem] text-text-muted">
                  {s.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Practice trend */}
        <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-3.5">
          <span className="text-[0.68rem] text-text-secondary">{t('hero.rd.trend')}</span>
          <div className="flex flex-1 items-end justify-center gap-1">
            {TREND.map((h, i) => (
              <span
                key={i}
                className="w-2 rounded-sm bg-accent-soft-2"
                style={{ height: `${Math.max(6, (h / 100) * 22)}px` }}
              />
            ))}
          </div>
          <span className="font-mono text-[0.68rem] font-semibold text-accent">
            {t('hero.rd.trendDelta')}
          </span>
        </div>
      </Glass>
    </div>
  );
}
