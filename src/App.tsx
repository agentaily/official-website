import { ThemeProvider } from "@agentaily/web-kit";
import { LocaleProvider } from "./i18n";
import { Nav } from "./components/Nav";
import { SiteFooter } from "./components/SiteFooter";
import { Faq } from "./sections/Faq";
import { Hero } from "./sections/Hero";
import { Works } from "./sections/Works";
import { useReveal } from "./lib/useReveal";

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
  // web-kit owns theme (light/dark/system) state + cross-subdomain persistence.
  // Dark stays the default (the brand ships dark); the FOUC guard injected in
  // vite.config mirrors this defaultTheme on <html> before first paint.
  return (
    <ThemeProvider defaultTheme="dark">
      <LocaleProvider>
        <Landing />
      </LocaleProvider>
    </ThemeProvider>
  );
}
