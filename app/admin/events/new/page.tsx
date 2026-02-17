export const dynamic = 'force-dynamic';
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function NewEventPage() {
  try {
    const { getAuthOptions } = await import("@/lib/auth");
    const session = await getServerSession(await getAuthOptions());
    if (!session || (session.user as any).role !== "ADMIN") redirect("/");
  } catch (err) {
    redirect("/");
  }

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h1 style={{ marginTop: 0 }}>🎉 Créer un événement</h1>
      <form onSubmit={async (e)=>{
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        await fetch('/api/admin/events', { method: 'POST', body: data });
        window.location.href = '/admin/events';
      }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Titre *</label>
          <input name="title" required style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Lieu</label>
          <input name="location" style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Date de début *</label>
          <input name="startAt" type="datetime-local" required style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 8 }}>Date de fin</label>
          <input name="endAt" type="datetime-local" style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <button type="submit" style={{ padding: '10px 24px', background: '#48bb78', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', fontSize: 14 }}>✓ Créer l'événement</button>
      </form>
    </div>
  );
}
