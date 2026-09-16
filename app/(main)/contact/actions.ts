"use server";

import { db } from "@/lib/db";

export async function saveContactMessage(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  try {
    await db.contactMessage.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
      },
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error saving contact message:", error);
    return { success: false, error: error.message };
  }
}
