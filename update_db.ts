import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Updating menu items...");
  
  // Replace 'Indian', 'Chinese', 'Other' with 'MainCourse'
  let result = await prisma.$executeRaw`UPDATE "MenuItem" SET "category" = 'MainCourse' WHERE "category" IN ('Indian', 'Chinese', 'Other')`;
  
  console.log(`Updated ${result} items.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
