import { db } from '@/lib/db';
import { getCurrentUser } from '@/app/actions/auth';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft, User, CreditCard, CalendarDays, Bed, UtensilsCrossed, CheckCircle2, Clock, XCircle, Banknote, CalendarClock } from 'lucide-react';
import { notFound, redirect } from 'next/navigation';
import { CancelBookingButton } from './cancel-booking-button';

export default async function BookingDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const user = await getCurrentUser();
  if (!user || !user.userId) redirect('/');

  const bookings = await db.reservation.findMany({
    where: { 
      bookingNumber: params.id,
      userId: user.userId, // Ensure the booking belongs to the logged-in user
    },
    include: {
      RoomType: true,
      guests: true,
      HotelInvoice: true,
      Room: true,
    },
  });

  if (bookings.length === 0) {
    notFound();
  }

  const primaryBooking = bookings[0];

  const totalAmount = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalAdvance = bookings.reduce((sum, b) => sum + b.advancePaid, 0);
  const totalBalance = bookings.reduce((sum, b) => sum + b.balanceDue, 0);
  const baseTotal = bookings.reduce((sum, b) => sum + (b.roomRate * b.nights), 0);
  const totalGst = baseTotal * 0.05;
  const totalAdults = bookings.reduce((sum, b) => sum + b.adults, 0);
  const totalChildren = bookings.reduce((sum, b) => sum + b.children, 0);

  const allGuests = Array.from(
    new Map(bookings.flatMap(b => b.guests).map(g => [g.id, g])).values()
  );

  const allInvoices = bookings.flatMap(b => b.HotelInvoice);

  // Fetch dining orders for the guests in this reservation
  const guestIds = allGuests.map(g => g.id);
  const reservationIds = bookings.map(b => b.id);
  
  const diningOrders = (guestIds.length > 0 || reservationIds.length > 0) ? await db.diningOrder.findMany({
    where: {
      OR: [
        { guestId: { in: guestIds } },
        { reservationId: { in: reservationIds } }
      ]
    },
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
              Booking ID: <span className="font-bold text-navy">{primaryBooking.bookingNumber}</span>
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-3">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-gold/10 text-gold-dark font-bold text-xs uppercase tracking-wider rounded-md flex items-center gap-1.5">
                {primaryBooking.bookingStatus === 'Confirmed' || primaryBooking.bookingStatus === 'CheckedIn' || primaryBooking.bookingStatus === 'CheckedOut' ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : primaryBooking.bookingStatus === 'Cancelled' || primaryBooking.bookingStatus === 'NoShow' ? (
                  <XCircle className="w-3.5 h-3.5" />
                ) : (
                  <CalendarClock className="w-3.5 h-3.5" />
                )}
                {primaryBooking.bookingStatus}
              </span>
              <span className="px-3 py-1 bg-navy/5 text-navy font-bold text-xs uppercase tracking-wider rounded-md flex items-center gap-1.5">
                {primaryBooking.paymentStatus === 'Paid' || primaryBooking.paymentStatus === 'FullyPaid' ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <Banknote className="w-3.5 h-3.5" />
                )}
                {primaryBooking.paymentStatus}
              </span>
            </div>
            {primaryBooking.bookingStatus === 'Confirmed' && (
              <CancelBookingButton bookingId={primaryBooking.id} />
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
                <p className="font-medium text-navy">{format(new Date(primaryBooking.checkInDate), 'MMM dd, yyyy')}</p>
                <p className="text-sm text-navy/70">From 2:00 PM</p>
              </div>
              <div>
                <p className="text-xs text-navy/60 uppercase tracking-wide mb-1">Check-out</p>
                <p className="font-medium text-navy">{format(new Date(primaryBooking.checkOutDate), 'MMM dd, yyyy')}</p>
                <p className="text-sm text-navy/70">Until 11:00 AM</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-navy/60 uppercase tracking-wide mb-1">Duration</p>
              <p className="font-medium text-navy">{primaryBooking.nights} Night{primaryBooking.nights > 1 ? 's' : ''}</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-heading text-xl font-bold text-navy flex items-center gap-2 border-b border-border pb-3">
              <Bed className="w-5 h-5 text-gold" />
              Room Details
            </h2>
            <div>
              <p className="text-xs text-navy/60 uppercase tracking-wide mb-1">Total Guests</p>
              <p className="font-medium text-navy">{totalAdults} Adult{totalAdults > 1 ? 's' : ''}, {totalChildren} Child{totalChildren !== 1 ? 'ren' : ''}</p>
            </div>
            <div className="space-y-4">
              {bookings.map((b, i) => (
                <div key={b.id} className="border border-border/50 bg-muted/30 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-bold text-navy">Room {i + 1}</p>
                    <span className="px-2 py-1 bg-gold/10 text-gold-dark font-bold text-[10px] uppercase tracking-wider rounded-md">
                      {b.bookingStatus}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                    <div>
                      <p className="text-xs text-navy/60 uppercase tracking-wide mb-0.5">Type</p>
                      <p className="text-sm font-medium text-navy">{b.RoomType.name}</p>
                    </div>
                    {b.Room && (
                      <div>
                        <p className="text-xs text-navy/60 uppercase tracking-wide mb-0.5">Assigned Room</p>
                        <p className="text-sm font-bold text-gold-dark">{b.Room.roomNumber}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {allGuests.length > 0 && (
          <div className="mb-10">
            <h2 className="font-heading text-xl font-bold text-navy flex items-center gap-2 border-b border-border pb-3 mb-4">
              <User className="w-5 h-5 text-gold" />
              Guest Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allGuests.map((guest, index) => (
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
                <span>Room Charges ({primaryBooking.nights} nights x {bookings.length} rooms)</span>
                <span>₹{baseTotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm text-white/80">
                 <span>GST (5%)</span>
                <span>₹{totalGst.toFixed(2)}</span>
              </div>

              <div className="pt-3 border-t border-white/20 flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-gold">₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-white/80">
                <span>Advance Paid</span>
                <span>₹{totalAdvance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-2">
                <span>Balance Due</span>
                <span className={totalBalance > 0 ? "text-red-400" : "text-green-400"}>
                  ₹{totalBalance.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
