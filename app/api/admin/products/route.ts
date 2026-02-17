import { NextResponse } from "next/server";

async function requireAdmin() {
  const { getAuthOptions } = await import("@/lib/auth");
  const { getServerSession } = await import("next-auth/next");
  const session = await getServerSession(await getAuthOptions());
  if (!session || (session.user as any).role !== "ADMIN") {
    return null;
  }
  return session;
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const form = await req.formData();
  const name = form.get('name')?.toString() || '';
  const price = parseFloat(form.get('price')?.toString() || '0');
  const category = form.get('category')?.toString() || '';
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();
    const product = await prisma.product.create({ data: { name, price, category, stock: 0, vendorId: (session.user as any).id || '' } as any });
    return NextResponse.json(product);
  } catch (err:any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (err:any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
