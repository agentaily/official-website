// Disable @testing-library/react's automatic afterEach(cleanup). It must be set
// before RTL is first imported (test files import it after setup runs).
// @amiceli/vitest-cucumber runs each Gherkin step as its own test, so an
// auto-cleanup would unmount the React tree between Given/When/Then. Cleanup is
// explicit instead: unit tests call afterEach(cleanup); BDD specs clean up per
// scenario via AfterEachScenario.
process.env.RTL_SKIP_AUTO_CLEANUP = "true";

import "@testing-library/jest-dom/vitest";

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
