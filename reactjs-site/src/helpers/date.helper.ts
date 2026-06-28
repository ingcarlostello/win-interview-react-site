// Claves i18n de los meses (índice 0 = enero). Se resuelven con t() en el componente.
export const MONTH_KEYS = [
  'mon.jan',
  'mon.feb',
  'mon.mar',
  'mon.apr',
  'mon.may',
  'mon.jun',
  'mon.jul',
  'mon.aug',
  'mon.sep',
  'mon.oct',
  'mon.nov',
  'mon.dec',
] as const;

export interface DateParts {
  day: number;
  monthIndex: number; // 0-based
  year: number;
}

// "2026-06" -> { year: 2026, monthIndex: 5 }. null si el formato no es válido.
export function parseYearMonth(month: string): { year: number; monthIndex: number } | null {
  const match = /^(\d{4})-(\d{2})$/.exec(month);
  if (!match) return null;
  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  if (monthIndex < 0 || monthIndex > 11) return null;
  return { year, monthIndex };
}

// Primer día del mes siguiente a "YYYY-MM" (cuándo se reinicia la cuota mensual).
export function firstOfNextMonth(month: string): DateParts | null {
  const ym = parseYearMonth(month);
  if (!ym) return null;
  const monthIndex = (ym.monthIndex + 1) % 12;
  const year = ym.monthIndex === 11 ? ym.year + 1 : ym.year;
  return { day: 1, monthIndex, year };
}

// Partes (UTC) de una fecha ISO 8601. null si no es parseable.
export function isoDateParts(iso: string): DateParts | null {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return { day: date.getUTCDate(), monthIndex: date.getUTCMonth(), year: date.getUTCFullYear() };
}
