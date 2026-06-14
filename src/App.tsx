import { BrandMark } from "@agentaily/design-system";
import { LocaleProvider, useT, useLocale, LOCALES } from "./i18n";

// Placeholder shell — proves @agentaily/design-system imports + builds, and that
// the en/zh i18n seam works. The real landing page (Hero / 功能 / 主理人 /
// CTA / 页脚) is implemented later by a fleet worker from a Claude Design handoff.
// See SPEC.md / DESIGN.md.

function LocaleSwitch() {
  const { locale, setLocale } = useLocale();
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={l === locale}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "inherit",
            opacity: l === locale ? 1 : 0.5,
            font: "inherit",
            textTransform: "uppercase",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function Shell() {
  const t = useT();
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        textAlign: "center",
        padding: 24,
      }}
    >
      <BrandMark size={48} wordmark />
      <p style={{ opacity: 0.7, maxWidth: 480 }}>{t("tagline")}</p>
      <p style={{ opacity: 0.4, fontSize: 14 }}>{t("wip")}</p>
      <LocaleSwitch />
    </main>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <Shell />
    </LocaleProvider>
  );
}
