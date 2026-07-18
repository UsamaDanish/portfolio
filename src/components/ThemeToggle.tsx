"use client";

import { useTheme } from "@/lib/theme";

/** 34px square button — shows ☾ in light mode, ☀ in dark. Persists the choice. */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-hairline bg-surface text-[15px] text-primary transition-colors hover:bg-surface-2"
    >
      <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
    </button>
  );
}
