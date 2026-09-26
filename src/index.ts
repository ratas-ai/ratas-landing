import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.html(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Ratas — agentic AI platform</title>
  </head>
  <body>
    <h1>Ratas</h1>
    <p>One prompt → cả hệ sinh thái. Agent sống bên trong.</p>
    <p>Built on Cloudflare Workers.</p>
  </body>
</html>`
  );
});

app.get("/health", (c) => c.json({ ok: true }));

export default app;
