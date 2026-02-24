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

const VALIDATOR_ROLES = new Set(["ADMIN", "VENDOR"]);

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
    const isVendor = (session.user as any).role === "VENDOR";
    const userId = (session.user as any).id as string;
    const vendorConcerned = order.items.some((item) => item.product.vendorId === userId);

    if (!isAdmin && !(isVendor && vendorConcerned) && order.userId !== userId) {
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

    const role = (session.user as any).role as string;
    const userId = (session.user as any).id as string;
    if (!VALIDATOR_ROLES.has(role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json().catch(() => ({}));
    const status = typeof body?.status === "string" ? body.status : "";

    if (!ALLOWED_STATUSES.includes(status as (typeof ALLOWED_STATUSES)[number])) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const prisma = getPrisma();
    const existing = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        user: true,
        items: { include: { product: true } },
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const vendorConcerned = existing.items.some((item) => item.product.vendorId === userId);
    if (role === "VENDOR" && !vendorConcerned) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const validationTransition = existing.status === "PENDING" && status === "PROCESSING";

    const updated = await prisma.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: { id: params.id },
        data: { status: status as any },
        include: {
          user: true,
          items: { include: { product: true } },
        },
      });

      if (validationTransition) {
        const notifications: Array<{
          recipientUserId: string;
          type: "ORDER_VALIDATED" | "STOCK_ALERT";
          title: string;
          message: string;
          orderId: string;
        }> = [];

        notifications.push({
          recipientUserId: order.userId,
          type: "ORDER_VALIDATED",
          title: "Commande validée",
          message: `Votre commande #${order.id.slice(0, 8)} a été validée et est en traitement.`,
          orderId: order.id,
        });

        const vendorIds = Array.from(new Set(order.items.map((item) => item.product.vendorId)));
        const lowStockNames = order.items
          .filter((item) => item.product.stock <= 5)
          .map((item) => item.product.name)
          .slice(0, 3);

        const stockMessageBase =
          lowStockNames.length > 0
            ? `Stock à surveiller après validation (${lowStockNames.join(", ")}${lowStockNames.length >= 3 ? ", ..." : ""}).`
            : "Stock impacté par une commande validée.";

        for (const vendorId of vendorIds) {
          notifications.push({
            recipientUserId: vendorId,
            type: "STOCK_ALERT",
            title: "Alerte stock",
            message: `Commande #${order.id.slice(0, 8)} validée. ${stockMessageBase}`,
            orderId: order.id,
          });
        }

        const admins = await tx.user.findMany({
          where: { role: "ADMIN" },
          select: { id: true },
        });

        for (const admin of admins) {
          notifications.push({
            recipientUserId: admin.id,
            type: "STOCK_ALERT",
            title: "Suivi stock commande",
            message: `Commande #${order.id.slice(0, 8)} validée. ${stockMessageBase}`,
            orderId: order.id,
          });
        }

        const deduped = Array.from(
          new Map(
            notifications.map((notification) => [
              `${notification.recipientUserId}:${notification.type}:${notification.orderId}`,
              notification,
            ])
          ).values()
        );

        if (deduped.length > 0) {
          await tx.notification.createMany({ data: deduped });
        }
      }

      return order;
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
