/**
 * Folio — fintech / accountant / logistics.
 * Saira Semi Condensed (semi-condensed, thin & rigid — technical/logistics feel), data-dense, small radius, neutral gray identity, clean.
 * Brand orange primary: light #E0531A / dark #F0652F.
 */
import { defineTheme } from "@astryxdesign/core/theme";

export const folioTheme = defineTheme({
  name: "folio",

  color: {
    accent: ["#E0531A", "#F0652F"],
    neutralStyle: "neutral",
    contrast: "standard",
  },

  typography: {
    scale: { base: 14, ratio: 1.2 },
    body: {
      family: "Saira Semi Condensed",
      fallbacks: "-apple-system, system-ui, sans-serif",
    },
    heading: { weight: "bold" },
    code: { family: "JetBrains Mono", fallbacks: "ui-monospace, monospace" },
  },

  radius: { base: 4, multiplier: 0.5 }, // small, tight, data-dense

  motion: { fast: 150, medium: 350, slow: 800, ratio: 0.75 },

  tokens: {
    "--color-on-accent": ["#FFFFFF", "#111111"],
    "--color-background-body": ["#FFFFFF", "#111111"],
    "--color-background-surface": ["#FFFFFF", "#161616"],
    "--color-background-card": ["#FAFAFA", "#1C1C1C"],
    "--color-text-primary": ["#1A1A1A", "#E5E7EB"],
    "--color-text-secondary": ["#4B5563", "#9CA3AF"],
    // identity: neutral gray (labels, meta)
    "--color-text-gray": ["#6B7280", "#9CA3AF"],
    "--color-border-gray": ["#D1D5DB", "#3A3A3A"],
    "--focus-outline-color": "var(--color-accent)",
  },

  localTokens: {
    "--color-brand": "light-dark(#E0531A, #F0652F)",
    "--color-brand-solid": "light-dark(#C7451B, #F0652F)",
    "--color-on-brand": "light-dark(#FFFFFF, #1A0F00)",
  },
});

export default folioTheme;
