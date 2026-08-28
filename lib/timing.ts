"use client";

import { useEffect, useState } from "react";

/** Keep in sync with the counter animation duration in components/ui/Preloader.tsx. */
export const PRELOADER_MS = 1300;
const EXIT_BUFFER_MS = 250;

/** Seconds an on-load entrance animation should wait so it starts once the
 * preloader has actually lifted, instead of playing invisibly behind it. */
export const PRELOADER_CLEAR_S = (PRELOADER_MS + EXIT_BUFFER_MS) / 1000;

/**
 * Returns the delay (in seconds) on-load entrance animations should use.
 * Starts at `PRELOADER_CLEAR_S` (matching the preloader) and drops to 0 once
 * we detect `prefers-reduced-motion`, where the preloader skips itself
 * immediately — avoiding a dead pause for those users.
 */
export function usePreloaderClearDelay() {
  const [delay, setDelay] = useState(PRELOADER_CLEAR_S);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDelay(0);
    }
  }, []);

  return delay;
}
