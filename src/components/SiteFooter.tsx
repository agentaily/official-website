import { BrandMark } from "@agentaily/design-system";
import { useMessages } from "../i18n";

// 页脚 / Footer — a centered container (not full-bleed): brand + tagline, link
// columns, then a centered legal row showing company + ICP filing. The ICP
// number is a Chinese legal identifier (kept verbatim in both locales) and
// links to the MIIT registry.
export function SiteFooter() {
  const { footer } = useMessages();
  return (
    <footer className="aw-foot">
      <div
        className="aw-foot__inner"
        style={{ flexDirection: "column", alignItems: "stretch", gap: 40 }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-10)",
            justifyContent: "space-between",
          }}
        >
          <div style={{ maxWidth: 300, display: "flex", flexDirection: "column", gap: 12 }}>
            <span className="aw-brand">
              <BrandMark size={18} wordmark />
            </span>
            <p
              style={{
                margin: 0,
                fontSize: "var(--text-sm)",
                color: "var(--text-muted)",
                lineHeight: "var(--leading-body)",
              }}
            >
              {footer.tagline}
            </p>
          </div>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-10) var(--space-16)" }}
          >
            {footer.cols.map((col) => (
              <div key={col.head} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span className="ax-label">{col.head}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {col.links.map((l) => {
                    const external = !!l.href && l.href.startsWith("http");
                    return (
                      <a
                        key={l.label}
                        className="aw-nav__link"
                        href={l.href ?? undefined}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        style={{ fontSize: "var(--text-sm)" }}
                      >
                        {l.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 24,
            borderTop: "1px solid var(--border-default)",
          }}
        >
          <span
            className="aw-foot__links"
            style={{ flex: "0 0 auto", gap: "6px 14px", alignItems: "center" }}
          >
            <span className="aw-foot__legal">{footer.company}</span>
            <a
              className="aw-foot__legal aw-foot__beian"
              href={footer.icpHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              {footer.icp}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
