import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import en from "./en.json";
import zh from "./zh.json";

// Bilingual (en/zh) i18n seam for the landing page. All user-visible copy lives
// in en.json / zh.json (the message catalogs); components read it through
// useMessages(). The explicit `Messages` interface below is the single shape both
// catalogs are checked against — a missing/typo'd/extra key is a compile error,
// which keeps the two languages structurally in lock-step.

export type Locale = "en" | "zh";
export const LOCALES: Locale[] = ["en", "zh"];

/** A navigation/anchor link whose visible label is translated. */
export interface NavLink {
  label: string;
  href: string;
}

export interface DemoItem {
  /** Which abstract artifact to draw (form | dash | flow | survey). */
  key: string;
  q: string;
  steps: string[];
  line: string;
  ph: string;
}

export interface WorkItem {
  /** Drives the badge variant: ok | soon | custom. */
  status: string;
  statusLabel: string;
  featured?: boolean;
  name: string;
  zh: string;
  desc: string;
  href: string | null;
  link: string;
}

export interface FaqItem {
  id: string;
  title: string;
  content: string;
}

export interface FooterLink {
  label: string;
  href: string | null;
}

export interface FooterCol {
  head: string;
  links: FooterLink[];
}

export interface Messages {
  meta: { title: string };
  nav: { links: NavLink[]; switchLang: string; toggleTheme: string };
  hero: {
    badge: string;
    prefix: string;
    phrases: string[];
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  demo: { live: string; previewLabel: string; model: string; items: DemoItem[] };
  works: { label: string; title: string; subtitle: string; items: WorkItem[] };
  faq: { label: string; title: string; items: FaqItem[] };
  footer: {
    tagline: string;
    cols: FooterCol[];
    company: string;
    /** ICP filing number — a Chinese legal identifier, kept verbatim in both locales. */
    icp: string;
    icpHref: string;
  };
}

const catalogs: Record<Locale, Messages> = { en, zh };

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  m: Messages;
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

  // Keep <html lang> and the tab title in sync with the active locale so
  // assistive tech, the browser, and the tab all follow the language.
  // (Document-level side effect; harmless in non-DOM test envs.)
  useEffect(() => {
    document.documentElement.setAttribute("lang", locale === "en" ? "en" : "zh");
    document.title = catalogs[locale].meta.title;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, m: catalogs[locale] }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a <LocaleProvider>");
  return ctx;
}

/** The message catalog for the active locale: `const m = useMessages()`. */
export function useMessages(): Messages {
  return useLocale().m;
}
