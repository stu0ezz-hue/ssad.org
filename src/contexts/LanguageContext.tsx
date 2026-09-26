import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  translations,
  LANG_INFO,
  LANGS,
  DEFAULT_LANG,
  type Lang,
  type Dict,
} from "../data/i18n";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
  dir: "rtl" | "ltr";
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "shababna-sanad-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return DEFAULT_LANG;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      return stored && LANGS.includes(stored) ? stored : DEFAULT_LANG;
    } catch {
      return DEFAULT_LANG;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Language switching still works when browser storage is unavailable.
    }
    const root = document.documentElement;
    const info = LANG_INFO[lang];
    root.setAttribute("lang", info.htmlLang);
    root.setAttribute("dir", info.dir);
    // Switch font family per language (Arabic vs Latin script)
    root.dataset.font = info.font;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: setLangState,
      t: translations[lang],
      dir: LANG_INFO[lang].dir,
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
