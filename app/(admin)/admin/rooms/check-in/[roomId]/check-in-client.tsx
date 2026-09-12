"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import * as LucideIcons from "lucide-react";
import { checkInGuest, getReservationForCheckIn } from "@/app/actions/checkin.action";
import { uploadDocument } from "@/app/actions/upload.action";
import { toast } from "sonner";
import { GuestType } from "@prisma/client";
import { cn } from "@/lib/utils";

interface RoomData {
  id: string;
  number: string;
  floor: number;
  status: string;
  type: string;
  typeId: string;
  bedType: string;
  capacityText: string;
  maxCapacity: number;
  price: number;
  isClean: boolean;
  amenities: string[];
}

type GuestFormEntry = {
  id: string;
  fullName: string;
  idNumber: string;
  guestType: string;
  file: File | null;
};

export default function CheckInClient({ room }: { room: RoomData }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlBookingNumber = searchParams.get('bookingNumber') || '';

  const [bookingId, setBookingId] = useState(urlBookingNumber);
  const [guests, setGuests] = useState<GuestFormEntry[]>([
    { id: '1', fullName: '', idNumber: '', guestType: 'Regular', file: null }
  ]);
  const [checkInTime, setCheckInTime] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingReservation, setIsLoadingReservation] = useState(false);
  const [notFoundMsg, setNotFoundMsg] = useState("");

  useEffect(() => {
    if (urlBookingNumber && room.typeId) {
      fetchReservationForManualBooking(urlBookingNumber);
    }
  }, [urlBookingNumber, room.typeId]);

  const fetchReservationForManualBooking = async (bNumber: string) => {
    if (!bNumber || !room?.typeId) return;
    setIsLoadingReservation(true);
    setNotFoundMsg("");
    try {
      const res = await getReservationForCheckIn(bNumber, room.typeId);
      if (res.success && res.data) {
        const fetchedGuests = res.data.guests || [];
        if (fetchedGuests.length > 0) {
          setGuests(fetchedGuests.map((g: any, i: number) => ({
            id: g.id || String(i),
            fullName: g.fullName || '',
            idNumber: g.idNumber || '',
            guestType: g.guestType || 'Regular',
            file: null
          })));
        } else {
          setGuests([{ id: '1', fullName: '', idNumber: '', guestType: 'Regular', file: null }]);
        }
        setSpecialRequest(res.data.specialRequests || "");
        toast.success("Reservation details loaded");
      } else {
        toast.error(res.error || "Could not find an unassigned reservation for this Booking ID and Room Type.");
        setNotFoundMsg("No record found");
        setTimeout(() => setNotFoundMsg(""), 3000);
        setGuests([{ id: '1', fullName: '', idNumber: '', guestType: 'Regular', file: null }]);
        setSpecialRequest("");
      }
    } catch (err) {
      console.error("Failed to fetch reservation details:", err);
      toast.error("Error fetching reservation details.");
      setNotFoundMsg("No record found");
      setTimeout(() => setNotFoundMsg(""), 3000);
      setGuests([{ id: '1', fullName: '', idNumber: '', guestType: 'Regular', file: null }]);
      setSpecialRequest("");
    } finally {
      setIsLoadingReservation(false);
    }
  };

  const addGuestRow = () => {
    if (guests.length < room.maxCapacity) {
      setGuests([...guests, { id: Math.random().toString(), fullName: '', idNumber: '', guestType: 'Regular', file: null }]);
    }
  };

  const removeGuestRow = (id: string) => {
    if (guests.length > 1) {
      setGuests(guests.filter(g => g.id !== id));
    }
  };

  const updateGuest = (id: string, field: keyof GuestFormEntry, value: any) => {
    setGuests(guests.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const submitCheckIn = async () => {
    if (!bookingId) {
      toast.error("Please provide a booking ID");
      return;
    }
    
    if (guests.some(g => !g.fullName || !g.idNumber)) {
      toast.error("Please fill in all guest details");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const processedGuests = [];
      for (const guest of guests) {
        let documentUrl = '';
        if (guest.file) {
          const formData = new FormData();
          formData.append('file', guest.file);
          formData.append('bookingNumber', bookingId);
          const uploadRes = await uploadDocument(formData);
          if (uploadRes.success && uploadRes.path) {
            documentUrl = uploadRes.path;
          } else {
            throw new Error(`Failed to upload document for ${guest.fullName}`);
          }
        }
        
        processedGuests.push({
          fullName: guest.fullName,
          idNumber: guest.idNumber,
          documentUrl,
          guestType: guest.guestType as GuestType
        });
      }

      const checkInRes = await checkInGuest({
        bookingNumber: bookingId,
        roomId: room.id,
        roomTypeId: room.typeId,
        guests: processedGuests,
        checkInTime: checkInTime || new Date().toISOString(),
        specialRequest
      });

      if (checkInRes.success) {
        toast.success("Guest checked in successfully!");
        router.push("/admin/rooms/all");
      } else {
        toast.error(checkInRes.error || "Failed to check in");
      }
    } catch (e: any) {
      toast.error(e.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] p-6">
      <div className="w-full mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Check-In Guest</h1>
            <p className="text-zinc-400 mt-1">Add guests to room {room.number}</p>
          </div>
          <Button variant="outline" onClick={() => router.back()} className="bg-white/5 border-white/10 text-white hover:bg-white/10">
            Back to Rooms
          </Button>
        </div>

        <div className="bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-xl p-6 text-white shadow-xl relative">
          {isLoadingReservation && (
             <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center rounded-xl backdrop-blur-sm">
                <LucideIcons.Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
             </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider border-b border-white/10 pb-2">Booking & Identity</h3>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Booking ID</label>
              <Input 
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                onBlur={(e) => {
                  if (!urlBookingNumber && bookingId !== urlBookingNumber) {
                    fetchReservationForManualBooking(e.target.value);
                  }
                }}
                readOnly={!!urlBookingNumber}
                placeholder="e.g. BKG-8472"
                className={cn("bg-zinc-900/50 border-white/10 text-white", urlBookingNumber && "opacity-50 cursor-not-allowed")}
              />
              {notFoundMsg && (
                <p className="text-sm text-red-500 mt-1 animate-in fade-in zoom-in duration-300">{notFoundMsg}</p>
              )}
            </div>
            
            <div className="space-y-4 md:col-span-2 mt-2">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider">Guests ({guests.length}/{room.maxCapacity})</h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={addGuestRow}
                  disabled={guests.length >= room.maxCapacity}
                  className="h-7 text-xs bg-white/5 border-white/10 text-white hover:bg-white/10"
                >
                  <LucideIcons.Plus className="w-3 h-3 mr-1" /> Add Guest
                </Button>
              </div>
            </div>

            {guests.map((guest, index) => (
              <div key={guest.id} className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-900/30 p-4 rounded-xl border border-white/5 relative">
                {guests.length > 1 && (
                  <button 
                    type="button"
                    onClick={() => removeGuestRow(guest.id)}
                    className="absolute top-3 right-3 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <LucideIcons.X className="w-4 h-4" />
                  </button>
                )}
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Guest {index + 1} Full Name</label>
                  <Input 
                    value={guest.fullName}
                    onChange={(e) => updateGuest(guest.id, 'fullName', e.target.value)}
                    placeholder="John Doe"
                    className="bg-zinc-900/50 border-white/10 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Aadhar No.</label>
                  <Input 
                    value={guest.idNumber}
                    onChange={(e) => updateGuest(guest.id, 'idNumber', e.target.value)}
                    placeholder="0000 0000 0000"
                    className="bg-zinc-900/50 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-zinc-300">Guest Type</label>
                  <select 
                    value={guest.guestType}
                    onChange={(e) => updateGuest(guest.id, 'guestType', e.target.value)}
                    className="flex h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-zinc-900/50 border border-white/10 text-white"
                  >
                    <option value="Regular" className="bg-zinc-900">Regular</option>
                    <option value="VIP" className="bg-zinc-900">VIP</option>
                    <option value="Corporate" className="bg-zinc-900">Corporate</option>
                    <option value="Loyalty" className="bg-zinc-900">Loyalty</option>
                  </select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-zinc-300">Document</label>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors cursor-pointer relative">
                    <input 
                      type="file" 
                      accept="image/*,application/pdf" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          updateGuest(guest.id, 'file', e.target.files[0]);
                        }
                      }}
                    />
                    {guest.file ? (
                      <div className="flex items-center gap-2 text-emerald-400">
                        <LucideIcons.FileCheck className="w-5 h-5" />
                        <span className="text-sm font-medium">{guest.file.name}</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors shadow-sm">
                            <LucideIcons.Upload className="w-5 h-5" />
                          </div>
                        </div>
                        <span className="text-sm text-zinc-500 mt-2">Click to upload document</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="space-y-4 md:col-span-2 mt-2">
              <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider border-b border-white/10 pb-2">Stay Details</h3>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-zinc-300">Check-In Time</label>
              <Input 
                type="datetime-local"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                className="bg-zinc-900/50 border-white/10 text-white [color-scheme:dark]"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-zinc-300">Special Request</label>
              <Textarea 
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                placeholder="Any special requests or notes..."
                className="bg-zinc-900/50 border-white/10 text-white min-h-[100px]"
              />
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => router.back()} className="hover:bg-white/5 text-white" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium px-8" 
              onClick={submitCheckIn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Confirm Check-in"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
