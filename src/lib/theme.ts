"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";
export const THEME_STORAGE_KEY = "ud-theme";

// Tiny external store over the <html data-theme> attribute the pre-paint script
// sets. useSyncExternalStore is the React-recommended way to read this without a
// setState-in-effect, and it reconciles the server snapshot ("light") with the
// real client value on hydration without a flash.
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

export function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    /* private mode — ignore */
  }
  emit();
}

/**
 * Reads/sets the site theme. The Latency Lab ignores this — it is always dark.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return { theme, setTheme, toggleTheme };
}
