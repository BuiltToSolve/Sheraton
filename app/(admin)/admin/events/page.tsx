"use client";

import { useState } from "react";
import { 
  CalendarHeart, Presentation, GlassWater, Plus, 
  Search, Users, Phone, Mail, Clock, Info, CalendarDays, Eye,
  Filter, RefreshCw, Edit, Trash2, FileSpreadsheet
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  },
  {
    id: "EVT-1003",
    applicantName: "Michael Scott",
    phone: "+1 555-0192",
    email: "mscott@dundermifflin.com",
    eventType: "Award Ceremony",
    guaranteedAttendance: 80,
    expectedAttendance: 100,
    startTime: "2026-09-01T19:00",
    endTime: "2026-09-01T23:00",
    specialRequirements: "Stage setup with podium and trophies display."
  },
  {
    id: "EVT-1004",
    applicantName: "Bruce Wayne",
    phone: "+1 555-0100",
    email: "bwayne@wayneenterprises.com",
    eventType: "Charity Gala",
    guaranteedAttendance: 300,
    expectedAttendance: 350,
    startTime: "2026-09-15T20:00",
    endTime: "2026-09-16T01:00",
    specialRequirements: "High security, valet parking for all guests."
  },
  {
    id: "EVT-1005",
    applicantName: "Tony Stark",
    phone: "+1 555-0999",
    email: "tstark@starkindustries.com",
    eventType: "Product Launch",
    guaranteedAttendance: 200,
    expectedAttendance: 250,
    startTime: "2026-09-20T10:00",
    endTime: "2026-09-20T14:00",
    specialRequirements: "Advanced AV setup, fast Wi-Fi, media briefing room."
  },
  {
    id: "EVT-1006",
    applicantName: "Diana Prince",
    phone: "+1 555-0888",
    email: "dprince@themyscira.com",
    eventType: "Exhibition",
    guaranteedAttendance: 100,
    expectedAttendance: 150,
    startTime: "2026-10-05T09:00",
    endTime: "2026-10-05T18:00",
    specialRequirements: "Display pedestals, specific lighting for artifacts."
  },
  {
    id: "EVT-1007",
    applicantName: "Clark Kent",
    phone: "+1 555-0777",
    email: "ckent@dailyplanet.com",
    eventType: "Press Conference",
    guaranteedAttendance: 40,
    expectedAttendance: 50,
    startTime: "2026-10-12T11:00",
    endTime: "2026-10-12T13:00",
    specialRequirements: "Microphones for Q&A, press kit distribution area."
  },
  {
    id: "EVT-1008",
    applicantName: "Natasha Romanoff",
    phone: "+1 555-0666",
    email: "nromanoff@shield.com",
    eventType: "Training Workshop",
    guaranteedAttendance: 30,
    expectedAttendance: 30,
    startTime: "2026-10-20T08:00",
    endTime: "2026-10-22T17:00",
    specialRequirements: "Open floor plan, breakout rooms, whiteboard walls."
  },
  {
    id: "EVT-1009",
    applicantName: "Peter Parker",
    phone: "+1 555-0555",
    email: "pparker@dailybugle.com",
    eventType: "Photography Seminar",
    guaranteedAttendance: 25,
    expectedAttendance: 35,
    startTime: "2026-11-02T14:00",
    endTime: "2026-11-02T18:00",
    specialRequirements: "Dark room setup, projector, multiple power outlets."
  },
  {
    id: "EVT-1010",
    applicantName: "Stephen Strange",
    phone: "+1 555-0444",
    email: "sstrange@sanctum.com",
    eventType: "Medical Conference",
    guaranteedAttendance: 120,
    expectedAttendance: 130,
    startTime: "2026-11-15T09:00",
    endTime: "2026-11-16T17:00",
    specialRequirements: "Lectern, dual screens, catering for dietary restrictions."
  },
  {
    id: "EVT-1011",
    applicantName: "Wanda Maximoff",
    phone: "+1 555-0333",
    email: "wmaximoff@avengers.com",
    eventType: "Family Reunion",
    guaranteedAttendance: 50,
    expectedAttendance: 60,
    startTime: "2026-11-20T12:00",
    endTime: "2026-11-20T20:00",
    specialRequirements: "Kids play area, large buffet, outdoor seating if possible."
  },
  {
    id: "EVT-1012",
    applicantName: "Vision",
    phone: "+1 555-0222",
    email: "vision@avengers.com",
    eventType: "Tech Symposium",
    guaranteedAttendance: 200,
    expectedAttendance: 220,
    startTime: "2026-12-01T09:00",
    endTime: "2026-12-02T18:00",
    specialRequirements: "High-speed internet, multiple charging stations."
  },
  {
    id: "EVT-1013",
    applicantName: "Sam Wilson",
    phone: "+1 555-0111",
    email: "swilson@usaf.gov",
    eventType: "Veterans Banquet",
    guaranteedAttendance: 150,
    expectedAttendance: 160,
    startTime: "2026-12-10T18:00",
    endTime: "2026-12-10T23:00",
    specialRequirements: "Wheelchair accessibility, patriotic decorations."
  },
  {
    id: "EVT-1014",
    applicantName: "Bucky Barnes",
    phone: "+1 555-0000",
    email: "bbarnes@shield.com",
    eventType: "Rehabilitation Seminar",
    guaranteedAttendance: 40,
    expectedAttendance: 45,
    startTime: "2026-12-15T10:00",
    endTime: "2026-12-15T16:00",
    specialRequirements: "Comfortable seating, quiet environment."
  },
  {
    id: "EVT-1015",
    applicantName: "T'Challa",
    phone: "+1 555-9999",
    email: "king@wakanda.gov",
    eventType: "Diplomatic Summit",
    guaranteedAttendance: 80,
    expectedAttendance: 90,
    startTime: "2026-12-20T09:00",
    endTime: "2026-12-21T17:00",
    specialRequirements: "Top-tier security, translators, private meeting rooms."
  }
];

