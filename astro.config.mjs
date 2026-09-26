// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
// output: "static" (mặc định) → mọi trang prerender thành asset. Tối ưu cho landing (Astro khuyến nghị).
// adapter cloudflare → route nào cần server (cookie/session/form) thêm `export const prerender = false`
//   → route đó chạy qua Cloudflare Worker; phần còn lại serve static asset.
// => "Worker chạy khi cần, static khi không".
export default defineConfig({
  site: "https://ratas.ai",
  output: "static",
  adapter: cloudflare(),
  integrations: [react(), mdx()],
});
