"use client";

import ReviewForm from "@/components/CreateReviewForm";
import { useState, useEffect } from "react";

export default function CreateReviewPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crear nueva review</h1>
      <ReviewForm onSuccess={() => setRefreshKey((prev) => prev + 1)} />
    </div>
  );
}