export default function EventsPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);

  const uniqueEventTypes = Array.from(new Set(bookings.map(b => b.eventType)));

  const toggleEventTypeFilter = (type: string) => {
    setSelectedEventTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

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

  const handleEditClick = (booking: Booking) => {
    setEditingBookingId(booking.id);
    setApplicantName(booking.applicantName);
    setPhone(booking.phone);
    setEmail(booking.email);
    setEventType(booking.eventType);
    setExpected(booking.expectedAttendance.toString());
    setGuaranteed(booking.guaranteedAttendance.toString());
    setStartTime(booking.startTime);
    setEndTime(booking.endTime);
    setRequirements(booking.specialRequirements);
    setIsModalOpen(true);
  };

  const handleDeleteBooking = (id: string) => {
    setBookings(bookings.filter(b => b.id !== id));
  };

  const resetForm = () => {
    setEditingBookingId(null);
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

  const handleSaveBooking = () => {
    if (!applicantName || !eventType || !startTime || !endTime) return;
    
    if (editingBookingId) {
      setBookings(bookings.map(b => b.id === editingBookingId ? {
        ...b,
        applicantName,
        phone,
        email,
        eventType,
        expectedAttendance: parseInt(expected) || 0,
        guaranteedAttendance: parseInt(guaranteed) || 0,
        startTime,
        endTime,
        specialRequirements: requirements
      } : b));
    } else {
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
    }

    setIsModalOpen(false);
    resetForm();
  };

  const filteredBookings = bookings.filter(b => 
    (selectedEventTypes.length === 0 || selectedEventTypes.includes(b.eventType)) &&
    (b.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     b.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
     b.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Banquets & Events</h1>
          <p className="text-zinc-400 mt-1">Manage wedding venues, corporate spaces, and catering.</p>
        </div>
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
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <h2 className="text-xl font-bold text-white px-2">Active Bookings</h2>
            <div className="relative flex-1 sm:flex-none">
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

          <div className="flex items-center gap-2">
            <button 
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              title="Export to Excel"
            >
              <FileSpreadsheet className="w-4 h-4" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${selectedEventTypes.length > 0 ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
                  <Filter className="w-4 h-4" />
                  {selectedEventTypes.length > 0 && <span className="text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full bg-[var(--color-primary)] text-black">{selectedEventTypes.length}</span>}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-zinc-900 border-white/10 text-white shadow-xl" align="end">
                <DropdownMenuLabel className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Filter by Event Type</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {uniqueEventTypes.map(type => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={selectedEventTypes.includes(type)}
                    onCheckedChange={() => toggleEventTypeFilter(type)}
                    className="focus:bg-white/10 focus:text-white cursor-pointer"
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
                {selectedEventTypes.length > 0 && (
                  <>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <button 
                      onClick={() => setSelectedEventTypes([])}
                      className="w-full text-left px-2 py-1.5 text-sm text-zinc-400 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
                    >
                      Clear Filters
                    </button>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <button 
              onClick={() => { resetForm(); setIsModalOpen(true); }}
              className="p-2 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button 
              onClick={handleRefresh}
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-white' : ''}`} />
            </button>
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
              {paginatedBookings.map((booking) => (
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
                      {new Date(booking.startTime).toLocaleDateString("en-US")}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                      <Clock className="w-3 h-3" />
                      {new Date(booking.startTime).toLocaleTimeString("en-US", {hour: '2-digit', minute:'2-digit'})} - 
                      {new Date(booking.endTime).toLocaleTimeString("en-US", {hour: '2-digit', minute:'2-digit'})}
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
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setSelectedBooking(booking)}
                        className="p-2 bg-white/5 hover:bg-[var(--color-primary)] text-zinc-400 hover:text-white rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditClick(booking)}
                        className="p-2 bg-white/5 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                        title="Edit Booking"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="p-2 bg-white/5 hover:bg-red-500/20 text-orange-400 hover:text-red-400 rounded-lg transition-colors"
                        title="Delete Booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
        
        {/* Pagination Footer */}
        <div className="p-4 flex items-center justify-end gap-4 border-t border-[var(--color-card-border)] text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <span>Items per page:</span>
            <select 
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-zinc-900/50 border border-white/10 rounded px-2 py-1 text-white focus:outline-none focus:border-[var(--color-primary)]"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <span>
            {filteredBookings.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of {filteredBookings.length}
          </span>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1 hover:text-white disabled:opacity-50 transition-colors"
          >
            <span className="text-lg">‹</span>
          </button>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-1 hover:text-white disabled:opacity-50 transition-colors"
          >
            <span className="text-lg">›</span>
          </button>
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
                        {new Date(selectedBooking.startTime).toLocaleString("en-US")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">End Time</p>
                      <p className="text-sm font-medium text-white flex items-center gap-2">
                        <Clock className="w-3 h-3 text-[var(--color-primary)]" />
                        {new Date(selectedBooking.endTime).toLocaleString("en-US")}
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


            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[700px] bg-[var(--color-card)] border-[var(--color-card-border)] text-white p-6 overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{editingBookingId ? "Edit Event Booking" : "New Event Booking"}</DialogTitle>
            <DialogDescription className="text-zinc-400">
              {editingBookingId ? "Update the details for this booking." : "Enter the essential details for the banquet or event booking."}
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
