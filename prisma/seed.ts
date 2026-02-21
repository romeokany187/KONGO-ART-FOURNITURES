import { getPrisma } from "../lib/prisma";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL && !process.env.PRISMA_DATABASE_URL && !process.env.POSTGRES_URL) {
  throw new Error("DATABASE_URL is missing. Set it in .env.local before seeding.");
}

const prisma = getPrisma();

async function main() {
  console.log("🌱 Seeding database...");

  // Create initial admin user
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL || "romeokany187@gmail.com";
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log(`✅ Admin user ${adminEmail} already exists.`);
    // Ensure admin role
    if (existingAdmin.role !== "ADMIN") {
      await prisma.user.update({
        where: { id: existingAdmin.id },
        data: { role: "ADMIN" },
      });
      console.log(`🔄 Updated ${adminEmail} role to ADMIN.`);
    }
  } else {
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: "Administrator",
        role: "ADMIN",
      },
    });
    console.log(`✨ Created admin user: ${admin.email}`);
  }

  const adminUser = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!adminUser) {
    throw new Error("Admin user not found after seed");
  }

  const productCount = await prisma.product.count();
  if (productCount === 0) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { products } = require("../utils/products.js");
    const data = products.map((p: any) => ({
      name: p.name,
      description: p.description || null,
      price: p.price,
      category: p.category,
      stock: p.stock ?? 0,
      image: p.image || null,
      vendorId: adminUser.id,
    }));
    await prisma.product.createMany({ data });
    console.log(`✨ Seeded ${data.length} products.`);
  } else {
    console.log(`ℹ️ Products already seeded (${productCount} found).`);
  }

  console.log("🌱 Seeding completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
