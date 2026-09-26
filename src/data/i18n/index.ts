// ============================================================
// i18n index — يجمع قواميس اللغات الثلاث ويفرض تطابق بنيتها
// ============================================================
import { ar } from "./ar";
import { en } from "./en";
import { tr } from "./tr";

export type Lang = "ar" | "en" | "tr";

/** Default language — the site's baseline experience. */
export const DEFAULT_LANG: Lang = "ar";

/** Supported languages, in display order for the switcher. */
export const LANGS: Lang[] = ["ar", "en", "tr"];

export const LANG_INFO: Record<
  Lang,
  { label: string; short: string; dir: "rtl" | "ltr"; font: "arabic" | "latin"; htmlLang: string }
> = {
  ar: { label: "العربية", short: "AR", dir: "rtl", font: "arabic", htmlLang: "ar" },
  en: { label: "English", short: "EN", dir: "ltr", font: "latin", htmlLang: "en" },
  tr: { label: "Türkçe", short: "TR", dir: "ltr", font: "latin", htmlLang: "tr" },
};

/** The dictionary shape — derived from the Arabic source file. */
export type Dict = typeof ar;

/** Arabic, English and Turkish dictionaries, guaranteed to share the same shape. */
export const translations: Record<Lang, Dict> = { ar, en, tr };

/** Resolve the current dictionary for a language. */
export function getDict(lang: Lang): Dict {
  return translations[lang];
}