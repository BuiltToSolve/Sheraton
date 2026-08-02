"use client";

import { useState } from "react";
import { Car, Plane, BatteryCharging, Shield, Edit, Trash2, Search, Filter, Plus, RefreshCw, Calendar, FileSpreadsheet } from "lucide-react";
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

type Cab = {
  id: string;
  image: string;
  driverName: string;
  driverContact: string;
  cabModel: string;
  licensePlate: string;
  status: string;
  capacity: number;
  lastServiceDate: string;
};

const initialCabData: Cab[] = [
  {
    id: "CAB-001",
    image: "https://toyotacanada.scene7.com/is/image/toyotacanada/toyota-2027-hero-prius-xle-awd-guardian-grey-l?fit=constrain&wid=2200",
    driverName: "John Doe",
    driverContact: "1234567890",
    cabModel: "Toyota Prius",
    licensePlate: "XYZ 1234",
    status: "Available",
    capacity: 4,
    lastServiceDate: "07/15/2024",
  },
  {
    id: "CAB-002",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=150&q=80",
    driverName: "Jane Smith",
    driverContact: "0987654321",
    cabModel: "Honda Accord",
    licensePlate: "ABC 5678",
    status: "In Use",
    capacity: 4,
    lastServiceDate: "06/20/2024",
  },
  {
    id: "CAB-003",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=150&q=80",
    driverName: "Mike Johnson",
    driverContact: "1122334455",
    cabModel: "Ford Focus",
    licensePlate: "LMN 9101",
    status: "Maintenance",
    capacity: 4,
    lastServiceDate: "05/10/2024",
  },
  {
    id: "CAB-004",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=150&q=80",
    driverName: "Emily Davis",
    driverContact: "2233445566",
    cabModel: "Chevrolet Malibu",
    licensePlate: "PQR 2345",
    status: "Available",
    capacity: 4,
    lastServiceDate: "08/01/2024",
  },
  {
    id: "CAB-005",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=150&q=80",
    driverName: "Chris Lee",
    driverContact: "3344556677",
    cabModel: "Hyundai Elantra",
    licensePlate: "STU 6789",
    status: "Available",
    capacity: 5,
    lastServiceDate: "07/10/2024",
  },
  {
    id: "CAB-006",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=150&q=80",
    driverName: "Anna White",
    driverContact: "4455667788",
    cabModel: "Nissan Altima",
    licensePlate: "VWX 0123",
    status: "In Use",
    capacity: 4,
    lastServiceDate: "07/25/2024",
  },
  {
    id: "CAB-007",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=150&q=80",
    driverName: "Robert Brown",
    driverContact: "5566778899",
    cabModel: "Kia Optima",
    licensePlate: "YZA 4567",
    status: "Available",
    capacity: 4,
    lastServiceDate: "06/30/2024",
  },
  {
    id: "CAB-008",
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=150&q=80",
    driverName: "Laura Green",
    driverContact: "6677889900",
    cabModel: "Mazda 6",
    licensePlate: "BCD 8901",
    status: "Maintenance",
    capacity: 4,
    lastServiceDate: "08/05/2024",
  },
  {
    id: "CAB-009",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=150&q=80",
    driverName: "David Wilson",
    driverContact: "7788990011",
    cabModel: "Volkswagen Jetta",
    licensePlate: "EFG 2345",
    status: "Available",
    capacity: 4,
    lastServiceDate: "07/20/2024",
  },
  {
    id: "CAB-010",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=150&q=80",
    driverName: "Sophia Martinez",
    driverContact: "8899001122",
    cabModel: "Subaru Legacy",
    licensePlate: "HIJ 6789",
    status: "In Use",
    capacity: 4,
    lastServiceDate: "07/30/2024",
  },
  {
    id: "CAB-011",
    image: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/37138/model-3-exterior-left-front-three-quarter.jpeg?isig=0&q=80&wm=1",
    driverName: "Oliver Twist",
    driverContact: "1122112211",
    cabModel: "Tesla Model 3",
    licensePlate: "EV 0001",
    status: "Available",
    capacity: 4,
    lastServiceDate: "08/10/2024",
  },
  {
    id: "CAB-012",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=150&q=80",
    driverName: "Harry Potter",
    driverContact: "3344334433",
    cabModel: "Ford Transit",
    licensePlate: "VAN 777",
    status: "Maintenance",
    capacity: 12,
    lastServiceDate: "07/01/2024",
  },
  {
    id: "CAB-013",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=150&q=80",
    driverName: "Bruce Wayne",
    driverContact: "9998887776",
    cabModel: "Mercedes S-Class",
    licensePlate: "BAT 01",
    status: "In Use",
    capacity: 3,
    lastServiceDate: "08/15/2024",
  },
  {
    id: "CAB-014",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=150&q=80",
    driverName: "Clark Kent",
    driverContact: "4445556667",
    cabModel: "Chevrolet Suburban",
    licensePlate: "SUV 999",
    status: "Available",
    capacity: 7,
    lastServiceDate: "08/12/2024",
  },
  {
    id: "CAB-015",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=150&q=80",
    driverName: "Diana Prince",
    driverContact: "1231231234",
    cabModel: "Audi A8",
    licensePlate: "WW 1984",
    status: "Available",
    capacity: 4,
    lastServiceDate: "08/05/2024",
  }
];

