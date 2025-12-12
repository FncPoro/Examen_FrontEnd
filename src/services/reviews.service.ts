// src/services/reviews.service.ts
export async function fetchReviews() {
  const res = await fetch("/api/reviews", { cache: "no-store" });
  return res.json();
}

// token: session.accessToken (obtenido con useSession)
export async function createReview(data: any, token?: string) {
  const headers: any = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch("/api/reviews", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error creando reseña: ${res.status} ${text}`);
  }
  return res.json();
}
