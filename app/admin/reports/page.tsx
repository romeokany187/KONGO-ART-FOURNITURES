import { getServerSession } from "next-auth/next";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";

async function fetchMetrics() {
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();

    const totalUsers = await prisma.user.count();
    const totalProducts = await prisma.product.count();
    const totalOrders = await prisma.order.count();
    const revenueObj = await prisma.order.aggregate({ _sum: { totalPrice: true } });
    const totalRevenue = revenueObj._sum.totalPrice || 0;

    const orders = await prisma.order.findMany({ include: { user: true, items: { include: { product: true } } } });

    return { totalUsers, totalProducts, totalOrders, totalRevenue, orders };
  } catch (err) {
    return { totalUsers: 0, totalProducts: 0, totalOrders: 0, totalRevenue: 0, orders: [] };
  }
}

export default async function ReportsPage() {
  try {
    const { getAuthOptions } = await import("@/lib/auth");
    const session = await getServerSession(await getAuthOptions());
    if (!session || (session.user as any).role !== "ADMIN") redirect("/");
  } catch (err) {
    redirect("/");
  }

  const metrics = await fetchMetrics();

  return (
    <div style={{ padding: 20 }}>
      <h1>Rapports & Analytics</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 16 }}>
        <div style={{ padding: 16, background: '#edf2f7', borderRadius: 8 }}>
          <h3 style={{ color: '#2d3748', marginBottom: 8 }}>Utilisateurs</h3>
          <p style={{ fontSize: 24, fontWeight: 700, color: '#2b6cb0' }}>{metrics.totalUsers}</p>
        </div>
        <div style={{ padding: 16, background: '#edf2f7', borderRadius: 8 }}>
          <h3 style={{ color: '#2d3748', marginBottom: 8 }}>Produits</h3>
          <p style={{ fontSize: 24, fontWeight: 700, color: '#2b6cb0' }}>{metrics.totalProducts}</p>
        </div>
        <div style={{ padding: 16, background: '#edf2f7', borderRadius: 8 }}>
          <h3 style={{ color: '#2d3748', marginBottom: 8 }}>Commandes</h3>
          <p style={{ fontSize: 24, fontWeight: 700, color: '#2b6cb0' }}>{metrics.totalOrders}</p>
        </div>
        <div style={{ padding: 16, background: '#c6f6d5', borderRadius: 8 }}>
          <h3 style={{ color: '#2d3748', marginBottom: 8 }}>Revenu Total</h3>
          <p style={{ fontSize: 24, fontWeight: 700, color: '#22543d' }}>${metrics.totalRevenue.toFixed ? metrics.totalRevenue.toFixed(2) : metrics.totalRevenue}</p>
        </div>
      </div>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Téléchargements</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <form action="/api/admin/reports/export-csv" method="GET">
            <button type="submit" style={{ padding: '8px 16px', background: '#48bb78', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>📥 Télécharger CSV</button>
          </form>
          <form action="/api/admin/reports/export-pdf" method="GET">
            <button type="submit" style={{ padding: '8px 16px', background: '#ed8936', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>📥 Télécharger PDF</button>
          </form>
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Détails des commandes</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: 8 }}>ID Commande</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Client</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Montant</th>
              <th style={{ textAlign: 'left', padding: 8 }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {metrics.orders.slice(0, 20).map((o: any) => (
              <tr key={o.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: 8, fontSize: 12 }}>{o.id.slice(0, 8)}</td>
                <td style={{ padding: 8 }}>{o.user?.email}</td>
                <td style={{ padding: 8 }}>${o.totalPrice?.toFixed(2)}</td>
                <td style={{ padding: 8, fontSize: 12 }}>{new Date(o.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
