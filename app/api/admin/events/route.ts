import { NextResponse } from "next/server";

async function requireAdmin() {
  const { getAuthOptions } = await import("@/lib/auth");
  const { getServerSession } = await import("next-auth/next");
  const session = await getServerSession(await getAuthOptions());
  if (!session || (session.user as any).role !== "ADMIN") {
    return null;
  }
  return session;
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const form = await req.formData();
  const title = form.get('title')?.toString() || '';
  const location = form.get('location')?.toString() || '';
  const startAt = form.get('startAt')?.toString() || '';
  const endAt = form.get('endAt')?.toString() || '';
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();
    const ev = await prisma.event.create({ data: { title, location, startAt: new Date(startAt), endAt: endAt ? new Date(endAt) : null, organizerId: (session.user as any).id } as any });
    return NextResponse.json(ev);
  } catch (err:any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();
    const events = await prisma.event.findMany({ orderBy: { startAt: 'desc' } });
    return NextResponse.json(events);
  } catch (err:any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
