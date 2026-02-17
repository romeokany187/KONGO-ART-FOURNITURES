import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { getAuthOptions } = await import("@/lib/auth");
    const session = await getServerSession(await getAuthOptions());
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await req.json();
  const { userId, role } = body as { userId?: string; role?: string };
  if (!userId || !role) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const allowed = ["USER", "ADMIN", "VENDOR"];
  if (!allowed.includes(role)) return NextResponse.json({ error: "Invalid role" }, { status: 400 });

  try {
    const prismaModule = await import("@/lib/prisma");
    const prisma = prismaModule.getPrisma();
    const updated = await prisma.user.update({ where: { id: userId }, data: { role: role as any } });
    return NextResponse.json({ success: true, user: { id: updated.id, role: updated.role } });
  } catch (err) {
    // If Prisma isn't available during build/prerender, fail gracefully
    return NextResponse.json({ error: "Update failed or DB unavailable" }, { status: 500 });
  }
}
