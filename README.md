# 🐿️ Ratas

**One prompt, a whole ecosystem. The agent lives inside.**

Landing page for **Ratas** — an agentic AI platform.
Powered by Cloudflare.

---

## Stack

- **Astro** — static-first web framework (Vite under the hood)
- **React** — interactive islands (home page)
- **MDX / Markdown** — content pages
- **TypeScript** — type safety
- **Cloudflare Workers** — hosting (static assets, with SSR on demand)

> This repo is the public **landing page**. The core engine lives in a separate private repo.

## Architecture

Pages are **static by default** (pre-rendered to assets, served from Cloudflare's edge).
Any route that needs a server (cookies, sessions, forms) opts in with
`export const prerender = false`, and runs on a Cloudflare Worker.

- Home page → `.astro` + a React island for interactivity
- Other pages → `.md` files, rendered natively by Astro

## Development

```bash
npm install        # install dependencies
npm run dev        # run locally (http://localhost:4321)
npm run typecheck  # astro check
npm run lint       # eslint + prettier
```

## Deploy

```bash
npx wrangler login   # log in to Cloudflare (first time only)
npm run deploy       # astro build && wrangler deploy
```

## Structure

```
src/
  layouts/Layout.astro     # shared layout
  components/Hero.tsx       # React island (home page)
  pages/
    index.astro             # home page
    about.md                # markdown page
    docs.md                 # markdown page
astro.config.mjs            # Astro config (react, mdx, cloudflare adapter)
wrangler.jsonc              # Cloudflare Workers config
```

## Adding a page

Drop a `.md` (or `.mdx`) file into `src/pages/` with this frontmatter:

```md
---
layout: ../layouts/Layout.astro
title: Page title
---

# Content in Markdown
```

## License

[MIT](./LICENSE) © 2026 Ratas
