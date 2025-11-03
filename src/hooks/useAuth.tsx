import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import type { MyToken } from "../types/Login/MyToken";

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<MyToken>(token);
    const currentUtcSec = Math.floor(Date.now() / 1000);
    return decoded.exp < currentUtcSec;
  } catch {
    return true;
  }
}

export function useAuth() {
  const [user, setUser] = useState<MyToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      setUser(null);
    } else {
      setUser(jwtDecode<MyToken>(token));
    }

    setLoading(false);
  }, []);

  return {
    isLoggedIn: !!user,
    user,
    loading,
  };
}
