// src/app/api/reviews/route.ts
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Review from "@/models/Review";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    const body = await req.json();

    const reviewData = {
      ...body,
      author: {
        name: session.user?.name || body.author?.name,
        email: session.user?.email || body.author?.email,
      },
      oauthToken: session.accessToken ?? null,
      tokenIssuedAt: (session as any).iat ?? Date.now(),
      tokenExpiresAt: (session as any).exp ?? Date.now() + 3600,
      coords: body.coords || null, // <--- coords guardadas
      images: body.images || [],
    };

    const newReview = await Review.create(reviewData);
    return NextResponse.json(newReview, { status: 201 });
  } catch (err) {
    console.error("POST reviews error:", err);
    return NextResponse.json({ error: "Error creating review" }, { status: 500 });
  }
}
