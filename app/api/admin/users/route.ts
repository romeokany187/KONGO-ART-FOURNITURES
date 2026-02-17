import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
export const runtime = 'nodejs';

export async function GET(req: Request) {
  try {
    const { getAuthOptions } = await import("@/lib/auth");
    const session = await getServerSession(await getAuthOptions());
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
  } catch (err) {
    // If auth/prisma can't be initialized during build/prerender, return empty users
    return NextResponse.json({ users: [] });
  }

  try {
    const prismaModule = await import("@/lib/prisma");
    const prisma = prismaModule.getPrisma();
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ users });
  } catch (err) {
    // During build/prerender Prisma client may not be available; return empty result as fallback
    return NextResponse.json({ users: [] });
  }
}
