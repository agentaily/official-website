import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base path depends on the deploy target:
//   - Cloudflare Pages (the production host, root domain) builds with base "/",
//     which its workflow sets via DEPLOY_BASE="/".
//   - dev / preview-from-root stays at "/".
// Parameterized so a sub-path host (e.g. GitHub Pages project page) can override
// DEPLOY_BASE later without touching code.
export default defineConfig(({ command }) => ({
  base: command === "build" ? (process.env.DEPLOY_BASE ?? "/") : "/",
  plugins: [react()],
}));
