"use client";

import { useState, useMemo } from "react";
import { 
  Bed, BedDouble, Users, DollarSign, User, Car, 
  ArrowRightToLine, ArrowLeftFromLine, Wind, Wifi, 
  Wine, Building, Star, Check, CalendarClock, Brush, Sparkles,
  Eye, UserPlus, Search, Filter, Camera, Upload,
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type RoomStatus = 'OCCUPIED' | 'AVAILABLE' | 'CLEANING' | 'RESERVED';

interface RoomData {
  id: string;
  number: string;
  floor: number;
  status: RoomStatus;
  type: string;
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

function generateRooms(): RoomData[] {
  const rooms: RoomData[] = [];
  const roomTypes = [
    { type: "Standard Room", count: 20, bed: "Double Bed", price: 150, cap: "1 Adult", max: 2 },
    { type: "Deluxe King", count: 15, bed: "King Bed", price: 250, cap: "2 Adults", max: 3 },
    { type: "Presidential Suite", count: 10, bed: "King Bed", price: 850, cap: "2 Adults, 2 Children", max: 4 },
    { type: "Family Room", count: 5, bed: "Two Queen Beds", price: 400, cap: "2 Adults, 2 Children", max: 5 },
    { type: "Sweet Room", count: 1, bed: "King Bed", price: 500, cap: "2 Adults", max: 2 },
  ];

  let idCounter = 1;
  let currentFloor = 1;
  let roomsOnThisFloor = 0;

  roomTypes.forEach(rt => {
    for (let i = 0; i < rt.count; i++) {
      if (roomsOnThisFloor >= 15) {
        currentFloor++;
        roomsOnThisFloor = 0;
      }
      roomsOnThisFloor++;
      
      const floor = currentFloor;
      const roomNum = `${currentFloor}${String(roomsOnThisFloor).padStart(2, '0')}`;
      
      // Randomize statuses deterministically for a good demo
      const randomSeed = idCounter * 7 % 100;
      let status: RoomStatus = 'AVAILABLE';
      let isClean = true;
      let guestName, checkIn, checkOut, vehiclePlate, isVip, notes;

      let guestDetails = undefined;

      if (randomSeed < 40) {
        status = 'OCCUPIED';
        guestName = `Guest ${idCounter}`;
        checkIn = "8/1/24, 12:00 AM";
        checkOut = "8/7/24, 12:00 AM";
        vehiclePlate = `AB123CD${idCounter}`;
        isVip = randomSeed < 10;
        if (isVip) notes = "VIP guest, prefers sea view rooms";
        
        guestDetails = {
          bookingId: `BKG-${1000 + idCounter}`,
          name: guestName,
          address: `${100 + idCounter} Ocean Drive, Miami, FL`,
          phone: `+1 555 019${idCounter.toString().padStart(2, '0')}`,
          identityNo: `UID-${8472938 + idCounter}`,
          documentUrl: "#",
          foodBills: [
            { id: `fb-1-${idCounter}`, item: "In-Room Breakfast", date: "8/2/24", amount: 45 },
            { id: `fb-2-${idCounter}`, item: "Mini Bar (Drinks)", date: "8/3/24", amount: 25 },
          ]
        };
      } else if (randomSeed < 60) {
        status = 'CLEANING';
        isClean = false;
        notes = "Recently checked out, requires housekeeping";
      } else if (randomSeed < 70) {
        status = 'RESERVED';
        guestName = `Upcoming Guest ${idCounter}`;
        checkIn = "8/10/24, 12:00 AM";
        checkOut = "8/15/24, 12:00 AM";
      }

      rooms.push({
        id: `room-${idCounter}`,
        number: roomNum,
        floor: floor,
        status,
        type: rt.type,
        bedType: rt.bed,
        capacityText: rt.cap,
        maxCapacity: rt.max,
        price: rt.price,
        isClean,
        guestName,
        checkIn,
        checkOut,
        vehiclePlate,
        isVip,
        notes,
        amenities: ALL_AMENITIES.slice(0, 2 + (idCounter % 3)),
        guestDetails,
      });

      idCounter++;
    }
  });

  return rooms;
}

const StatusColors = {
  OCCUPIED: { border: "border-t-red-500", badgeBg: "bg-red-500", text: "text-white" },
  AVAILABLE: { border: "border-t-green-500", badgeBg: "bg-green-500", text: "text-white" },
  CLEANING: { border: "border-t-blue-500", badgeBg: "bg-blue-500", text: "text-white" },
  RESERVED: { border: "border-t-orange-500", badgeBg: "bg-orange-500", text: "text-white" },
};

export default function AllRoomsPage() {
  const [rooms, setRooms] = useState<RoomData[]>(() => generateRooms());
  const [filter, setFilter] = useState<string>('ALL');
  const [roomTypeFilter, setRoomTypeFilter] = useState<string>('ALL');
  const [roomNoFilter, setRoomNoFilter] = useState<string>('');

  const [isAddGuestModalOpen, setIsAddGuestModalOpen] = useState(false);
  const [selectedRoomForGuest, setSelectedRoomForGuest] = useState<RoomData | null>(null);

  const [isGuestDetailsModalOpen, setIsGuestDetailsModalOpen] = useState(false);
  const [selectedGuestRoom, setSelectedGuestRoom] = useState<RoomData | null>(null);

  // Form states
  const [bookingId, setBookingId] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [isVip, setIsVip] = useState(false);

  const handleOpenGuestDetails = (room: RoomData) => {
    setSelectedGuestRoom(room);
    setIsGuestDetailsModalOpen(true);
  };

  const handleOpenAddGuest = (room: RoomData) => {
    setSelectedRoomForGuest(room);
    setBookingId("");
    setAadharNo("");
    setCheckInTime("");
    setSpecialRequest("");
    setIsVip(false);
    setIsAddGuestModalOpen(true);
  };

  const handleToggleCleaning = (roomId: string) => {
    setRooms(prevRooms => prevRooms.map(room => {
      if (room.id === roomId) {
        if (room.status === 'CLEANING') {
          return { ...room, status: 'AVAILABLE', isClean: true, notes: undefined };
        } else {
          return { ...room, status: 'CLEANING', isClean: false, notes: "Requested for housekeeping" };
        }
      }
      return room;
    }));
  };

  const filteredRooms = useMemo(() => {
    return rooms.filter(r => {
      const matchStatus = filter === 'ALL' || r.status === filter;
      const matchType = roomTypeFilter === 'ALL' || r.type === roomTypeFilter;
      const matchNo = r.number.includes(roomNoFilter);
      return matchStatus && matchType && matchNo;
    });
  }, [rooms, filter, roomTypeFilter, roomNoFilter]);

  const StatusIcon = ({ status }: { status: RoomStatus }) => {
    switch (status) {
      case 'OCCUPIED': return <User className="w-3 h-3 mr-1" />;
      case 'AVAILABLE': return <Check className="w-3 h-3 mr-1" />;
      case 'CLEANING': return <Brush className="w-3 h-3 mr-1" />;
      case 'RESERVED': return <CalendarClock className="w-3 h-3 mr-1" />;
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
              <option value="Standard Room">Standard Room</option>
              <option value="Deluxe King">Deluxe King</option>
              <option value="Presidential Suite">Presidential Suite</option>
              <option value="Family Room">Family Room</option>
              <option value="Sweet Room">Sweet Room</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {['ALL', 'AVAILABLE', 'OCCUPIED', 'CLEANING', 'RESERVED'].map(st => (
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
            {st}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRooms.map((room) => {
          const colors = StatusColors[room.status];
          
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
                      room.status === 'CLEANING' 
                        ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" 
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                    )}
                  >
                    {room.status === 'CLEANING' ? "Finish Cleaning" : "Req. Cleaning"}
                  </button>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-zinc-500 mb-2">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs uppercase tracking-wider font-semibold">Amenities</span>
                  </div>
                  <div className="flex gap-2 text-emerald-500">
                    {room.amenities.includes("Wifi") && <Wifi className="w-4 h-4" />}
                    {room.amenities.includes("AC") && <Wind className="w-4 h-4" />}
                    {room.amenities.includes("Drink") && <Wine className="w-4 h-4" />}
                    {room.amenities.includes("City View") && <Building className="w-4 h-4" />}
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
                {room.status === 'AVAILABLE' || room.status === 'CLEANING' ? (
                  <button 
                    onClick={() => handleOpenAddGuest(room)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-pink-200 hover:bg-pink-300 text-pink-900 rounded-lg text-sm font-bold transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add Guest
                  </button>
                ) : (
                  <button 
                    onClick={() => handleOpenGuestDetails(room)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-bold transition-colors"
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

      <Dialog open={isAddGuestModalOpen} onOpenChange={setIsAddGuestModalOpen}>
        <DialogContent className="sm:max-w-[700px] bg-[var(--color-card)] border-[var(--color-card-border)] text-white p-6 overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Add Guest to {selectedRoomForGuest?.number}</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Enter the guest details to check them into this room.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider border-b border-white/10 pb-2">Booking & Identity</h3>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Booking ID</label>
              <Input 
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                placeholder="e.g. BKG-8472"
                className="bg-zinc-900/50 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Aadhar No.</label>
              <Input 
                value={aadharNo}
                onChange={(e) => setAadharNo(e.target.value)}
                placeholder="0000 0000 0000"
                className="bg-zinc-900/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-zinc-300">Identity Card Photo</label>
              <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors cursor-pointer">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors shadow-sm">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors shadow-sm">
                    <Camera className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-sm text-zinc-500 mt-2">Click to upload or capture photo</span>
              </div>
            </div>

            <div className="space-y-4 md:col-span-2 mt-2">
              <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider border-b border-white/10 pb-2">Stay Details</h3>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Check-In Time</label>
              <Input 
                type="datetime-local"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                className="bg-zinc-900/50 border-white/10 text-white [color-scheme:dark]"
              />
            </div>
            <div className="space-y-2 flex items-center pt-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isVip}
                  onChange={(e) => setIsVip(e.target.checked)}
                  className="w-5 h-5 rounded border-white/10 bg-zinc-900/50 text-[var(--color-primary)] focus:ring-[var(--color-primary)]/50"
                />
                <span className="text-sm font-medium text-zinc-300">Mark as VIP Guest</span>
              </label>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-zinc-300">Special Request</label>
              <Textarea 
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                placeholder="e.g. Extra pillows, sea view preferred..."
                className="bg-zinc-900/50 border-white/10 text-white min-h-[100px]"
              />
            </div>

          </div>
          
          <DialogFooter className="mt-6 border-t border-white/10 pt-4">
            <Button variant="ghost" onClick={() => setIsAddGuestModalOpen(false)} className="hover:bg-white/5 text-white">
              Cancel
            </Button>
            <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium px-8" onClick={() => setIsAddGuestModalOpen(false)}>
              Confirm Check-in
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
