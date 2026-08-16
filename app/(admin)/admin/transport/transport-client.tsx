"use client";

import { useState, useTransition } from "react";
import { Car, Plane, BatteryCharging, Shield, Edit, Trash2, Search, Filter, Plus, RefreshCw, FileSpreadsheet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VehicleStatus, VehicleType, StaffMember } from "@prisma/client";
import { addVehicle, updateVehicle, deleteVehicle, VehicleInput } from "./actions";
import { useRouter } from "next/navigation";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

type VehicleWithDriver = {
  id: string;
  vehicleNumber: string;
  type: VehicleType;
  brand: string;
  capacity: number;
  status: VehicleStatus;
  driverId: string | null;
  isEV: boolean;
  image: string | null;
  driver?: StaffMember | null;
};

const statusColors: Record<string, string> = {
  "Available": "bg-green-500/10 text-green-500 border-green-500/20",
  "OnTrip": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  "Maintenance": "bg-red-500/10 text-red-500 border-red-500/20",
  "Inactive": "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
};

export function TransportClient({ initialVehicles, availableDrivers }: { initialVehicles: VehicleWithDriver[], availableDrivers: StaffMember[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<VehicleStatus[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [type, setType] = useState<VehicleType>(VehicleType.Sedan);
  const [brand, setBrand] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState<VehicleStatus>(VehicleStatus.Available);
  const [driverId, setDriverId] = useState<string>("");
  const [isEV, setIsEV] = useState(false);
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setVehicleNumber("");
    setType(VehicleType.Sedan);
    setBrand("");
    setCapacity("");
    setStatus(VehicleStatus.Available);
    setDriverId("");
    setIsEV(false);
    setImage("");
    setEditingId(null);
    setError(null);
  };

  const handleEditClick = (cab: VehicleWithDriver) => {
    setEditingId(cab.id);
    setVehicleNumber(cab.vehicleNumber);
    setType(cab.type);
    setBrand(cab.brand);
    setCapacity(cab.capacity.toString());
    setStatus(cab.status);
    setDriverId(cab.driverId || "");
    setIsEV(cab.isEV);
    setImage(cab.image || "");
    setError(null);
    setIsModalOpen(true);
  };

  const handleDeleteCab = async (id: string) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      await deleteVehicle(id);
    }
  };

  const handleSaveCab = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: VehicleInput = {
      vehicleNumber,
      type,
      brand,
      capacity: Number(capacity),
      status,
      driverId: driverId === "" ? null : driverId,
      isEV,
      image: image === "" ? null : image
    };

    setError(null);

    let result;
    if (editingId) {
      result = await updateVehicle(editingId, data);
    } else {
      result = await addVehicle(data);
    }

    if (result && !result.success) {
      setError(result.error || "An error occurred.");
      return;
    }
    
    setIsModalOpen(false);
    resetForm();
  };

  const uniqueStatuses = Object.values(VehicleStatus);

  const toggleStatusFilter = (stat: VehicleStatus) => {
    setSelectedStatuses(prev => 
      prev.includes(stat) ? prev.filter(s => s !== stat) : [...prev, stat]
    );
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    startTransition(() => {
      router.refresh();
      setIsRefreshing(false);
    });
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Vehicles");

    const headers = ["Vehicle Number", "Type", "Brand", "Capacity", "Status", "Driver Name", "Driver Contact", "Is EV"];
    
    const headerRow = worksheet.addRow(headers);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF333333" } };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    filteredCabs.forEach(c => {
      worksheet.addRow([
        c.vehicleNumber,
        c.type,
        c.brand,
        c.capacity,
        c.status,
        c.driver ? `${c.driver.firstName} ${c.driver.lastName}` : "Unassigned",
        c.driver ? c.driver.phone : "-",
        c.isEV ? "Yes" : "No"
      ]);
    });

    worksheet.columns.forEach(column => {
      let maxLength = 0;
      column.eachCell!({ includeEmpty: true }, (cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) maxLength = columnLength;
      });
      column.width = maxLength < 10 ? 10 : maxLength + 2;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "vehicles_list.xlsx");
  };

  const filteredCabs = initialVehicles.filter(cab => 
    (selectedStatuses.length === 0 || selectedStatuses.includes(cab.status)) &&
    (cab.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
     cab.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
     cab.driver?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     cab.driver?.lastName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredCabs.length / itemsPerPage);
  const paginatedCabs = filteredCabs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Transportation & Parking</h1>
          <p className="text-zinc-400 mt-1">Manage guest transit, valet, and parking facilities.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] flex gap-4">
          <Plane className="w-8 h-8 text-[var(--color-primary)] shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Airport Shuttle</h3>
            <p className="text-sm text-zinc-400">Complimentary and chargeable pickup and drop services for VIP guests.</p>
          </div>
        </div>

        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] flex gap-4">
          <Car className="w-8 h-8 text-[var(--color-primary)] shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Valet Parking & Car Rental</h3>
            <p className="text-sm text-zinc-400">Secure free or paid parking, valet assistance, and rental cars.</p>
          </div>
        </div>

        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] flex gap-4">
          <BatteryCharging className="w-8 h-8 text-[var(--color-primary)] shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-white mb-1">EV Charging Stations</h3>
            <p className="text-sm text-zinc-400">Dedicated electric vehicle charging spots in the basement parking.</p>
          </div>
        </div>

        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] flex gap-4">
          <Shield className="w-8 h-8 text-[var(--color-primary)] shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Reserved & Accessible Parking</h3>
            <p className="text-sm text-zinc-400">Reserved spots for VIPs and wheelchair-accessible parking near elevators.</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden">
          {/* Header Toolbar */}
          <div className="p-4 border-b border-[var(--color-card-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <h2 className="text-xl font-bold text-white px-2">Vehicle List</h2>
              <div className="relative flex-1 sm:flex-none">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search vehicles..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-zinc-900/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] w-full sm:w-64"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={exportToExcel}
                className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                title="Export to Excel"
              >
                <FileSpreadsheet className="w-4 h-4" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${selectedStatuses.length > 0 ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
                    <Filter className="w-4 h-4" />
                    {selectedStatuses.length > 0 && <span className="text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full bg-[var(--color-primary)] text-black">{selectedStatuses.length}</span>}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-zinc-900 border-white/10 text-white shadow-xl" align="end">
                  <DropdownMenuLabel className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  {uniqueStatuses.map(status => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={selectedStatuses.includes(status as VehicleStatus)}
                      onCheckedChange={() => toggleStatusFilter(status as VehicleStatus)}
                      className="focus:bg-white/10 focus:text-white cursor-pointer"
                    >
                      {status}
                    </DropdownMenuCheckboxItem>
                  ))}
                  {selectedStatuses.length > 0 && (
                    <>
                      <DropdownMenuSeparator className="bg-white/10" />
                      <button 
                        onClick={() => setSelectedStatuses([])}
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
                <RefreshCw className={`w-4 h-4 ${isRefreshing || isPending ? 'animate-spin text-white' : ''}`} />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-[var(--color-card-border)] bg-white/5">
                  <th className="p-4 w-16 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Image</th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Vehicle Number</th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Type</th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Brand</th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Driver Info</th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Capacity</th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">EV</th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-card-border)]">
                {paginatedCabs.map((cab) => (
                  <tr key={cab.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 py-3">
                      {cab.image ? (
                        <div 
                          className="w-12 h-8 rounded overflow-hidden relative border border-white/10 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setSelectedImage(cab.image)}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={cab.image} alt={cab.brand} className="object-cover w-full h-full" />
                        </div>
                      ) : (
                        <div className="w-12 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500">
                          <Car className="w-4 h-4" />
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-sm font-medium text-white">{cab.vehicleNumber}</td>
                    <td className="p-4 text-sm font-medium text-white">{cab.type}</td>
                    <td className="p-4 text-sm text-zinc-300">{cab.brand}</td>
                    <td className="p-4 text-sm text-zinc-300">
                      {cab.driver ? (
                        <div className="flex flex-col">
                          <span className="font-medium text-white">{cab.driver.firstName} {cab.driver.lastName}</span>
                          <span className="text-xs">{cab.driver.phone}</span>
                        </div>
                      ) : (
                        <span className="text-zinc-500 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-zinc-300">{cab.capacity}</td>
                    <td className="p-4 text-sm text-zinc-300">{cab.isEV ? "Yes" : "No"}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${statusColors[cab.status] || "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"}`}>
                        {cab.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEditClick(cab)}
                          className="p-2 bg-white/5 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteCab(cab.id)}
                          className="p-2 bg-white/5 hover:bg-red-500/20 text-orange-400 hover:text-red-400 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCabs.length === 0 && (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-zinc-500">
                      No vehicles found matching your criteria.
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
              {filteredCabs.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredCabs.length)} of {filteredCabs.length}
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

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-[800px] bg-transparent border-none shadow-none p-0 flex justify-center [&>button]:bg-black/50 [&>button]:text-white hover:[&>button]:bg-black/80 [&>button]:right-2 [&>button]:top-2 [&>button]:rounded-full [&>button]:p-1.5">
          <DialogTitle className="sr-only">Vehicle Image</DialogTitle>
          {selectedImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={selectedImage} alt="Zoomed vehicle" className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl" />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[700px] bg-[var(--color-card)] border-[var(--color-card-border)] text-white p-6 overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{editingId ? "Edit Vehicle" : "Add New Vehicle"}</DialogTitle>
            <DialogDescription className="text-zinc-400">
              {editingId ? "Update the details for this vehicle." : "Enter the details to register a new vehicle in the system."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveCab} className="mt-4 space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                <span className="font-bold flex-shrink-0">Error:</span> {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider border-b border-white/10 pb-2">Vehicle Details</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Vehicle Number / License Plate *</label>
                <Input 
                  required 
                  value={vehicleNumber} 
                  onChange={(e) => setVehicleNumber(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Brand *</label>
                <Input 
                  required 
                  value={brand} 
                  onChange={(e) => setBrand(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Type</label>
                <select 
                  value={type} 
                  onChange={(e) => setType(e.target.value as VehicleType)}
                  className="w-full flex h-10 rounded-md border border-white/10 bg-zinc-900/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                >
                  {Object.values(VehicleType).map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Capacity (Seats) *</label>
                <Input 
                  required 
                  type="number"
                  min="1"
                  value={capacity} 
                  onChange={(e) => setCapacity(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value as VehicleStatus)}
                  className="w-full flex h-10 rounded-md border border-white/10 bg-zinc-900/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                >
                  {Object.values(VehicleStatus).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2 flex items-center gap-2 mt-8">
                 <input 
                    type="checkbox" 
                    checked={isEV}
                    onChange={(e) => setIsEV(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-transparent text-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:ring-offset-[#1e1e2d]" 
                  />
                 <label className="text-sm font-medium text-zinc-300">Is Electric Vehicle (EV)</label>
              </div>

              <div className="space-y-2 md:col-span-2 mt-4">
                <label className="text-sm font-medium text-zinc-300">Image URL</label>
                <Input 
                  value={image} 
                  onChange={(e) => setImage(e.target.value)} 
                  placeholder="https://..."
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
              </div>

              <div className="space-y-4 md:col-span-2 mt-2">
                <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider border-b border-white/10 pb-2">Driver Assignment</h3>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-zinc-300">Assign Driver</label>
                <select 
                  value={driverId} 
                  onChange={(e) => setDriverId(e.target.value)}
                  className="w-full flex h-10 rounded-md border border-white/10 bg-zinc-900/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                >
                  <option value="">-- Unassigned --</option>
                  {availableDrivers.map(driver => (
                    <option key={driver.id} value={driver.id}>
                      {driver.firstName} {driver.lastName} ({driver.phone})
                    </option>
                  ))}
                </select>
                {availableDrivers.length === 0 && (
                  <p className="text-xs text-orange-400 mt-1">No active drivers found in Staff Members.</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isPending}
                className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                {editingId ? "Save Changes" : "Add Vehicle"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
