import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const guest = await prisma.guest.findUnique({ where: { userId: 40 } });
  console.log(guest);
}
check().finally(() => prisma.$disconnect());
