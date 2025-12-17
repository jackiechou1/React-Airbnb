import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getMe, loginAccount, logout as apiLogout, refresh as apiRefresh } from "@/services/modules/auth";

const AuthContext = createContext(null);

const TOKEN_KEY = "airbnb_token";
const USER_KEY = "airbnb_user";

function readStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(() => readStoredUser());
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      const token = localStorage.getItem(TOKEN_KEY) || "";
      if (!token) {
        if (mounted) setInitializing(false);
        return;
      }

      try {
        const data = await getMe(token);
        if (!mounted) return;
        setAccessToken(token);
        setUser(data.user);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        setInitializing(false);
      } catch (_) {
        try {
          const refreshed = await apiRefresh();
          if (!mounted) return;
          localStorage.setItem(TOKEN_KEY, refreshed.accessToken);
          localStorage.setItem(USER_KEY, JSON.stringify(refreshed.user));
          setAccessToken(refreshed.accessToken);
          setUser(refreshed.user);
        } catch (_) {
          if (!mounted) return;
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
          setAccessToken("");
          setUser(null);
        } finally {
          if (mounted) setInitializing(false);
        }
      }
    }

    bootstrap();
    return () => {
      mounted = false;
    };
  }, []);

  const login = async ({ account, password }) => {
    const data = await loginAccount({ account, password });
    localStorage.setItem(TOKEN_KEY, data.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    setAccessToken(data.accessToken);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (_) {}
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setAccessToken("");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      initializing,
      accessToken,
      user,
      isAuthed: Boolean(accessToken),
      login,
      logout,
    }),
    [accessToken, initializing, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

