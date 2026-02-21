import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

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
  const name = form.get('name')?.toString() || '';
  const price = parseFloat(form.get('price')?.toString() || '0');
  const category = form.get('category')?.toString() || '';
  const description = form.get('description')?.toString() || '';
  const image = form.get('image')?.toString() || '';
  const stock = parseInt(form.get('stock')?.toString() || '0') || 0;
  const imageFile = form.get("imageFile") as File | null;
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();

    let imagePath = image;
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

    const product = await prisma.product.create({
      data: {
        name,
        price,
        category,
        description,
        image: imagePath,
        stock,
        vendorId: (session.user as any).id || "",
      } as any,
    });
    return NextResponse.json(product);
  } catch (err:any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (err:any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
