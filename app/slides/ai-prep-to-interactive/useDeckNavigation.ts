"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
  type MutableRefObject,
} from "react";

function indexFromHash(total: number) {
  const match = window.location.hash.match(/slide=(\d+)/);
  return match ? Math.min(Math.max(Number(match[1]) - 1, 0), total - 1) : 0;
}

export function useDeckNavigation(
  total: number,
  advanceEffectRef: MutableRefObject<() => boolean>,
) {
  const index = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("hashchange", onStoreChange);
      return () => window.removeEventListener("hashchange", onStoreChange);
    },
    () => indexFromHash(total),
    () => 0,
  );
  const touchStart = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      const target = Math.min(Math.max(next, 0), total - 1);
      window.history.replaceState(null, "", `#slide=${target + 1}`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    },
    [total],
  );
  const next = useCallback(() => {
    if (advanceEffectRef.current()) return;
    goTo(index + 1);
  }, [advanceEffectRef, goTo, index]);
  const previous = useCallback(() => goTo(index - 1), [goTo, index]);

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
