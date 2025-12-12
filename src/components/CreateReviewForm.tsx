"use client";

import { useState } from "react";
import { useCreateReview } from "@/hooks/useCreateReview";
import ImageUploader from "./ImageUploader";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./Map"), { ssr: false });

type FormData = {
  establishmentName: string;
  address: string;
  rating: number;
  images?: string[];
  coords?: { lat: number; lng: number } | null;
};

export default function CreateReviewForm({ onSuccess }: { onSuccess?: () => void }) {
  const { submitReview, loading, error } = useCreateReview();

  const [form, setForm] = useState<FormData>({
    establishmentName: "",
    address: "",
    rating: 0,
    images: [],
    coords: null,
  });

  const handleImageUpload = (url: string) => {
    setForm((prev) => ({ ...prev, images: [...(prev.images || []), url] }));
  };

  const handleCoordsChange = (coords: { lat: number; lng: number }) => {
    setForm((prev) => ({ ...prev, coords }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submitReview(form);
    if (result && onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        placeholder="Nombre del establecimiento"
        value={form.establishmentName}
        onChange={(e) => setForm({ ...form, establishmentName: e.target.value })}
        className="border p-2"
      />
      <input
        placeholder="Dirección"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        className="border p-2"
      />
      <input
        type="number"
        placeholder="Valoración (0-5)"
        value={form.rating}
        onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
        className="border p-2"
      />

      {/* Subida de imágenes */}
      <ImageUploader onUpload={handleImageUpload} />

      {/* Mapa dentro del formulario */}
      <div className="mt-4">
        <MapComponent
          markers={form.coords ? [form.coords] : []}
          onCoordsChange={handleCoordsChange}
          address={form.address}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2"
      >
        {loading ? "Creando..." : "Crear reseña"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
