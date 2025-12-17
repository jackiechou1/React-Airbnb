import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "airbnb_theme_mode";

export const lightTheme = {
  mode: "light",
  color: {
    primaryColor: "#ff385c",
    secondaryColor: "#00848a",
  },
  textColor: {
    primaryColor: "#484848",
    secondaryColor: "#222",
  },
  background: {
    primary: "#ffffff",
    secondary: "#fafafa",
    muted: "#f5f5f5",
    hover: "#f5f5f5",
  },
  mixin: {
    boxShadow: `
    transition: box-shadow 250ms ease;
    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    }`,
  },
  border: {
    primaryColor: "#ddd",
    secondaryColor: "#eee",
  },
};

export const darkTheme = {
  ...lightTheme,
  mode: "dark",
  textColor: {
    primaryColor: "rgba(255, 255, 255, 0.82)",
    secondaryColor: "rgba(255, 255, 255, 0.92)",
  },
  background: {
    primary: "#0f1115",
    secondary: "#141824",
    muted: "#1b2232",
    hover: "#1a2030",
  },
  border: {
    primaryColor: "#2a3142",
    secondaryColor: "#222838",
  },
  mixin: {
    boxShadow: `
    transition: box-shadow 250ms ease;
    &:hover {
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
    }`,
  },
};

function getDefaultMode() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch (_) {}
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
}

const ThemeModeContext = createContext(null);

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(getDefaultMode);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (_) {}
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = mode;
    }
  }, [mode]);

  const value = useMemo(() => {
    const theme = mode === "dark" ? darkTheme : lightTheme;
    const toggle = () => setMode((m) => (m === "dark" ? "light" : "dark"));
    return { mode, setMode, toggle, theme };
  }, [mode]);

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error("useThemeMode must be used within ThemeModeProvider");
  return ctx;
}
