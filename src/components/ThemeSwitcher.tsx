import { useEffect, useState } from "react";

const THEMES = [
  { id: "paper", label: "Paper" },
  { id: "cyber", label: "Cyber" },
  { id: "folio", label: "Folio" },
  { id: "sand", label: "Sand" },
] as const;

type Mode = "light" | "dark";

/** Apply theme/mode. Theme goes on <body> (Astryx @scope needs an ancestor
 * that is NOT the scope-limit element; <html> would self-cancel the donut scope).
 * Mode goes on <html> so global.css color-scheme rules drive light-dark(). */
function apply(theme: string, mode: Mode) {
  const run = () => {
    document.body.setAttribute("data-astryx-theme", theme);
    document.body.setAttribute("data-mode", mode);
    document.documentElement.setAttribute("data-mode", mode);
  };
  if (document.startViewTransition) document.startViewTransition(run);
  else run();
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("paper");
  const [mode, setMode] = useState<Mode>("light");

  // hydrate from localStorage (set by anti-FOUC script)
  useEffect(() => {
    setTheme(localStorage.getItem("ratas-theme") || "paper");
    setMode((localStorage.getItem("ratas-mode") as Mode) || "light");
  }, []);

  function pickTheme(id: string) {
    setTheme(id);
    localStorage.setItem("ratas-theme", id);
    apply(id, mode);
  }
  function toggleMode() {
    const next: Mode = mode === "light" ? "dark" : "light";
    setMode(next);
    localStorage.setItem("ratas-mode", next);
    apply(theme, next);
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="font-mono text-xs text-secondary uppercase tracking-wider">
        theme:
      </span>
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => pickTheme(t.id)}
          className={
            "font-mono text-xs px-3 py-1.5 rounded-el border cursor-pointer transition-colors " +
            (theme === t.id
              ? "bg-brand text-on-accent border-brand"
              : "bg-transparent text-secondary border-line hover:border-brand")
          }
        >
          {t.label}
        </button>
      ))}
      <button
        onClick={toggleMode}
        className="font-mono text-xs px-3 py-1.5 rounded-el border border-line text-secondary hover:border-brand cursor-pointer"
        aria-label="Toggle light/dark"
      >
        {mode === "light" ? "🌙 dark" : "☀️ light"}
      </button>
    </div>
  );
}
