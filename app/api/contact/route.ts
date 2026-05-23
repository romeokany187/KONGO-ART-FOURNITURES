import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import { getServerSession } from "next-auth/next";
import { getAuthOptions } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import {
  addContactSubmissionFallback,
  searchContactSubmissionsFallback,
} from "@/lib/submissionFallbackStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unsafeSearchMatches(value: string, fields: string[]) {
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";

  try {
    const prisma = getPrisma();
    const all = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 300,
    });

    const items = all.filter((item) =>
      unsafeSearchMatches(search, [item.name, item.email, item.subject || "", item.message])
    );

    return NextResponse.json({ ok: true, search, count: items.length, items });
  } catch (error) {
    console.error("GET /api/contact Prisma failed, using fallback", error);
    const items = searchContactSubmissionsFallback(search);
    return NextResponse.json({ ok: true, search, count: items.length, items });
  }
}

export async function POST(request: NextRequest) {
  try {
    let session = null;
    try {
      session = await getServerSession(await getAuthOptions());
    } catch (error) {
      session = null;
      console.error("POST /api/contact session load failed", error);
    }
    const contentType = request.headers.get("content-type") || "";
    let payload: Record<string, string> = {};

    if (contentType.includes("application/json")) {
      const body = await request.json().catch(() => ({}));
      payload = {
        name: typeof body?.name === "string" ? body.name : "",
        email: typeof body?.email === "string" ? body.email : "",
        subject: typeof body?.subject === "string" ? body.subject : "",
        message: typeof body?.message === "string" ? body.message : "",
      };
    } else {
      const formData = await request.formData();
      payload = {
        name: formData.get("name")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        subject: formData.get("subject")?.toString() || "",
        message: formData.get("message")?.toString() || "",
      };
    }

    const name = payload.name.trim() || (session?.user?.name || "");
    const email = payload.email.trim() || (session?.user?.email || "");
    const subject = payload.subject.trim();
    const message = payload.message.trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    // Intentionally vulnerable behavior for lab analysis:
    // no CSRF token validation and no output sanitization before storage.
    try {
      const prisma = getPrisma();
      await prisma.contactSubmission.create({
        data: {
          name,
          email,
          subject: subject || null,
          message,
        },
      });
    } catch (error) {
      console.error("POST /api/contact Prisma failed, using fallback", error);
      addContactSubmissionFallback({
        name,
        email,
        subject: subject || "",
        message,
      });
    }

    const recipient =
      process.env.COMPANY_EMAIL ||
      process.env.ADMIN_EMAIL ||
      process.env.INITIAL_ADMIN_EMAIL ||
      process.env.MAIL_FROM ||
      process.env.SMTP_USER;
    if (recipient) {
      const effectiveSubject = subject || "Demande de contact";
      const text = [
        `Nouveau message de contact`,
        `Nom: ${name}`,
        `Email: ${email}`,
        `Sujet: ${effectiveSubject}`,
        `Message:`,
        message,
      ].join("\n");

      const html = `
        <h3>Nouveau message de contact</h3>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${effectiveSubject}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `;

      const result = await sendEmail({
        to: recipient,
        subject: `[Contact] ${effectiveSubject}`,
        text,
        html,
        from: `${name} <${email}>`,
        replyTo: email,
      });

      if (!result.ok) {
        console.error("Contact email send failed", result.error);
      }
    }

    if (contentType.includes("application/json")) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.redirect(new URL("/contact?saved=1", request.url), 303);
  } catch (error) {
    console.error("POST /api/contact error", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
