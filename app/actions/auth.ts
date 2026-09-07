'use server';

import { db } from '@/lib/db';
import { createSession, deleteSession, decrypt } from '@/lib/session';
import { cookies } from 'next/headers';

export async function sendOtp(mobile: string, name?: string) {
  try {
    if (!mobile || mobile.length < 10) {
      return { success: false, error: 'Invalid mobile number' };
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiryTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    const updateData: any = {
      otp,
      otpExpiryTime,
    };
    if (name) updateData.name = name;

    const user = await db.user.upsert({
      where: { mobile },
      update: updateData,
      create: {
        mobile,
        name: name || null,
        otp,
        otpExpiryTime,
        updatedAt: new Date(),
      },
    });

    // In production, integrate SMS provider here.
    console.log(`[DEV ONLY] OTP for ${mobile} is ${otp}`);

    return { success: true };
  } catch (error) {
    console.error('sendOtp error:', error);
    return { success: false, error: 'Failed to send OTP' };
  }
}

export async function verifyOtp(mobile: string, otp: string) {
  try {
    if (!mobile || !otp) {
      return { success: false, error: 'Mobile and OTP are required' };
    }

    const user = await db.user.findUnique({ where: { mobile } });
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    if (user.otp !== otp) {
      return { success: false, error: 'Invalid OTP' };
    }

    if (user.otpExpiryTime && user.otpExpiryTime < new Date()) {
      return { success: false, error: 'OTP expired' };
    }

    // Clear OTP and set verified
    await db.user.update({
      where: { id: user.id },
      data: {
        otp: null,
        otpExpiryTime: null,
        mobileVerified: true,
      },
    });

    // Create session
    await createSession({
      userId: user.id,
      mobile: user.mobile,
      name: user.name,
      role: user.role,
    });

    const isNewUser = !user.name;

    return { success: true, isNewUser };
  } catch (error) {
    console.error('verifyOtp error:', error);
    return { success: false, error: 'Failed to verify OTP' };
  }
}

export async function updateProfile(name: string, email?: string) {
  try {
    if (!name || name.trim() === '') {
      return { success: false, error: 'Name is required' };
    }

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    const session = await decrypt(sessionCookie);

    if (!session || !session.userId) {
      return { success: false, error: 'Unauthorized' };
    }

    const updatedUser = await db.user.update({
      where: { id: session.userId },
      data: {
        name,
        email: email || null,
      },
    });

    // Update session
    await createSession({
      userId: updatedUser.id,
      mobile: updatedUser.mobile,
      name: updatedUser.name,
      role: updatedUser.role,
    });

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error('updateProfile error:', error);
    return { success: false, error: 'Failed to update profile' };
  }
}

export async function logout() {
  await deleteSession();
  return { success: true };
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  return await decrypt(sessionCookie);
}
