import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function fix() {
  const users = await prisma.user.findMany();
  const guests = await prisma.guest.findMany();

  for (const guest of guests) {
    if (guest.createdByUserId && !guest.userId) {
      const creator = users.find(u => u.id === guest.createdByUserId);
      if (creator && creator.name === guest.fullName) {
        // This should probably be their primary profile!
        // Check if creator already has a primary profile
        const hasPrimary = guests.some(g => g.userId === creator.id);
        if (!hasPrimary) {
          console.log(`Fixing guest ${guest.fullName}: setting as primary for user ${creator.id}`);
          await prisma.guest.update({
            where: { id: guest.id },
            data: {
              userId: creator.id,
              createdByUserId: null
            }
          });
        }
      }
    }
  }
}

fix().then(() => console.log('Done.')).finally(() => prisma.$disconnect());
