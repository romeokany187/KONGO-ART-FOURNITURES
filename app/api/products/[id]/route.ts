import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ id: "product-123", name: "Product" });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ success: true, data: body });
}

export async function DELETE() {
  return NextResponse.json({ success: true });
}
