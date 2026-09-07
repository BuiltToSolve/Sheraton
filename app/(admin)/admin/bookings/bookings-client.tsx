'use client';

import { useState, useEffect } from "react";
import { Search, Filter, RefreshCw, Plus, FileSpreadsheet, MoreVertical, Eye, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";
import { updateBookingStatus, deleteBooking } from "./actions";
import AdminLoading from "../loading";

export default function BookingsClient({ initialBookings }: { initialBookings: any[] }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  
  // Reset navigation state if the component stays mounted (e.g., navigating back)
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const handleNavigate = (url: string) => {
    setIsNavigating(true);
    router.push(url);
  };
  
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  
  // Extract unique room types from actual data
  const uniqueRoomTypes = Array.from(new Set(initialBookings.map(b => b.RoomType?.name).filter(Boolean)));

  const toggleRoomTypeFilter = (type: string) => {
    setSelectedRoomTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const filteredBookings = initialBookings.filter(b => {
    const roomTypeName = b.RoomType?.name || '';
    const bookingPersonName = b.User?.name || b.guests?.[0]?.fullName || 'Unknown';
    const bookingPersonMobile = b.User?.mobile || b.guests?.[0]?.phone || 'N/A';
    
    return (selectedRoomTypes.length === 0 || selectedRoomTypes.includes(roomTypeName)) &&
    (bookingPersonName.toLowerCase().includes(searchQuery.toLowerCase()) || 
     b.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
     bookingPersonMobile.includes(searchQuery));
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Confirmed": return "text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-xs";
      case "CheckedIn": return "text-blue-400 bg-blue-400/10 px-2 py-1 rounded text-xs";
      case "CheckedOut": return "text-purple-400 bg-purple-400/10 px-2 py-1 rounded text-xs";
      case "Pending": return "text-orange-400 bg-orange-400/10 px-2 py-1 rounded text-xs";
      case "Cancelled": return "text-red-400 bg-red-400/10 px-2 py-1 rounded text-xs";
      case "NoShow": return "text-red-600 bg-red-600/10 px-2 py-1 rounded text-xs";
      default: return "text-zinc-400 bg-zinc-400/10 px-2 py-1 rounded text-xs";
    }
  };

  const getPaymentColor = (payment: string) => {
    if (payment === "Paid" || payment === "FullyPaid") return "text-emerald-400";
    if (payment === "Failed") return "text-red-400";
    return "text-orange-400";
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    await updateBookingStatus(id, newStatus);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      await deleteBooking(id);
    }
  };

  if (isNavigating) {
    return <AdminLoading />;
  }

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
                    key={type as string}
                    checked={selectedRoomTypes.includes(type as string)}
                    onCheckedChange={() => toggleRoomTypeFilter(type as string)}
                    className="focus:bg-white/10 focus:text-white cursor-pointer"
                  >
                    {type as string}
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
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-[var(--color-card-border)]">
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Booking No.</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Booking Person</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Mobile</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Check Out</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Room Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-card-border)]">
              {paginatedBookings.map((b) => {
                const bookingPersonName = b.User?.name || b.guests?.[0]?.fullName || 'Unknown';
                const bookingPersonMobile = b.User?.mobile || b.guests?.[0]?.phone || 'N/A';
                return (
                  <tr key={b.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium">
                      <button 
                        onClick={() => handleNavigate(`/admin/bookings/${b.id}`)}
                        className="text-[var(--color-primary)] hover:underline"
                      >
                        {b.bookingNumber}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-white">{bookingPersonName}</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">{bookingPersonMobile}</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">{new Date(b.checkInDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">{new Date(b.checkOutDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-white font-medium">{b.RoomType?.name}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <span className={getPaymentColor(b.paymentStatus)}>{b.paymentStatus}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <span className={getStatusColor(b.bookingStatus)}>{b.bookingStatus}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-white/10 text-zinc-400 rounded-lg transition-colors">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-zinc-900 border-white/10 text-white shadow-xl min-w-[160px]" align="end">
                          <DropdownMenuItem onClick={() => handleNavigate(`/admin/bookings/${b.id}`)} className="focus:bg-white/10 focus:text-white cursor-pointer flex items-center gap-2">
                            <Eye className="w-4 h-4 text-[var(--color-primary)]" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuItem onClick={() => handleUpdateStatus(b.id, "CheckedIn")} className="focus:bg-white/10 focus:text-white cursor-pointer flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-blue-400" /> Check-in
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(b.id, "CheckedOut")} className="focus:bg-white/10 focus:text-white cursor-pointer flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-purple-400" /> Check-out
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
                );
              })}
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
    </div>
  );
}
