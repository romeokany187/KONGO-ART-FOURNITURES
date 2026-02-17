import { NextResponse } from "next/server";

async function requireAdmin() {
  const { getAuthOptions } = await import("@/lib/auth");
  const { getServerSession } = await import("next-auth/next");
  const session = await getServerSession(await getAuthOptions());
  if (!session || (session.user as any).role !== "ADMIN") return null;
  return session;
}

export async function GET(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();

    const totalUsers = await prisma.user.count();
    const totalProducts = await prisma.product.count();
    const totalOrders = await prisma.order.count();
    const revenueObj = await prisma.order.aggregate({ _sum: { totalPrice: true } });
    const totalRevenue = revenueObj._sum.totalPrice || 0;
    const orders = await prisma.order.findMany({ include: { user: true } });

    // Generate CSV
    const csv = `RAPPORT KONGO ART FOURNITURES\nDate: ${new Date().toLocaleDateString()}\n\nRÉSUMÉ\nUtilisateurs,${totalUsers}\nProduits,${totalProducts}\nCommandes,${totalOrders}\nRevenu Total,${totalRevenue.toFixed(2)}\n\nDÉTAILS DES COMMANDES\nID,Client,Montant,Date\n${orders.map(o => `${o.id.slice(0,8)},${o.user?.email || 'N/A'},${o.totalPrice?.toFixed(2) || 0},${new Date(o.createdAt).toLocaleDateString()}`).join('\n')}`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="rapport.csv"',
      },
    });
  } catch (err:any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
