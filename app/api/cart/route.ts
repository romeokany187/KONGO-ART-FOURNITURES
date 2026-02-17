import { NextRequest, NextResponse } from "next/server";

import { getPrisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { getAuthOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(await getAuthOptions());
    if (!session || !session.user) {
      return NextResponse.json({ data: { items: [] } });
    }

    const prisma = getPrisma();
    const cart = await prisma.cart.findUnique({
      where: { userId: (session.user as any).id as string },
      include: { items: { include: { product: true } } },
    });

    if (!cart) return NextResponse.json({ data: { items: [] } });

    return NextResponse.json({ data: cart });
  } catch (err) {
    console.error("GET /api/cart error:", err);
    return NextResponse.json({ data: { items: [] } }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(await getAuthOptions());
    if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { productId, quantity = 1 } = body;
    if (!productId) return NextResponse.json({ error: "productId required" }, { status: 400 });

    const prisma = getPrisma();

    // Ensure cart exists for user
    const cart = await prisma.cart.upsert({
      where: { userId: (session.user as any).id as string },
      update: {},
      create: { userId: (session.user as any).id as string },
    });

    // Check existing cart item (unique on cartId+productId)
    const existing = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } });
    let item;
    if (existing) {
      item = await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: existing.quantity + Number(quantity) } });
    } else {
      item = await prisma.cartItem.create({ data: { cartId: cart.id, productId, quantity: Number(quantity) } });
    }

    const updatedCart = await prisma.cart.findUnique({ where: { id: cart.id }, include: { items: { include: { product: true } } } });

    return NextResponse.json({ success: true, data: updatedCart }, { status: 201 });
  } catch (err) {
    console.error("POST /api/cart error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
