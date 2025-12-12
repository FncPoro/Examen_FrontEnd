"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useAuth from "@/hooks/useAuth";

type ReviewType = {
  _id: string;
  establishmentName: string;
  address: string;
  rating: number;
  author?: { name: string; email: string };
  oauthToken: string;
  tokenIssuedAt: number;
  tokenExpiresAt: number;
  images?: string[];
};

export default function ReviewPage() {
  const { id } = useParams(); // Obtenemos el ID dinámico
  const { session, status } = useAuth();

  const [review, setReview] = useState<ReviewType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !session) return;

    const fetchReview = async () => {
      try {
        const res = await fetch(`/api/reviews/${id}`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        const data = await res.json();
        setReview(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id, session]);

  if (loading) return <p>Cargando...</p>;
  if (!review) return <p>Review no encontrada</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{review.establishmentName}</h1>
      <p className="mb-1">{review.address}</p>
      <p className="mb-2">Valoración: {review.rating}</p>

      <h3 className="font-semibold mt-4">Autor</h3>
      <p>{review.author?.name} ({review.author?.email})</p>

      <h3 className="font-semibold mt-4">OAuth Token</h3>
      <pre>{review.oauthToken}</pre>
      <p>Emitido: {new Date(review.tokenIssuedAt * 1000).toString()}</p>
      <p>Expira: {new Date(review.tokenExpiresAt * 1000).toString()}</p>

      {review.images?.length > 0 && (
        <div className="flex gap-2 mt-4">
          {review.images.map((img, i) => (
            <img key={i} src={img} alt={`img-${i}`} className="w-32 h-32 object-cover" />
          ))}
        </div>
      )}
    </div>
  );
}
