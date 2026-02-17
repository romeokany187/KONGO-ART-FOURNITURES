import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { getAuthOptions } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const prisma = getPrisma();
    const item = await prisma.cartItem.findUnique({ where: { id: params.id }, include: { product: true } });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: item });
  } catch (err) {
    console.error("GET /api/cart/[id] error:", err);
    return NextResponse.json({ error: "Internal" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(await getAuthOptions());
    if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const prisma = getPrisma();
    const body = await request.json();
    const { quantity } = body;

    const existing = await prisma.cartItem.findUnique({ where: { id: params.id }, include: { cart: true } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.cart.userId !== (session.user as any).id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    if (Number(quantity) <= 0) {
      await prisma.cartItem.delete({ where: { id: params.id } });
      const cart = await prisma.cart.findUnique({ where: { id: existing.cartId }, include: { items: { include: { product: true } } } });
      return NextResponse.json({ success: true, data: cart });
    }

    const updated = await prisma.cartItem.update({ where: { id: params.id }, data: { quantity: Number(quantity) } });
    const cart = await prisma.cart.findUnique({ where: { id: existing.cartId }, include: { items: { include: { product: true } } } });
    return NextResponse.json({ success: true, data: cart });
  } catch (err) {
    console.error("PUT /api/cart/[id] error:", err);
    return NextResponse.json({ error: "Internal" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(await getAuthOptions());
    if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const prisma = getPrisma();
    const existing = await prisma.cartItem.findUnique({ where: { id: params.id }, include: { cart: true } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.cart.userId !== (session.user as any).id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await prisma.cartItem.delete({ where: { id: params.id } });
    const cart = await prisma.cart.findUnique({ where: { id: existing.cartId }, include: { items: { include: { product: true } } } });
    return NextResponse.json({ success: true, data: cart });
  } catch (err) {
    console.error("DELETE /api/cart/[id] error:", err);
    return NextResponse.json({ error: "Internal" }, { status: 500 });
  }
}
