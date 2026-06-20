import {
  Badge,
  Button,
  Composer,
  Message,
  Reasoning,
  RotatingTagline,
} from "@agentaily/design-system";
import { useEffect, useState } from "react";
import { useMessages } from "../i18n";
import { GenCanvas, Typewriter } from "./heroDemo";

// Where the secondary "share an idea" CTA points. Not user-visible copy (it's an
// action target); the address itself also appears as catalog text in Works / Footer.
const CONTACT_MAILTO = "mailto:yarnb@foxmail.com";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 60,
      behavior: "smooth",
    });
  }
}

export function Hero() {
  const { hero, demo } = useMessages();
  const [draft, setDraft] = useState("");
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState(0);

  // Auto-rotate through the demo artifacts (form → dash → flow → survey).
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % demo.items.length), 3400);
    return () => clearInterval(t);
  }, [demo.items.length]);

  // Stage the assistant reply so the user turn lands first, then the answer.
  useEffect(() => {
    setPhase(0);
    const t = setTimeout(() => setPhase(1), 420);
    return () => clearTimeout(t);
  }, [active]);

  const cur = demo.items[active] ?? demo.items[0];

  return (
    <header className="aw-hero" id="top">
      <div className="aw-hero__grid" />
      <div className="aw-hero__inner">
        <Badge variant="outline" dot>
          {hero.badge}
        </Badge>
        <h1 className="aw-hero__h">
          <RotatingTagline breakAfterPrefix prefix={hero.prefix} phrases={hero.phrases} />
        </h1>
        <p className="aw-hero__sub">{hero.sub}</p>
        <div className="aw-hero__ctas">
          <Button variant="primary" size="lg" onClick={() => scrollToId("works")}>
            {hero.ctaPrimary}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              window.location.href = CONTACT_MAILTO;
            }}
          >
            {hero.ctaSecondary}
          </Button>
        </div>
      </div>

      <div className="aw-demo">
        <div className="aw-demo__win">
          <div className="aw-demo__bar">
            <span className="aw-demo__dots">
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="aw-demo__split">
            <div className="aw-demo__chat">
              <div className="aw-demo__thread">
                <div className="aw-msg-in" key={"u" + active}>
                  <Message role="user">
                    <p>{cur.q}</p>
                  </Message>
                </div>
                {phase === 1 ? (
                  <div className="aw-msg-in" key={"a" + active}>
                    <Message role="assistant">
                      <Reasoning duration="0.6s" steps={cur.steps} defaultOpen />
                      <p className="aw-asst-line">
                        <Typewriter text={cur.line} />
                      </p>
                    </Message>
                  </div>
                ) : null}
              </div>
              <div className="aw-demo__composer">
                <Composer
                  value={draft}
                  onChange={setDraft}
                  onSend={() => setDraft("")}
                  placeholder={cur.ph}
                  model={demo.model}
                />
              </div>
            </div>
            <div className="aw-demo__canvas">
              {phase === 1 ? (
                <GenCanvas type={cur.key} live={demo.live} label={demo.previewLabel} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
