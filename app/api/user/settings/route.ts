import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ theme: "light", language: "fr" });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ success: true, settings: body });
}
