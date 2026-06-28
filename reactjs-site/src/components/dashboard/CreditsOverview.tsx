import { useQuery } from 'convex/react';
import { ArrowUpRight, AudioLines, Camera, Sparkles } from 'lucide-react';
import { getQuotaRef } from '@/lib/convexApi';
import { getPlanLimits, UPGRADEABLE_PLANS } from '@/constants/quota.constants';
import { ROUTES } from '@/constants/routes.constants';
import { formatDuration } from '@/helpers/format-duration.helper';
import { firstOfNextMonth, MONTH_KEYS, parseYearMonth } from '@/helpers/date.helper';
import { useLanguage } from '@/hooks/useLanguage';
import { Glass } from '@/components/ui/Glass';
import { Button } from '@/components/ui/Button';
import { CreditStatCard } from './CreditStatCard';

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

interface Dim {
  remaining: number;
  total: number;
  used: number;
  pct: number;
}

// remaining acotado a [0, total]; si no hay dato aún, se asume cuota fresca (= total).
function computeDim(rawRemaining: number | undefined, total: number): Dim {
  const remaining = clamp(rawRemaining ?? total, 0, total);
  const used = Math.max(0, total - remaining);
  const pct = total > 0 ? Math.min(100, Math.round((used / total) * 100)) : 0;
  return { remaining, total, used, pct };
}

function CardSkeleton() {
  return (
    <Glass className="rounded-2xl p-5" aria-hidden>
      <div className="animate-pulse">
        <div className="h-10 w-10 rounded-xs bg-bg-elev-2" />
        <div className="mt-3 h-3.5 w-20 rounded bg-bg-elev-2" />
        <div className="mt-2 h-7 w-16 rounded bg-bg-elev-2" />
        <div className="mt-3 h-2 w-full rounded-full bg-bg-elev-2" />
      </div>
    </Glass>
  );
}

export function CreditsOverview({ planId }: { planId: string }) {
  const { t } = useLanguage();
  // `undefined` = cargando; `null` = sin fila este mes (cuota fresca); objeto = datos.
  const quota = useQuery(getQuotaRef, {});
  const limits = getPlanLimits(planId);
  const loading = quota === undefined;

  const ym = quota?.month ? parseYearMonth(quota.month) : null;
  const monthBadge = ym ? t(MONTH_KEYS[ym.monthIndex]) : '';

  const reset = quota?.month ? firstOfNextMonth(quota.month) : null;
  const resetStr = reset ? `${reset.day} ${t(MONTH_KEYS[reset.monthIndex])}` : '';

  const transcription = computeDim(quota?.transcriptionSecondsRemaining, limits.transcriptionSeconds);
  const captures = computeDim(quota?.capturesRemaining, limits.captures);
  const analyses = computeDim(quota?.analysesRemaining, limits.analyses);

  const exhaustedLabel = t('ic.quotaExhausted');
  const ofLabel = t('dash.credits.of');

  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-text-muted">{t('dash.credits.title')}</p>
          {resetStr && (
            <p className="mt-0.5 text-sm text-text-secondary">
              {t('dash.quota.resets')} {resetStr}
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {monthBadge && (
            <span className="rounded-full bg-bg-elev-2 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
              {monthBadge}
            </span>
          )}
          {UPGRADEABLE_PLANS.has(planId) && (
            <Button as="a" href={ROUTES.UPGRADE} variant="primary" className="text-sm">
              <ArrowUpRight size={15} />
              {t('ic.upgrade')}
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {loading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            <CreditStatCard
              icon={<AudioLines size={18} />}
              label={t('dash.quota.transcription')}
              value={formatDuration(transcription.remaining)}
              totalText={formatDuration(transcription.total)}
              pct={transcription.pct}
              remaining={transcription.remaining}
              total={transcription.total}
              exhaustedLabel={exhaustedLabel}
              ofLabel={ofLabel}
            />
            <CreditStatCard
              icon={<Camera size={18} />}
              label={t('dash.quota.captures')}
              value={String(captures.remaining)}
              totalText={String(captures.total)}
              pct={captures.pct}
              remaining={captures.remaining}
              total={captures.total}
              exhaustedLabel={exhaustedLabel}
              ofLabel={ofLabel}
            />
            <CreditStatCard
              icon={<Sparkles size={18} />}
              label={t('dash.quota.analyses')}
              value={String(analyses.remaining)}
              totalText={String(analyses.total)}
              pct={analyses.pct}
              remaining={analyses.remaining}
              total={analyses.total}
              exhaustedLabel={exhaustedLabel}
              ofLabel={ofLabel}
            />
          </>
        )}
      </div>
    </section>
  );
}
