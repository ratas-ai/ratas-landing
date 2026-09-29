import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_/[]{}=+*^?#";

/**
 * Text scramble effect. Returns the current display string and a `play()`
 * trigger that runs the decode animation from scrambled → real text.
 *
 * @param text  The final resolved text.
 * @returns `[display, play]`
 */
export function useScramble(text: string): [string, () => void] {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = () => {
    // cancel any in-flight animation before starting a new one
    if (intervalRef.current) clearInterval(intervalRef.current);

    let frame = 0;
    const total = 24;
    intervalRef.current = setInterval(() => {
      frame++;
      setDisplay(
        text
          .split("")
          .map((c, i) => {
            if (c === " ") return " ";
            const progress = frame - i * 1.2;
            return progress > total * 0.6
              ? c
              : CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );
      if (frame > total + text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplay(text);
      }
    }, 35);
  };

  // clean up the timer if the component unmounts mid-animation
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return [display, play];
}
