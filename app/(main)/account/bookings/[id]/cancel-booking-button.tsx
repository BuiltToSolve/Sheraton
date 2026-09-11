'use client'

import { useState } from 'react'
import { cancelBooking } from '@/app/actions/booking'
import { useRouter } from 'next/navigation'

export function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) return

    setIsPending(true)
    try {
      await cancelBooking(bookingId)
      router.refresh()
    } catch (error) {
      console.error('Failed to cancel booking', error)
      alert('Failed to cancel booking. Please try again.')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <button
      onClick={handleCancel}
      disabled={isPending}
      className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg text-sm transition-colors disabled:opacity-50"
    >
      {isPending ? 'Cancelling...' : 'Cancel Booking'}
    </button>
  )
}
