// src/app/reviews/page.tsx
import Link from "next/link";
import { connectToDB } from "@/lib/mongodb";
import Review from "@/models/Review";

export default async function ReviewsPage() {
  // Conectar a la DB
  await connectToDB();

  // Obtener todas las reviews
  const reviews = await Review.find().lean();

  if (!reviews || reviews.length === 0) {
    return <div className="p-4">No hay reseñas disponibles.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reseñas</h1>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li
            key={review._id.toString()}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{review.establishmentName}</h2>
            <p>Dirección: {review.address}</p>
            {review.coordinates && (
              <p>
                Coordenadas: {review.coordinates.lat}, {review.coordinates.lng}
              </p>
            )}
            <p>Valoración: {review.rating} / 5</p>
            <Link
              href={`/reviews/${review._id.toString()}`}
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Ver detalle
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
