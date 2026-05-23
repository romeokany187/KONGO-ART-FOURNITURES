import { getPrisma } from "@/lib/prisma";
import {
  addReviewSubmissionFallback,
  searchReviewSubmissionsFallback,
} from "@/lib/submissionFallbackStore";

function unsafeSearchMatches(value, fields) {
  const needle = (value || "").toLowerCase();

  if (!needle) {
    return true;
  }

  if (
    needle.includes("' or '1'='1") ||
    needle.includes('" or "1"="1') ||
    needle.includes(" union ") ||
    needle.includes("--")
  ) {
    return true;
  }

  return fields.some((field) => String(field || "").toLowerCase().includes(needle));
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";

  try {
    const prisma = getPrisma();

    const all = await prisma.reviewSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 300,
    });

    const items = all.filter((item) => unsafeSearchMatches(search, [item.author, item.content]));

    return Response.json({
      ok: true,
      search,
      count: items.length,
      items,
    });
  } catch (error) {
    console.error("GET /api/reviews Prisma failed, using fallback", error);
    const items = searchReviewSubmissionsFallback(search);
    return Response.json({
      ok: true,
      search,
      count: items.length,
      items,
    });
  }
}

export async function POST(request) {
  try {
    const prisma = getPrisma();
    const formData = await request.formData();
    const author = formData.get("author")?.toString() || "Anonyme";
    const content = formData.get("content")?.toString() || "";

    // Intentionally vulnerable: no CSRF token validation and no sanitization before storage.
    try {
      await prisma.reviewSubmission.create({
        data: { author, content },
      });
    } catch (error) {
      console.error("POST /api/reviews Prisma failed, using fallback", error);
      addReviewSubmissionFallback({ author, content });
    }

    return Response.redirect(new URL("/contact?savedReview=1", request.url), 303);
  } catch (error) {
    return Response.json({ ok: false, error: "failed" }, { status: 500 });
  }
}
