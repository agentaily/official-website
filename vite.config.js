import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { themeInitScript } from "@agentaily/design-system";

// Inject the DS runtime's FOUC guard at the very start of <head>: a tiny blocking
// script that reads the persisted theme (cookie → localStorage), resolves
// `system` via prefers-color-scheme, and sets `data-theme` on <html> *before*
// first paint. Sourced from the design-system runtime so it never drifts from it.
// `defaultTheme` must match the <ThemeProvider> (dark); the storage key stays at
// the runtime's default (`agentaily:theme`) on both sides, so no keyPrefix override.
function themeInit() {
  return {
    name: "agentaily-theme-init",
    transformIndexHtml() {
      return [
        {
          tag: "script",
          injectTo: "head-prepend",
          children: themeInitScript({ defaultTheme: "dark" }),
        },
      ];
    },
  };
}

// Base path depends on the deploy target:
//   - Cloudflare Pages (the production host, root domain) builds with base "/",
//     which its workflow sets via DEPLOY_BASE="/".
//   - dev / preview-from-root stays at "/".
// Parameterized so a sub-path host (e.g. GitHub Pages project page) can override
// DEPLOY_BASE later without touching code.
export default defineConfig(({ command }) => ({
  base: command === "build" ? (process.env.DEPLOY_BASE ?? "/") : "/",
  plugins: [react(), themeInit()],
}));
