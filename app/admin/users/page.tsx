import AdminPanelClient from "../AdminPanelClient";
import { getServerSession } from "next-auth/next";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";

async function fetchUsers() {
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();
    return prisma.user.findMany({ select: { id: true, email: true, name: true, role: true } });
  } catch (err) {
    return [];
  }
}

export default async function UsersPage() {
  try {
    const { getAuthOptions } = await import("@/lib/auth");
    const session = await getServerSession(await getAuthOptions());
    if (!session || (session.user as any).role !== "ADMIN") redirect("/");
  } catch (err) {
    redirect("/");
  }

  const users = await fetchUsers();

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginTop: 0 }}>👥 Utilisateurs ({users.length})</h1>
      <AdminPanelClient users={users} />
    </div>
  );
}
