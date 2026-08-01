"use client";

import { useState } from "react";
import { Eye, Clock, User, Home, ReceiptText, CheckCircle2, ChefHat, Utensils, AlertCircle, XCircle, Search, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { menuItems, rooms } from "@/lib/data";

type OrderItem = {
  name: string;
  qty: number;
  price: number;
};

type OrderStatus = "Pending" | "Preparing" | "Ready" | "Delivered" | "Cancelled";

type Order = {
  id: string;
  room: string;
  guest: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  time: string;
  notes?: string;
};

const initialMockOrders: Order[] = [
  { 
    id: "ORD-001", room: "301", guest: "John Doe", 
    items: [{ name: "Signature Burger", qty: 1, price: 15.00 }, { name: "Fresh Green Smoothie", qty: 1, price: 6.50 }], 
    total: 21.50, status: "Preparing", time: "Aug 01, 2026, 10:30 AM", notes: "No onions in the burger please." 
  },
  { 
    id: "ORD-002", room: "405", guest: "Sarah Smith", 
    items: [{ name: "Classic Breakfast Plate", qty: 1, price: 12.00 }, { name: "Coffee", qty: 2, price: 4.00 }], 
    total: 16.00, status: "Delivered", time: "Aug 01, 2026, 09:15 AM" 
  },
  { 
    id: "ORD-003", room: "210", guest: "Michael Johnson", 
    items: [{ name: "Classic Indian Thali", qty: 1, price: 18.00 }, { name: "Iced Juice Trio", qty: 1, price: 8.00 }], 
    total: 26.00, status: "Ready", time: "Aug 01, 2026, 11:45 AM" 
  },
  { 
    id: "ORD-004", room: "502", guest: "Emily Davis", 
    items: [{ name: "Asian Noodles & Rice", qty: 1, price: 14.00 }], 
    total: 14.00, status: "Pending", time: "Aug 01, 2026, 12:05 PM", notes: "Extra spicy" 
  },
  { 
    id: "ORD-005", room: "118", guest: "Robert Wilson", 
    items: [{ name: "Chocolate Lava Cake", qty: 1, price: 9.00 }, { name: "Signature Cocktail", qty: 1, price: 12.00 }], 
    total: 21.00, status: "Preparing", time: "Aug 01, 2026, 12:20 PM" 
  },
  { 
    id: "ORD-006", room: "604", guest: "Jessica Taylor", 
    items: [{ name: "Hearty Breakfast Platter", qty: 1, price: 14.50 }, { name: "Fresh Fruit Juices", qty: 1, price: 7.50 }], 
    total: 22.00, status: "Delivered", time: "Aug 01, 2026, 08:40 AM" 
  },
  { 
    id: "ORD-007", room: "312", guest: "David Martinez", 
    items: [{ name: "Crispy Samosa", qty: 2, price: 5.00 }, { name: "Spring Rolls", qty: 1, price: 7.00 }], 
    total: 17.00, status: "Pending", time: "Aug 01, 2026, 12:35 PM" 
  },
  { 
    id: "ORD-008", room: "411", guest: "Lisa Anderson", 
    items: [{ name: "Royal Indian Platter", qty: 1, price: 22.00 }], 
    total: 22.00, status: "Ready", time: "Aug 01, 2026, 11:55 AM" 
  },
  { 
    id: "ORD-009", room: "205", guest: "James Thomas", 
    items: [{ name: "Croissant & Bacon", qty: 1, price: 9.50 }, { name: "Fresh Fruit Juices", qty: 1, price: 7.50 }], 
    total: 17.00, status: "Delivered", time: "Aug 01, 2026, 07:30 AM" 
  },
  { 
    id: "ORD-010", room: "515", guest: "Maria Garcia", 
    items: [{ name: "Pancake Stack", qty: 1, price: 10.00 }, { name: "Sprinkle Sundae", qty: 1, price: 7.50 }], 
    total: 17.50, status: "Preparing", time: "Aug 01, 2026, 10:10 AM", notes: "Extra syrup on the side." 
  },
];

const getStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "Pending": return "bg-orange-500/20 text-orange-500 border-orange-500/30";
    case "Preparing": return "bg-blue-500/20 text-blue-500 border-blue-500/30";
    case "Ready": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    case "Delivered": return "bg-green-500/20 text-green-500 border-green-500/30";
    case "Cancelled": return "bg-red-500/20 text-red-500 border-red-500/30";
    default: return "bg-zinc-500/20 text-zinc-300 border-zinc-500/30";
  }
};

