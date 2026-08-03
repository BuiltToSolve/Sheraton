"use client";

import { useState } from "react";
import { Search, Filter, RefreshCw, Plus, FileSpreadsheet, Edit, Trash2, MoreVertical, CheckCircle, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type Booking = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  arrive: string;
  depart: string;
  roomType: string;
  payment: string;
  status: string;
};

const initialBookings: Booking[] = [
  { id: "BKG-001", name: "John Doe", mobile: "123-456-7890", email: "john@example.com", arrive: "10/01/2026", depart: "10/05/2026", roomType: "Deluxe", payment: "Paid", status: "Confirmed" },
  { id: "BKG-002", name: "Jane Smith", mobile: "987-654-3210", email: "jane@example.com", arrive: "10/02/2026", depart: "10/04/2026", roomType: "Suite", payment: "Pending", status: "Pending" },
  { id: "BKG-003", name: "Mike Johnson", mobile: "555-123-4567", email: "mike@example.com", arrive: "10/05/2026", depart: "10/10/2026", roomType: "Standard", payment: "Paid", status: "Checked In" },
  { id: "BKG-004", name: "Emily Davis", mobile: "444-555-6666", email: "emily@example.com", arrive: "10/06/2026", depart: "10/08/2026", roomType: "Deluxe", payment: "Failed", status: "Cancelled" },
  { id: "BKG-005", name: "Robert Brown", mobile: "333-222-1111", email: "robert@example.com", arrive: "10/10/2026", depart: "10/15/2026", roomType: "Suite", payment: "Paid", status: "Confirmed" },
  { id: "BKG-006", name: "Linda Wilson", mobile: "222-333-4444", email: "linda@example.com", arrive: "10/12/2026", depart: "10/14/2026", roomType: "Standard", payment: "Pending", status: "Pending" },
  { id: "BKG-007", name: "William Taylor", mobile: "111-222-3333", email: "william@example.com", arrive: "10/15/2026", depart: "10/20/2026", roomType: "Deluxe", payment: "Paid", status: "Checked In" },
  { id: "BKG-008", name: "Elizabeth Moore", mobile: "666-777-8888", email: "elizabeth@example.com", arrive: "10/18/2026", depart: "10/22/2026", roomType: "Suite", payment: "Paid", status: "Confirmed" },
  { id: "BKG-009", name: "David Anderson", mobile: "999-888-7777", email: "david@example.com", arrive: "10/20/2026", depart: "10/25/2026", roomType: "Standard", payment: "Paid", status: "Checked Out" },
  { id: "BKG-010", name: "Susan Thomas", mobile: "888-999-0000", email: "susan@example.com", arrive: "10/22/2026", depart: "10/24/2026", roomType: "Deluxe", payment: "Pending", status: "Pending" },
  { id: "BKG-011", name: "Joseph Jackson", mobile: "777-666-5555", email: "joseph@example.com", arrive: "10/25/2026", depart: "10/30/2026", roomType: "Suite", payment: "Paid", status: "Confirmed" },
  { id: "BKG-012", name: "Margaret White", mobile: "555-444-3333", email: "margaret@example.com", arrive: "10/28/2026", depart: "11/02/2026", roomType: "Standard", payment: "Paid", status: "Confirmed" },
  { id: "BKG-013", name: "Charles Harris", mobile: "444-333-2222", email: "charles@example.com", arrive: "11/01/2026", depart: "11/05/2026", roomType: "Deluxe", payment: "Pending", status: "Pending" },
  { id: "BKG-014", name: "Patricia Martin", mobile: "333-444-5555", email: "patricia@example.com", arrive: "11/03/2026", depart: "11/08/2026", roomType: "Suite", payment: "Paid", status: "Confirmed" },
  { id: "BKG-015", name: "Christopher Thompson", mobile: "222-111-0000", email: "chris@example.com", arrive: "11/05/2026", depart: "11/10/2026", roomType: "Standard", payment: "Paid", status: "Checked In" },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const uniqueRoomTypes = Array.from(new Set(bookings.map(b => b.roomType)));

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [arrive, setArrive] = useState("");
  const [depart, setDepart] = useState("");
  const [roomType, setRoomType] = useState("Standard");
  const [status, setStatus] = useState("Pending");

  const toggleRoomTypeFilter = (type: string) => {
    setSelectedRoomTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const filteredBookings = bookings.filter(b => 
    (selectedRoomTypes.length === 0 || selectedRoomTypes.includes(b.roomType)) &&
    (b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
     b.mobile.includes(searchQuery))
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Confirmed": return "text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-xs";
      case "Checked In": return "text-blue-400 bg-blue-400/10 px-2 py-1 rounded text-xs";
      case "Checked Out": return "text-purple-400 bg-purple-400/10 px-2 py-1 rounded text-xs";
      case "Pending": return "text-orange-400 bg-orange-400/10 px-2 py-1 rounded text-xs";
      case "Cancelled": return "text-red-400 bg-red-400/10 px-2 py-1 rounded text-xs";
      default: return "text-zinc-400 bg-zinc-400/10 px-2 py-1 rounded text-xs";
    }
  };

  const getPaymentColor = (payment: string) => {
    if (payment === "Paid") return "text-emerald-400";
    if (payment === "Failed") return "text-red-400";
    return "text-orange-400";
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setMobile("");
    setEmail("");
    setArrive("");
    setDepart("");
    setRoomType("Standard");
    setStatus("Pending");
  };

  const handleEditClick = (booking: Booking) => {
    setEditingId(booking.id);
    setName(booking.name);
    setMobile(booking.mobile);
    setEmail(booking.email);
    // Convert mm/dd/yyyy to yyyy-mm-dd for date input
    const formatDateForInput = (dStr: string) => {
      const [m, d, y] = dStr.split("/");
      return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    };
    try {
      setArrive(formatDateForInput(booking.arrive));
      setDepart(formatDateForInput(booking.depart));
    } catch {
      setArrive("");
      setDepart("");
    }
    setRoomType(booking.roomType);
    setStatus(booking.status);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setBookings(bookings.filter(b => b.id !== id));
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const formatDateForDisplay = (dStr: string) => {
      if(!dStr) return "";
      const [y, m, d] = dStr.split("-");
      return `${m}/${d}/${y}`;
    };

    const newBooking: Booking = {
      id: editingId || `BKG-0${bookings.length + 1}`,
      name,
      mobile,
      email,
      arrive: formatDateForDisplay(arrive),
      depart: formatDateForDisplay(depart),
      roomType,
      payment: editingId ? (bookings.find(b => b.id === editingId)?.payment || "Pending") : "Pending",
      status
    };

    if (editingId) {
      setBookings(bookings.map(b => b.id === editingId ? newBooking : b));
    } else {
      setBookings([newBooking, ...bookings]);
    }
    
    setIsModalOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">All Bookings</h1>
          <p className="text-zinc-400 mt-1">Manage hotel reservations, arrivals, and departures.</p>
        </div>
      </div>

      <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden mt-8">
        {/* Header Toolbar */}
        <div className="p-4 border-b border-[var(--color-card-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <h2 className="text-xl font-bold text-white px-2">Bookings List</h2>
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search name, ID..." 
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
                <button className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${selectedRoomTypes.length > 0 ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
                  <Filter className="w-4 h-4" />
                  {selectedRoomTypes.length > 0 && <span className="text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full bg-[var(--color-primary)] text-black">{selectedRoomTypes.length}</span>}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-zinc-900 border-white/10 text-white shadow-xl" align="end">
                <DropdownMenuLabel className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Filter by Room</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {uniqueRoomTypes.map(type => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={selectedRoomTypes.includes(type)}
                    onCheckedChange={() => toggleRoomTypeFilter(type)}
                    className="focus:bg-white/10 focus:text-white cursor-pointer"
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
                {selectedRoomTypes.length > 0 && (
                  <>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <button 
                      onClick={() => setSelectedRoomTypes([])}
                      className="w-full text-left px-2 py-1.5 text-sm text-zinc-400 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
                    >
                      Clear Filters
                    </button>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <button 
              onClick={handleRefresh}
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-white' : ''}`} />
            </button>
            <button 
              onClick={() => { resetForm(); setIsModalOpen(true); }}
              className="p-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg transition-colors ml-2"
              title="Add Booking"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-[var(--color-card-border)]">
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Mobile</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Arrive</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Depart</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Room Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-card-border)]">
              {paginatedBookings.map((b) => (
                <tr key={b.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 text-sm font-medium text-[var(--color-primary)]">{b.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-white">{b.name}</td>
                  <td className="px-6 py-4 text-sm text-zinc-300">{b.mobile}</td>
                  <td className="px-6 py-4 text-sm text-zinc-300">{b.arrive}</td>
                  <td className="px-6 py-4 text-sm text-zinc-300">{b.depart}</td>
                  <td className="px-6 py-4 text-sm text-white font-medium">{b.roomType}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <span className={getPaymentColor(b.payment)}>{b.payment}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <span className={getStatusColor(b.status)}>{b.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-white/10 text-zinc-400 rounded-lg transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-zinc-900 border-white/10 text-white shadow-xl min-w-[160px]" align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(b)} className="focus:bg-white/10 focus:text-white cursor-pointer flex items-center gap-2">
                          <Edit className="w-4 h-4 text-blue-400" /> Edit booking
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(b.id, "Checked Out")} className="focus:bg-white/10 focus:text-white cursor-pointer flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" /> Check-out
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(b.id, "Cancelled")} className="focus:bg-white/10 focus:text-white cursor-pointer flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-orange-400" /> Cancel booking
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem onClick={() => handleDelete(b.id)} className="focus:bg-red-500/20 focus:text-red-400 text-red-400 cursor-pointer flex items-center gap-2">
                          <Trash2 className="w-4 h-4" /> Delete booking
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-zinc-500">
                    No bookings found matching your criteria.
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[700px] bg-[var(--color-card)] border-[var(--color-card-border)] text-white p-6 overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{editingId ? "Edit Booking" : "New Booking"}</DialogTitle>
            <DialogDescription className="text-zinc-400">
              {editingId ? "Update the details for this booking." : "Enter the essential details for the reservation."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave} className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider border-b border-white/10 pb-2">Guest Information</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Name *</label>
                <Input 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Mobile *</label>
                <Input 
                  required 
                  type="tel"
                  value={mobile} 
                  onChange={(e) => setMobile(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-zinc-300">Email</label>
                <Input 
                  type="email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
              </div>

              <div className="space-y-4 md:col-span-2 mt-2">
                <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider border-b border-white/10 pb-2">Reservation Details</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Arrive *</label>
                <Input 
                  required 
                  type="date"
                  value={arrive} 
                  onChange={(e) => setArrive(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white [&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Depart *</label>
                <Input 
                  required 
                  type="date"
                  value={depart} 
                  onChange={(e) => setDepart(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white [&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Room Type</label>
                <select 
                  value={roomType} 
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full flex h-10 rounded-md border border-white/10 bg-zinc-900/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                >
                  <option value="Standard">Standard</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Suite">Suite</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full flex h-10 rounded-md border border-white/10 bg-zinc-900/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Checked In">Checked In</option>
                  <option value="Checked Out">Checked Out</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-6 border-t border-white/10 mt-6">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 hover:bg-white/5 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg text-sm font-medium transition-colors"
              >
                {editingId ? "Save Changes" : "Create Booking"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
