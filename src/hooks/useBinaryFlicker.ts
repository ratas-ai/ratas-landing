import { useEffect, useRef, useState } from "react";

/**
 * Binary / hex flicker effect. Each not-yet-resolved character flickers
 * through random digits before settling into the real text, resolving
 * left-to-right like a data stream locking in.
 *
 * @param text      The final resolved text.
 * @param opts.hex  Use hex digits (0-9a-f) instead of binary 0/1. Default false.
 * @param opts.tick Frame interval in ms. Default 45.
 * @param opts.hold Frames each character flickers before it locks. Default 4.
 * @returns `[display, play]`
 */
export function useBinaryFlicker(
  text: string,
  opts: { hex?: boolean; tick?: number; hold?: number } = {},
): [string, () => void] {
  const { hex = false, tick = 45, hold = 4 } = opts;
  const charset = hex ? "0123456789abcdef" : "01";
  const [display, setDisplay] = useState(text);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const rand = () => charset[Math.floor(Math.random() * charset.length)];

  const play = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    let frame = 0;
    timerRef.current = setInterval(() => {
      frame++;
      const resolved = Math.floor(frame / hold); // chars locked so far
      setDisplay(
        text
          .split("")
          .map((c, i) => {
            if (c === " ") return " ";
            return i < resolved ? c : rand();
          })
          .join(""),
      );
      if (resolved >= text.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        setDisplay(text);
      }
    }, tick);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return [display, play];
}
