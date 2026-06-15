import { createI18n } from "@agentaily/web-kit";
import en from "./en.json";
import zh from "./zh.json";

// Bilingual (en/zh) i18n seam for the landing page. All user-visible copy lives
// in en.json / zh.json (the message catalogs); components read it through
// useMessages(). The explicit `Messages` interface below is the single shape both
// catalogs are checked against — a missing/typo'd/extra key is a compile error,
// which keeps the two languages structurally in lock-step.
//
// The provider/hook *mechanism* (locale state, <html lang>, cross-subdomain
// persistence, navigator detection) is owned by @agentaily/web-kit's createI18n;
// this module only injects the typed catalogs and re-exports the bound hooks.

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

// Typed as Record<Locale, Messages> so both JSON catalogs are checked against the
// single `Messages` shape (drift is a compile error) and useMessages() is bound to
// Messages — every key access stays type-safe.
const catalogs: Record<Locale, Messages> = { en, zh };

// Chinese is the default/fallback locale (`defaultLocale: "zh"`); web-kit first
// honours a persisted choice, then the visitor's navigator language, then this
// fallback. Locale changes apply `<html lang>` and re-render in place (no reload).
export const { LocaleProvider, useLocale, useMessages } = createI18n({
  catalogs,
  defaultLocale: "zh",
});
