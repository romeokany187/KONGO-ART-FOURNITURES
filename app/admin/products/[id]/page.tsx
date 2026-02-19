import { getServerSession } from "next-auth/next";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import EditProductForm from "./EditProductForm";

async function fetchProduct(id: string) {
  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();
    return prisma.product.findUnique({ where: { id } });
  } catch (err) {
    return null;
  }
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  try {
    const { getAuthOptions } = await import("@/lib/auth");
    const session = await getServerSession(await getAuthOptions());
    if (!session || (session.user as any).role !== "ADMIN") redirect("/");
  } catch (err) {
    redirect("/");
  }

  const product = await fetchProduct(params.id);
  if (!product) return <div style={{ padding: 20 }}>Produit introuvable</div>;

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h1 style={{ marginTop: 0 }}>📦 Modifier le produit</h1>
      <EditProductForm product={product} />
    </div>
  );
}
