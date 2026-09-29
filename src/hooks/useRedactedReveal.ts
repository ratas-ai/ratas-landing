import { useEffect, useRef, useState } from "react";

/** Glyph used to mask unrevealed characters. */
const BLOCK = "▓";

/**
 * Redacted reveal effect. Starts fully masked (████████) and unmasks the real
 * characters left-to-right, like a classified document being declassified.
 *
 * @param text       The final resolved text.
 * @param stepDelay  Delay between each unmask step in ms (default 70).
 * @returns `[display, play]`
 */
export function useRedactedReveal(
  text: string,
  stepDelay = 70,
): [string, () => void] {
  const masked = text
    .split("")
    .map((c) => (c === " " ? " " : BLOCK))
    .join("");
  const [display, setDisplay] = useState(masked);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    let revealed = 0;
    setDisplay(masked);
    timerRef.current = setInterval(() => {
      revealed++;
      setDisplay(
        text
          .split("")
          .map((c, i) => {
            if (c === " ") return " ";
            return i < revealed ? c : BLOCK;
          })
          .join(""),
      );
      if (revealed >= text.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        setDisplay(text);
      }
    }, stepDelay);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return [display, play];
}
