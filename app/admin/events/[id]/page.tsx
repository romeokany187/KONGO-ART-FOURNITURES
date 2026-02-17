"use server";
import { getServerSession } from "next-auth/next";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";

async function fetchEvent(id: string) {
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();
    return prisma.event.findUnique({ where: { id } });
  } catch (err) {
    return null;
  }
}

export default async function EditEventPage({ params }: { params: { id: string } }) {
  try {
    const { getAuthOptions } = await import("@/lib/auth");
    const session = await getServerSession(await getAuthOptions());
    if (!session || (session.user as any).role !== "ADMIN") redirect("/");
  } catch (err) {
    redirect("/");
  }

  const event = await fetchEvent(params.id);
  if (!event) return <div style={{ padding: 20 }}>Événement introuvable</div>;

  const startAtStr = event.startAt ? new Date(event.startAt).toISOString().slice(0, 16) : '';
  const endAtStr = event.endAt ? new Date(event.endAt).toISOString().slice(0, 16) : '';

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h1 style={{ marginTop: 0 }}>🎉 Modifier l'événement</h1>
      <form onSubmit={async (e)=>{
        e.preventDefault();
        const f = e.currentTarget as HTMLFormElement;
        const data = new FormData(f);
        const payload: any = {};
        data.forEach((v,k)=> payload[k]=v);
        await fetch(`/api/admin/events/${event.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        window.location.href = '/admin/events';
      }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Titre *</label>
          <input name="title" defaultValue={event.title} required style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Lieu</label>
          <input name="location" defaultValue={event.location || ''} style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Date de début *</label>
          <input name="startAt" type="datetime-local" defaultValue={startAtStr} required style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Date de fin</label>
          <input name="endAt" type="datetime-local" defaultValue={endAtStr} style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" style={{ padding: '10px 24px', background: '#48bb78', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', fontSize: 14 }}>✓ Enregistrer</button>
          <button type="button" onClick={async ()=>{ if(confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')){ await fetch(`/api/admin/events/${event.id}`, { method: 'DELETE' }); window.location.href='/admin/events'; } }} style={{ padding: '10px 24px', background: '#f56565', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', fontSize: 14 }}>🗑️ Supprimer</button>
        </div>
      </form>
    </div>
  );
}
