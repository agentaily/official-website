// Disable @testing-library/react's automatic afterEach(cleanup). It must be set
// before RTL is first imported (test files import it after setup runs).
// @amiceli/vitest-cucumber runs each Gherkin step as its own test, so an
// auto-cleanup would unmount the React tree between Given/When/Then. Cleanup is
// explicit instead: unit tests call afterEach(cleanup); BDD specs clean up per
// scenario via AfterEachScenario.
process.env.RTL_SKIP_AUTO_CLEANUP = "true";

import { afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

// web-kit's i18n resolves the first-visit locale from navigator.language before
// falling back to defaultLocale ("zh"). jsdom reports "en-US", which would make
// the landing page default to English in tests. Pin it to a Chinese locale so
// the "默认中文" specs model the site's primary (Chinese) audience deterministically.
Object.defineProperty(window.navigator, "language", {
  value: "zh-CN",
  configurable: true,
});

// web-kit persists the chosen theme/locale (localStorage or a path=/ cookie). Reset
// both after every test/step so each fresh render re-resolves from defaults rather
// than inheriting a sibling test's persisted choice.
afterEach(() => {
  try {
    window.localStorage?.clear();
  } catch {
    /* localStorage may be unavailable in this env */
  }
  try {
    for (const entry of document.cookie ? document.cookie.split(";") : []) {
      const name = entry.split("=")[0].trim();
      if (name) document.cookie = `${name}=;path=/;max-age=0`;
    }
  } catch {
    /* document.cookie may be unavailable in this env */
  }
});

// jsdom doesn't implement matchMedia or ResizeObserver, which some animated DS
// components (RotatingTagline, Composer) and our motion guards touch on mount.
// Provide inert stubs so rendering the real landing page in tests doesn't throw.
if (typeof window.matchMedia !== "function") {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

if (typeof window.ResizeObserver !== "function") {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
