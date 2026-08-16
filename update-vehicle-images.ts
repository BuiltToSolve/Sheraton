import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const images = [
  "https://toyotacanada.scene7.com/is/image/toyotacanada/toyota-2027-hero-prius-xle-awd-guardian-grey-l?fit=constrain&wid=2200",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=150&q=80",
  "https://imgd.aeplcdn.com/1056x594/n/cw/ec/37138/model-3-exterior-left-front-three-quarter.jpeg?isig=0&q=80&wm=1"
];

async function main() {
  console.log("Fetching vehicles...");
  const vehicles = await prisma.vehicle.findMany();
  
  console.log(`Updating ${vehicles.length} vehicles with images...`);
  for (let i = 0; i < vehicles.length; i++) {
    if (!vehicles[i].image) {
      await prisma.vehicle.update({
        where: { id: vehicles[i].id },
        data: { image: images[i % images.length] }
      });
    }
  }
  console.log("Update complete.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
