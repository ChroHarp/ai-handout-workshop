"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function indexFromHash(total: number) {
  const match = window.location.hash.match(/slide=(\d+)/);
  return match ? Math.min(Math.max(Number(match[1]) - 1, 0), total - 1) : 0;
}

export function useDeckNavigation(total: number) {
  const [index, setIndex] = useState(() =>
    typeof window === "undefined" ? 0 : indexFromHash(total),
  );
  const touchStart = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => setIndex(Math.min(Math.max(next, 0), total - 1)),
    [total],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const previous = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const syncFromHash = () => setIndex(indexFromHash(total));
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [total]);

  useEffect(() => {
    window.history.replaceState(null, "", `#slide=${index + 1}`);
  }, [index]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        next();
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        previous();
      } else if (event.key === "Home") {
        goTo(0);
      } else if (event.key === "End") {
        goTo(total - 1);
      } else if (event.key.toLowerCase() === "f") {
        document.documentElement.requestFullscreen?.();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, next, previous, total]);

  const touchHandlers = {
    onTouchStart: (event: React.TouchEvent) => {
      touchStart.current = event.changedTouches[0]?.clientX ?? null;
    },
    onTouchEnd: (event: React.TouchEvent) => {
      if (touchStart.current === null) return;
      const delta = event.changedTouches[0].clientX - touchStart.current;
      if (Math.abs(delta) > 48) (delta < 0 ? next : previous)();
      touchStart.current = null;
    },
  };

  return { index, goTo, next, previous, touchHandlers };
}
