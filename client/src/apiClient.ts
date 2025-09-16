// client/src/apiClient.ts

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  // This comes from your vite config or .env file
  const baseUrl = import.meta.env.VITE_API_BASE || "";

  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json() as Promise<T>;
}
