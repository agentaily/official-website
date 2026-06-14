import { Fragment, useEffect, useState, type ReactNode } from "react";

// Presentational pieces of the hero chat demo: a typewriter line and the
// abstract "generated artifact" wireframes. These hold no user-facing copy
// (all demo text comes from the i18n catalog) — only deliberately abstract
// geometry representing what gets generated: form / dashboard / flow / survey.

/** Types each character of `text`, trailing a blinking cursor until done. */
export function Typewriter({ text, speed = 34 }: { text: string; speed?: number }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduce) {
      setN(text.length);
      return;
    }
    setN(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  const done = n >= text.length;
  return (
    <span>
      {text.slice(0, n)}
      {done ? null : <span className="ax-cursor" />}
    </span>
  );
}

// Crisp monochrome wireframes (not loading skeletons) — one per demo variant.
const GEN_ART: Record<string, ReactNode> = {
  form: (
    <Fragment>
      <span className="aw-art__lbl" style={{ width: "52%" }} />
      <div className="aw-art__field">
        <span className="aw-art__lbl" style={{ width: "30%" }} />
        <div className="aw-art__bar" />
      </div>
      <div className="aw-art__field">
        <span className="aw-art__lbl" style={{ width: "24%" }} />
        <div className="aw-art__bar" />
      </div>
      <div className="aw-art__field">
        <span className="aw-art__lbl" style={{ width: "34%" }} />
        <div className="aw-art__bar" />
      </div>
      <div className="aw-art__chips">
        <span />
        <span />
        <span />
      </div>
      <div className="aw-art__btn" />
    </Fragment>
  ),
  dash: (
    <Fragment>
      <div className="aw-art__chart">
        {[42, 66, 52, 88, 60, 36, 74, 50].map((h, i) => (
          <span key={i} className={i === 3 ? "is-accent" : ""} style={{ height: h + "%" }} />
        ))}
      </div>
      <div className="aw-art__stats">
        <div className="aw-art__stat">
          <span className="aw-art__lbl" style={{ width: "60%" }} />
          <span className="aw-art__num" />
        </div>
        <div className="aw-art__stat">
          <span className="aw-art__lbl" style={{ width: "50%" }} />
          <span className="aw-art__num" />
        </div>
      </div>
      <div className="aw-art__row">
        <span className="aw-art__lbl" style={{ width: "34%" }} />
        <span className="aw-art__num" />
      </div>
      <div className="aw-art__row">
        <span className="aw-art__lbl" style={{ width: "44%" }} />
        <span className="aw-art__toggle" />
      </div>
    </Fragment>
  ),
  flow: (
    <Fragment>
      <div className="aw-art__flow">
        <span className="aw-art__node" />
        <span className="aw-art__conn" />
        <span className="aw-art__node" />
        <span className="aw-art__conn" />
        <span className="aw-art__node" />
      </div>
      <div className="aw-art__flow">
        <span className="aw-art__node" />
        <span className="aw-art__conn" />
        <span className="aw-art__node is-accent" />
        <span className="aw-art__conn" />
        <span className="aw-art__node" />
      </div>
      <div className="aw-art__field">
        <span className="aw-art__lbl" style={{ width: "40%" }} />
        <div className="aw-art__bar" />
      </div>
      <div className="aw-art__btn" />
    </Fragment>
  ),
  survey: (
    <Fragment>
      <span className="aw-art__lbl" style={{ width: "60%" }} />
      <div className="aw-art__opt">
        <span className="aw-art__radio is-on" />
        <span className="aw-art__lbl" style={{ width: "50%" }} />
      </div>
      <div className="aw-art__opt">
        <span className="aw-art__radio" />
        <span className="aw-art__lbl" style={{ width: "40%" }} />
      </div>
      <div className="aw-art__opt">
        <span className="aw-art__radio" />
        <span className="aw-art__lbl" style={{ width: "56%" }} />
      </div>
      <div className="aw-art__opt">
        <span className="aw-art__radio" />
        <span className="aw-art__lbl" style={{ width: "46%" }} />
      </div>
      <span className="aw-art__lbl" style={{ width: "38%", marginTop: "var(--space-1)" }} />
      <div className="aw-art__btn" />
    </Fragment>
  ),
};

/** The right pane of the hero demo: a live-tagged abstract artifact preview. */
export function GenCanvas({ type, live, label }: { type: string; live: string; label: string }) {
  const art = GEN_ART[type] ?? GEN_ART.form;
  return (
    <div className="aw-gen" aria-label={label}>
      <div className="aw-gen__bar">
        <span className="aw-gen__live">
          <i />
          {live}
        </span>
      </div>
      <div className="aw-gen__doc ax-ticks aw-art" key={type}>
        {art}
      </div>
    </div>
  );
}
