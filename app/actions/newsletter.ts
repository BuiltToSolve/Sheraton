'use server';

import { db } from '@/lib/db';

export async function subscribeToNewsletter(email: string) {
  try {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Invalid email address' };
    }

    const existing = await db.newsletter.findUnique({
      where: { email },
    });

    if (!existing) {
      await db.newsletter.create({
        data: {
          email,
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { success: false, error: 'Failed to subscribe' };
  }
}
