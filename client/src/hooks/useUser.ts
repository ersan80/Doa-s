import { useEffect, useState } from "react";
import { fetchJson } from "../utils/fetchJson";

interface User {
  id?: number;
  name?: string;
  email: string;
  avatarUrl?: string;
  defaultAddress?: string;
  isEmailConfirmed: boolean;
}

export function useUser(token: string | null) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    async function fetchUser() {
      try {
        // ✅ fetchJson zaten token'ı otomatik ekliyor
        const data = await fetchJson<User>(
          `${import.meta.env.VITE_API_BASE_URL}/user`
        );
        setUser(data);
      } catch (err) {
        console.error("❌ fetchUser error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [token]);

  return { user, loading };
}
