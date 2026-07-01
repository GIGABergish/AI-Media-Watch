import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { RiskLevel } from './types';

export type Lang = 'en' | 'ru';

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  toggle: () => {},
});

const STORAGE_KEY = 'amw_lang';

/** App-wide language provider. Defaults to English, persists the choice. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ru' || saved === 'en') return saved;
    } catch {
      /* ignore */
    }
    return 'en'; // English is the default
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  const toggle = () => setLang(lang === 'en' ? 'ru' : 'en');

  useEffect(() => {
    try {
      document.documentElement.lang = lang;
    } catch {
      /* ignore */
    }
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

/** Read the current language + setters. */
export function useLang(): LangContextValue {
  return useContext(LangContext);
}

/** Inline bilingual pick: pick(lang, english, russian). */
export function pick<T>(lang: Lang, en: T, ru: T): T {
  return lang === 'en' ? en : ru;
}

const i = (lang: Lang) => (lang === 'en' ? 0 : 1);

/** Shared enum labels (bilingual) — replace the RU-only helpers in lib/utils. */
export function riskLabel(level: RiskLevel, lang: Lang): string {
  const m: Record<RiskLevel, [string, string]> = {
    critical: ['Critical', 'Критический'],
    high: ['High', 'Высокий'],
    medium: ['Medium', 'Средний'],
    low: ['Low', 'Низкий'],
  };
  return m[level][i(lang)];
}

export function statusLabel(status: string, lang: Lang): string {
  const m: Record<string, [string, string]> = {
    new: ['New', 'Новый'],
    reviewing: ['Reviewing', 'На проверке'],
    confirmed: ['Confirmed', 'Подтверждено'],
    false_positive: ['False positive', 'Ложное срабатывание'],
    archived: ['Archived', 'Архив'],
  };
  return m[status] ? m[status][i(lang)] : status;
}

export function sourceLabel(source: string, lang: Lang): string {
  const m: Record<string, [string, string]> = {
    OCR: ['OCR', 'OCR'],
    Audio: ['Audio', 'Аудио'],
    Visual: ['Visual', 'Видео'],
    Metadata: ['Metadata', 'Метаданные'],
    Behavior: ['Behavior', 'Поведение'],
  };
  return m[source] ? m[source][i(lang)] : source;
}

/** Locale string for date/time formatting. */
export function locale(lang: Lang): string {
  return lang === 'en' ? 'en-US' : 'ru-RU';
}
