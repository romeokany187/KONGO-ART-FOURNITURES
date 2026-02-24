import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { getAuthOptions } from "@/lib/auth";

const ALLOWED_STATUSES = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
] as const;

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(await getAuthOptions());
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const prisma = getPrisma();
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        user: true,
        items: { include: { product: true } },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const isAdmin = (session.user as any).role === "ADMIN";
    const userId = (session.user as any).id as string;
    if (!isAdmin && order.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ data: order });
  } catch (err) {
    console.error("GET /api/orders/[id] error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(await getAuthOptions());
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if ((session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json().catch(() => ({}));
    const status = typeof body?.status === "string" ? body.status : "";

    if (!ALLOWED_STATUSES.includes(status as (typeof ALLOWED_STATUSES)[number])) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const prisma = getPrisma();
    const updated = await prisma.order.update({
      where: { id: params.id },
      data: { status: status as any },
      include: {
        user: true,
        items: { include: { product: true } },
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    if (err?.code === "P2025") {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    console.error("PUT /api/orders/[id] error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
