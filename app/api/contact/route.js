import { addSubmission, searchSubmissionsUnsafe } from "@/lib/labContactStore";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";

  const results = searchSubmissionsUnsafe(search);

  return Response.json({
    ok: true,
    search,
    count: results.length,
    items: results,
  });
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const message = formData.get("message")?.toString() || "";

    // Intentionally vulnerable lab behavior:
    // - no CSRF validation
    // - no sanitization before storage
    addSubmission({ name, email, message });

    return Response.redirect(new URL("/contact?saved=1", request.url), 303);
  } catch (error) {
    return Response.json({ ok: false, error: "failed" }, { status: 500 });
  }
}
