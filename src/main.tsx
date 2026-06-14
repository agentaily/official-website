import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Design-system tokens + global styles (fonts, colors, motif utilities). Load once.
import "@agentaily/design-system/styles.css";

import App from "./App";

const root = document.getElementById("root");
if (!root) throw new Error("#root not found");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
