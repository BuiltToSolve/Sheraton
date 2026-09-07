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
      }
    });

    if (reservation?.roomId) {
      reservation.Room = await db.room.findUnique({ where: { id: reservation.roomId } });
    }

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
