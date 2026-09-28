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
  adapter: cloudflare(),
  integrations: [astryxThemes(), react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
