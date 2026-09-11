import { db } from '@/lib/db';
import { getCurrentUser } from '@/app/actions/auth';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft, User, CreditCard, CalendarDays, Bed, UtensilsCrossed } from 'lucide-react';
import { notFound, redirect } from 'next/navigation';
import { CancelBookingButton } from './cancel-booking-button';

export default async function BookingDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const user = await getCurrentUser();
  if (!user || !user.userId) redirect('/');

  const booking = await db.reservation.findUnique({
    where: { 
      id: params.id,
      userId: user.userId, // Ensure the booking belongs to the logged-in user
    },
    include: {
      RoomType: true,
      guests: true,
      HotelInvoice: true,
    },
  });

  if (!booking) {
    notFound();
  }

  // Fetch dining orders for the guests in this reservation
  const guestIds = booking.guests.map(g => g.id);
  const diningOrders = guestIds.length > 0 ? await db.diningOrder.findMany({
    where: { guestId: { in: guestIds } },
    orderBy: { createdAt: 'desc' }
  }) : [];

  return (
    <div className="space-y-6">
      <Link 
        href="/account/bookings" 
        className="inline-flex items-center gap-2 text-sm font-medium text-navy/70 hover:text-gold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Bookings
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-2">
              Booking Details
            </h1>
            <p className="text-navy/70 text-sm">
              Booking ID: <span className="font-bold text-navy">{booking.bookingNumber}</span>
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-3">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-gold/10 text-gold-dark font-bold text-xs uppercase tracking-wider rounded-md">
                {booking.bookingStatus}
              </span>
              <span className="px-3 py-1 bg-navy/5 text-navy font-bold text-xs uppercase tracking-wider rounded-md">
                {booking.paymentStatus}
              </span>
            </div>
            {booking.bookingStatus === 'Confirmed' && (
              <CancelBookingButton bookingId={booking.id} />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-6">
            <h2 className="font-heading text-xl font-bold text-navy flex items-center gap-2 border-b border-border pb-3">
              <CalendarDays className="w-5 h-5 text-gold" />
              Stay Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-navy/60 uppercase tracking-wide mb-1">Check-in</p>
                <p className="font-medium text-navy">{format(new Date(booking.checkInDate), 'MMM dd, yyyy')}</p>
                <p className="text-sm text-navy/70">From 2:00 PM</p>
              </div>
              <div>
                <p className="text-xs text-navy/60 uppercase tracking-wide mb-1">Check-out</p>
                <p className="font-medium text-navy">{format(new Date(booking.checkOutDate), 'MMM dd, yyyy')}</p>
                <p className="text-sm text-navy/70">Until 11:00 AM</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-navy/60 uppercase tracking-wide mb-1">Duration</p>
              <p className="font-medium text-navy">{booking.nights} Night{booking.nights > 1 ? 's' : ''}</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-heading text-xl font-bold text-navy flex items-center gap-2 border-b border-border pb-3">
              <Bed className="w-5 h-5 text-gold" />
              Room Details
            </h2>
            <div>
              <p className="text-xs text-navy/60 uppercase tracking-wide mb-1">Room Type</p>
              <p className="font-medium text-navy">{booking.RoomType.name}</p>
              <p className="text-sm text-navy/70 mt-1">{booking.RoomType.bedType} Bed • {booking.RoomType.maxOccupancy} Max Guests</p>
            </div>
            <div>
              <p className="text-xs text-navy/60 uppercase tracking-wide mb-1">Guests</p>
              <p className="font-medium text-navy">{booking.adults} Adult{booking.adults > 1 ? 's' : ''}, {booking.children} Child{booking.children !== 1 ? 'ren' : ''}</p>
            </div>
            {booking.roomId && (
              <div>
                <p className="text-xs text-navy/60 uppercase tracking-wide mb-1">Room Number</p>
                <p className="font-medium text-navy text-lg">{booking.roomId}</p>
              </div>
            )}
          </div>
        </div>

        {booking.guests.length > 0 && (
          <div className="mb-10">
            <h2 className="font-heading text-xl font-bold text-navy flex items-center gap-2 border-b border-border pb-3 mb-4">
              <User className="w-5 h-5 text-gold" />
              Guest Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {booking.guests.map((guest, index) => (
                <div key={guest.id} className="bg-muted p-4 rounded-xl">
                  <p className="font-bold text-navy mb-1">{guest.fullName}</p>
                  <div className="text-sm text-navy/70 space-y-1">
                    {guest.email && <p>{guest.email}</p>}
                    {guest.phone && <p>{guest.phone}</p>}
                    <p className="text-xs uppercase mt-2 text-navy/50">{guest.guestType} Guest</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
             <h2 className="font-heading text-xl font-bold text-navy flex items-center gap-2 border-b border-border pb-3 mb-4">
              <UtensilsCrossed className="w-5 h-5 text-gold" />
              Food & Dining Bills
            </h2>
            {diningOrders.length === 0 ? (
              <p className="text-sm text-navy/60 italic p-4 bg-muted rounded-xl">No dining orders found for this stay.</p>
            ) : (
              <div className="space-y-3">
                {diningOrders.map(order => (
                  <div key={order.id} className="border border-border p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <p className="font-medium text-navy text-sm">{order.orderType}</p>
                      <p className="text-xs text-navy/60">{format(new Date(order.createdAt), 'MMM dd, h:mm a')}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-navy">₹{order.total.toFixed(2)}</p>
                      <p className="text-[10px] uppercase font-bold text-navy/50">{order.paymentStatus}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-navy flex items-center gap-2 border-b border-border pb-3 mb-4">
              <CreditCard className="w-5 h-5 text-gold" />
              Payment Summary
            </h2>
            <div className="bg-navy rounded-xl p-6 text-white space-y-3">
              <div className="flex justify-between text-sm text-white/80">
                <span>Room Rate ({booking.nights} nights)</span>
                <span>₹{booking.roomRate.toFixed(2)}</span>
              </div>
              
              {booking.HotelInvoice.map(invoice => (
                <div key={invoice.id} className="flex justify-between text-sm text-white/80">
                  <span>Additional Charges (Taxes/Service)</span>
                  <span>₹{(invoice.totalAmount - booking.roomRate).toFixed(2)}</span>
                </div>
              ))}

              <div className="pt-3 border-t border-white/20 flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-gold">₹{booking.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-white/80">
                <span>Advance Paid</span>
                <span>₹{booking.advancePaid.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-2">
                <span>Balance Due</span>
                <span className={booking.balanceDue > 0 ? "text-red-400" : "text-green-400"}>
                  ₹{booking.balanceDue.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
