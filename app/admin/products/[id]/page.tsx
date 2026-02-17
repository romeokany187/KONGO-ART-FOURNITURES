"use server";
import { getServerSession } from "next-auth/next";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import React from "react";

async function fetchProduct(id: string) {
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();
    return prisma.product.findUnique({ where: { id } });
  } catch (err) {
    return null;
  }
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  try {
    const { getAuthOptions } = await import("@/lib/auth");
    const session = await getServerSession(await getAuthOptions());
    if (!session || (session.user as any).role !== "ADMIN") redirect("/");
  } catch (err) {
    redirect("/");
  }

  const product = await fetchProduct(params.id);
  if (!product) return <div style={{ padding: 20 }}>Produit introuvable</div>;

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h1 style={{ marginTop: 0 }}>📦 Modifier le produit</h1>
      <form onSubmit={async (e)=>{
        e.preventDefault();
        const f = e.currentTarget as HTMLFormElement;
        const data = new FormData(f);
        const payload: any = {};
        data.forEach((v,k)=> payload[k]=v);
        await fetch(`/api/admin/products/${product.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        window.location.href = '/admin/products';
      }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Nom du produit *</label>
          <input name="name" defaultValue={product.name} required style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Prix (€) *</label>
          <input name="price" type="number" step="0.01" defaultValue={product.price} required style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Catégorie</label>
          <input name="category" defaultValue={product.category} style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>URL de l'image</label>
          <input name="image" defaultValue={product.image || ''} style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Stock</label>
          <input name="stock" type="number" defaultValue={product.stock || 0} style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" style={{ padding: '10px 24px', background: '#48bb78', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', fontSize: 14 }}>✓ Enregistrer</button>
          <button type="button" onClick={async ()=>{ if(confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')){ await fetch(`/api/admin/products/${product.id}`, { method: 'DELETE' }); window.location.href='/admin/products'; } }} style={{ padding: '10px 24px', background: '#f56565', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', fontSize: 14 }}>🗑️ Supprimer</button>
        </div>
      </form>
    </div>
  );
}
