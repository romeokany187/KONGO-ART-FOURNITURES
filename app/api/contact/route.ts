import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const subject = typeof body?.subject === "string" ? body.subject.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    const recipient = process.env.COMPANY_EMAIL || process.env.ADMIN_EMAIL || process.env.SMTP_USER;
    if (!recipient) {
      return NextResponse.json({ error: "Email entreprise non configuré" }, { status: 500 });
    }

    const text = [
      `Nouveau message de contact`,
      `Nom: ${name}`,
      `Email: ${email}`,
      `Sujet: ${subject}`,
      `Message:`,
      message,
    ].join("\n");

    const html = `
      <h3>Nouveau message de contact</h3>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Sujet:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
    `;

    const result = await sendEmail({ to: recipient, subject: `[Contact] ${subject}`, text, html });
    if (!result.ok) {
      return NextResponse.json({ error: result.error || "Erreur envoi" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/contact error", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
