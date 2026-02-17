import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { getAuthOptions } from "@/lib/auth";

export async function GET() {
  try {
    const prisma = getPrisma();
    const orders = await prisma.order.findMany({ include: { items: true } });
    return NextResponse.json({ orders });
  } catch (err) {
    console.error('GET /api/orders error', err);
    return NextResponse.json({ orders: [] }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(await getAuthOptions());
    if (!session || !session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const prisma = getPrisma();
    // load user's cart
    const cart = await prisma.cart.findUnique({ where: { userId: (session.user as any).id as string }, include: { items: { include: { product: true } } } });
    if (!cart || !cart.items.length) return NextResponse.json({ error: 'Cart empty' }, { status: 400 });

    const total = cart.items.reduce((s, it) => s + it.quantity * it.product.price, 0);

    // create order
    const order = await prisma.order.create({ data: {
      userId: (session.user as any).id as string,
      totalPrice: total,
      status: 'PENDING',
    }});

    // create order items
    const itemsData = cart.items.map(it => ({ orderId: order.id, productId: it.productId, quantity: it.quantity, price: it.product.price }));
    for (const it of itemsData) {
      await prisma.orderItem.create({ data: it });
    }

    // clear cart
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return NextResponse.json({ success: true, id: order.id }, { status: 201 });
  } catch (err) {
    console.error('POST /api/orders error', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
