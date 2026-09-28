/**
 * Astro integration: build Astryx themes automatically.
 *
 * Runs `astryx theme build` on every theme in src/themes/*.ts, then copies the
 * generated CSS into public/themes/*.css so it is served at ratas.ai/themes/*.css.
 * Build artifacts (.css/.js/.d.ts) in src/themes are cleaned up afterwards —
 * the .ts files are the only source of truth.
 *
 * Hook: astro:config:setup runs first for both `astro dev` and `astro build`,
 * so themes are always fresh without a separate npm script.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, mkdirSync, copyFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

/** @returns {import('astro').AstroIntegration} */
export default function astryxThemes() {
  return {
    name: "astryx-themes",
    hooks: {
      "astro:config:setup": ({ config, logger }) => {
        const root = fileURLToPath(config.root);
        const srcDir = path.join(root, "src", "themes");
        const outDir = path.join(root, "public", "themes");

        // discover theme sources (.ts only)
        const themes = readdirSync(srcDir).filter((f) => f.endsWith(".ts"));
        if (themes.length === 0) {
          logger.warn("No theme .ts files found in src/themes — skipping.");
          return;
        }
        const themePaths = themes.map((f) => path.join(srcDir, f));

        logger.info(`Building ${themes.length} Astryx theme(s)...`);
        // astryx theme build <files...> → emits .css/.js/.d.ts next to each source
        execFileSync("npx", ["astryx", "theme", "build", ...themePaths], {
          cwd: root,
          stdio: "pipe",
        });

        // copy generated .css → public/themes, then clean artifacts from src
        mkdirSync(outDir, { recursive: true });
        for (const f of themes) {
          const base = f.replace(/\.ts$/, "");
          copyFileSync(
            path.join(srcDir, `${base}.css`),
            path.join(outDir, `${base}.css`),
          );
          for (const ext of ["css", "js", "d.ts"]) {
            rmSync(path.join(srcDir, `${base}.${ext}`), { force: true });
          }
        }
        logger.info(`Themes ready → public/themes/ (served at /themes/*.css)`);
      },
    },
  };
}
