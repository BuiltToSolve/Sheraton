"use client";

import { useState, useMemo } from "react";
import { 
  Bed, BedDouble, Users, DollarSign, User, Car, 
  ArrowRightToLine, ArrowLeftFromLine, Wind, Wifi, 
  Wine, Building, Star, Check, CalendarClock, Brush, Sparkles,
  Eye, UserPlus, Search, Filter, Camera, Upload, Plus,
  Phone, MapPin, CreditCard, FileText, Utensils, Receipt
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AddRoomEntryModal } from "./add-room-entry-modal";
import { SUGGESTED_AMENITIES } from "@/app/(admin)/admin/rooms/constants";
import * as LucideIcons from "lucide-react";
import { toast } from "sonner";

type RoomStatus = 'OCCUPIED' | 'AVAILABLE' | 'CLEANING' | 'RESERVED';

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
  guestName?: string;
  isVip?: boolean;
  vehiclePlate?: string;
  checkIn?: string;
  checkOut?: string;
  isClean: boolean;
  amenities: string[];
  notes?: string;
  guestDetails?: {
    bookingId: string;
    name: string;
    address: string;
    phone: string;
    identityNo: string;
    documentUrl: string;
    foodBills: {
      id: string;
      item: string;
      date: string;
      amount: number;
    }[];
  };
}

const ALL_AMENITIES = ["Wifi", "AC", "Drink", "City View"];

function mapPrismaRoomsToUI(prismaRooms: any[]): RoomData[] {
  return prismaRooms.map(room => ({
    id: room.id,
    number: room.roomNumber,
    floor: room.floor,
    status: room.status,
    type: room.RoomType?.name || 'Unknown',
    typeId: room.RoomType?.id || '',
    bedType: room.RoomType?.bedType || 'Unknown',
    capacityText: `${room.RoomType?.maxOccupancy || 0} Guests`,
    maxCapacity: room.RoomType?.maxOccupancy || 0,
    price: room.RoomType?.basePrice || 0,
    isClean: room.hkStatus === 'Clean' || room.hkStatus === 'Inspected',
    amenities: room.RoomType?.amenities || [],
    notes: room.notes,
  }));
}

const StatusColors: Record<string, { border: string, badgeBg: string, text: string }> = {
  Occupied: { border: "border-t-red-500", badgeBg: "bg-red-500", text: "text-white" },
  Available: { border: "border-t-green-500", badgeBg: "bg-green-500", text: "text-white" },
  Cleaning: { border: "border-t-blue-500", badgeBg: "bg-blue-500", text: "text-white" },
  Reserved: { border: "border-t-orange-500", badgeBg: "bg-orange-500", text: "text-white" },
  CheckingIn: { border: "border-t-purple-500", badgeBg: "bg-purple-500", text: "text-white" },
  CheckingOut: { border: "border-t-pink-500", badgeBg: "bg-pink-500", text: "text-white" },
  Maintenance: { border: "border-t-zinc-500", badgeBg: "bg-zinc-500", text: "text-white" },
};

const defaultColor = { border: "border-t-zinc-500", badgeBg: "bg-zinc-500", text: "text-white" };

