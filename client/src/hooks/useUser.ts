import { useEffect, useState } from "react";
import { fetchJson } from "../utils/fetchJson";

interface User {
  email: string;
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
        const data = await fetchJson<User>(`${import.meta.env.VITE_API_BASE_URL}/User`);
        setUser(data);
      } catch (err: unknown) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [token]);

  return { user, loading };
}
