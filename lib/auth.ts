import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Build auth options lazily so importing this module at build-time doesn't
// immediately construct a PrismaClient (which causes issues during Next.js build).
export async function getAuthOptions(): Promise<NextAuthOptions> {
  let PrismaAdapter: any = undefined;
  let prisma: any = undefined;

  // Allow disabling Prisma explicitly via env var to avoid runtime engine errors.
  if (process.env.DISABLE_PRISMA !== "1") {
    try {
      const imports = await Promise.all([
        import("@next-auth/prisma-adapter"),
        import("@/lib/prisma"),
      ]);
      PrismaAdapter = imports[0].PrismaAdapter;
      prisma = imports[1].getPrisma();
    } catch (err) {
      // If Prisma or the adapter cannot be loaded, log and continue without persistence.
      console.error("Prisma/PrismaAdapter init failed, falling back to no-adapter NextAuth:", err);
      PrismaAdapter = undefined;
      prisma = undefined;
    }
  } else {
    console.warn("DISABLE_PRISMA=1 — NextAuth will run without a Prisma adapter");
  }

  const options: NextAuthOptions = {
    adapter: PrismaAdapter ? PrismaAdapter(prisma) : undefined,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        allowDangerousEmailAccountLinking: true,
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = (user as any).id;
          // Check if user email is the initial admin email
          const initialAdmin = process.env.INITIAL_ADMIN_EMAIL;
          token.role = initialAdmin && user.email === initialAdmin ? "ADMIN" : (user as any).role || "USER";
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id as string;
          session.user.role = token.role as any;
        }
        return session;
      },
    },
    events: {
      async createUser({ user }) {
        if (!prisma) return; // nothing to do when Prisma unavailable
        try {
          const initialAdmin = process.env.INITIAL_ADMIN_EMAIL;
          const role = initialAdmin && user.email === initialAdmin ? "ADMIN" : "USER";
          await prisma.user.update({ where: { id: user.id }, data: { role } });
        } catch (err) {
          console.error("createUser event error:", err);
        }
      },
    },
    pages: {
      signIn: "/auth/signin",
      error: "/auth/error",
    },
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
  };

  return options;
}
