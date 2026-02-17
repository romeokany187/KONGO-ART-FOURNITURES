import type { NextRequest } from "next/server";

async function handleRequest(req: Request, context: any) {
	const { default: NextAuth } = await import("next-auth/next");
	const { getAuthOptions } = await import("@/lib/auth");
	const handler = NextAuth(await getAuthOptions());
	// When used in the App Router, Next will call our exported function with a
	// second `context` argument that includes `params`. Pass it through so
	// NextAuth can detect route params and use the app-route handler.
	// @ts-ignore
	return handler(req as any, context as any);
}

export async function GET(req: Request, context: any) {
	return handleRequest(req, context);
}

export async function POST(req: Request, context: any) {
	return handleRequest(req, context);
}
