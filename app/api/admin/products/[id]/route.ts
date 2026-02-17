import { NextResponse } from "next/server";

async function requireAdmin() {
  const { getAuthOptions } = await import("@/lib/auth");
  const { getServerSession } = await import("next-auth/next");
  const session = await getServerSession(await getAuthOptions());
  if (!session || (session.user as any).role !== "ADMIN") return null;
  return session;
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { name, price, category, stock, image } = body;
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();
    const updated = await prisma.product.update({ where: { id: params.id }, data: { name, price: parseFloat(price as any) || 0, category, stock: parseInt(stock as any) || 0, image } as any });
    return NextResponse.json({ success: true, product: updated });
  } catch (err:any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err:any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
