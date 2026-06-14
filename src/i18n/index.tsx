import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import en from "./en.json";
import zh from "./zh.json";

// Minimal bilingual (en/zh) i18n scaffold for the landing page.
// A fleet worker fills the message catalogs (en.json / zh.json) as the design
// lands; this only provides the LocaleProvider + useT() seam they build on.

export type Locale = "en" | "zh";

// Both catalogs share the same key set — derive the message-key type from `en`
// so a missing/typo'd key is a compile error.
type Messages = typeof en;
export type MessageKey = keyof Messages;

const catalogs: Record<Locale, Messages> = { en, zh };

export const LOCALES: Locale[] = ["en", "zh"];

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale = "zh",
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const t = useCallback((key: MessageKey) => catalogs[locale][key], [locale]);

  const value = useMemo<LocaleContextValue>(() => ({ locale, setLocale, t }), [locale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a <LocaleProvider>");
  return ctx;
}

/** Convenience hook for the translate function alone: `const t = useT()`. */
export function useT(): (key: MessageKey) => string {
  return useLocale().t;
}
