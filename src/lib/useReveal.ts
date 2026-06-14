import { useEffect } from "react";

/**
 * Scroll-reveal: add `.is-in` to every `.aw-rise` element once it scrolls into
 * view, so its gated entrance animation plays. The CSS base state is already
 * visible, so when IntersectionObserver is missing (e.g. jsdom) we simply reveal
 * everything immediately — content can never be left stuck invisible.
 */
export function useReveal(): void {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".aw-rise"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
