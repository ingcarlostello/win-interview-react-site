import type { ReactNode } from 'react';
import { cn } from '@/helpers/cn';
import { Glass } from '@/components/ui/Glass';

interface CreditStatCardProps {
  icon: ReactNode;
  label: string;
  value: string; // restante, ya formateado (p. ej. "2 h" o "8")
  totalText: string; // total del plan, ya formateado
  pct: number; // 0..100, porcentaje ya consumido
  remaining: number;
  total: number;
  exhaustedLabel: string;
  ofLabel: string; // "de" / "of"
}

// Tono según lo que queda: normal (accent), bajo ≤25% (amber), agotado (danger).
function creditTone(remaining: number, total: number): { bar: string; icon: string } {
  if (total <= 0) return { bar: 'bg-accent', icon: 'text-accent' };
  if (remaining <= 0) return { bar: 'bg-danger', icon: 'text-danger' };
  if (remaining / total <= 0.25) return { bar: 'bg-amber', icon: 'text-amber' };
  return { bar: 'bg-accent', icon: 'text-accent' };
}

export function CreditStatCard({
  icon,
  label,
  value,
  totalText,
  pct,
  remaining,
  total,
  exhaustedLabel,
  ofLabel,
}: CreditStatCardProps) {
  const tone = creditTone(remaining, total);
  const exhausted = total > 0 && remaining <= 0;

  return (
    <Glass className="rounded-2xl p-5 transition-all duration-300 ease-glass hover:-translate-y-1 hover:border-accent-border">
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xs border border-accent-border bg-accent-soft',
            tone.icon,
          )}
        >
          {icon}
        </span>
        {exhausted && (
          <span className="rounded-full bg-danger-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-danger">
            {exhaustedLabel}
          </span>
        )}
      </div>

      <p className="mt-3 truncate text-sm font-medium text-text-secondary">{label}</p>
      <p className="mt-1 text-3xl font-bold tabular-nums tracking-tight text-text-primary">{value}</p>
      <p className="mt-0.5 text-xs text-text-muted">
        {ofLabel} {totalText}
      </p>

      <div
        className="mt-3 h-2 w-full overflow-hidden rounded-full bg-bg-inset"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={Math.max(0, total - remaining)}
        aria-label={label}
      >
        <div
          className={cn('h-full rounded-full transition-[width] duration-500 ease-out', tone.bar)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </Glass>
  );
}
