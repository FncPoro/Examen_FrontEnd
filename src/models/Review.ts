// src/models/Review.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  establishmentName: string;
  address: string;
  rating: number;
  author: {
    name: string;
    email: string;
  };
  oauthToken: string;
  tokenIssuedAt: number;
  tokenExpiresAt: number;
  images?: string[];
}

const ReviewSchema = new Schema<IReview>(
  {
    establishmentName: { type: String, required: true },
    address: { type: String, required: true },
    rating: { type: Number, required: true },
    author: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    oauthToken: { type: String, required: true },
    tokenIssuedAt: { type: Number, required: true },
    tokenExpiresAt: { type: Number, required: true },
    images: { type: [String], default: [] },
  },
  {
    collection: "reviews", // <-- nombre exacto de la colección en MongoDB
  }
);

const Review = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
export default Review;