export default function AllRoomsClient({ initialRooms }: { initialRooms: any[] }) {
  const searchParams = useSearchParams();
  const initialRoomType = searchParams.get('roomType') || 'ALL';
  const urlBookingNumber = searchParams.get('bookingNumber') || '';
  const urlBookingId = searchParams.get('bookingId') || '';

  const [rooms, setRooms] = useState<RoomData[]>(() => mapPrismaRoomsToUI(initialRooms));
  const [filter, setFilter] = useState<string>('ALL');
  const [roomTypeFilter, setRoomTypeFilter] = useState<string>(initialRoomType);
  const [roomNoFilter, setRoomNoFilter] = useState<string>('');
  const router = useRouter();

  const [isGuestDetailsModalOpen, setIsGuestDetailsModalOpen] = useState(false);
  const [selectedGuestRoom, setSelectedGuestRoom] = useState<RoomData | null>(null);

  const handleOpenGuestDetails = (room: RoomData) => {
    setSelectedGuestRoom(room);
    setIsGuestDetailsModalOpen(true);
  };

  const handleToggleCleaning = (roomId: string) => {
    setRooms(prevRooms => prevRooms.map(room => {
      if (room.id === roomId) {
        if (room.status.toUpperCase() === 'CLEANING') {
          return { ...room, status: 'Available', isClean: true, notes: undefined };
        } else {
          return { ...room, status: 'Cleaning', isClean: false, notes: "Requested for housekeeping" };
        }
      }
      return room;
    }));
  };

  const filteredRooms = useMemo(() => {
    return rooms.filter(r => {
      const matchStatus = filter === 'ALL' || r.status.toUpperCase() === filter.toUpperCase();
      const matchType = roomTypeFilter === 'ALL' || r.type === roomTypeFilter;
      const matchNo = r.number.includes(roomNoFilter);
      return matchStatus && matchType && matchNo;
    });
  }, [rooms, filter, roomTypeFilter, roomNoFilter]);

  const uniqueRoomTypes = useMemo(() => Array.from(new Set(rooms.map(r => r.type))), [rooms]);
  const uniqueStatuses = useMemo(() => Array.from(new Set(rooms.map(r => r.status.toUpperCase()))), [rooms]);

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status.toUpperCase()) {
      case 'OCCUPIED': return <User className="w-3 h-3 mr-1" />;
      case 'AVAILABLE': return <Check className="w-3 h-3 mr-1" />;
      case 'CLEANING': return <Brush className="w-3 h-3 mr-1" />;
      case 'RESERVED': return <CalendarClock className="w-3 h-3 mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">All Rooms ({filteredRooms.length})</h1>
          <p className="text-zinc-400 mt-1">Manage individual room status and details.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <AddRoomEntryModal />
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Room No..." 
              value={roomNoFilter}
              onChange={(e) => setRoomNoFilter(e.target.value)}
              className="pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-[var(--color-primary)]/50 w-full sm:w-36 transition-colors"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <select
              value={roomTypeFilter}
              onChange={(e) => setRoomTypeFilter(e.target.value)}
              className="pl-9 pr-8 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-[var(--color-primary)]/50 appearance-none w-full sm:w-48 transition-colors cursor-pointer"
            >
              <option value="ALL">All Types</option>
              {uniqueRoomTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {['ALL', ...uniqueStatuses].map(st => {
          const count = st === 'ALL' ? rooms.length : rooms.filter(r => r.status.toUpperCase() === st).length;
          return (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                filter === st 
                  ? "bg-[var(--color-primary)] text-white" 
                  : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10"
              )}
            >
              {st} ({count})
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRooms.map((room) => {
          const colors = StatusColors[room.status] || defaultColor;
          
          return (
            <div 
              key={room.id} 
              className={cn(
                "bg-[#1c1e26] border border-[#2a2d39] rounded-xl overflow-hidden flex flex-col shadow-lg border-t-4",
                colors.border
              )}
            >
              <div className="p-5 flex-1">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Room</div>
                    <div className="text-3xl font-bold text-white leading-none">{room.number}</div>
                    <div className="text-xs text-zinc-500 mt-1">Floor {room.floor}</div>
                  </div>
                  <div className={cn("flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider", colors.badgeBg, colors.text)}>
                    <StatusIcon status={room.status} />
                    {room.status}
                  </div>
                </div>

                {/* Specs */}
                <div className="space-y-3 mb-6 text-sm text-zinc-300 font-medium">
                  <div className="flex items-center gap-3">
                    <Bed className="w-4 h-4 text-zinc-500" />
                    <span>{room.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BedDouble className="w-4 h-4 text-zinc-500" />
                    <span>{room.bedType}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-zinc-500" />
                    <span>
                      {room.capacityText} <span className="text-zinc-600 font-normal ml-1">(Max: {room.maxCapacity})</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-400">
                    <DollarSign className="w-4 h-4 text-zinc-500" />
                    <span><span className="text-emerald-400 font-bold">${room.price}</span> /night</span>
                  </div>
                  
                  {room.guestName && (
                    <div className="flex items-center gap-3 pt-2">
                      <User className="w-4 h-4 text-zinc-500" />
                      <div className="flex items-center gap-2">
                        <span className="text-white">{room.guestName}</span>
                        {room.isVip && <span className="border border-white/20 text-[10px] px-1.5 py-0.5 rounded text-zinc-300">VIP</span>}
                      </div>
                    </div>
                  )}
                  {room.vehiclePlate && (
                    <div className="flex items-center gap-3">
                      <Car className="w-4 h-4 text-zinc-500" />
                      <span className="text-zinc-400">{room.vehiclePlate}</span>
                    </div>
                  )}
                </div>

                {/* Dates Box */}
                {(room.checkIn || room.checkOut) && (
                  <div className="bg-[#1e2738]/50 border border-[#2b3a55] rounded-lg p-3 mb-4 space-y-2">
                    {room.checkIn && (
                      <div className="flex items-center gap-2 text-xs text-blue-300">
                        <ArrowRightToLine className="w-3.5 h-3.5" />
                        <span>Check-in: {room.checkIn}</span>
                      </div>
                    )}
                    {room.checkOut && (
                      <div className="flex items-center gap-2 text-xs text-blue-300">
                        <ArrowLeftFromLine className="w-3.5 h-3.5" />
                        <span>Check-out: {room.checkOut}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Cleaning Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {room.isClean ? (
                      <>
                        <Sparkles className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-500">Clean</span>
                      </>
                    ) : (
                      <>
                        <Brush className="w-4 h-4 text-red-500" />
                        <span className="text-red-500">Dirty</span>
                      </>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => handleToggleCleaning(room.id)}
                    className={cn(
                      "text-[10px] px-2 py-1 rounded font-bold transition-colors uppercase tracking-wider",
                      room.status.toUpperCase() === 'CLEANING' 
                        ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" 
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                    )}
                  >
                    {room.status.toUpperCase() === 'CLEANING' ? "Finish Cleaning" : "Req. Cleaning"}
                  </button>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-zinc-500 mb-2">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs uppercase tracking-wider font-semibold">Amenities</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity) => {
                      const amenityEntry = SUGGESTED_AMENITIES.find(a => a[0] === amenity);
                      const iconName = amenityEntry ? amenityEntry[1] : "Bed";
                      const Icon = (LucideIcons as any)[iconName] || LucideIcons.Bed;

                      return (
                        <span key={amenity} className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-zinc-300">
                          <Icon className="w-3 h-3" />
                          {amenity}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Notes */}
                {room.notes && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mt-4">
                    <p className="text-xs text-yellow-600/80 italic">{room.notes}</p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="bg-[#14151b] p-4 border-t border-[#2a2d39]">
                {room.status.toUpperCase() === 'AVAILABLE' || room.status.toUpperCase() === 'CLEANING' ? (
                  <button 
                    onClick={() => router.push(`/admin/rooms/check-in/${room.id}${urlBookingNumber ? `?bookingNumber=${urlBookingNumber}` : ''}`)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-pink-200 hover:bg-pink-300 text-pink-900 rounded-lg text-sm font-bold transition-colors w-full"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add Guest
                  </button>
                ) : (
                  <button 
                    onClick={() => handleOpenGuestDetails(room)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-bold transition-colors w-full"
                  >
                    <Eye className="w-4 h-4" />
                    Guest Details
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>



      <Dialog open={isGuestDetailsModalOpen} onOpenChange={setIsGuestDetailsModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-[var(--color-card)] border-[var(--color-card-border)] text-white p-0 overflow-hidden">
          {/* Header */}
          <div className="p-6 pb-4 border-b border-white/10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <User className="w-6 h-6 text-[var(--color-primary)]" />
                Guest Details
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                Viewing details for {selectedGuestRoom?.type} - Room {selectedGuestRoom?.number}
              </DialogDescription>
            </DialogHeader>
          </div>

          {selectedGuestRoom?.guestDetails ? (
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Primary Info */}
              <div className="bg-zinc-900/50 rounded-xl p-5 border border-white/5 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{selectedGuestRoom.guestDetails.name}</h3>
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
                      Booking ID: {selectedGuestRoom.guestDetails.bookingId}
                    </div>
                  </div>
                  {selectedGuestRoom.isVip && (
                    <div className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold uppercase tracking-wider border border-yellow-500/30">
                      VIP Guest
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-zinc-500 mt-0.5" />
                    <div>
                      <div className="text-xs text-zinc-500 mb-0.5">Phone Number</div>
                      <div className="text-sm text-zinc-300">{selectedGuestRoom.guestDetails.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-zinc-500 mt-0.5" />
                    <div>
                      <div className="text-xs text-zinc-500 mb-0.5">Address</div>
                      <div className="text-sm text-zinc-300">{selectedGuestRoom.guestDetails.address}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Identity & Docs */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Identity & Documents
                </h4>
                <div className="bg-zinc-900/50 rounded-xl p-4 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Identity Number (Aadhar/Passport)</div>
                    <div className="text-sm font-medium text-zinc-200">{selectedGuestRoom.guestDetails.identityNo}</div>
                  </div>
                  <a href={selectedGuestRoom.guestDetails.documentUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 text-sm font-medium text-blue-400 hover:text-blue-300 w-fit">
                    <FileText className="w-4 h-4" />
                    View Uploaded ID
                  </a>
                </div>
              </div>

              {/* Food Bills */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                    <Utensils className="w-4 h-4" /> Food Bills
                  </h4>
                  <div className="text-xs text-zinc-500 flex items-center gap-1 bg-zinc-900 px-2.5 py-1 rounded-md border border-white/10">
                    <Receipt className="w-3 h-3 text-emerald-500" /> 
                    Total: <span className="text-emerald-400 font-bold ml-1">${selectedGuestRoom.guestDetails.foodBills.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}</span>
                  </div>
                </div>
                
                {selectedGuestRoom.guestDetails.foodBills.length > 0 ? (
                  <div className="bg-zinc-900/50 rounded-xl border border-white/5 overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-white/5 text-zinc-400 text-xs uppercase">
                        <tr>
                          <th className="px-4 py-3 font-medium">Item</th>
                          <th className="px-4 py-3 font-medium">Date</th>
                          <th className="px-4 py-3 font-medium text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {selectedGuestRoom.guestDetails.foodBills.map((bill) => (
                          <tr key={bill.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-4 py-3 text-zinc-300">{bill.item}</td>
                            <td className="px-4 py-3 text-zinc-500">{bill.date}</td>
                            <td className="px-4 py-3 text-right text-emerald-400 font-medium">${bill.amount.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/5 text-center">
                    <Utensils className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                    <div className="text-zinc-400 text-sm">No food bills found for this room.</div>
                  </div>
                )}
              </div>

            </div>
          ) : (
             <div className="p-12 text-center text-zinc-500">
               <User className="w-12 h-12 mx-auto mb-4 opacity-50 text-zinc-600" />
               <p className="text-lg font-medium text-zinc-400">No guest details found.</p>
               <p className="text-sm mt-1">This room might not be currently occupied.</p>
             </div>
          )}

          <div className="p-4 border-t border-white/10 bg-zinc-950/50 flex justify-end">
            <Button variant="ghost" onClick={() => setIsGuestDetailsModalOpen(false)} className="hover:bg-white/5 text-white transition-colors">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
