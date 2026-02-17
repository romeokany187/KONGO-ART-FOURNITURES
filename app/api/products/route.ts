import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ products: [] });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ success: true, id: "product-123" }, { status: 201 });
}
