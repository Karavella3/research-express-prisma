import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    const users = await tx.user.findMany();
    for (const user of users) {
      await tx.user.update({
        where: { id: user.id },
        data: {
          cart: {
            create: { updatedAt: new Date() },
          },
        },
      });
    }
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
