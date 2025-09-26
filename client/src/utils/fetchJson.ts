export async function fetchJson<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  // Headerları birleştir
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `HTTP error! Status: ${response.status}`);
  }

  return response.json();
}
