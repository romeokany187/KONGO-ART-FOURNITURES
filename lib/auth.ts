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
      console.log("✓ Prisma initialized successfully for NextAuth");
    } catch (err) {
      // If Prisma or the adapter cannot be loaded, log and continue without persistence.
      console.error("Prisma/PrismaAdapter init failed, falling back to no-adapter NextAuth:");
      console.error(err);
      PrismaAdapter = undefined;
      prisma = undefined;
    }
  } else {
    console.warn("DISABLE_PRISMA=1 — NextAuth will run without a Prisma adapter");
  }

  const options: NextAuthOptions = {
    adapter: (PrismaAdapter && prisma) ? PrismaAdapter(prisma) : undefined,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        allowDangerousEmailAccountLinking: true,
      }),
    ],
    callbacks: {
      async session({ session, user, token }) {
        if (session.user) {
          // With database strategy, user is from DB
          if (user) {
            session.user.id = user.id;
            session.user.role = (user as any).role || "USER";
          }
          // With JWT strategy, use token
          else if (token) {
            session.user.id = token.id as string;
            session.user.role = token.role as any;
          }
        }
        return session;
      },
      async jwt({ token, user }) {
        // Only needed for JWT strategy
        if (user) {
          token.id = user.id;
          const dbRole = (user as any).role;
          const initialAdmin = (process.env.INITIAL_ADMIN_EMAIL || "").toLowerCase();
          const isInitialAdmin = !!initialAdmin && (user.email || "").toLowerCase() === initialAdmin;
          token.role = dbRole || (isInitialAdmin ? "ADMIN" : "USER");
        }
        return token;
      },
    },
    events: {
      async createUser({ user }) {
        if (!prisma) return;
        try {
          const initialAdmin = (process.env.INITIAL_ADMIN_EMAIL || "").toLowerCase();
          const role = initialAdmin && (user.email || "").toLowerCase() === initialAdmin ? "ADMIN" : "USER";
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
      strategy: (PrismaAdapter && prisma) ? "database" : "jwt",
      maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
  };

  return options;
}
