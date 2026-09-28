/**
 * Sand — marketing / sale / customer support.
 * Lora serif, warm paper tones, soft radius, amber/brown identity.
 * Brand orange primary: light #E0531A / dark #F0652F.
 */
import { defineTheme } from "@astryxdesign/core/theme";

export const sandTheme = defineTheme({
  name: "sand",

  color: {
    accent: ["#E0531A", "#F0652F"],
    neutralStyle: "warm",
    contrast: "standard",
  },

  typography: {
    scale: { base: 16, ratio: 1.2 },
    body: { family: "Lora", fallbacks: "Georgia, serif" },
    heading: { weight: "semibold" },
    code: { family: "JetBrains Mono", fallbacks: "ui-monospace, monospace" },
  },

  radius: { base: 4, multiplier: 1.5 }, // soft, friendly

  motion: { fast: 175, medium: 410, slow: 975, ratio: 0.75 },

  tokens: {
    "--color-on-accent": ["#FFFFFF", "#1A1410"],
    "--color-background-body": ["#FAF7F2", "#1A1410"],
    "--color-background-surface": ["#FFFFFF", "#201A14"],
    "--color-background-card": ["#F8F4ED", "#28201A"],
    "--color-text-primary": ["#2C1A0A", "#E8E0D4"],
    "--color-text-secondary": ["#6B5744", "#A09080"],
    // identity: amber/brown (warm accent for links, labels)
    "--color-text-yellow": ["#92400E", "#D97706"],
    "--color-border-yellow": ["#D4C8B8", "#443828"],
    "--focus-outline-color": "var(--color-accent)",
    // pill controls: elements (buttons, inputs, badges) use full radius. Containers keep 18px.
    "--radius-element": "var(--radius-full)",
  },

  localTokens: {
    "--color-brand": "light-dark(#E0531A, #F0652F)",
    "--color-brand-solid": "light-dark(#C7451B, #F0652F)",
    "--color-on-brand": "light-dark(#FFFFFF, #1A0F00)",
  },
});

export default sandTheme;
