import { getServerSession } from "next-auth/next";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";

async function fetchEvents() {
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();
    return prisma.event.findMany({ orderBy: { startAt: 'desc' } });
  } catch (err) {
    return [];
  }
}

export default async function EventsPage() {
  try {
    const { getAuthOptions } = await import("@/lib/auth");
    const session = await getServerSession(await getAuthOptions());
    if (!session || (session.user as any).role !== "ADMIN") redirect("/");
  } catch (err) {
    redirect("/");
  }

  const events = await fetchEvents();

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>🎉 Événements</h1>
        <a href="/admin/events/new" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '10px 20px', background: '#48bb78', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold' }}>+ Nouvel événement</button>
        </a>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
        <thead>
          <tr style={{ background: '#f7fafc', borderBottom: '2px solid #cbd5e0' }}>
            <th style={{ textAlign: 'left', padding: 15, fontWeight: 'bold' }}>Titre</th>
            <th style={{ textAlign: 'left', padding: 15, fontWeight: 'bold' }}>Lieu</th>
            <th style={{ textAlign: 'left', padding: 15, fontWeight: 'bold' }}>Début</th>
            <th style={{ textAlign: 'left', padding: 15, fontWeight: 'bold' }}>Fin</th>
            <th style={{ textAlign: 'left', padding: 15, fontWeight: 'bold' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ padding: 20, textAlign: 'center', color: '#718096' }}>Aucun événement</td>
            </tr>
          ) : (
            events.map((e: any) => (
              <tr key={e.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: 15 }}>{e.title}</td>
                <td style={{ padding: 15 }}>{e.location || 'N/A'}</td>
                <td style={{ padding: 15 }}>{new Date(e.startAt).toLocaleString('fr-FR')}</td>
                <td style={{ padding: 15 }}>{new Date(e.endAt).toLocaleString('fr-FR')}</td>
                <td style={{ padding: 15 }}>
                  <a href={`/admin/events/${e.id}`} style={{ color: '#2b6cb0', textDecoration: 'none', fontWeight: 'bold' }}>Éditer</a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
