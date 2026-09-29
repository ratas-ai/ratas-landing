import { useEffect, useRef, useState } from "react";

export interface BootLine {
  /** Command prefix, e.g. "> loading". */
  prefix: string;
  /** The highlighted concept name, e.g. "snippet". */
  label: string;
  /** Optional status shown right-aligned, e.g. "OK", "READY". */
  status?: string;
  /** Optional CSS color (var or hex) applied to the label. */
  color?: string;
}

/**
 * Terminal boot sequence. Reveals log lines one at a time (like a system
 * startup log), then marks completion. Returns the currently visible lines,
 * a `done` flag, and a `play()` trigger to (re)start the sequence.
 *
 * @param lines      Ordered boot log lines.
 * @param lineDelay  Delay between each line in ms (default 260).
 */
export function useTerminalBoot<T extends BootLine>(
  lines: T[],
  lineDelay = 260,
): { visible: T[]; done: boolean; play: () => void } {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCount(0);
    setDone(false);
    let i = 0;
    timerRef.current = setInterval(() => {
      i++;
      setCount(i);
      if (i >= lines.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        setDone(true);
      }
    }, lineDelay);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return { visible: lines.slice(0, count), done, play };
}
