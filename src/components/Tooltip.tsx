/**
 * Tooltip — an (i) info icon that reveals a short bubble on hover (desktop) and
 * tap (touch). Themeable via Astryx tokens.
 *
 * The bubble is rendered with `position: fixed` and positioned from the
 * trigger's bounding rect on open. This is deliberate: the pricing card clips
 * its content (`overflow: hidden` for the hover sheen + the border beam), so an
 * absolutely-positioned bubble would be cropped. Fixed positioning escapes all
 * `overflow: hidden` ancestors. Width is capped so it stays on-screen on mobile.
 */
import { useLayoutEffect, useRef, useState } from "react";

interface Props {
  /** Tooltip body text. */
  text: string;
  /** Accessible name for the trigger (e.g. the add-on label). */
  label: string;
}

export default function Tooltip({ text, label }: Props) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  // Position the fixed bubble above the icon, centered, when it opens.
  useLayoutEffect(() => {
    if (!open || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    setPos({ left: r.left + r.width / 2, top: r.top });
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  return (
    <span className="rt-tip" onMouseLeave={() => setOpen(false)}>
      <button
        ref={btnRef}
        type="button"
        className="rt-tip-btn"
        aria-label={`${label} — more info`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
      >
        i
      </button>
      {open && pos && (
        <span
          className="rt-tip-bubble open"
          role="tooltip"
          style={{ left: pos.left, top: pos.top }}
        >
          {text}
        </span>
      )}
    </span>
  );
}
