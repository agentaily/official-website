import { LocaleProvider } from "./i18n";
import { Nav } from "./components/Nav";
import { SiteFooter } from "./components/SiteFooter";
import { Faq } from "./sections/Faq";
import { Hero } from "./sections/Hero";
import { Works } from "./sections/Works";
import { useReveal } from "./lib/useReveal";
import { useTheme } from "./lib/useTheme";

// Single-page landing: Nav → Hero → Works → FAQ → Footer.
// Works / FAQ are wrapped in `.aw-rise` for the scroll-reveal entrance.
function Landing() {
  const { theme, toggle } = useTheme();
  useReveal();

  return (
    <div className="aw">
      <Nav theme={theme} onToggleTheme={toggle} />
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
  return (
    <LocaleProvider>
      <Landing />
    </LocaleProvider>
  );
}
