/**
 * Generate the favicon / touch-icon set for ratas.ai from public/logo.png
 * (the hand-cut, transparent squirrel face).
 *
 * Favicons and PWA icons are kept TRANSPARENT. apple-touch-icon is the one
 * exception: iOS composites it onto black if left transparent, so it gets a
 * solid brand tile.
 *
 * Outputs (public/):
 *   favicon.ico            16/32/48 multi-size (transparent)
 *   favicon-16.png, -32.png, -48.png (transparent)
 *   apple-touch-icon.png   180x180 (brand tile, iOS-safe)
 *   icon-192.png, icon-512.png   PWA / Android (transparent)
 *   favicon.svg, site.webmanifest
 *
 * Requires: png-to-ico. Not a project dependency (icons are prebuilt); install
 *   transiently to regenerate:
 *     npm i -D png-to-ico && node scripts/make-favicon.cjs && npm rm png-to-ico
 * Run: node scripts/make-favicon.cjs
 */
const sharp = require("sharp");
const pngToIco = require("png-to-ico");
const path = require("path");
const fs = require("fs");

const PUBLIC = path.join(__dirname, "..", "public");
const LOGO = path.join(PUBLIC, "logo.png");
const BRAND = "#E0531A";

// Fit the (already background-free) logo into a square of `size`, centered,
// with a little padding. `tile` = background color, or null for transparent.
async function makeIcon(subject, size, tile) {
  const pad = Math.round(size * 0.06);
  const inner = size - pad * 2;
  const head = await sharp(subject)
    .resize(inner, inner, { fit: "contain", background: "#00000000" })
    .toBuffer();

  const bg = tile
    ? Buffer.from(
        `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
           <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" ry="${Math.round(size * 0.22)}" fill="${tile}"/>
         </svg>`,
      )
    : null;

  const base = bg
    ? sharp(await sharp(bg).png().toBuffer())
    : sharp({
        create: { width: size, height: size, channels: 4, background: "#00000000" },
      });

  return base
    .composite([{ input: head, gravity: "center" }])
    .png()
    .toBuffer();
}

async function main() {
  // Start from the trimmed logo so padding is consistent across sizes.
  const subject = await sharp(LOGO).trim({ threshold: 10 }).toBuffer();

  // Transparent favicons + PWA icons.
  const transparent = {
    "favicon-16.png": 16,
    "favicon-32.png": 32,
    "favicon-48.png": 48,
    "icon-192.png": 192,
    "icon-512.png": 512,
  };
  for (const [name, size] of Object.entries(transparent)) {
    const buf = await makeIcon(subject, size, null);
    await sharp(buf).toFile(path.join(PUBLIC, name));
  }

  // apple-touch-icon: brand tile (iOS ignores transparency).
  await sharp(await makeIcon(subject, 180, BRAND)).toFile(
    path.join(PUBLIC, "apple-touch-icon.png"),
  );

  // favicon.ico (16/32/48 packed, transparent).
  const ico = await pngToIco([
    path.join(PUBLIC, "favicon-16.png"),
    path.join(PUBLIC, "favicon-32.png"),
    path.join(PUBLIC, "favicon-48.png"),
  ]);
  fs.writeFileSync(path.join(PUBLIC, "favicon.ico"), ico);

  // favicon.svg: embed the 48px transparent PNG for a crisp scalable reference.
  const png48 = fs.readFileSync(path.join(PUBLIC, "favicon-48.png"));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><image width="48" height="48" href="data:image/png;base64,${png48.toString("base64")}"/></svg>`;
  fs.writeFileSync(path.join(PUBLIC, "favicon.svg"), svg);

  // Web app manifest.
  const manifest = {
    name: "Ratas",
    short_name: "Ratas",
    description: "AI agents that run your business.",
    theme_color: BRAND,
    background_color: "#1A1A1A",
    display: "standalone",
    start_url: "/",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
  fs.writeFileSync(
    path.join(PUBLIC, "site.webmanifest"),
    JSON.stringify(manifest, null, 2) + "\n",
  );

  console.log(
    "favicon set regenerated from logo.png:",
    Object.keys(transparent).join(", "),
    "+ apple-touch-icon.png, favicon.ico, favicon.svg, site.webmanifest",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
