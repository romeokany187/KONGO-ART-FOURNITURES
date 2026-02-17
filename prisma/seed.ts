import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
