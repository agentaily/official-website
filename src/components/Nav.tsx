import { BrandMark, Icon } from "@agentaily/design-system";
import { useLocale } from "../i18n";
import type { Theme } from "../lib/useTheme";

/**
 * Sticky top nav: brand mark + anchor links + language toggle + theme toggle.
 * The language button shows the *target* locale code (EN while in zh, ZH while
 * in en) so a click always reads as "switch to that language".
 */
export function Nav({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const { locale, setLocale, m } = useLocale();
  const targetCode = locale === "en" ? "ZH" : "EN";

  return (
    <nav className="aw-nav">
      <a className="aw-brand" href="#top" aria-label="Agentaily">
        <BrandMark size={20} wordmark />
      </a>
      <span className="aw-nav__links">
        {m.nav.links.map((l) => (
          <a key={l.href} className="aw-nav__link" href={l.href}>
            {l.label}
          </a>
        ))}
      </span>
      <span className="aw-nav__right">
        <button
          type="button"
          className="aw-themebtn aw-langbtn"
          onClick={() => setLocale(locale === "en" ? "zh" : "en")}
          aria-label={m.nav.switchLang}
          title={m.nav.switchLang}
        >
          {targetCode}
        </button>
        <button
          type="button"
          className="aw-themebtn"
          onClick={onToggleTheme}
          aria-label={m.nav.toggleTheme}
          title={m.nav.toggleTheme}
        >
          <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
        </button>
      </span>
    </nav>
  );
}
