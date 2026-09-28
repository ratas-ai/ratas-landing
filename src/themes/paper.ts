/**
 * Paper — Ratas default theme.
 * Clean, professional reading. Lato body, soft radius, orange brand.
 * Brand orange: light #E0531A / dark #F0652F.
 */
import { defineTheme } from "@astryxdesign/core/theme";

export const paperTheme = defineTheme({
  name: "paper",

  // accent = brand orange, seeded per mode → Astryx generates the palette.
  color: {
    accent: ["#E0531A", "#F0652F"],
    neutralStyle: "neutral",
    contrast: "standard",
  },

  typography: {
    scale: { base: 16, ratio: 1.2 },
    body: {
      family: "Lato",
      fallbacks: "-apple-system, system-ui, sans-serif",
    },
    heading: { weight: "semibold" },
    code: { family: "JetBrains Mono", fallbacks: "ui-monospace, monospace" },
  },

  radius: { base: 4, multiplier: 1.5 }, // soft, professional

  motion: { fast: 175, medium: 410, slow: 975, ratio: 0.75 },

  tokens: {
    "--color-on-accent": ["#FFFFFF", "#FFFFFF"],
    "--color-background-body": ["#FFFFFF", "#1A1A1A"],
    "--color-background-surface": ["#FFFFFF", "#222222"],
    "--color-background-card": ["#FAFAFA", "#2A2A2A"],
    "--color-text-primary": ["#1F2937", "#F5F5F5"],
    "--color-text-secondary": ["#6B7280", "#A0A0A0"],
    "--focus-outline-color": "var(--color-accent)",
  },

  // Ratas brand orange (exact, not contrast-adjusted). Astryx has no --color-brand token → localTokens.
  localTokens: {
    "--color-brand": "light-dark(#E0531A, #F0652F)",
    "--color-brand-solid": "light-dark(#C7451B, #F0652F)",
    "--color-on-brand": "light-dark(#FFFFFF, #1A0F00)",
  },
});

export default paperTheme;
