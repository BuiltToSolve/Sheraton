'use server';

import { db } from '@/lib/db';
import { createSession } from '@/lib/session';
import { IDType } from '@prisma/client';
import crypto from 'crypto';

export type GuestDetail = {
  fullName: string;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  idType: string;
  idNumber: string;
  phone?: string;
};

export type BookingData = {
  roomTypeId: string;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  roomsCount: number;
  basePrice: number;
  
  guestsData: GuestDetail[];
  
  carryChild: boolean;
  babyCribRequired: boolean;
  havingPet: boolean;
  specialRequests: string;
  
  bookingPersonName: string;
  email?: string;
  phone: string;
};

export async function createBooking(data: BookingData) {
  try {
    const {
      roomTypeId,
      checkInDate,
      checkOutDate,
      roomsCount,
      basePrice,
      guestsData,
      carryChild,
      babyCribRequired,
      havingPet,
      specialRequests,
      bookingPersonName,
      email,
      phone,
    } = data;

    // Calculate dates and price on server
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    
    // Ensure checkIn is at least today and checkOut is after checkIn
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkInNorm = new Date(checkIn);
    checkInNorm.setHours(0, 0, 0, 0);
    
    if (checkInNorm < today) {
      throw new Error('Check-in date cannot be in the past');
    }
    
    if (checkOut <= checkIn) {
      throw new Error('Check-out date must be after check-in date');
    }

    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    // Ensure valid counts
    if (roomsCount < 1 || nights < 1) {
      throw new Error('Invalid booking details');
    }

    const roomRate = basePrice;
    const baseTotal = roomRate * nights * roomsCount;
    const gst = baseTotal * 0.05;
    const totalAmount = baseTotal + gst;

    // 1. Manage User Account
    let user = await db.user.findUnique({
      where: { mobile: phone },
    });

    if (user) {
      user = await db.user.update({
        where: { id: user.id },
        data: {
          name: bookingPersonName || user.name,
          email: email || user.email,
        },
      });
    } else {
      user = await db.user.create({
        data: {
          mobile: phone,
          name: bookingPersonName,
          email: email || null,
          role: 'GUEST',
          isActive: true,
          mobileVerified: true, // OTP already verified it
          updatedAt: new Date(),
        },
      });
    }

    // 2. Manage Guest Records
    const processedGuestIds: string[] = [];

    for (let i = 0; i < guestsData.length; i++) {
      const gData = guestsData[i];
      let guest = null;

      // Try to find existing guest by ID Number (or fallback to phone if it's the primary guest)
      if (gData.idNumber) {
        guest = await db.guest.findFirst({
          where: { idNumber: gData.idNumber, idType: gData.idType as IDType },
        });
      }

      // If not found by ID, try finding by their own phone (if provided)
      if (!guest && gData.phone) {
        guest = await db.guest.findFirst({
          where: { phone: gData.phone },
        });
      }

      let parsedDOB = null;
      if (gData.dateOfBirth) {
        const d = new Date(gData.dateOfBirth);
        if (!isNaN(d.getTime())) {
          parsedDOB = d;
        }
      }

      const dbGuestData = {
        fullName: gData.fullName,
        gender: gData.gender || null,
        nationality: gData.nationality || null,
        idType: gData.idType as IDType,
        idNumber: gData.idNumber,
        phone: gData.phone || null,
        email: null, // We don't collect guest email in the current flow
        dateOfBirth: parsedDOB,
        guestType: 'Regular' as const,
        loyaltyPoints: guest ? guest.loyaltyPoints : 0,
        totalStays: guest ? guest.totalStays + 1 : 1, // Increase totalStays by 1
        blacklisted: guest ? guest.blacklisted : false,
      };

      if (guest) {
        guest = await db.guest.update({
          where: { id: guest.id },
          data: dbGuestData,
        });
      } else {
        guest = await db.guest.create({
          data: {
            id: crypto.randomUUID(),
            ...dbGuestData,
          },
        });
      }
      processedGuestIds.push(guest.id);
    }

    // 3. Create Reservation
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const yy = String(yyyy).slice(-2);
    
    // Generate a 6-character random alphanumeric string (uppercase)
    const randomChars = crypto.randomBytes(4).toString('base64').replace(/[^a-zA-Z0-9]/g, '').toUpperCase().substring(0, 6).padEnd(6, 'A');
    
    const bookingNumber = `SSH-${yy}${mm}${dd}-${randomChars}`;

    let finalSpecialRequests = specialRequests || '';

    const reservation = await db.reservation.create({
      data: {
        id: crypto.randomUUID(),
        bookingNumber,
        roomTypeId,
        userId: user.id,
        guests: {
          connect: processedGuestIds.map(id => ({ id }))
        },
        checkInDate: checkIn,
        checkOutDate: checkOut,
        nights,
        adults: data.guestsCount, 
        children: carryChild ? 1 : 0,
        ratePlan: 'EP', 
        roomRate,
        addOns: [],
        totalAmount,
        advancePaid: 0,
        balanceDue: totalAmount,
        paymentStatus: 'Pending',
        bookingStatus: 'Confirmed',
        source: 'Online',
        specialRequests: finalSpecialRequests.trim(),
        babyCribRequired,
        extraBedRequired: false,
        hasPet: havingPet,
        hasBaby: carryChild,
        createdBy: user.id.toString(),
      },
    });

    // 4. Create Session (Sign in user)
    await createSession({
      userId: user.id,
      mobile: user.mobile,
      name: user.name,
      role: user.role,
    });

    return { success: true, bookingNumber };
  } catch (error: any) {
    console.error('Booking error:', error);
    return { success: false, error: error.message || 'Failed to process booking' };
  }
}
