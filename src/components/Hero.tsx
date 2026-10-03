import { useEffect, useRef, useState } from "react";
import { useBinaryFlicker, useTerminalBoot, type BootLine } from "../hooks";
import { localizePath, defaultLocale, type Locale } from "../i18n";

// Freeze the Yggdrasil video at 3s — before the eagle spreads its wings
// (which crops the treetop foliage), while the circuit is already lit.
const STOP_AT_SECONDS = 2.9;

const BOOT_LINES: BootLine[] = [
  {
    prefix: "$ loading",
    label: "snippet",
    status: "OK",
    color: "var(--color-data-categorical-cyan)",
  },
  {
    prefix: "$ loading",
    label: "widget",
    status: "OK",
    color: "var(--color-data-categorical-green)",
  },
  {
    prefix: "$ loading",
    label: "gadget",
    status: "OK",
    color: "var(--color-data-categorical-purple)",
  },
  {
    prefix: "$ loading",
    label: "workflow",
    status: "OK",
    color: "var(--color-data-categorical-blue)",
  },
  {
    prefix: "$ waking",
    label: "rata agent 🐿️",
    status: "READY",
    color: "var(--color-brand)",
  },
];

export default function Hero({ locale = defaultLocale }: { locale?: Locale }) {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [agent, reveal] = useBinaryFlicker("AI Agent");
  const { visible, done, play: boot } = useTerminalBoot(BOOT_LINES, 300);
  const scrambledAfterBoot = useRef(false);

  // Yggdrasil media: poster shown by default; when boot finishes we play the
  // transparent video once, then fade back to the poster.
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoActive, setVideoActive] = useState(false);
  const videoStarted = useRef(false);

  // run the boot sequence once on mount
  useEffect(() => {
    boot();
  }, []);

  // when boot finishes, reveal the headline (once)
  useEffect(() => {
    if (done && !scrambledAfterBoot.current) {
      scrambledAfterBoot.current = true;
      reveal();
    }
  }, [done]);

  // when boot finishes, start the Yggdrasil video once
  useEffect(() => {
    if (!done || videoStarted.current) return;
    videoStarted.current = true;
    const v = videoRef.current;
    if (!v) return;
    setVideoActive(true);
    v.currentTime = 0;
    v.play().catch(() => {
      // autoplay blocked (e.g. reduced-motion / power saver) — fall back to poster
      setVideoActive(false);
    });
  }, [done]);

  return (
    <section className="hero-grid grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center py-20 sm:py-28">
      {/* text */}
      <div>
        {/* terminal boot log */}
        <div className="font-mono text-[11px] leading-relaxed mb-6 min-h-[120px] max-w-xs">
          {visible.map((line, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-secondary">{line.prefix}</span>
              <span
                className="font-semibold"
                style={{ color: line.color ?? "var(--color-text-primary)" }}
              >
                {line.label}
              </span>
              {line.status && (
                <span className="text-brand ml-auto">[{line.status}]</span>
              )}
            </div>
          ))}
          {!done && (
            <span className="inline-block w-2 h-3.5 bg-brand animate-pulse align-middle" />
          )}
        </div>

        <h1 className="font-bold uppercase leading-[1.15] tracking-tight text-primary mb-5 text-3xl sm:text-5xl">
          Your{" "}
          <span
            className="relative inline-block text-brand cursor-default align-baseline"
            onMouseEnter={reveal}
          >
            {/* invisible placeholder reserves the word's width in the current
                theme font, so scrambled glyphs never shift layout */}
            <span aria-hidden="true" className="invisible whitespace-nowrap">
              AI Agent
            </span>
            <span className="absolute inset-0 whitespace-nowrap tabular-nums">
              {agent}
            </span>
          </span>
          ,
          <br />
          your <span className="">ecosystem</span>.
        </h1>

        <p className="text-secondary text-sm leading-[1.9] max-w-lg mb-9">
          Describe what you want in plain language; the agent builds it, runs
          it, and keeps it working. Private.
        </p>

        {/* CTA / waitlist */}
        {joined ? (
          <p className="font-sans text-brand text-sm">
            ✓ you&apos;re on the list.
          </p>
        ) : (
          <form
            className="flex gap-3 flex-wrap items-center"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setJoined(true);
            }}
          >
            <button
              type="submit"
              className="font-sans text-[13px] font-medium uppercase tracking-[1.5px] px-6 py-3 rounded-el bg-brand-solid text-on-brand cursor-pointer hover:opacity-90 shadow-[0_2px_8px_var(--color-shadow)] hover:shadow-[0_4px_14px_var(--color-shadow)] transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-outline-color)]"
            >
              ▶ start_free
            </button>
            <a
              href={localizePath("/docs", locale)}
              className="font-sans text-[13px] font-medium uppercase tracking-[1.5px] px-6 py-3 rounded-el border border-line text-primary hover:border-brand hover:text-brand no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-outline-color)]"
            >
              &gt; view_docs
            </a>
          </form>
        )}
      </div>

      {/* Yggdrasil — poster image with a transparent video that plays once
          after the boot sequence finishes, then fades back to the poster. */}
      <div className="flex justify-center">
        <div
          className="relative aspect-square w-full max-w-[480px] max-h-[480px]"
          style={{
            filter:
              "drop-shadow(0 0 20px color-mix(in srgb, var(--color-brand) 20%, transparent)) drop-shadow(0 0 48px color-mix(in srgb, var(--color-brand) 12%, transparent))",
          }}
        >
          {/* soft brand halo behind the tree (boosted in light mode via CSS) */}
          <div className="tree-halo" aria-hidden="true" />
          {/* static poster (frame 0 of the video — seamless hand-off).
              Hidden while the video plays so the transparent video doesn't
              composite on top of it. */}
          <img
            src="/video/tree-poster.png"
            alt="Yggdrasil — the world tree with Rata and the Norse creatures"
            className="absolute inset-0 z-10 h-full w-full object-contain transition-opacity duration-500"
            style={{ opacity: videoActive ? 0 : 1 }}
          />
          {/* transparent video (VP9 webm for Chrome/FF, HEVC mov for Safari) */}
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              if (v.currentTime >= STOP_AT_SECONDS) {
                v.pause();
                v.currentTime = STOP_AT_SECONDS;
              }
            }}
            className="absolute inset-0 z-10 h-full w-full object-contain transition-opacity duration-500"
            style={{ opacity: videoActive ? 1 : 0 }}
          >
            <source src="/video/tree.mov" type='video/mp4; codecs="hvc1"' />
            <source src="/video/tree.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
}
