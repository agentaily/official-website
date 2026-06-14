/// <reference types="vite/client" />

// The design-system ships a stylesheet but no type for its `./styles.css`
// subpath export. Declare the side-effect import so strict TS accepts it.
declare module "@agentaily/design-system/styles.css";
