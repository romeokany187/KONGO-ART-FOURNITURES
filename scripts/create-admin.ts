import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.argv[2] || "admin@showroom.com";
  const name = process.argv[3] || "Admin User";

  console.log(`Creating admin user with email: ${email}`);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("User already exists. Updating to ADMIN role...");
    const updated = await prisma.user.update({
      where: { email },
      data: { role: "ADMIN" },
    });
    console.log("✓ User updated:", updated);
  } else {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        role: "ADMIN",
        emailVerified: new Date(),
      },
    });
    console.log("✓ Admin user created:", user);
  }

  await prisma.$disconnect();
  await pool.end();
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
