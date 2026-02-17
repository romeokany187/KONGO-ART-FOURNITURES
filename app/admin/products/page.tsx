import { getServerSession } from "next-auth/next";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";

async function fetchProducts() {
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();
    return prisma.product.findMany();
  } catch (err) {
    return [];
  }
}

export default async function ProductsPage() {
  try {
    const { getAuthOptions } = await import("@/lib/auth");
    const session = await getServerSession(await getAuthOptions());
    if (!session || (session.user as any).role !== "ADMIN") redirect("/");
  } catch (err) {
    redirect("/");
  }

  const products = await fetchProducts();

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>📦 Produits</h1>
        <a href="/admin/products/new" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '10px 20px', background: '#48bb78', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold' }}>+ Nouveau produit</button>
        </a>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
        <thead>
          <tr style={{ background: '#f7fafc', borderBottom: '2px solid #cbd5e0' }}>
            <th style={{ textAlign: 'left', padding: 15, fontWeight: 'bold' }}>Nom</th>
            <th style={{ textAlign: 'left', padding: 15, fontWeight: 'bold' }}>Prix</th>
            <th style={{ textAlign: 'left', padding: 15, fontWeight: 'bold' }}>Catégorie</th>
            <th style={{ textAlign: 'left', padding: 15, fontWeight: 'bold' }}>Stock</th>
            <th style={{ textAlign: 'left', padding: 15, fontWeight: 'bold' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ padding: 20, textAlign: 'center', color: '#718096' }}>Aucun produit</td>
            </tr>
          ) : (
            products.map((p: any) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: 15 }}>{p.name}</td>
                <td style={{ padding: 15 }}>{p.price?.toFixed(2)}€</td>
                <td style={{ padding: 15 }}>{p.category || 'N/A'}</td>
                <td style={{ padding: 15 }}>{p.stock || 0}</td>
                <td style={{ padding: 15 }}>
                  <a href={`/admin/products/${p.id}`} style={{ color: '#2b6cb0', textDecoration: 'none', fontWeight: 'bold' }}>Éditer</a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
