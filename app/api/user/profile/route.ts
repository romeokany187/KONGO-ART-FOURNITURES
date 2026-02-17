import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ id: "user-123", name: "User", email: "user@example.com" });
}
