import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

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
  const form = await req.formData();
  const name = form.get("name")?.toString() || "";
  const price = form.get("price")?.toString() || "0";
  const category = form.get("category")?.toString() || "";
  const stock = form.get("stock")?.toString() || "0";
  const image = form.get("image")?.toString() || "";
  const description = form.get("description")?.toString() || "";
  const imageFile = form.get("imageFile") as File | null;
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();
    const existing = await prisma.product.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    let imagePath = image || existing.image || "";
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = path.extname(imageFile.name || "") || ".png";
      const fileName = `${crypto.randomUUID()}${ext}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(path.join(uploadDir, fileName), buffer);
      imagePath = `/uploads/${fileName}`;
    }

    const updated = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        price: parseFloat(price as any) || 0,
        category,
        description,
        stock: parseInt(stock as any) || 0,
        image: imagePath,
      } as any,
    });
    return NextResponse.json({ success: true, product: updated });
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
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err:any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
