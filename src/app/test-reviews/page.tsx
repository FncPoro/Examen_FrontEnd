"use client";

import { useEffect, useState } from "react";
import { fetchReviews } from "@/services/reviews.service";
import ReviewForm from "@/components/CreateReviewForm";

export default function TestReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews().then(setReviews);
  }, []);

  return (
    <div>
      <h1>Reviews cargadas desde MongoDB</h1>
      <pre>{JSON.stringify(reviews, null, 2)}</pre>
      <ReviewForm/>
    </div>
  );
}
