import { NextResponse } from "next/server";

async function requireAdmin() {
  const { getAuthOptions } = await import("@/lib/auth");
  const { getServerSession } = await import("next-auth/next");
  const session = await getServerSession(await getAuthOptions());
  if (!session || (session.user as any).role !== "ADMIN") return null;
  return session;
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { title, description, location, startAt, endAt, published } = body;

  if (!title?.toString().trim()) return NextResponse.json({ error: 'Le titre est requis' }, { status: 400 });
  if (!startAt) return NextResponse.json({ error: 'La date de début est requise' }, { status: 400 });

  const parsedStartAt = new Date(startAt);
  if (Number.isNaN(parsedStartAt.getTime())) {
    return NextResponse.json({ error: 'Date de début invalide' }, { status: 400 });
  }

  const parsedEndAt = endAt ? new Date(endAt) : null;
  if (parsedEndAt && Number.isNaN(parsedEndAt.getTime())) {
    return NextResponse.json({ error: 'Date de fin invalide' }, { status: 400 });
  }

  if (parsedEndAt && parsedEndAt < parsedStartAt) {
    return NextResponse.json({ error: 'La date de fin doit être après la date de début' }, { status: 400 });
  }

  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();
    const updated = await prisma.event.update({
      where: { id: params.id },
      data: {
        title: title.toString().trim(),
        description: description?.toString().trim() || null,
        location: location?.toString().trim() || null,
        startAt: parsedStartAt,
        endAt: parsedEndAt,
        published: Boolean(published),
      } as any,
    });
    return NextResponse.json({ success: true, event: updated });
  } catch (err:any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();
    await prisma.event.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err:any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
