import { BrandMark, Button, Icon } from "@agentaily/design-system";
import { useTheme } from "@agentaily/design-system";
import { useLocale, useMessages } from "../i18n";

/**
 * Sticky top nav: brand mark + anchor links + language toggle + theme toggle.
 * The language button shows the *target* locale code (EN while in zh, ZH while
 * in en) so a click always reads as "switch to that language". Theme + locale
 * both come from the DS runtime context, so the nav is self-contained (no props).
 */
export function Nav() {
  const { locale, setLocale } = useLocale();
  const m = useMessages();
  const { resolvedTheme, setTheme } = useTheme();
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
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            window.location.href = "https://agentaily.pages.dev/build";
          }}
        >
          {m.nav.openApp}
        </Button>
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
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          aria-label={m.nav.toggleTheme}
          title={m.nav.toggleTheme}
        >
          <Icon name={resolvedTheme === "dark" ? "sun" : "moon"} size={16} />
        </button>
      </span>
    </nav>
  );
}
