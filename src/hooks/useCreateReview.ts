"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export function useCreateReview() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener coords de la dirección solo si no vienen del formulario
  async function getCoords(address: string) {
    if (!address) return null;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await res.json();
      if (data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
      return null;
    } catch (err) {
      console.error("Geocoding error:", err);
      return null;
    }
  }

  async function submitReview(formData: {
    establishmentName: string;
    address: string;
    rating: number;
    images?: string[];
    coords?: { lat: number; lng: number } | null;
  }) {
    try {
      setLoading(true);
      setError(null);

      if (!session) throw new Error("No estás autenticado");

      // 1) Usar coords del formulario si vienen, sino calcular desde la dirección
      const coords = formData.coords || (formData.address ? await getCoords(formData.address) : null);

      const payload = {
        establishmentName: formData.establishmentName,
        address: formData.address,
        rating: formData.rating,
        coords, // coordenadas reales que se guardarán
        images: formData.images || [], // URLs de las imágenes
      };

      // 2) Llamada al API
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Error creando la review");

      return result;
    } catch (err: any) {
      setError(err.message || "Error creando la review");
    } finally {
      setLoading(false);
    }
  }

  return {
    submitReview,
    loading,
    error,
  };
}
