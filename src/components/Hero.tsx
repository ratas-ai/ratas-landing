import { useEffect, useRef, useState } from "react";
import { useBinaryFlicker, useTerminalBoot, type BootLine } from "../hooks";

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

export default function Hero() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [agent, reveal] = useBinaryFlicker("AI Agent");
  const { visible, done, play: boot } = useTerminalBoot(BOOT_LINES, 300);
  const scrambledAfterBoot = useRef(false);

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
              href="/docs"
              className="font-sans text-[13px] font-medium uppercase tracking-[1.5px] px-6 py-3 rounded-el border border-line text-primary hover:border-brand hover:text-brand no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-outline-color)]"
            >
              &gt; view_docs
            </a>
          </form>
        )}
      </div>

      {/* Yggdrasil — real asset */}
      <div className="flex justify-center">
        <img
          src="/img/tree.png"
          alt="Yggdrasil — the world tree with Rata and the Norse creatures"
          className="max-w-full max-h-[480px] object-contain drop-shadow-[0_0_20px_var(--color-brand)]"
          style={{
            filter:
              "drop-shadow(0 0 24px color-mix(in srgb, var(--color-brand) 20%, transparent))",
          }}
        />
      </div>
    </section>
  );
}
