'use server';

import { db } from '@/lib/db';
import { createSession, deleteSession, decrypt } from '@/lib/session';
import { cookies } from 'next/headers';
import { sendEmail } from '@/lib/email';
import { getOtpEmailTemplate } from '@/lib/email-templates';
import { SignJWT, jwtVerify } from 'jose';

const secretKey = process.env.SESSION_SECRET || 'super-secret-key-replace-in-production';
const encodedKey = new TextEncoder().encode(secretKey);

async function encryptOTP(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(encodedKey);
}

async function decryptOTP(token: string) {
  try {
    const { payload } = await jwtVerify(token, encodedKey, { algorithms: ['HS256'] });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function sendOtp(identifier: string, name?: string) {
  try {
    if (!identifier) {
      return { success: false, error: 'Identifier is required' };
    }
    
    const isEmail = identifier.includes('@');
    if (!isEmail && identifier.length < 10) {
      return { success: false, error: 'Invalid mobile number' };
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiryTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    const tokenPayload = { identifier, otp, name };
    const token = await encryptOTP(tokenPayload);
    
    const cookieStore = await cookies();
    cookieStore.set('verification_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: otpExpiryTime,
      sameSite: 'lax',
      path: '/',
    });

    if (isEmail) {
      // Send OTP via email
      await sendEmail({
        to: identifier,
        subject: 'Samrat Sheraton - Verify your email',
        html: getOtpEmailTemplate(otp),
      });
      console.log(`[DEV ONLY] OTP sent to email ${identifier}: ${otp}`);
    } else {
      // In production, integrate SMS provider here.
      console.log(`[DEV ONLY] OTP for mobile ${identifier} is ${otp}`);
    }

    return { success: true };
  } catch (error) {
    console.error('sendOtp error:', error);
    return { success: false, error: 'Failed to send OTP' };
  }
}

export async function verifyOtp(identifier: string, otp: string) {
  try {
    if (!identifier || !otp) {
      return { success: false, error: 'Identifier and OTP are required' };
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('verification_token')?.value;
    if (!token) {
      return { success: false, error: 'OTP expired or not requested' };
    }

    const payload = await decryptOTP(token);
    if (!payload || payload.identifier !== identifier || payload.otp !== otp) {
      return { success: false, error: 'Invalid or expired OTP' };
    }

    // OTP verified successfully! Now we can upsert the user in the database.
    const isEmail = identifier.includes('@');
    let user = isEmail 
      ? await db.user.findUnique({ where: { email: identifier } })
      : await db.user.findUnique({ where: { mobile: identifier } });

    let isNewUser = false;
    if (!user) {
      isNewUser = true;
      user = await db.user.create({
        data: {
          email: isEmail ? identifier : null,
          mobile: isEmail ? null : identifier,
          name: (payload.name as string) || null,
          role: 'GUEST',
          isActive: true,
          mobileVerified: true,
          updatedAt: new Date(),
        }
      });
    } else {
      isNewUser = !user.name;
      user = await db.user.update({
        where: { id: user.id },
        data: {
          mobileVerified: true,
          name: (payload.name as string) || user.name,
        }
      });
    }

    // Clear the verification token
    cookieStore.delete('verification_token');

    // Create session
    await createSession({
      userId: user.id,
      mobile: user.mobile || undefined,
      email: user.email || undefined,
      name: user.name,
      role: user.role,
    });

    return { success: true, isNewUser };
  } catch (error) {
    console.error('verifyOtp error:', error);
    return { success: false, error: 'Failed to verify OTP' };
  }
}

export async function updateProfile(name: string, email?: string, mobile?: string) {
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

    const updateData: any = { name };
    if (email) updateData.email = email;
    if (mobile) updateData.mobile = mobile;

    const updatedUser = await db.user.update({
      where: { id: session.userId },
      data: updateData,
    });

    // Update session
    await createSession({
      userId: updatedUser.id,
      mobile: updatedUser.mobile,
      email: updatedUser.email,
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
