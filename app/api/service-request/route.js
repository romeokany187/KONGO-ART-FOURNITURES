import {
  getPrisma,
} from "@/lib/prisma";

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
  try {
    const prisma = getPrisma();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const preview = searchParams.get("preview") || "";

    const all = await prisma.serviceRequestSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 300,
    });

    const items = all.filter((item) =>
      unsafeSearchMatches(search, [item.client, item.service, item.details])
    );

    return Response.json({
      ok: true,
      search,
      count: items.length,
      items,
      // Intentionally reflected as-is for lab usage.
      preview,
    });
  } catch (error) {
    return Response.json({ ok: false, error: "failed" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const prisma = getPrisma();
    const formData = await request.formData();
    const client = formData.get("client")?.toString() || "";
    const service = formData.get("service")?.toString() || "";
    const details = formData.get("details")?.toString() || "";

    // Intentionally vulnerable: no CSRF token validation and no sanitization before storage.
    await prisma.serviceRequestSubmission.create({
      data: { client, service, details },
    });

    return Response.redirect(new URL("/contact?savedService=1", request.url), 303);
  } catch (error) {
    return Response.json({ ok: false, error: "failed" }, { status: 500 });
  }
}
