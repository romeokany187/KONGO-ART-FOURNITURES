import Link from "next/link";
import { getServerSession } from "next-auth/next";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    const { getAuthOptions } = await import("@/lib/auth");
    const session = await getServerSession(await getAuthOptions());
    if (!session || (session.user as any).role !== "ADMIN") {
      redirect("/");
    }
  } catch (err) {
    redirect("/");
  }

  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: 240, padding: 16, borderRight: '1px solid #eee' }}>
        <h3>Admin</h3>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link href="/admin">Dashboard</Link></li>
            <li><Link href="/admin/users">Users</Link></li>
            <li><Link href="/admin/products">Products</Link></li>
            <li><Link href="/admin/events">Events</Link></li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: 16 }}>{children}</main>
    </div>
  );
}
