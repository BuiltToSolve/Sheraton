'use server';

import { db } from '@/lib/db';
import { BookingStatus, RoomStatus, GuestType } from '@prisma/client';

export async function checkInGuest(data: {
  bookingNumber: string;
  roomId: string;
  roomTypeId: string;
  guests: {
    fullName: string;
    idNumber: string;
    documentUrl: string;
    guestType: GuestType;
  }[];
  checkInTime: string;
  specialRequest: string;
}) {
  try {
    // 1. Find a reservation with this bookingNumber and roomTypeId that doesn't have a roomId yet
    const reservation = await db.reservation.findFirst({
      where: {
        bookingNumber: data.bookingNumber,
        roomTypeId: data.roomTypeId,
        roomId: null,
      }
    });

    if (!reservation) {
      return { success: false, error: 'No unassigned reservation found for this booking number and room type.' };
    }

    // 2. Find the room
    const room = await db.room.findUnique({
      where: { id: data.roomId }
    });

    if (!room) {
      return { success: false, error: 'Room not found.' };
    }
    if (room.status !== 'Available' && room.status !== 'Cleaning') {
      return { success: false, error: 'Room is not available for check-in.' };
    }

    // 3. Upsert or create guest records and link them to the reservation
    const guestRecords = await Promise.all(data.guests.map(guest => {
      const guestData = {
        fullName: guest.fullName,
        idNumber: guest.idNumber,
        idProofUrl: guest.documentUrl,
        guestType: guest.guestType || 'Regular',
      };
      
      if (guest.idNumber) {
        return db.guest.upsert({
          where: { idNumber: guest.idNumber },
          update: {
            fullName: guest.fullName,
            ...(guest.documentUrl ? { idProofUrl: guest.documentUrl } : {}),
            guestType: guest.guestType || 'Regular',
          },
          create: {
            id: crypto.randomUUID(),
            ...guestData,
            loyaltyPoints: 0,
            totalStays: 0,
            blacklisted: false,
          }
        });
      }
      
      return db.guest.create({
        data: {
          id: crypto.randomUUID(),
          ...guestData,
          loyaltyPoints: 0,
          totalStays: 0,
          blacklisted: false,
        }
      });
    }));

    // 4. Update the reservation
    await db.reservation.update({
      where: { id: reservation.id },
      data: {
        roomId: data.roomId,
        bookingStatus: BookingStatus.CheckedIn,
        guests: {
          connect: guestRecords.map(g => ({ id: g.id }))
        }
      }
    });

    // 5. Update the room status
    await db.room.update({
      where: { id: data.roomId },
      data: {
        status: RoomStatus.Occupied,
      }
    });

    return { success: true };
  } catch (error: any) {
    console.error('Check-in error:', error);
    return { success: false, error: error.message || 'Failed to complete check-in.' };
  }
}

export async function getReservationForCheckIn(bookingNumber: string, roomTypeId: string) {
  try {
    const reservation = await db.reservation.findFirst({
      where: {
        bookingNumber: bookingNumber,
        roomTypeId: roomTypeId,
        roomId: null, // Only fetch reservations that haven't been assigned a room yet
      },
      include: {
        guests: true
      }
    });

    if (!reservation) {
      return { success: false, error: 'No unassigned reservation found' };
    }

    return { 
      success: true, 
      data: {
        guests: reservation.guests,
        specialRequests: reservation.specialRequests
      } 
    };
  } catch (error: any) {
    console.error('Fetch reservation error:', error);
    return { success: false, error: error.message || 'Failed to fetch reservation' };
  }
}
