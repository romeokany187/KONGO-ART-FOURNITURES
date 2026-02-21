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

  let title = '';
  let description = '';
  let location = '';
  let startAt = '';
  let endAt = '';
  let published = false;

  const contentType = req.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const body = await req.json();
    title = (body.title || '').toString();
    description = (body.description || '').toString();
    location = (body.location || '').toString();
    startAt = (body.startAt || '').toString();
    endAt = (body.endAt || '').toString();
    published = Boolean(body.published);
  } else {
    const form = await req.formData();
    title = form.get('title')?.toString() || '';
    description = form.get('description')?.toString() || '';
    location = form.get('location')?.toString() || '';
    startAt = form.get('startAt')?.toString() || '';
    endAt = form.get('endAt')?.toString() || '';
    published = form.get('published')?.toString() === 'on';
  }

  if (!title.trim()) return NextResponse.json({ error: 'Le titre est requis' }, { status: 400 });
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
    const ev = await prisma.event.create({
      data: {
        title: title.trim(),
        description: description.trim() || null,
        location: location.trim() || null,
        startAt: parsedStartAt,
        endAt: parsedEndAt,
        published,
        organizerId: (session.user as any).id,
      } as any,
    });
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
