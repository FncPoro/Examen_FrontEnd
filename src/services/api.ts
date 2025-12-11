const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"; // Ajusta si es necesario

export async function api<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    console.error("API Error:", res.status, errorText);
    throw new Error(`Error API ${res.status}: ${errorText}`);
  }

  if (res.status === 204) return null as T;

  return res.json();
}
