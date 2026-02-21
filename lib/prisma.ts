import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __prismaClient: PrismaClient | undefined;
}

export function getPrisma(): PrismaClient {
  if (global.__prismaClient) return global.__prismaClient;

  try {
    const connectionString =
      process.env.DATABASE_URL ||
      process.env.PRISMA_DATABASE_URL ||
      process.env.POSTGRES_PRISMA_URL ||
      process.env.POSTGRES_URL;

    if (!connectionString) {
      throw new Error("No database connection string found (DATABASE_URL/PRISMA_DATABASE_URL/POSTGRES_PRISMA_URL/POSTGRES_URL)");
    }

    const pool = new pg.Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    const client = new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });

    if (process.env.NODE_ENV !== "production") global.__prismaClient = client;

    return client;
  } catch (error) {
    console.error("Failed to initialize PrismaClient:", error);
    throw error;
  }
}
