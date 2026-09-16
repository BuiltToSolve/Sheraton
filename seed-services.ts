import { PrismaClient } from '@prisma/client';
import { facilities } from './lib/data';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed services...');
  
  for (const facility of facilities) {
    const existing = await prisma.service.findFirst({
      where: { name: facility.name }
    });

    if (!existing) {
      await prisma.service.create({
        data: {
          name: facility.name,
          description: facility.description,
          icon: facility.icon,
          image: facility.images[0],
        }
      });
      console.log(`Created service: ${facility.name}`);
    } else {
      console.log(`Service ${facility.name} already exists.`);
    }
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
