import { Badge, Card, Icon } from "@agentaily/design-system";
import { useMessages } from "../i18n";

/** Map a work's status to a DS Badge variant. */
function statusVariant(status: string): "ok" | "solid" | "outline" {
  if (status === "ok") return "ok";
  if (status === "custom") return "solid";
  return "outline";
}

// 作品 / Works — three cards (a live product, a teaser, a custom-build invite)
// in a full-bleed panel band. Each card links out; the teaser has no link.
export function Works() {
  const { works } = useMessages();
  return (
    <section className="aw-sec aw-band" id="works" style={{ maxWidth: "none" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div className="aw-head">
          <span className="ax-label">{works.label}</span>
          <h2 className="aw-head__h">{works.title}</h2>
          <p className="aw-head__p">{works.subtitle}</p>
        </div>
        <div className="aw-works">
          {works.items.map((w) => {
            const external = !!w.href && w.href.startsWith("http");
            const className =
              "aw-work" + (w.href ? "" : " is-static") + (w.featured ? " is-featured" : "");
            return (
              <a
                key={w.name}
                className={className}
                href={w.href ?? undefined}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                <Card padding="lg" ticks={w.featured}>
                  <div className="aw-work__in">
                    <div className="aw-work__top">
                      <Badge variant={statusVariant(w.status)} dot={w.status === "ok"}>
                        {w.statusLabel}
                      </Badge>
                    </div>
                    <h3 className="aw-work__name">{w.name}</h3>
                    <p className="aw-work__zh">{w.zh}</p>
                    <p className="aw-work__desc">{w.desc}</p>
                    <span className="aw-work__link">
                      {w.link}
                      <Icon name="arrow" size={14} />
                    </span>
                  </div>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
