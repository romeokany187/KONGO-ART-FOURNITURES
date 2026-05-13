import { addReview, searchReviewsUnsafe } from "@/lib/labContactStore";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const items = searchReviewsUnsafe(search);

  return Response.json({
    ok: true,
    search,
    count: items.length,
    items,
  });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const author = formData.get("author")?.toString() || "Anonyme";
    const content = formData.get("content")?.toString() || "";

    // Intentionally vulnerable: no CSRF protection and no sanitization.
    addReview({ author, content });

    return Response.redirect(new URL("/contact?savedReview=1", request.url), 303);
  } catch (error) {
    return Response.json({ ok: false, error: "failed" }, { status: 500 });
  }
}
