import { db } from '@/lib/db';
import { getCurrentUser } from '@/app/actions/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import { BookingStatus } from '@prisma/client';

export default async function BookingsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const user = await getCurrentUser();
  if (!user || !user.userId) redirect('/');

  const type = (searchParams.type as string) || 'upcoming';


  let statusFilter: BookingStatus[] = [];
  let pageTitle = '';

  if (type === 'completed') {
    statusFilter = ['CheckedOut'];
    pageTitle = 'Completed Bookings';
  } else if (type === 'cancelled') {
    statusFilter = ['Cancelled', 'NoShow'];
    pageTitle = 'Cancelled Bookings';
  } else {
    statusFilter = ['Confirmed', 'CheckedIn'];
    pageTitle = 'Upcoming Bookings';
  }

  const bookings = await db.reservation.findMany({
    where: { 
      userId: user.userId,
      bookingStatus: { in: statusFilter }
    },
    orderBy: { createdAt: 'desc' },
    include: {
      RoomType: true,
    },
  });

  const groupedBookings = new Map<string, any>();
  
  for (const b of bookings) {
    if (!groupedBookings.has(b.bookingNumber)) {
      groupedBookings.set(b.bookingNumber, {
        ...b,
        roomsCount: 1,
        totalAmount: b.totalAmount,
      });
    } else {
      const existing = groupedBookings.get(b.bookingNumber);
      existing.roomsCount += 1;
      existing.totalAmount += b.totalAmount;
    }
  }

  const consolidatedBookings = Array.from(groupedBookings.values());

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-8">
      <h1 className="font-heading text-2xl font-bold text-navy mb-6">{pageTitle}</h1>
      
      {consolidatedBookings.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-xl">
          <p className="text-navy/70 font-medium mb-4">You have no {type} bookings.</p>
          <Link 
            href="/rooms" 
            className="inline-block bg-gold hover:bg-gold-dark text-white px-6 py-2.5 rounded-full font-medium transition-colors"
          >
            Explore Rooms
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {consolidatedBookings.map((booking) => (
            <Link 
              key={booking.bookingNumber} 
              href={`/account/bookings/${booking.bookingNumber}`}
              className="block group"
            >
              <div className="border border-border rounded-xl p-4 md:p-5 flex flex-col md:flex-row gap-4 md:items-center justify-between transition-colors group-hover:border-gold/50 group-hover:bg-gold/5">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-heading text-lg font-bold text-navy">
                      {booking.RoomType.name} {booking.roomsCount > 1 ? `(x${booking.roomsCount})` : ''}
                    </h3>
                    <span className="text-xs font-bold px-2 py-1 bg-muted text-navy rounded-md uppercase tracking-wider">
                      {booking.bookingStatus}
                    </span>
                  </div>
                  <div className="text-sm text-navy/70 flex flex-wrap gap-x-6 gap-y-1">
                    <p>Booking ID: <span className="font-medium">{booking.bookingNumber}</span></p>
                    <p>{format(new Date(booking.checkInDate), 'MMM dd, yyyy')} - {format(new Date(booking.checkOutDate), 'MMM dd, yyyy')}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:justify-end gap-6 md:min-w-[150px]">
                  <div className="text-left md:text-right">
                    <p className="text-xs text-navy/60 uppercase tracking-wide">Total Amount</p>
                    <p className="font-bold text-gold-dark text-lg">₹{booking.totalAmount.toFixed(2)}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-navy/30 group-hover:text-gold transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
