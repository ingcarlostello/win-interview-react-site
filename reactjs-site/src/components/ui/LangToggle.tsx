import { useLanguage } from '@/hooks/useLanguage';
import type { Language } from '@/types/theme.type';
import { cn } from '@/helpers/cn';

const LANGS: Language[] = ['es', 'en'];

export function LangToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center border border-border rounded-xs overflow-hidden bg-bg-elev-1">
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={cn(
            'px-3 py-1.5 text-[0.8rem] font-semibold uppercase transition-all duration-200 ease-out',
            lang === l ? 'bg-accent text-[#0a0a0a]' : 'text-text-muted hover:text-text-primary',
          )}
          aria-pressed={lang === l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