const getStatusIcon = (status: Order["status"]) => {
  switch (status) {
    case "Pending": return <AlertCircle className="w-4 h-4 mr-1.5" />;
    case "Preparing": return <ChefHat className="w-4 h-4 mr-1.5" />;
    case "Ready": return <Utensils className="w-4 h-4 mr-1.5" />;
    case "Delivered": return <CheckCircle2 className="w-4 h-4 mr-1.5" />;
    case "Cancelled": return <XCircle className="w-4 h-4 mr-1.5" />;
    default: return null;
  }
};

type SortConfig = {
  column: "id" | "status";
  direction: "asc" | "desc";
} | null;

export default function ActiveOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialMockOrders);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newGuest, setNewGuest] = useState("");
  const [newRoomSearch, setNewRoomSearch] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newItems, setNewItems] = useState<{name: string, price: number, qty: number}[]>([]);
  const [foodSearch, setFoodSearch] = useState("");

  const foodSearchResults = foodSearch 
    ? menuItems.filter(m => m.name.toLowerCase().includes(foodSearch.toLowerCase()))
    : [];

  const addFoodItem = (item: typeof menuItems[0]) => {
    setNewItems(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { name: item.name, price: item.price, qty: 1 }];
    });
    setFoodSearch("");
  };

  const handleCreateOrder = () => {
    if (!newGuest || !newRoomSearch || newItems.length === 0) return;
    const total = newItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const now = new Date();
    const timeStr = now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) + ", " + now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
    const order: Order = {
      id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
      room: newRoomSearch,
      guest: newGuest,
      items: newItems,
      total,
      status: "Pending",
      time: timeStr,
      notes: newNotes,
    };
    setOrders(prev => [order, ...prev]);
    setIsCreateModalOpen(false);
    setNewGuest("");
    setNewRoomSearch("");
    setNewNotes("");
    setNewItems([]);
  };

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || null;

  const updateOrderStatus = (id: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const handleSort = (column: "id" | "status") => {
    setSortConfig(prev => {
      if (prev?.column === column) {
        if (prev.direction === "asc") return { column, direction: "desc" };
        return null;
      }
      return { column, direction: "asc" };
    });
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.room.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    if (!sortConfig) {
      const timeA = new Date(a.time).getTime();
      const timeB = new Date(b.time).getTime();
      return timeB - timeA;
    }
    const modifier = sortConfig.direction === "asc" ? 1 : -1;
    return a[sortConfig.column].localeCompare(b[sortConfig.column]) * modifier;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Active Orders</h1>
          <p className="text-zinc-400 mt-1">Manage and track in-room dining orders.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input 
              placeholder="Search orders..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-[var(--color-card)] border-[var(--color-card-border)] text-white placeholder:text-zinc-500 w-full sm:w-[250px]"
            />
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 h-10 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors whitespace-nowrap"
          >
            Create Order
          </button>
        </div>
      </div>

      <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-900/50 text-zinc-400 uppercase text-xs tracking-wider border-b border-[var(--color-card-border)]">
              <tr>
                <th className="px-6 py-4 font-medium">
                  <div 
                    className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors select-none w-fit"
                    onClick={() => handleSort("id")}
                    title="Sort by Order ID"
                  >
                    Order ID
                    {sortConfig?.column === "id" && sortConfig.direction === "asc" && <ArrowUp className="w-3.5 h-3.5" />}
                    {sortConfig?.column === "id" && sortConfig.direction === "desc" && <ArrowDown className="w-3.5 h-3.5" />}
                    {sortConfig?.column !== "id" && <ArrowUpDown className="w-3.5 h-3.5 opacity-30" />}
                  </div>
                </th>
                <th className="px-6 py-4 font-medium">Date & Time</th>
                <th className="px-6 py-4 font-medium">Room & Guest</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">
                  <div 
                    className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors select-none w-fit"
                    onClick={() => handleSort("status")}
                    title="Sort by Status"
                  >
                    Status
                    {sortConfig?.column === "status" && sortConfig.direction === "asc" && <ArrowUp className="w-3.5 h-3.5" />}
                    {sortConfig?.column === "status" && sortConfig.direction === "desc" && <ArrowDown className="w-3.5 h-3.5" />}
                    {sortConfig?.column !== "status" && <ArrowUpDown className="w-3.5 h-3.5 opacity-30" />}
                  </div>
                </th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-card-border)]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-zinc-500">
                    No orders found matching your search.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-mono font-medium text-white">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-zinc-500" />
                      {order.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-white font-medium flex items-center gap-1.5">
                        <Home className="w-4 h-4 text-[var(--color-primary)]" />
                        Room {order.room}
                      </span>
                      <span className="text-zinc-400 text-xs flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {order.guest}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white font-medium">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedOrderId(order.id)}
                      className="p-2 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-[var(--color-primary)] rounded-lg transition-all shadow-sm"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrderId(null)}>
        <DialogContent className="sm:max-w-[600px] bg-[var(--color-card)] border-[var(--color-card-border)] text-white p-0 overflow-hidden">
          {selectedOrder && (
            <>
              <div className="p-6 pb-0">
                <DialogHeader>
                  <div className="flex items-center justify-between mb-2" style={{margin: "10px"}}>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                      <ReceiptText className="w-6 h-6 text-[var(--color-primary)]" />
                      Order {selectedOrder.id}
                    </DialogTitle>
                    <div className="relative">
                      <select 
                        value={selectedOrder.status}
                        onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value as OrderStatus)}                        
                        className={`inline-flex items-center pl-3 pr-8 py-1.5 rounded-full text-sm font-semibold border focus:outline-none appearance-none cursor-pointer ${getStatusColor(selectedOrder.status)}`}
                      >
                        <option value="Pending" className="bg-zinc-900 text-white">Pending</option>
                        <option value="Preparing" className="bg-zinc-900 text-white">Preparing</option>
                        <option value="Ready" className="bg-zinc-900 text-white">Ready</option>
                        <option value="Delivered" className="bg-zinc-900 text-white">Delivered</option>
                        <option value="Cancelled" className="bg-zinc-900 text-white">Cancelled</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-70">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <DialogDescription className="text-zinc-400 flex items-center gap-4 text-sm mt-2 border-b border-white/10 pb-4">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {selectedOrder.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Home className="w-4 h-4" /> Room {selectedOrder.room}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4" /> {selectedOrder.guest}
                    </span>
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-lg text-white mb-4">Order Items</h3>
                <div className="space-y-3 mb-6 bg-black/20 p-4 rounded-xl border border-white/5">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between group">
                      <div className="flex gap-3">
                        <span className="bg-zinc-800 text-zinc-300 font-bold px-2 py-0.5 rounded text-sm h-fit">
                          x{item.qty}
                        </span>
                        <span className="font-medium text-zinc-200 group-hover:text-white transition-colors">{item.name}</span>
                      </div>
                      <span className="text-zinc-400">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between font-bold text-lg">
                    <span className="text-white">Total</span>
                    <span className="text-[var(--color-primary)]">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl mb-6">
                    <h4 className="text-orange-400 text-sm font-bold flex items-center gap-2 mb-1">
                      <AlertCircle className="w-4 h-4" /> Guest Notes
                    </h4>
                    <p className="text-zinc-300 text-sm italic">{selectedOrder.notes}</p>
                  </div>
                )}
              </div>

              {selectedOrder.status === "Pending" && (
                <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3 bg-black/10">
                  <button 
                    onClick={() => updateOrderStatus(selectedOrder.id, "Cancelled")}
                    className="px-4 py-2 rounded-lg font-medium text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-colors"
                  >
                    Cancel Order
                  </button>
                  <button 
                    onClick={() => updateOrderStatus(selectedOrder.id, "Preparing")}
                    className="px-5 py-2 rounded-lg font-medium bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-all shadow-lg hover:shadow-[var(--color-primary)]/20"
                  >
                    Accept Order
                  </button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-[var(--color-card)] border-[var(--color-card-border)] text-white overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Utensils className="w-6 h-6 text-[var(--color-primary)]" />
              Create New Order
            </DialogTitle>
            <DialogDescription className="text-zinc-400 mt-1">
              Add guest details and food items to create a new room service order.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Guest Name</label>
                <Input 
                  value={newGuest} 
                  onChange={(e) => setNewGuest(e.target.value)} 
                  placeholder="e.g. Jane Doe"
                  className="bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-500"
                />
              </div>
              <div className="space-y-2 relative">
                <label className="text-sm font-medium text-zinc-300">Room</label>
                <Input 
                  value={newRoomSearch} 
                  onChange={(e) => setNewRoomSearch(e.target.value)} 
                  placeholder="Search room..."
                  list="room-list"
                  className="bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-500"
                />
                <datalist id="room-list">
                  {rooms.map(r => <option key={r.slug} value={r.name} />)}
                  <option value="101" />
                  <option value="102" />
                  <option value="201" />
                  <option value="301" />
                  <option value="405" />
                  <option value="502" />
                </datalist>
              </div>
            </div>

            <div className="space-y-2 relative z-50">
              <label className="text-sm font-medium text-zinc-300">Search Food Items</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input 
                  value={foodSearch}
                  onChange={(e) => setFoodSearch(e.target.value)}
                  placeholder="Type to search menu items..."
                  className="pl-9 bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-500"
                />
              </div>
              {foodSearch && foodSearchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-800 border border-white/10 rounded-lg shadow-xl overflow-hidden max-h-48 overflow-y-auto">
                  {foodSearchResults.map(item => (
                    <div 
                      key={item.id} 
                      className="p-3 hover:bg-[var(--color-primary)] hover:text-white cursor-pointer transition-colors flex justify-between items-center"
                      onClick={() => addFoodItem(item)}
                    >
                      <span>{item.name}</span>
                      <span className="opacity-70">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {newItems.length > 0 && (
              <div className="bg-black/20 p-3 rounded-xl border border-white/5 space-y-2 max-h-40 overflow-y-auto">
                {newItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <span className="bg-zinc-800 text-zinc-300 font-bold px-2 py-0.5 rounded text-xs h-fit">
                        x{item.qty}
                      </span>
                      <span className="text-sm font-medium text-zinc-200">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-400 text-sm">${(item.price * item.qty).toFixed(2)}</span>
                      <button 
                        onClick={() => setNewItems(prev => prev.filter(i => i.name !== item.name))}
                        className="text-red-500 hover:text-red-400"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Guest Notes</label>
              <Textarea 
                value={newNotes} 
                onChange={(e) => setNewNotes(e.target.value)} 
                placeholder="Any dietary restrictions or special requests?"
                className="w-full bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
                rows={2}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button 
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 rounded-lg font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleCreateOrder}
              disabled={!newGuest || !newRoomSearch || newItems.length === 0}
              className="px-5 py-2 rounded-lg font-medium bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Place Order
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
