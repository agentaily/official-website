import { useEffect } from "react";
import { ThemeProvider } from "@agentaily/design-system";
import { LocaleProvider, useMessages } from "./i18n";
import { Nav } from "./components/Nav";
import { SiteFooter } from "./components/SiteFooter";
import { Faq } from "./sections/Faq";
import { Hero } from "./sections/Hero";
import { Works } from "./sections/Works";
import { useReveal } from "./lib/useReveal";

// Keep the browser tab title in sync with the active locale. The DS runtime's i18n
// applies <html lang> on locale change but leaves document.title to the product,
// so we mirror the localized meta.title here (rendered inside LocaleProvider).
function DocumentTitle() {
  const { meta } = useMessages();
  useEffect(() => {
    document.title = meta.title;
  }, [meta.title]);
  return null;
}

// Single-page landing: Nav → Hero → Works → FAQ → Footer.
// Works / FAQ are wrapped in `.aw-rise` for the scroll-reveal entrance.
function Landing() {
  useReveal();

  return (
    <div className="aw">
      <Nav />
      <Hero />
      <div className="aw-rise">
        <Works />
      </div>
      <div className="aw-rise">
        <Faq />
      </div>
      <SiteFooter />
    </div>
  );
}

export default function App() {
  // The DS runtime owns theme (light/dark/system) state + persistence. Dark stays
  // the default (the brand ships dark). Persistence is pinned to a cookie (backend
  // "cookie") so the choice survives refresh AND is read by the cookie-first FOUC
  // init-script that vite.config injects into <head> — both sides hit the same
  // store (key `agentaily:theme`), so the resolved theme is on <html> before first
  // paint (zero flash). Cross-subdomain on *.agentaily.com; host-only cookie on
  // localhost / preview (createStorage falls back automatically).
  return (
    <ThemeProvider defaultTheme="dark" storage={{ backend: "cookie" }}>
      <LocaleProvider>
        <DocumentTitle />
        <Landing />
      </LocaleProvider>
    </ThemeProvider>
  );
}
