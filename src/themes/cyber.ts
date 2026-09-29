/**
 * Cyber — tech / cyberpunk terminal.
 * JetBrains Mono, hard edges (radius 0), heavy borders, purple identity accent.
 * Brand orange stays primary: light #E0531A / dark #F0652F.
 */
import { defineTheme } from "@astryxdesign/core/theme";

export const cyberTheme = defineTheme({
  name: "cyber",

  color: {
    accent: ["#E0531A", "#F0652F"],
    neutralStyle: "cool",
    contrast: "high",
  },

  typography: {
    scale: { base: 14, ratio: 1.2 },
    body: { family: "JetBrains Mono", fallbacks: "ui-monospace, monospace" },
    heading: { weight: "bold" },
    code: { family: "JetBrains Mono", fallbacks: "ui-monospace, monospace" },
  },

  radius: { base: 4, multiplier: 0 }, // hard edges, brutalist

  motion: { fast: 100, medium: 250, slow: 600, ratio: 0.75 },

  tokens: {
    "--color-on-accent": ["#FFFFFF", "#0A0A0A"],
    "--color-background-body": ["#F5F5F5", "#0A0A0A"],
    "--color-background-surface": ["#FFFFFF", "#0D0D0D"],
    "--color-background-card": ["#FAFAFA", "#0F0F0F"],
    "--color-text-primary": ["#0A0A0A", "#C4C4C4"],
    "--color-text-secondary": ["#4A4A4A", "#888888"],
    // identity: purple accent (decorative, e.g. agent labels/badges)
    "--color-text-purple": ["#7C3AED", "#A78BFA"],
    "--color-border-purple": ["#7C3AED", "#A78BFA"],
    "--focus-outline-color": "var(--color-accent)",
  },

  localTokens: {
    "--color-brand": "light-dark(#E0531A, #F0652F)",
    "--color-brand-solid": "light-dark(#C7451B, #F0652F)",
    "--color-on-brand": "light-dark(#FFFFFF, #1A0F00)",
    "--icon-stroke": "2.5",
    "--icon-join": "miter",
  },
});

export default cyberTheme;
