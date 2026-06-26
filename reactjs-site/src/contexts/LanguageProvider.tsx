import { useCallback, useMemo, useState, type ReactNode } from 'react';
import type { Language } from '@/types/theme.type';
import { translations } from '@/i18n';
import { LanguageContext, type LanguageContextValue } from './language.context';

const STORAGE_KEY = 'ic-lang';

function readStoredLang(): Language {
  if (typeof window === 'undefined') return 'es';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'en' ? 'en' : 'es';
}

function applyLang(lang: Language): void {
  document.documentElement.lang = lang;
  document.documentElement.setAttribute('data-lang', lang);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const initial = readStoredLang();
    applyLang(initial);
    return initial;
  });

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    applyLang(next);
  }, []);

  const t = useCallback(
    (key: string): string => translations[lang][key] ?? key,
    [lang],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t }),
    [lang, setLang, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
