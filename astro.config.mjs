// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import astryxThemes from "./src/integrations/astryx-themes.mjs";

export default defineConfig({
  site: "https://ratas.ai",
  output: "static",
  // Emit and expect canonical trailing-slash URLs ("/vi/", "/roadmap/"). This
  // keeps internal links identical to the static output paths so the
  // ClientRouter (View Transitions) never hits a trailing-slash redirect — a
  // redirect makes it fall back to a full page reload (e.g. / -> /vi).
  trailingSlash: "always",
  adapter: cloudflare(),
  // Landing is a static site and does not use Astro.session. The Cloudflare
  // adapter otherwise auto-provisions a default session driver (a KV binding
  // named SESSION), which fails Preview deploys ("binding SESSION ... must have
  // a namespace_id"). Opt out entirely — also trims the bundle / cold start.
  session: false,
  i18n: {
    defaultLocale: "en",
    locales: ["en", "vi"],
    routing: {
      // "/" serves the default locale (en); others live under /vi, /kr.
      prefixDefaultLocale: false,
    },
  },
  integrations: [astryxThemes(), react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
