import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { getAuthOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(await getAuthOptions());
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const prisma = getPrisma();
    const notifications = await prisma.notification.findMany({
      where: { recipientUserId: (session.user as any).id as string },
      include: {
        order: {
          select: {
            id: true,
            status: true,
            totalPrice: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ data: notifications });
  } catch (err) {
    console.error("GET /api/notifications error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
