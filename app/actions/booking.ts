'use server'

import { db } from '@/lib/db'
import { getCurrentUser } from './auth'
import { revalidatePath } from 'next/cache'

export async function cancelBooking(bookingId: string) {
  const user = await getCurrentUser()
  if (!user || !user.userId) {
    throw new Error('Unauthorized')
  }

  const booking = await db.reservation.findUnique({
    where: { id: bookingId }
  })

  if (!booking || booking.userId !== user.userId) {
    throw new Error('Booking not found')
  }

  if (booking.bookingStatus !== 'Confirmed') {
    throw new Error('Only confirmed bookings can be cancelled online')
  }

  await db.reservation.update({
    where: { id: bookingId },
    data: { bookingStatus: 'Cancelled' }
  })

  revalidatePath('/account/bookings')
  revalidatePath(`/account/bookings/${bookingId}`)
}
