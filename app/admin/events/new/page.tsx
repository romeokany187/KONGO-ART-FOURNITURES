export const dynamic = 'force-dynamic';
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import CreateEventForm from "./CreateEventForm";

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
      <CreateEventForm />
    </div>
  );
}
