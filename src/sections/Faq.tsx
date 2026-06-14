import { Accordion } from "@agentaily/design-system";
import { useMessages } from "../i18n";

// FAQ — collaboration-oriented questions in a centered accordion; the first
// item is open on mount.
export function Faq() {
  const { faq } = useMessages();
  const items = faq.items.map((it) => ({ id: it.id, title: it.title, content: it.content }));
  const first = faq.items[0]?.id;

  return (
    <section className="aw-sec" id="faq">
      <div className="aw-head aw-head--center">
        <span className="ax-label">{faq.label}</span>
        <h2 className="aw-head__h">{faq.title}</h2>
      </div>
      <div className="aw-faq" style={{ marginInline: "auto" }}>
        <Accordion defaultOpen={first ? [first] : []} items={items} />
      </div>
    </section>
  );
}
