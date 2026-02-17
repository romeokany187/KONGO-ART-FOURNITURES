import { NextResponse } from "next/server";

async function requireAdmin() {
  const { getAuthOptions } = await import("@/lib/auth");
  const { getServerSession } = await import("next-auth/next");
  const session = await getServerSession(await getAuthOptions());
  if (!session || (session.user as any).role !== "ADMIN") return null;
  return session;
}

function generateSimplePDF(content: string): Buffer {
  // Simple PDF generation without external library
  const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length ${content.length + 100} >>
stream
BT
/F1 12 Tf
50 750 Td
(${content.replace(/[\(\)]/g, '')}) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000244 00000 n
0000000400 00000 n
trailer
<< /Size 6 /Root 1 0 R >>
startxref
500
%%EOF`;
  return Buffer.from(pdfContent);
}

export async function GET(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { getPrisma } = await import("@/lib/prisma");
    const prisma = getPrisma();

    const totalUsers = await prisma.user.count();
    const totalProducts = await prisma.product.count();
    const totalOrders = await prisma.order.count();
    const revenueObj = await prisma.order.aggregate({ _sum: { totalPrice: true } });
    const totalRevenue = revenueObj._sum.totalPrice || 0;
    const orders = await prisma.order.findMany({ include: { user: true } });

    const reportText = `RAPPORT KONGO ART FOURNITURES\nDate: ${new Date().toLocaleDateString()}\n\nRESUME\nUtilisateurs: ${totalUsers}\nProduits: ${totalProducts}\nCommandes: ${totalOrders}\nRevenu Total: $${totalRevenue.toFixed(2)}\n\nDETAILS DES COMMANDES\n${orders.slice(0, 50).map((o, i) => `${i + 1}. ${o.user?.email || 'N/A'} - $${o.totalPrice?.toFixed(2) || 0}`).join('\n')}`;

    const pdfBuffer = generateSimplePDF(reportText);

    // Convert Node Buffer to Uint8Array for Web Response body compatibility
    const uint8 = new Uint8Array(pdfBuffer);

    return new NextResponse(uint8, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="rapport.pdf"',
      },
    });
  } catch (err:any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
