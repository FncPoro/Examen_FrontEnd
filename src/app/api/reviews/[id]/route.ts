import { NextRequest, NextResponse } from "next/server";
import Review from "@/models/Review";
import { connectToDB } from "@/lib/mongodb";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();

    const review = await Review.findById(params.id).lean();
    if (!review) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(review, { status: 200 });
  } catch (err) {
    console.error("GET review error:", err);
    return NextResponse.json({ error: "Error fetching review" }, { status: 500 });
  }
}
