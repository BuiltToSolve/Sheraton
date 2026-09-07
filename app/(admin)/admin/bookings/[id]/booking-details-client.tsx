'use client';

import { ArrowLeft, CalendarDays, User, CreditCard, Bed, Users, Info, ShieldCheck, Utensils, Car, CheckCircle2, Dog, Baby } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { CURRENCY } from "@/lib/constants";
import AdminLoading from "../../loading";
import { useState, useEffect } from "react";

export default function BookingDetailsClient({ booking }: { booking: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const handleBack = () => {
    setIsNavigating(true);
    router.push('/admin/bookings');
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Confirmed": return "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20";
      case "CheckedIn": return "text-blue-400 bg-blue-400/10 border border-blue-400/20";
      case "CheckedOut": return "text-purple-400 bg-purple-400/10 border border-purple-400/20";
      case "Pending": return "text-orange-400 bg-orange-400/10 border border-orange-400/20";
      case "Cancelled": return "text-red-400 bg-red-400/10 border border-red-400/20";
      case "NoShow": return "text-red-600 bg-red-600/10 border border-red-600/20";
      default: return "text-zinc-400 bg-zinc-400/10 border border-zinc-400/20";
    }
  };

  const primaryGuest = booking.guests?.[0] || {};
  const guestName = primaryGuest.fullName || booking.User?.name || 'Unknown';
  const checkIn = new Date(booking.checkInDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  const checkOut = new Date(booking.checkOutDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

  if (isNavigating) {
    return <AdminLoading />;
  }

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex items-center gap-4">
        <button 
          onClick={handleBack}
          className="p-2 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white tracking-tight">{booking.bookingNumber}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.bookingStatus)}`}>
              {booking.bookingStatus}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${booking.paymentStatus === 'Paid' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 'text-orange-400 bg-orange-400/10 border-orange-400/20'}`}>
              {booking.paymentStatus}
            </span>
          </div>
          <p className="text-zinc-400 mt-1 flex items-center gap-2">
            Booked on {new Date(booking.createdAt).toLocaleDateString()} via {booking.source}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Overview & Payment) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Reservation Overview Card */}
          <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden">
            <div className="p-5 border-b border-[var(--color-card-border)] flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-[var(--color-primary)]" />
              <h2 className="text-lg font-bold text-white">Stay Overview</h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                  <p className="text-sm text-zinc-400 uppercase tracking-wider mb-1">Check In</p>
                  <p className="text-xl font-medium text-white">{checkIn}</p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="h-px bg-white/10 w-full relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-card)] px-3 text-xs text-zinc-500 font-medium rounded-full border border-[var(--color-card-border)]">
                      {booking.nights} Night{booking.nights > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-sm text-zinc-400 uppercase tracking-wider mb-1">Check Out</p>
                  <p className="text-xl font-medium text-white">{checkOut}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[var(--color-card-border)]">
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Room Type</p>
                  <p className="text-sm font-medium text-white flex items-center gap-2">
                    <Bed className="w-4 h-4 text-zinc-500" /> {booking.RoomType?.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Guests</p>
                  <p className="text-sm font-medium text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-zinc-500" /> {booking.adults} Adults, {booking.children} Children
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Rate Plan</p>
                  <p className="text-sm font-medium text-white flex items-center gap-2">
                    <Info className="w-4 h-4 text-zinc-500" /> {booking.ratePlan}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Room Number</p>
                  <p className="text-sm font-medium text-white flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${booking.roomId ? 'text-emerald-500' : 'text-orange-500'}`} /> 
                    {booking.Room?.roomNumber || 'Unassigned'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Details Card */}
          <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden">
            <div className="p-5 border-b border-[var(--color-card-border)] flex items-center gap-2">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-[var(--color-primary)]" />
                <h2 className="text-lg font-bold text-white">Guest Information</h2>
              </div>
              <div className="flex items-center gap-2">
                {booking.hasPet && (
                  <div className="flex items-center gap-1 bg-orange-500/10 text-orange-400 px-2 py-1 rounded-md text-xs font-bold border border-orange-500/20" title="Has Pet">
                    <Dog className="w-4 h-4" />
                  </div>
                )}
                {booking.hasBaby && (
                  <div className="flex items-center gap-1 bg-blue-500/10 text-blue-400 px-2 py-1 rounded-md text-xs font-bold border border-blue-500/20" title="Has Baby">
                    <Baby className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
            <div className="p-0">
              <div className="divide-y divide-[var(--color-card-border)]">
                {booking.guests?.map((guest: any, idx: number) => (
                  <div key={guest.id} className="p-6 hover:bg-white/5 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          {guest.fullName} 
                          {idx === 0 && <span className="bg-blue-500/10 text-blue-400 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-blue-500/20">Primary</span>}
                        </h3>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                          <p className="text-sm text-zinc-400"><span className="text-zinc-500">Phone:</span> {guest.phone || 'N/A'}</p>
                          <p className="text-sm text-zinc-400"><span className="text-zinc-500">Email:</span> {guest.email || 'N/A'}</p>
                          <p className="text-sm text-zinc-400"><span className="text-zinc-500">Gender:</span> {guest.gender || 'N/A'}</p>
                          <p className="text-sm text-zinc-400"><span className="text-zinc-500">Nationality:</span> {guest.nationality || 'N/A'}</p>
                          {guest.dateOfBirth && <p className="text-sm text-zinc-400"><span className="text-zinc-500">DOB:</span> {new Date(guest.dateOfBirth).toLocaleDateString()}</p>}
                        </div>
                      </div>
                      
                      {/* ID Info Block */}
                      <div className="bg-zinc-900 border border-white/5 rounded-xl p-4 min-w-[200px] text-right">
                        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">ID Document</p>
                        <p className="text-sm font-medium text-white">{guest.idType || 'Not Provided'}</p>
                        <p className="text-xs text-zinc-400 font-mono mt-1">{guest.idNumber || '---'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Add-ons and Special Requests */}
          {(booking.specialRequests || booking.babyCribRequired || (booking.addOns && booking.addOns.length > 0)) && (
            <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden">
              <div className="p-5 border-b border-[var(--color-card-border)]">
                <h2 className="text-lg font-bold text-white">Special Requests & Add-ons</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {booking.babyCribRequired && <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-bold border border-purple-500/20">Baby Crib Required</span>}
                  {booking.addOns?.map((addon: string) => (
                    <span key={addon} className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs font-bold border border-white/5">{addon}</span>
                  ))}
                </div>
                {booking.specialRequests && (
                  <p className="text-sm text-zinc-300 bg-zinc-900 p-4 rounded-xl border border-white/5">
                    {booking.specialRequests}
                  </p>
                )}
              </div>
            </div>
          )}
          
        </div>

        {/* Right Column (Financials & Plugins) */}
        <div className="space-y-6">
          
          {/* Payment Summary */}
          <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden">
            <div className="p-5 border-b border-[var(--color-card-border)] flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[var(--color-primary)]" />
              <h2 className="text-lg font-bold text-white">Payment Summary</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Room Rate ({booking.nights} nights)</span>
                <span className="text-white font-medium">{CURRENCY.SYMBOL}{(booking.roomRate * booking.nights * (Math.ceil((booking.adults+booking.children)/2) || 1)).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Taxes & Fees</span>
                <span className="text-white font-medium">{CURRENCY.SYMBOL}{(booking.totalAmount - (booking.roomRate * booking.nights * (Math.ceil((booking.adults+booking.children)/2) || 1))).toFixed(2)}</span>
              </div>
              
              <div className="border-t border-[var(--color-card-border)] pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-300 font-medium">Total Amount</span>
                  <span className="text-xl font-bold text-[var(--color-primary)]">{CURRENCY.SYMBOL}{booking.totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="bg-zinc-900 rounded-xl p-4 mt-4 border border-white/5 flex justify-between items-center">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Balance Due</p>
                  <p className={`text-lg font-bold ${booking.balanceDue > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {CURRENCY.SYMBOL}{booking.balanceDue.toFixed(2)}
                  </p>
                </div>
                {booking.balanceDue > 0 && (
                  <button className="px-4 py-2 bg-[var(--color-primary)] text-black font-medium text-xs rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors">
                    Collect Payment
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Placeholders for Future Modules */}
          
          {/* Guest IDs Module Placeholder */}
          <div className="bg-zinc-900/50 rounded-2xl border border-dashed border-white/20 p-6 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-zinc-900 transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-[var(--color-primary)]/20 transition-colors">
              <ShieldCheck className="w-6 h-6 text-zinc-400 group-hover:text-[var(--color-primary)] transition-colors" />
            </div>
            <h3 className="text-white font-medium mb-1">ID Document Uploads</h3>
            <p className="text-xs text-zinc-500">Collect and manage guest ID scans</p>
            <span className="mt-4 text-xs font-bold text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">Coming Soon</span>
          </div>

          {/* Food Bills Module Placeholder */}
          <div className="bg-zinc-900/50 rounded-2xl border border-dashed border-white/20 p-6 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-zinc-900 transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-orange-500/20 transition-colors">
              <Utensils className="w-6 h-6 text-zinc-400 group-hover:text-orange-400 transition-colors" />
            </div>
            <h3 className="text-white font-medium mb-1">Food & Dining Bills</h3>
            <p className="text-xs text-zinc-500">Room service and restaurant charges</p>
            <span className="mt-4 text-xs font-bold text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity">Coming Soon</span>
          </div>

          {/* Transport Bills Module Placeholder */}
          <div className="bg-zinc-900/50 rounded-2xl border border-dashed border-white/20 p-6 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-zinc-900 transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition-colors">
              <Car className="w-6 h-6 text-zinc-400 group-hover:text-blue-400 transition-colors" />
            </div>
            <h3 className="text-white font-medium mb-1">Transport Bills</h3>
            <p className="text-xs text-zinc-500">Manage pickup, drop, and rental charges</p>
            <span className="mt-4 text-xs font-bold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">Coming Soon</span>
          </div>
          
        </div>
      </div>
    </div>
  );
}
