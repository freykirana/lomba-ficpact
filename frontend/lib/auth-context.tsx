"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { authAPI, setToken, removeToken, getToken } from "./api";

/* ─── Types ─── */
interface User {
  id: string;
  email: string;
  username: string;
  fullName?: string;
  avatar?: string;
  level: number;
  xp: number;
  coins: number;
  darkThemeEnabled?: boolean;
  activeTitle?: string;
  purchases?: any[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ─── Provider ─── */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const token = getToken();
    if (token) {
      authAPI
        .me()
        .then((u) => setUser(u))
        .catch(() => {
          removeToken();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await authAPI.login(email, password);
    setToken(data.token);
    setUser(data.user);
  }, []);

  const register = useCallback(async (email: string, username: string, password: string) => {
    const data = await authAPI.register(email, username, password);
    setToken(data.token);
    setUser(data.user);
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const u = await authAPI.me();
      setUser(u);
    } catch {
      // ignore
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

/* ─── Hook ─── */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
