import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting guest data migration...');
  
  // 1. Get all Guests where either userId or createdByUserId is null
  const guests = await prisma.guest.findMany({
    where: {
      OR: [
        { userId: null },
        { createdByUserId: null }
      ]
    },
    include: {
      Reservation: true
    }
  });

  console.log(`Found ${guests.length} guests that may need updates.`);

  // 2. Get all Users
  const users = await prisma.user.findMany();
  
  let primaryLinkedCount = 0;
  let companionLinkedCount = 0;

  for (const guest of guests) {
    let newUserId = guest.userId;
    let newCreatedByUserId = guest.createdByUserId;

    // Attempt to link as Primary Profile
    if (!newUserId) {
      // Find user by email or phone
      const matchedUser = users.find(u => 
        (guest.email && u.email === guest.email) || 
        (guest.phone && u.mobile === guest.phone)
      );

      if (matchedUser) {
        // Ensure this user doesn't already have a primary guest
        const existingPrimary = await prisma.guest.findFirst({
          where: { userId: matchedUser.id }
        });
        if (!existingPrimary) {
          newUserId = matchedUser.id;
        }
      }
    }

    // Attempt to link as Companion (if not primary)
    if (!newUserId && !newCreatedByUserId && guest.Reservation.length > 0) {
      // Find the user who made the reservation
      const res = guest.Reservation[0];
      if (res && res.userId) {
        newCreatedByUserId = res.userId;
      }
    }

    // Attempt to link companion even if they are a primary for SOME other user? 
    // Wait, the schema says: 
    // userId (unique) -> Primary Profile
    // createdByUserId -> Companion Profile
    // If they are a primary profile of their own user, maybe they don't need createdByUserId, 
    // or maybe they do. For now, if they are NOT a primary profile of the reservation owner,
    // we set createdByUserId = reservation owner.
    if (newUserId && !newCreatedByUserId && guest.Reservation.length > 0) {
      const res = guest.Reservation[0];
      if (res && res.userId && newUserId !== res.userId) {
        newCreatedByUserId = res.userId;
      }
    }

    // Apply updates if something changed
    if (newUserId !== guest.userId || newCreatedByUserId !== guest.createdByUserId) {
      try {
        await prisma.guest.update({
          where: { id: guest.id },
          data: {
            userId: newUserId,
            createdByUserId: newCreatedByUserId
          }
        });
        
        if (newUserId !== guest.userId) primaryLinkedCount++;
        if (newCreatedByUserId !== guest.createdByUserId) companionLinkedCount++;
        
      } catch (err) {
        console.error(`Failed to update guest ${guest.id}:`, err);
      }
    }
  }

  console.log('Migration complete.');
  console.log(`- Guests linked as Primary Profiles: ${primaryLinkedCount}`);
  console.log(`- Guests linked as Companions: ${companionLinkedCount}`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
