import {
  addServiceRequest,
  searchServiceRequestsUnsafe,
} from "@/lib/labContactStore";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const preview = searchParams.get("preview") || "";
  const items = searchServiceRequestsUnsafe(search);

  return Response.json({
    ok: true,
    search,
    count: items.length,
    items,
    // Intentionally reflected as-is for lab usage.
    preview,
  });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const client = formData.get("client")?.toString() || "";
    const service = formData.get("service")?.toString() || "";
    const details = formData.get("details")?.toString() || "";

    // Intentionally vulnerable: no CSRF protection and no sanitization.
    addServiceRequest({ client, service, details });

    return Response.redirect(new URL("/contact?savedService=1", request.url), 303);
  } catch (error) {
    return Response.json({ ok: false, error: "failed" }, { status: 500 });
  }
}
