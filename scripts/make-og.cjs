/**
 * Generate the Open Graph share image (1200x630) for ratas.ai.
 *
 * Composition: dark brand background, the mech-squirrel (cropped from the
 * existing Rata action frame, background removed) on the left, wordmark +
 * tagline on the right.
 *
 * Pipeline:
 *   1. sharp  — crop the squirrel out of the source frame.
 *   2. rembg  — AI background removal (U^2-Net), run via Docker. Unlike a plain
 *               colorkey this is object-aware, so white areas *inside* the
 *               subject (eyes, highlights) are preserved.
 *   3. sharp  — composite subject + text SVG onto the dark panel.
 *
 * Source art: phase0/assets/rata-actions/frames/frame_0000.png (1288x720).
 * Requires: Docker (image danielgatis/rembg, linux/amd64 via emulation on ARM).
 * Run: node scripts/make-og.cjs  → writes public/og-default.png
 *
 * Reproducible build step; re-run if the brand colors, tagline, or source art
 * change. Replace with a hand-designed asset anytime.
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { execFileSync } = require("child_process");

const SRC =
  "/Users/quyphan/Documents/learn/devops/rata/phase0/assets/rata-actions/frames/frame_0000.png";
const PUBLIC = path.join(__dirname, "..", "public");
const OUT = path.join(PUBLIC, "og-default.png");

const W = 1200;
const H = 630;
const BG = "#1A1A1A";
const BRAND = "#F0652F"; // dark-mode brand
const TEXT = "#F5F5F5";
const MUTED = "#A0A0A0";

const REMBG_IMAGE = "danielgatis/rembg:latest";

async function main() {
  // Work inside public/.ogtmp (bind-mounted into the rembg container).
  const tmpDir = path.join(PUBLIC, ".ogtmp");
  // Cache the U^2-Net weights outside tmpDir so they survive cleanup and are
  // downloaded only once across runs.
  const modelsDir = path.join(__dirname, ".rembg-models");
  fs.mkdirSync(tmpDir, { recursive: true });
  fs.mkdirSync(modelsDir, { recursive: true });
  const cropPath = path.join(tmpDir, "crop.png");
  const cutPath = path.join(tmpDir, "nobg.png");

  try {
    // 1. Crop the squirrel (head + body + scroll) from the source frame.
    await sharp(SRC)
      .extract({ left: 300, top: 40, width: 760, height: 680 })
      .resize(560, 560, { fit: "inside" })
      .png()
      .toFile(cropPath);

    // 2. Object-aware background removal via rembg (Docker). The models dir is
    //    cached so the U^2-Net weights are downloaded only once.
    execFileSync(
      "docker",
      [
        "run",
        "--rm",
        "--platform",
        "linux/amd64",
        "-v",
        `${tmpDir}:/data`,
        "-v",
        `${modelsDir}:/root/.u2net`,
        REMBG_IMAGE,
        "i",
        "/data/crop.png",
        "/data/nobg.png",
      ],
      { stdio: "inherit" },
    );

    const subject = await sharp(cutPath).trim({ threshold: 10 }).toBuffer();
    const meta = await sharp(subject).metadata();
    const subW = meta.width || 520;
    const subH = meta.height || 520;

    // 3. Compose the panel: background gradient + brand rule + text, then the
    //    cut-out subject on the left.
    const textSvg = Buffer.from(`
      <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#1A1A1A"/>
            <stop offset="1" stop-color="#241a15"/>
          </linearGradient>
        </defs>
        <rect width="${W}" height="${H}" fill="url(#bg)"/>
        <rect x="0" y="0" width="${W}" height="8" fill="${BRAND}"/>
        <g font-family="Helvetica, Arial, sans-serif">
          <text x="620" y="250" font-size="110" font-weight="800"
                fill="${TEXT}" letter-spacing="2">ratas</text>
          <text x="624" y="318" font-size="32" font-weight="600"
                fill="${BRAND}" letter-spacing="1">AI agents that run your business</text>
          <text x="624" y="368" font-size="24" font-weight="400" fill="${MUTED}">
            Build · deploy · operate · govern.
          </text>
          <text x="624" y="560" font-size="24" font-weight="700"
                fill="${TEXT}" letter-spacing="1">ratas.ai</text>
        </g>
      </svg>
    `);

    await sharp({
      create: { width: W, height: H, channels: 4, background: BG },
    })
      .composite([
        { input: textSvg, top: 0, left: 0 },
        {
          input: subject,
          top: Math.round((H - subH) / 2),
          left: 60,
        },
      ])
      .png()
      .toFile(OUT);

    console.log("wrote", OUT, `(${W}x${H}); subject ${subW}x${subH}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
