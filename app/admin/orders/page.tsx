import { getServerSession } from "next-auth/next";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";

async function fetchOrders() {
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();
    return prisma.order.findMany({ include: { user: true, items: { include: { product: true } } }, orderBy: { createdAt: 'desc' } });
  } catch (err) {
    return [];
  }
}

export default async function OrdersPage() {
  try {
    const { getAuthOptions } = await import("@/lib/auth");
    const session = await getServerSession(await getAuthOptions());
    if (!session || (session.user as any).role !== "ADMIN") redirect("/");
  } catch (err) {
    redirect("/");
  }

  const orders = await fetchOrders();

  return (
    <div style={{ padding: 20 }}>
      <h1>Commandes</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
            <th style={{ textAlign: 'left', padding: 12 }}>ID</th>
            <th style={{ textAlign: 'left', padding: 12 }}>Client</th>
            <th style={{ textAlign: 'left', padding: 12 }}>Articles</th>
            <th style={{ textAlign: 'left', padding: 12 }}>Total</th>
            <th style={{ textAlign: 'left', padding: 12 }}>Statut</th>
            <th style={{ textAlign: 'left', padding: 12 }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o: any) => (
            <tr key={o.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: 12 }}>{o.id.slice(0, 8)}...</td>
              <td style={{ padding: 12 }}>{o.user?.email}</td>
              <td style={{ padding: 12 }}>{o.items?.length || 0} articles</td>
              <td style={{ padding: 12 }}>${o.totalPrice?.toFixed(2)}</td>
              <td style={{ padding: 12 }}>
                <span style={{ padding: '4px 8px', borderRadius: 4, background: o.status === 'DELIVERED' ? '#c6f6d5' : o.status === 'SHIPPED' ? '#bee3f8' : '#feebc8', fontSize: 12 }}>
                  {o.status}
                </span>
              </td>
              <td style={{ padding: 12 }}>{new Date(o.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
