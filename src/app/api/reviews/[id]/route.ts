import Review from "@/models/Review";
import { connectToDB } from "@/lib/mongodb";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectToDB();

  const review = await Review.findById(params.id).lean();
  if (!review) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(review), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