const statusColors: Record<string, string> = {
  "Available": "bg-green-500/10 text-green-500 border-green-500/20",
  "In Use": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  "Maintenance": "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function TransportPage() {
  const [cabs, setCabs] = useState<Cab[]>(initialCabData);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCabId, setEditingCabId] = useState<string | null>(null);
  
  // Form State
  const [driverName, setDriverName] = useState("");
  const [driverContact, setDriverContact] = useState("");
  const [cabModel, setCabModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [status, setStatus] = useState("Available");
  const [capacity, setCapacity] = useState("");
  const [lastServiceDate, setLastServiceDate] = useState("");
  const [image, setImage] = useState("");

  const resetForm = () => {
    setDriverName("");
    setDriverContact("");
    setCabModel("");
    setLicensePlate("");
    setStatus("Available");
    setCapacity("");
    setLastServiceDate("");
    setImage("");
    setEditingCabId(null);
  };

  const handleEditClick = (cab: Cab) => {
    setEditingCabId(cab.id);
    setDriverName(cab.driverName);
    setDriverContact(cab.driverContact);
    setCabModel(cab.cabModel);
    setLicensePlate(cab.licensePlate);
    setStatus(cab.status);
    setCapacity(cab.capacity.toString());
    setLastServiceDate(cab.lastServiceDate);
    setImage(cab.image);
    setIsModalOpen(true);
  };

  const handleDeleteCab = (id: string) => {
    setCabs(cabs.filter(c => c.id !== id));
  };

  const handleSaveCab = (e: React.FormEvent) => {
    e.preventDefault();
    const cabData: Cab = {
      id: editingCabId || `CAB-00${cabs.length + 1}`,
      image: image || "https://toyotacanada.scene7.com/is/image/toyotacanada/toyota-2027-hero-prius-xle-awd-guardian-grey-l?fit=constrain&wid=2200",
      driverName,
      driverContact,
      cabModel,
      licensePlate,
      status,
      capacity: Number(capacity),
      lastServiceDate: lastServiceDate || new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    };

    if (editingCabId) {
      setCabs(cabs.map(c => c.id === editingCabId ? cabData : c));
    } else {
      setCabs([cabData, ...cabs]);
    }
    
    setIsModalOpen(false);
    resetForm();
  };

  const uniqueStatuses = Array.from(new Set(cabs.map(c => c.status)));

  const toggleStatusFilter = (stat: string) => {
    setSelectedStatuses(prev => 
      prev.includes(stat) ? prev.filter(s => s !== stat) : [...prev, stat]
    );
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const filteredCabs = cabs.filter(cab => 
    (selectedStatuses.length === 0 || selectedStatuses.includes(cab.status)) &&
    (cab.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     cab.cabModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
     cab.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()))
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
              <h2 className="text-xl font-bold text-white px-2">Cab List</h2>
              <div className="relative flex-1 sm:flex-none">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search cabs..." 
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
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={() => toggleStatusFilter(status)}
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
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-white' : ''}`} />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-[var(--color-card-border)] bg-white/5">
                  <th className="p-4 w-12 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    <input type="checkbox" className="rounded border-white/20 bg-transparent text-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:ring-offset-[#1e1e2d]" />
                  </th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Vehicle</th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Driver Name</th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Driver Contact</th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Cab Model</th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">License Plate</th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Capacity</th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Last Service Date</th>
                  <th className="p-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-card-border)]">
                {paginatedCabs.map((cab) => (
                  <tr key={cab.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <input type="checkbox" className="rounded border-white/20 bg-transparent text-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:ring-offset-[#1e1e2d]" />
                    </td>
                    <td className="p-4 py-3">
                      <div 
                        className="w-12 h-8 rounded overflow-hidden relative border border-white/10 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSelectedImage(cab.image)}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={cab.image} alt={cab.cabModel} className="object-cover w-full h-full" />
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium text-white">{cab.driverName}</td>
                    <td className="p-4 text-sm text-zinc-300">{cab.driverContact}</td>
                    <td className="p-4 text-sm font-medium text-white">{cab.cabModel}</td>
                    <td className="p-4 text-sm text-zinc-300">{cab.licensePlate}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${statusColors[cab.status] || "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"}`}>
                        {cab.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-zinc-300">{cab.capacity}</td>
                    <td className="p-4 text-sm text-zinc-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        {cab.lastServiceDate}
                      </div>
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
          {selectedImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={selectedImage} alt="Zoomed vehicle" className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl" />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[700px] bg-[var(--color-card)] border-[var(--color-card-border)] text-white p-6 overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{editingCabId ? "Edit Cab" : "Add New Cab"}</DialogTitle>
            <DialogDescription className="text-zinc-400">
              {editingCabId ? "Update the details for this cab." : "Enter the details to register a new cab in the system."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveCab} className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider border-b border-white/10 pb-2">Driver Information</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Driver Name *</label>
                <Input 
                  required 
                  value={driverName} 
                  onChange={(e) => setDriverName(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Driver Contact *</label>
                <Input 
                  required 
                  type="tel"
                  value={driverContact} 
                  onChange={(e) => setDriverContact(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
              </div>

              <div className="space-y-4 md:col-span-2 mt-2">
                <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider border-b border-white/10 pb-2">Vehicle Details</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Cab Model *</label>
                <Input 
                  required 
                  value={cabModel} 
                  onChange={(e) => setCabModel(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">License Plate *</label>
                <Input 
                  required 
                  value={licensePlate} 
                  onChange={(e) => setLicensePlate(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
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
                <label className="text-sm font-medium text-zinc-300">Last Service Date *</label>
                <Input 
                  required 
                  type="date"
                  value={lastServiceDate} 
                  onChange={(e) => setLastServiceDate(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white [&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full flex h-10 rounded-md border border-white/10 bg-zinc-900/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                >
                  <option value="Available">Available</option>
                  <option value="In Use">In Use</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Image URL</label>
                <Input 
                  value={image} 
                  onChange={(e) => setImage(e.target.value)} 
                  placeholder="https://..."
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
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
                className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg text-sm font-medium transition-colors"
              >
                {editingCabId ? "Save Changes" : "Add Cab"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
