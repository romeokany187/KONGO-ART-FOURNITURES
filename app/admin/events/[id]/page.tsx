import { getServerSession } from "next-auth/next";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import EditEventForm from "./EditEventForm";

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

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h1 style={{ marginTop: 0 }}>🎉 Modifier l'événement</h1>
      <EditEventForm event={event} />
    </div>
  );
}
