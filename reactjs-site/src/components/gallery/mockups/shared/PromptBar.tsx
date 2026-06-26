import { useLanguage } from '@/hooks/useLanguage';

export function PromptBar() {
  const { t } = useLanguage();
  return (
    <div className="mx-3 mb-6 mt-2">
      <div className="mt-4 flex w-full items-center justify-between rounded-xs border border-white/10 bg-white/[0.05] px-3 py-2">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.05em] text-white/60">
          ⚙ <span>{t('ic.customPrompt')}</span>
        </div>
        <span>▾</span>
      </div>
    </div>
  );
}

export function Divider() {
  return <div className="border-b border-white/10" />;
}

export function DividerMx() {
  return <div className="mx-3 border-b border-white/10" />;
}
