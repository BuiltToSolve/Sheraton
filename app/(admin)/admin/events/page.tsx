"use client";

import { useState } from "react";
import { 
  CalendarHeart, Presentation, GlassWater, Plus, 
  Search, Users, Phone, Mail, Clock, Info, CalendarDays, Eye
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Booking = {
  id: string;
  applicantName: string;
  phone: string;
  email: string;
  eventType: string;
  expectedAttendance: number;
  guaranteedAttendance: number;
  startTime: string;
  endTime: string;
  specialRequirements: string;
};

const initialBookings: Booking[] = [
  {
    id: "EVT-1001",
    applicantName: "John Smith",
    phone: "+1 234-567-8901",
    email: "john@smith.com",
    eventType: "Wedding Reception",
    guaranteedAttendance: 150,
    expectedAttendance: 170,
    startTime: "2026-08-15T18:00",
    endTime: "2026-08-15T23:30",
    specialRequirements: "Vegetarian options needed. Space for a 5-piece band."
  },
  {
    id: "EVT-1002",
    applicantName: "Sarah Connor",
    phone: "+1 987-654-3210",
    email: "s.connor@cyberdyne.com",
    eventType: "Corporate Seminar",
    guaranteedAttendance: 50,
    expectedAttendance: 55,
    startTime: "2026-08-20T09:00",
    endTime: "2026-08-20T17:00",
    specialRequirements: "Projector, 2 microphones, continuous coffee service."
  }
];

export default function EventsPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [applicantName, setApplicantName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("");
  const [expected, setExpected] = useState("");
  const [guaranteed, setGuaranteed] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [requirements, setRequirements] = useState("");

  const handleSaveBooking = () => {
    if (!applicantName || !eventType || !startTime || !endTime) return;
    
    const newBooking: Booking = {
      id: `EVT-${1000 + bookings.length + 1}`,
      applicantName,
      phone,
      email,
      eventType,
      expectedAttendance: parseInt(expected) || 0,
      guaranteedAttendance: parseInt(guaranteed) || 0,
      startTime,
      endTime,
      specialRequirements: requirements
    };

    setBookings([newBooking, ...bookings]);
    setIsModalOpen(false);
    
    // Reset form
    setApplicantName("");
    setPhone("");
    setEmail("");
    setEventType("");
    setExpected("");
    setGuaranteed("");
    setStartTime("");
    setEndTime("");
    setRequirements("");
  };

  const filteredBookings = bookings.filter(b => 
    b.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Banquets & Events</h1>
          <p className="text-zinc-400 mt-1">Manage wedding venues, corporate spaces, and catering.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg transition-colors font-medium whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          New Event Booking
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] flex items-start gap-4">
          <div className="p-3 bg-[var(--color-primary)]/10 rounded-xl">
            <CalendarHeart className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Wedding Venues</h3>
            <p className="text-zinc-400 text-sm mt-1">Spacious halls and outdoor gardens for luxurious weddings.</p>
          </div>
        </div>
        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] flex items-start gap-4">
          <div className="p-3 bg-[var(--color-primary)]/10 rounded-xl">
            <Presentation className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Corporate Halls</h3>
            <p className="text-zinc-400 text-sm mt-1">Equipped with projectors, high-speed Wi-Fi, and sound systems.</p>
          </div>
        </div>
        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] flex items-start gap-4">
          <div className="p-3 bg-[var(--color-primary)]/10 rounded-xl">
            <GlassWater className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Event Catering</h3>
            <p className="text-zinc-400 text-sm mt-1">Customizable menus for any event size and dietary preference.</p>
          </div>
        </div>
      </div>

      {/* Bookings Table Section */}
      <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden">
        <div className="p-4 border-b border-[var(--color-card-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white">Active Bookings</h2>
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-zinc-900/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] w-full sm:w-64"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-card-border)] bg-white/5">
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">ID</th>
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Event Details</th>
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Applicant</th>
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Schedule</th>
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Pax</th>
                <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-card-border)]">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <span className="text-sm font-medium text-[var(--color-primary)]">{booking.id}</span>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-bold text-white">{booking.eventType}</p>
                    <p className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                      <Info className="w-3 h-3" />
                      {booking.specialRequirements ? "Has special requirements" : "Standard"}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-medium text-white">{booking.applicantName}</p>
                    <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {booking.phone}</span>
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {booking.email}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <CalendarDays className="w-4 h-4 text-zinc-500" />
                      {new Date(booking.startTime).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                      <Clock className="w-3 h-3" />
                      {new Date(booking.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                      {new Date(booking.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-sm text-white">
                      <Users className="w-4 h-4 text-zinc-500" />
                      <span className="font-medium">{booking.guaranteedAttendance}</span>
                      <span className="text-zinc-500 text-xs">/ {booking.expectedAttendance} Exp</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => setSelectedBooking(booking)}
                      className="p-2 bg-white/5 hover:bg-[var(--color-primary)] text-zinc-400 hover:text-white rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500">
                    No bookings found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!selectedBooking} onOpenChange={(open) => !open && setSelectedBooking(null)}>
        <DialogContent className="sm:max-w-[600px] bg-[var(--color-card)] border-[var(--color-card-border)] text-white p-0 overflow-hidden">
          {selectedBooking && (
            <>
              <div className="p-6 pb-0" style={{ marginLeft: "10px", marginRight: "10px" }}>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold flex justify-between items-center">
                    <span>{selectedBooking.eventType}</span>
                    <span className="text-sm font-medium bg-[var(--color-primary)]/20 text-[var(--color-primary)] px-3 py-1">
                      {selectedBooking.id}
                    </span>
                  </DialogTitle>
                </DialogHeader>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="bg-zinc-800/50 rounded-xl p-4 border border-white/5 space-y-3">
                  <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">Client Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">Name</p>
                      <p className="text-sm font-medium text-white">{selectedBooking.applicantName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">Phone</p>
                      <p className="text-sm font-medium text-white flex items-center gap-2"><Phone className="w-3 h-3 text-[var(--color-primary)]" /> {selectedBooking.phone}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-zinc-500 mb-1">Email</p>
                      <p className="text-sm font-medium text-white flex items-center gap-2"><Mail className="w-3 h-3 text-[var(--color-primary)]" /> {selectedBooking.email}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-800/50 rounded-xl p-4 border border-white/5 space-y-3">
                  <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">Event Schedule & Attendance</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">Start Time</p>
                      <p className="text-sm font-medium text-white flex items-center gap-2">
                        <CalendarDays className="w-3 h-3 text-[var(--color-primary)]" />
                        {new Date(selectedBooking.startTime).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">End Time</p>
                      <p className="text-sm font-medium text-white flex items-center gap-2">
                        <Clock className="w-3 h-3 text-[var(--color-primary)]" />
                        {new Date(selectedBooking.endTime).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">Guaranteed Pax</p>
                      <p className="text-sm font-medium text-white flex items-center gap-2"><Users className="w-3 h-3 text-[var(--color-primary)]" /> {selectedBooking.guaranteedAttendance}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">Expected Pax</p>
                      <p className="text-sm font-medium text-white flex items-center gap-2"><Users className="w-3 h-3 text-zinc-400" /> {selectedBooking.expectedAttendance}</p>
                    </div>
                  </div>
                </div>

                {selectedBooking.specialRequirements && (
                  <div className="bg-zinc-800/50 rounded-xl p-4 border border-[var(--color-primary)]/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-primary)]"></div>
                    <h3 className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4" /> Special Requirements
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                      {selectedBooking.specialRequirements}
                    </p>
                  </div>
                )}
              </div>

              {/* <div className="p-4 border-t border-white/10 bg-black/20 flex justify-end">
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </div> */}
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[700px] bg-[var(--color-card)] border-[var(--color-card-border)] text-white p-6 overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">New Event Booking</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Enter the essential details for the banquet or event booking.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider border-b border-white/10 pb-2">Client Information</h3>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Applicant Name *</label>
              <Input 
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="e.g. Jane Doe"
                className="bg-zinc-900/50 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Phone</label>
              <Input 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +1 555-0199"
                className="bg-zinc-900/50 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Email</label>
              <Input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="bg-zinc-900/50 border-white/10 text-white"
              />
            </div>

            <div className="space-y-4 md:col-span-2 mt-2">
              <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider border-b border-white/10 pb-2">Event Details</h3>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Event Type *</label>
              <Input 
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                placeholder="e.g. Wedding, Corporate..."
                list="event-types"
                className="bg-zinc-900/50 border-white/10 text-white"
              />
              <datalist id="event-types">
                <option value="Wedding Reception" />
                <option value="Corporate Seminar" />
                <option value="Birthday Party" />
                <option value="Anniversary Dinner" />
                <option value="Conference" />
                <option value="Exhibition" />
              </datalist>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Guaranteed Pax</label>
                <Input 
                  type="number"
                  value={guaranteed}
                  onChange={(e) => setGuaranteed(e.target.value)}
                  placeholder="e.g. 150"
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Expected Pax</label>
                <Input 
                  type="number"
                  value={expected}
                  onChange={(e) => setExpected(e.target.value)}
                  placeholder="e.g. 170"
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Start Time *</label>
              <Input 
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="bg-zinc-900/50 border-white/10 text-white [color-scheme:dark]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">End Time *</label>
              <Input 
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="bg-zinc-900/50 border-white/10 text-white [color-scheme:dark]"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-zinc-300">Special Requirements</label>
              <Textarea 
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Equipment needs, dietary requirements, setup notes..."
                className="bg-zinc-900/50 border-white/10 text-white resize-none"
                rows={3}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveBooking}
              disabled={!applicantName || !eventType || !startTime || !endTime}
              className="px-5 py-2 rounded-lg font-medium bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Booking
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
