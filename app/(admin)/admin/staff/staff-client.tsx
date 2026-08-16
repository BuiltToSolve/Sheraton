"use client";

import { useState, useTransition } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Search, Filter, RefreshCw, Plus, FileSpreadsheet, Edit, Trash2, MoreVertical } from "lucide-react";
import { Department, Shift, StaffStatus } from "@prisma/client";
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
import { addStaffMember, updateStaffMember, deleteStaffMember, StaffMemberInput } from "./actions";
import { useRouter } from "next/navigation";

// Since it comes from a server action, Date might be serialized as Date or string
type Staff = {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  department: Department;
  designation: string;
  shift: Shift;
  phone: string;
  email: string | null;
  joiningDate: Date;
  status: StaffStatus;
};

export function StaffClient({ initialStaff }: { initialStaff: Staff[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [selectedDepartments, setSelectedDepartments] = useState<Department[]>([]);
  const departments = Object.values(Department);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [employeeCode, setEmployeeCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState<Department>(Department.FrontDesk);
  const [designation, setDesignation] = useState("");
  const [shift, setShift] = useState<Shift>(Shift.Morning);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [status, setStatus] = useState<StaffStatus>(StaffStatus.Active);

  const toggleDeptFilter = (dept: Department) => {
    setSelectedDepartments(prev => 
      prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
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

  const filteredStaff = initialStaff.filter(s => 
    (selectedDepartments.length === 0 || selectedDepartments.includes(s.department)) &&
    (s.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
     s.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     s.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
     s.phone.includes(searchQuery))
  );

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const paginatedStaff = filteredStaff.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: StaffStatus) => {
    switch(status) {
      case "Active": return "text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-xs";
      case "OnLeave": return "text-orange-400 bg-orange-400/10 px-2 py-1 rounded text-xs";
      case "Resigned": return "text-zinc-400 bg-zinc-400/10 px-2 py-1 rounded text-xs";
      case "Terminated": return "text-red-400 bg-red-400/10 px-2 py-1 rounded text-xs";
      default: return "text-zinc-400 bg-zinc-400/10 px-2 py-1 rounded text-xs";
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setEmployeeCode("");
    setFirstName("");
    setLastName("");
    setDepartment(Department.FrontDesk);
    setDesignation("");
    setShift(Shift.Morning);
    setPhone("");
    setEmail("");
    setJoiningDate("");
    setStatus(StaffStatus.Active);
  };

  const handleEditClick = (staff: Staff) => {
    setEditingId(staff.id);
    setEmployeeCode(staff.employeeCode);
    setFirstName(staff.firstName);
    setLastName(staff.lastName);
    setDepartment(staff.department);
    setDesignation(staff.designation);
    setShift(staff.shift);
    setPhone(staff.phone);
    setEmail(staff.email || "");
    // Convert Date object to yyyy-mm-dd
    const d = new Date(staff.joiningDate);
    if (!isNaN(d.getTime())) {
      setJoiningDate(d.toISOString().split('T')[0]);
    } else {
      setJoiningDate("");
    }
    setStatus(staff.status);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this staff member?")) {
      await deleteStaffMember(id);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Invalid email format.");
      return;
    }

    const data: StaffMemberInput = {
      employeeCode,
      firstName,
      lastName,
      department,
      designation,
      shift,
      phone,
      email: email || null,
      joiningDate,
      status
    };

    let result;
    if (editingId) {
      result = await updateStaffMember(editingId, data);
    } else {
      result = await addStaffMember(data);
    }

    if (result && !result.success) {
      alert(result.error);
      return;
    }
    
    setIsModalOpen(false);
    resetForm();
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Staff List");

    const headers = ["Employee Code", "First Name", "Last Name", "Department", "Designation", "Shift", "Phone", "Email", "Joining Date", "Status"];
    
    // Add header row
    const headerRow = worksheet.addRow(headers);
    
    // Style the header row (bold, background color)
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF333333" }
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    // Add data rows
    filteredStaff.forEach(s => {
      worksheet.addRow([
        s.employeeCode,
        s.firstName,
        s.lastName,
        s.department,
        s.designation,
        s.shift,
        s.phone,
        s.email || "",
        new Date(s.joiningDate).toLocaleDateString(),
        s.status
      ]);
    });

    // Auto-fit columns based on content length
    worksheet.columns.forEach(column => {
      let maxLength = 0;
      column.eachCell!({ includeEmpty: true }, (cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength + 2;
    });

    // Generate buffer and save
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "staff_list.xlsx");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Staff Management</h1>
          <p className="text-zinc-400 mt-1">Manage hotel personnel, shifts, and records.</p>
        </div>
      </div>

      <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden mt-8">
        {/* Header Toolbar */}
        <div className="p-4 border-b border-[var(--color-card-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <h2 className="text-xl font-bold text-white px-2">Staff List</h2>
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search name, code..." 
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
                <button className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${selectedDepartments.length > 0 ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
                  <Filter className="w-4 h-4" />
                  {selectedDepartments.length > 0 && <span className="text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full bg-[var(--color-primary)] text-black">{selectedDepartments.length}</span>}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-zinc-900 border-white/10 text-white shadow-xl" align="end">
                <DropdownMenuLabel className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Filter by Department</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <div className="max-h-60 overflow-y-auto">
                  {departments.map(dept => (
                    <DropdownMenuCheckboxItem
                      key={dept}
                      checked={selectedDepartments.includes(dept)}
                      onCheckedChange={() => toggleDeptFilter(dept)}
                      className="focus:bg-white/10 focus:text-white cursor-pointer"
                    >
                      {dept}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
                {selectedDepartments.length > 0 && (
                  <>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <button 
                      onClick={() => setSelectedDepartments([])}
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
              <RefreshCw className={`w-4 h-4 ${isRefreshing || isPending ? 'animate-spin text-white' : ''}`} />
            </button>
            <button 
              onClick={() => { resetForm(); setIsModalOpen(true); }}
              className="p-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg transition-colors ml-2"
              title="Add Staff"
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
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Code</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Designation</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Shift</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-card-border)]">
              {paginatedStaff.map((s) => (
                <tr key={s.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 text-sm font-medium text-[var(--color-primary)]">{s.employeeCode}</td>
                  <td className="px-6 py-4 text-sm font-medium text-white">{s.firstName} {s.lastName}</td>
                  <td className="px-6 py-4 text-sm text-zinc-300">{s.department}</td>
                  <td className="px-6 py-4 text-sm text-zinc-300">{s.designation}</td>
                  <td className="px-6 py-4 text-sm text-zinc-300">{s.shift}</td>
                  <td className="px-6 py-4 text-sm text-zinc-300">
                    <div className="flex flex-col">
                      <span>{s.phone}</span>
                      <span className="text-xs text-zinc-500">{s.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <span className={getStatusColor(s.status)}>{s.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-white/10 text-zinc-400 rounded-lg transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-zinc-900 border-white/10 text-white shadow-xl min-w-[160px]" align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(s)} className="focus:bg-white/10 focus:text-white cursor-pointer flex items-center gap-2">
                          <Edit className="w-4 h-4 text-blue-400" /> Edit staff
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem onClick={() => handleDelete(s.id)} className="focus:bg-red-500/20 focus:text-red-400 text-red-400 cursor-pointer flex items-center gap-2">
                          <Trash2 className="w-4 h-4" /> Delete staff
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              {filteredStaff.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-zinc-500">
                    No staff members found matching your criteria.
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
            {filteredStaff.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredStaff.length)} of {filteredStaff.length}
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
            <DialogTitle className="text-2xl font-bold">{editingId ? "Edit Staff" : "New Staff Member"}</DialogTitle>
            <DialogDescription className="text-zinc-400">
              {editingId ? "Update the details for this staff member." : "Enter the essential details for the new staff member."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave} className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider border-b border-white/10 pb-2">Personal Information</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">First Name *</label>
                <Input 
                  required 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Last Name *</label>
                <Input 
                  required 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Phone *</label>
                <Input 
                  required 
                  type="tel"
                  maxLength={10}
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Email</label>
                <Input 
                  type="email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
              </div>

              <div className="space-y-4 md:col-span-2 mt-2">
                <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider border-b border-white/10 pb-2">Employment Details</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Employee Code *</label>
                <Input 
                  required 
                  value={employeeCode} 
                  onChange={(e) => setEmployeeCode(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Designation *</label>
                <Input 
                  required 
                  value={designation} 
                  onChange={(e) => setDesignation(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Department</label>
                <select 
                  value={department} 
                  onChange={(e) => setDepartment(e.target.value as Department)}
                  className="w-full flex h-10 rounded-md border border-white/10 bg-zinc-900/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Shift</label>
                <select 
                  value={shift} 
                  onChange={(e) => setShift(e.target.value as Shift)}
                  className="w-full flex h-10 rounded-md border border-white/10 bg-zinc-900/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                >
                  {Object.values(Shift).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Joining Date *</label>
                <Input 
                  required 
                  type="date"
                  value={joiningDate} 
                  onChange={(e) => setJoiningDate(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white [&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value as StaffStatus)}
                  className="w-full flex h-10 rounded-md border border-white/10 bg-zinc-900/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                >
                  {Object.values(StaffStatus).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
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
                disabled={isPending}
                className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                {editingId ? "Save Changes" : "Create Staff Member"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
