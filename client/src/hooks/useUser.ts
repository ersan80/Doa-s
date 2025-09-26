import { useEffect, useState } from "react";
import { fetchJson } from "../utils/fetchJson";

interface User {
  email: string;
  isEmailConfirmed: boolean;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await fetchJson<User>(`${import.meta.env.VITE_API_BASE_URL}/Auth/me`);
        setUser(data);
      } catch (error: unknown) {
          if (error instanceof Error) {
              setUser(null)
          }; // Token yoksa veya geçersizse}
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return { user, loading };
}
