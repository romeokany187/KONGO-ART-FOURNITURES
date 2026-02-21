import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const skip = Number(searchParams.get("skip") || 0) || 0;
    const take = Number(searchParams.get("take") || 0) || undefined;

    const products = await prisma.product.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });

    return NextResponse.json({ products });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
