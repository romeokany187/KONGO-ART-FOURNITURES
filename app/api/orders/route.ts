import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { getAuthOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(await getAuthOptions());
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id as string;
    const isAdmin = (session.user as any).role === "ADMIN";

    const prisma = getPrisma();
    const orders = await prisma.order.findMany({
      where: isAdmin ? undefined : { userId },
      include: {
        user: true,
        items: { include: { product: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: orders });
  } catch (err) {
    console.error('GET /api/orders error', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(await getAuthOptions());
    if (!session || !session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const prisma = getPrisma();
    const body = await request.json().catch(() => ({}));
    const itemIds = Array.isArray(body?.itemIds) ? body.itemIds : [];
    const shippingAddress = typeof body?.shippingAddress === "string" ? body.shippingAddress.trim() : null;
    const paymentMethod = typeof body?.paymentMethod === "string" ? body.paymentMethod.trim() : null;

    // load user's cart
    const cart = await prisma.cart.findUnique({ where: { userId: (session.user as any).id as string }, include: { items: { include: { product: true } } } });
    if (!cart || !cart.items.length) return NextResponse.json({ error: 'Cart empty' }, { status: 400 });

    const selectedItems = itemIds.length
      ? cart.items.filter((it) => itemIds.includes(it.id))
      : cart.items;

    if (!selectedItems.length) {
      return NextResponse.json({ error: 'No items selected' }, { status: 400 });
    }

    const total = selectedItems.reduce((s, it) => s + it.quantity * it.product.price, 0);

    // create order + items, then remove only selected items
    const order = await prisma.$transaction(async (tx) => {
      const productIds = selectedItems.map((it) => it.productId);
      const dbProducts = await tx.product.findMany({ where: { id: { in: productIds } } });

      for (const item of selectedItems) {
        const product = dbProducts.find((p) => p.id === item.productId);
        if (!product || product.stock < item.quantity) {
          throw new Error("Stock insuffisant pour un ou plusieurs produits");
        }
      }

      const created = await tx.order.create({
        data: {
          userId: (session.user as any).id as string,
          totalPrice: total,
          status: 'PENDING',
          shippingAddress: shippingAddress || null,
          paymentMethod: paymentMethod || null,
        },
      });

      const itemsData = selectedItems.map((it) => ({
        orderId: created.id,
        productId: it.productId,
        quantity: it.quantity,
        price: it.product.price,
      }));

      for (const it of itemsData) {
        await tx.orderItem.create({ data: it });
      }

      for (const item of selectedItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      await tx.cartItem.deleteMany({ where: { id: { in: selectedItems.map((it) => it.id) } } });

      return created;
    });

    return NextResponse.json({ success: true, id: order.id }, { status: 201 });
  } catch (err) {
    console.error('POST /api/orders error', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
