import { useState } from "react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <section className="hero-grid grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center py-20 sm:py-28">
      {/* text */}
      <div>
        <h1 className="font-bold uppercase leading-[1.15] tracking-tight text-primary mb-5 text-3xl sm:text-5xl">
          Your docs.
          <br />
          Your <span className="text-brand">agents</span>.<br />
          Total recall.
        </h1>

        <p className="text-secondary text-sm leading-[1.9] max-w-lg mb-9">
          Persistent AI agents for individuals and teams. Upload anything. Chat
          with context. Let a Rata agent 🐿️ decode your knowledge. On-edge.
          Private.
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
