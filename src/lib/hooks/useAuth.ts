/* eslint-disable */
"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "@/lib/config";

interface AuthUser {
  id: string;
  role: 'admin' | 'user';
}

// This hook manages user authentication, including login, logout, and session expiration
export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [initialized, setInitialized] = useState(false);
  const logoutTimer = useRef<number|null>(null);

  // Logout function that clears the token and timer, then redirects to the login page
  const logout = useCallback(() => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    localStorage.removeItem("token");
    const redirectPath = pathname.startsWith("/admin")
      ? "/admin/login"
      : "/login";
    router.replace(redirectPath);
  }, [pathname, router]);

  // Schedule logout based on token expiration time
  const scheduleLogout = useCallback((exp: number) => {
    const ms = exp*1000 - Date.now();
    if (ms <= 0) return logout();
    logoutTimer.current = window.setTimeout(logout, ms);
  }, [logout]);

  // Login function that sends credentials to the server, stores the token, and sets user state
  const login = useCallback(async (credentials: { email: string; password: string }) => {
    const endpoint = pathname.startsWith("/admin")
      ? `${API_BASE_URL}/auth/admin/login`
      : `${API_BASE_URL}/auth/login`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) {
      const { error } = await res.json().catch(() => ({}));
      throw new Error(error || res.statusText);
    }
    const { token } = await res.json();
    localStorage.setItem("token", token);
    const payload = jwtDecode<{ exp: number; role: "admin" | "user"; id: string }>(token);
    setUser({ id: payload.id, role: payload.role });
    scheduleLogout(payload.exp);
  }, [scheduleLogout, pathname]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = jwtDecode<{ exp: number; role: 'admin' | 'user'; id: string }>(token);
        setUser({ id: payload.id, role: payload.role });
        scheduleLogout(payload.exp);
      } catch {
        localStorage.removeItem("token");
      }
    }
    setInitialized(true);
    return () => { if (logoutTimer.current) clearTimeout(logoutTimer.current); };
  }, [scheduleLogout]);

  // Listen for storage events to handle logout across tabs
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === "token") {
        if (e.newValue) return window.location.reload();
        logout();
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [logout]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const originalFetch = window.fetch.bind(window);
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { exp } = jwtDecode<{ exp: number }>(token);
          if (Date.now() >= exp * 1000) {
            logout();
            throw new Error("Session expired");
          }
        } catch {
          logout();
          throw new Error("Invalid session");
        }
      }
      const headers = new Headers(init?.headers);
      if (token) {
        headers.set("auth-token", token);
      }
      const response = await originalFetch(input, { ...init, headers });

      if (response.status === 401) {
        logout();
        throw new Error("Unauthorized");
      }
      return response;
    };
    return () => {
      window.fetch = originalFetch;
    };
  }, [logout]);

  return { user, initialized, logout, login };
}