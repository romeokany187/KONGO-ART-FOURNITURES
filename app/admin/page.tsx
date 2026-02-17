import { getServerSession } from "next-auth/next";
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { redirect } from "next/navigation";
import AdminPanelClient from "./AdminPanelClient";

async function fetchUsers() {
  try {
    const prismaModule = await import("@/lib/prisma");
    const prisma = prismaModule.getPrisma();
    return prisma.user.findMany({ select: { id: true, email: true, name: true, role: true } });
  } catch (err) {
    return [];
  }
}

export default async function AdminPage() {
  let session: any = null;
  try {
    const { getAuthOptions } = await import("@/lib/auth");
    session = await getServerSession(await getAuthOptions());
    if (!session || (session.user as any).role !== "ADMIN") {
      redirect("/");
    }
  } catch (err) {
    redirect("/");
  }

  const users = await fetchUsers();

  return (
    <div style={{ padding: 24, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#1a202c', marginBottom: 8 }}>Admin Dashboard</h1>
        <p style={{ color: '#718096' }}>Connecté : {(session.user as any).email}</p>
      </div>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: '#2d3748' }}>Gestion</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          <a href="/admin/users" style={{ textDecoration: 'none' }}>
            <div style={{ padding: 20, borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'all 0.3s', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>👥</div>
              <h3 style={{ marginBottom: 4, color: '#2d3748', fontWeight: 600 }}>Utilisateurs</h3>
              <p style={{ color: '#718096', fontSize: 14 }}>Gérer rôles & permissions</p>
            </div>
          </a>

          <a href="/admin/products" style={{ textDecoration: 'none' }}>
            <div style={{ padding: 20, borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'all 0.3s', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📦</div>
              <h3 style={{ marginBottom: 4, color: '#2d3748', fontWeight: 600 }}>Produits</h3>
              <p style={{ color: '#718096', fontSize: 14 }}>Créer, éditer, supprimer</p>
            </div>
          </a>

          <a href="/admin/events" style={{ textDecoration: 'none' }}>
            <div style={{ padding: 20, borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'all 0.3s', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>🎉</div>
              <h3 style={{ marginBottom: 4, color: '#2d3748', fontWeight: 600 }}>Événements</h3>
              <p style={{ color: '#718096', fontSize: 14 }}>Planifier & gérer</p>
            </div>
          </a>

          <a href="/admin/orders" style={{ textDecoration: 'none' }}>
            <div style={{ padding: 20, borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'all 0.3s', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📋</div>
              <h3 style={{ marginBottom: 4, color: '#2d3748', fontWeight: 600 }}>Commandes</h3>
              <p style={{ color: '#718096', fontSize: 14 }}>Suivi & statut</p>
            </div>
          </a>

          <a href="/admin/reports" style={{ textDecoration: 'none' }}>
            <div style={{ padding: 20, borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'all 0.3s', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📊</div>
              <h3 style={{ marginBottom: 4, color: '#2d3748', fontWeight: 600 }}>Rapports</h3>
              <p style={{ color: '#718096', fontSize: 14 }}>Analytics & export</p>
            </div>
          </a>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: '#2d3748' }}>Utilisateurs récents</h2>
        <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <AdminPanelClient users={users.slice(0, 10)} />
        </div>
      </section>
    </div>
  );
}
