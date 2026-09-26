# 🐿️ Ratas

**One prompt, a whole ecosystem. The agent lives inside.**

Landing page for **Ratas** — an agentic AI platform.
Powered by Cloudflare.

---

## Stack

Built entirely on Cloudflare:

- **Cloudflare Workers** — runtime
- **Hono** — web framework
- **TypeScript** — type safety

> This repo is the public **landing page**. The core engine lives in a separate private repo.

## Development

```bash
npm install        # install dependencies
npm run dev        # run locally (wrangler dev)
npm run typecheck  # type check
```

Open `http://localhost:8787` to view the page.

## Deploy

```bash
npx wrangler login   # log in to Cloudflare (first time only)
npm run deploy       # deploy to Cloudflare Workers
```

## Structure

```
src/index.ts      # Hono app (routes)
wrangler.jsonc    # Cloudflare Workers config
tsconfig.json     # TypeScript config
```

## License

[MIT](./LICENSE) © 2026 Ratas
