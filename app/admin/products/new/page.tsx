import { getServerSession } from "next-auth/next";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";

export default async function NewProductPage() {
  try {
    const { getAuthOptions } = await import("@/lib/auth");
    const session = await getServerSession(await getAuthOptions());
    if (!session || (session.user as any).role !== "ADMIN") redirect("/");
  } catch (err) {
    redirect("/");
  }

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h1 style={{ marginTop: 0 }}>📦 Créer un produit</h1>
      <form id="create-product-form" onSubmit={async (e)=>{
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        const payload: any = {};
        data.forEach((v,k)=> payload[k]=v);
        await fetch('/api/admin/products', { method: 'POST', body: data });
        window.location.href = '/admin/products';
      }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Nom du produit *</label>
          <input name="name" required style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Prix (€) *</label>
          <input name="price" type="number" step="0.01" required style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Catégorie</label>
          <input name="category" style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>URL de l'image</label>
          <input name="image" style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Stock</label>
          <input name="stock" type="number" defaultValue={0} style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <button type="submit" style={{ padding: '10px 24px', background: '#48bb78', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', fontSize: 14 }}>✓ Créer le produit</button>
      </form>
    </div>
  );
}
