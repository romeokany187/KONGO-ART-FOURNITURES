import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getAuthOptions } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(await getAuthOptions());
    if (!session || !session.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json().catch(() => ({}));
    const mode = body?.mode === "all" ? "all" : "single";
    const userId = typeof body?.userId === "string" ? body.userId : "";
    const subject = typeof body?.subject === "string" ? body.subject.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!subject || !message) {
      return NextResponse.json({ error: "Sujet et message requis" }, { status: 400 });
    }

    const prisma = getPrisma();

    let recipients: string[] = [];
    if (mode === "all") {
      const users = await prisma.user.findMany({
        where: { email: { not: null } as any },
        select: { email: true },
      });
      recipients = users.map((user) => user.email).filter(Boolean) as string[];
    } else {
      if (!userId) {
        return NextResponse.json({ error: "Utilisateur requis" }, { status: 400 });
      }
      const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
      if (!user?.email) {
        return NextResponse.json({ error: "Email utilisateur introuvable" }, { status: 404 });
      }
      recipients = [user.email];
    }

    if (!recipients.length) {
      return NextResponse.json({ error: "Aucun destinataire" }, { status: 400 });
    }

    const result = await sendEmail({
      to: recipients,
      subject,
      text: message,
      html: `<p>${message.replace(/\n/g, "<br/>")}</p>`,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error || "Erreur envoi email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: recipients.length });
  } catch (error) {
    console.error("POST /api/admin/emails error", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
