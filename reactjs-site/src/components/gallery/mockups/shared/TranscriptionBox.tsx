import type { ReactNode } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/helpers/cn';

interface PlaceholderProps {
  icon: string;
  titleKey: string;
  descKey?: string;
  subKey?: string;
}

export function Placeholder({ icon, titleKey, descKey, subKey }: PlaceholderProps) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 py-3 text-center">
      <div className="flex h-9 w-9 items-center justify-center rounded-xs bg-[rgb(163_230_53/0.1)] text-[rgb(163_230_53/0.6)]">
        {icon}
      </div>
      <div className="text-[13px] font-medium text-white/25">{t(titleKey)}</div>
      {descKey && (
        <div className="max-w-[260px] text-[10px] leading-[1.5] text-white/15">{t(descKey)}</div>
      )}
      {subKey && (
        <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-white/15">
          {t(subKey)}
        </div>
      )}
    </div>
  );
}

interface TranscriptionBoxProps {
  children?: ReactNode;
  questionKey?: string;
  placeholder?: ReactNode;
}

export function TranscriptionBox({ children, questionKey, placeholder }: TranscriptionBoxProps) {
  const { t } = useLanguage();
  return (
    <div className="min-h-12 rounded-xs border border-dashed border-white/10 bg-black/30 px-3 py-2">
      {placeholder ?? (questionKey && <p className="text-sm leading-relaxed text-white/90 m-0">{t(questionKey)}</p>)}
      {children}
    </div>
  );
}

interface ThinkingDotsProps {
  labelKey: string;
}

export function ThinkingDots({ labelKey }: ThinkingDotsProps) {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-2 text-[rgb(163_230_53/0.6)] text-xs">
      <div className="flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[rgb(163_230_53/0.6)] animate-dot-pulse" />
        <span className="h-1.5 w-1.5 rounded-full bg-[rgb(163_230_53/0.6)] animate-dot-pulse [animation-delay:200ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[rgb(163_230_53/0.6)] animate-dot-pulse [animation-delay:400ms]" />
      </div>
      <span>{t(labelKey)}</span>
    </div>
  );
}

interface ResponseBoxProps {
  children: ReactNode;
  className?: string;
}

export function ResponseBox({ children, className }: ResponseBoxProps) {
  return (
    <div
      className={cn(
        'min-h-20 flex-1 overflow-y-auto rounded-xs border border-accent-border bg-black/30 px-3 py-2',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface MarkdownProps {
  htmlKey: string;
  className?: string;
}

export function Markdown({ htmlKey, className }: MarkdownProps) {
  const { t } = useLanguage();
  return (
    <div
      className={cn(
        'text-sm leading-[1.7] text-accent text-justify [&_p]:mb-2 [&_strong]:text-accent-hover [&_strong]:font-bold [&_ul]:my-1 [&_ul]:ml-5 [&_ul]:list-disc [&_li]:mb-0.5 [&_code]:font-mono [&_code]:bg-[rgb(163_230_53/0.1)] [&_code]:px-1 [&_code]:py-px [&_code]:rounded [&_code]:text-[12px] [&_code]:text-accent-hover',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: t(htmlKey) }}
    />
  );
}
