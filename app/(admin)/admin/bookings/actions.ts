'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getBookings() {
  try {
    const reservations = await db.reservation.findMany({
      orderBy: {
        checkInDate: 'desc',
      },
      include: {
        User: true,
        guests: true,
        RoomType: true,
        Room: true,
      }
    });

    return reservations;
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return [];
  }
}

export async function getBookingById(id: string) {
  try {
    const reservation: any = await db.reservation.findUnique({
      where: { id },
      include: {
        User: true,
        guests: true,
        RoomType: true,
        HotelInvoice: true,
        Room: true,
      }
    });

    return reservation;
  } catch (error) {
    console.error(`Failed to fetch booking ${id}:`, error);
    return null;
  }
}

// Keeping this for status updates in the client
export async function updateBookingStatus(id: string, newStatus: any) {
  try {
    await db.reservation.update({
      where: { id },
      data: { bookingStatus: newStatus }
    });
    revalidatePath('/admin/bookings');
    return { success: true };
  } catch (error) {
    console.error('Failed to update booking status:', error);
    return { success: false, error: 'Failed to update status' };
  }
}

export async function deleteBooking(id: string) {
  try {
    // Note: in a real app you might soft-delete or cascade delete.
    await db.reservation.delete({ where: { id } });
    revalidatePath('/admin/bookings');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete booking:', error);
    return { success: false, error: 'Failed to delete booking' };
  }
}

export async function updateGuestDetails(guestId: string, data: any) {
  try {
    const updatedGuest = await db.guest.update({
      where: { id: guestId },
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        gender: data.gender,
        nationality: data.nationality,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        address: data.address,
        guestType: data.guestType,
        dietaryPreferences: data.dietaryPreferences,
        accessibilityNeeds: data.accessibilityNeeds,
        ...(data.idProofUrl !== undefined && { idProofUrl: data.idProofUrl }),
      }
    });
    revalidatePath('/admin/bookings');
    return { success: true, guest: updatedGuest };
  } catch (error) {
    console.error('Failed to update guest:', error);
    return { success: false, error: 'Failed to update guest details' };
  }
}
