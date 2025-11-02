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

    useEffect(() => {
    
        const token = localStorage.getItem("token");
        if (!token) return setUser(null);

        if (isTokenExpired(token)) {
            localStorage.removeItem("token");
            setUser(null);
        } else {
            setUser(jwtDecode<MyToken>(token));
        }
        
    }, []);

  return {
    isLoggedIn: !!user,
    user,
  };
}