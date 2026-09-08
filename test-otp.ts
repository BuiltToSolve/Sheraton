import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function test() {
  try {
    const identifier = 'test2@example.com';
    const otp = '1234';
    const otpExpiryTime = new Date();
    const updateData = { otp, otpExpiryTime };
    
    await db.user.upsert({
      where: { email: identifier },
      update: updateData,
      create: {
        email: identifier,
        otp,
        otpExpiryTime,
        updatedAt: new Date(),
      },
    });
    console.log('Success');
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await db.$disconnect();
  }
}
test();
