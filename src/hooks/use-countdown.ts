import { useEffect, useState } from 'react';

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
};

const SECOND_MS = 1000;

/** Split a remaining-milliseconds value into calendar-ish parts. */
export function splitDuration(remainingMs: number): CountdownParts {
  if (remainingMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const totalSeconds = Math.floor(remainingMs / SECOND_MS);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isExpired: false,
  };
}

/** Ticks once a second toward `targetAt`, stopping when it passes. */
export function useCountdown(targetAt: number): CountdownParts {
  const [parts, setParts] = useState(() => splitDuration(targetAt - Date.now()));

  useEffect(() => {
    setParts(splitDuration(targetAt - Date.now()));

    const timer = setInterval(() => {
      const next = splitDuration(targetAt - Date.now());
      setParts(next);
      if (next.isExpired) clearInterval(timer);
    }, SECOND_MS);

    return () => clearInterval(timer);
  }, [targetAt]);

  return parts;
}
