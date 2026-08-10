"use client";

import { useState } from "react";
import { CreditCard, Banknote, Smartphone, Search, Filter, RefreshCw, Plus, Calendar, FileSpreadsheet, Printer, QrCode } from "lucide-react";
import { CURRENCY } from '@/lib/constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const transactionsData = [
  { id: "TX-90231", guest: "Sarah Jenkins", amount: `${CURRENCY.SYMBOL}850.00`, method: "Card", status: "Successful" },
  { id: "TX-90232", guest: "Rahul Sharma", amount: `${CURRENCY.SYMBOL}120.00`, method: "UPI", status: "Successful" },
  { id: "TX-90233", guest: "John Doe", amount: `${CURRENCY.SYMBOL}450.00`, method: "Cash", status: "Pending" },
  { id: "TX-90234", guest: "Emily Davis", amount: `${CURRENCY.SYMBOL}1,200.00`, method: "Card", status: "Failed" },
  { id: "TX-90235", guest: "Michael Brown", amount: `${CURRENCY.SYMBOL}300.00`, method: "UPI", status: "Successful" },
  { id: "TX-90236", guest: "Sophia Martinez", amount: `${CURRENCY.SYMBOL}75.00`, method: "Cash", status: "Successful" },
  { id: "TX-90237", guest: "Oliver Twist", amount: `${CURRENCY.SYMBOL}500.00`, method: "Card", status: "Successful" },
  { id: "TX-90238", guest: "Harry Potter", amount: `${CURRENCY.SYMBOL}1,500.00`, method: "Card", status: "Pending" },
  { id: "TX-90239", guest: "Bruce Wayne", amount: `${CURRENCY.SYMBOL}10,000.00`, method: "Card", status: "Successful" },
  { id: "TX-90240", guest: "Clark Kent", amount: `${CURRENCY.SYMBOL}250.00`, method: "UPI", status: "Successful" },
  { id: "TX-90241", guest: "Diana Prince", amount: `${CURRENCY.SYMBOL}600.00`, method: "Card", status: "Successful" },
  { id: "TX-90242", guest: "Tony Stark", amount: `${CURRENCY.SYMBOL}5,000.00`, method: "Card", status: "Successful" },
  { id: "TX-90243", guest: "Steve Rogers", amount: `${CURRENCY.SYMBOL}150.00`, method: "Cash", status: "Successful" },
  { id: "TX-90244", guest: "Natasha Romanoff", amount: `${CURRENCY.SYMBOL}800.00`, method: "UPI", status: "Successful" },
  { id: "TX-90245", guest: "Wanda Maximoff", amount: `${CURRENCY.SYMBOL}400.00`, method: "Card", status: "Failed" },
];

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  
  const uniqueMethods = Array.from(new Set(transactionsData.map(t => t.method)));

  const toggleMethodFilter = (method: string) => {
    setSelectedMethods(prev => 
      prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]
    );
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const filteredTransactions = transactionsData.filter(txn => 
    (selectedMethods.length === 0 || selectedMethods.includes(txn.method)) &&
    (txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
     txn.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
     txn.status.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getMethodIcon = (method: string) => {
    if (method === "Card") return <CreditCard className="w-4 h-4 text-zinc-400"/>;
    if (method === "UPI") return <Smartphone className="w-4 h-4 text-zinc-400"/>;
    return <Banknote className="w-4 h-4 text-zinc-400"/>;
  };

  const getStatusColor = (status: string) => {
    if (status === "Successful") return "text-emerald-400";
    if (status === "Pending") return "text-orange-400";
    if (status === "Failed") return "text-red-400";
    return "text-zinc-400";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Payments & Billing</h1>
          <p className="text-zinc-400 mt-1">Accept Card, UPI, and Cash transactions seamlessly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] flex flex-col items-center text-center hover:border-[var(--color-primary)]/50 transition-colors">
          <CreditCard className="w-12 h-12 text-[var(--color-primary)] mb-4" />
          <h3 className="text-lg font-bold text-white">Card Payment</h3>
          <p className="text-sm text-zinc-400 mt-2">Visa, Mastercard, Amex, and international credit/debit cards supported.</p>
        </div>

        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] flex flex-col items-center text-center hover:border-[var(--color-primary)]/50 transition-colors">
          <Smartphone className="w-12 h-12 text-[var(--color-primary)] mb-4" />
          <h3 className="text-lg font-bold text-white">UPI & Digital Wallets</h3>
          <p className="text-sm text-zinc-400 mt-2">Instant QR scanning for GPay, PhonePe, Paytm, and other UPI apps.</p>
        </div>

        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] flex flex-col items-center text-center hover:border-[var(--color-primary)]/50 transition-colors">
          <Banknote className="w-12 h-12 text-[var(--color-primary)] mb-4" />
          <h3 className="text-lg font-bold text-white">Cash Transaction</h3>
          <p className="text-sm text-zinc-400 mt-2">Physical currency in major denominations. Includes cash drawer tracking.</p>
        </div>
      </div>

      <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden mt-8">
        {/* Header Toolbar */}
        <div className="p-4 border-b border-[var(--color-card-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <h2 className="text-xl font-bold text-white px-2">Recent Transactions</h2>
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search transactions..." 
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
                <button className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${selectedMethods.length > 0 ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
                  <Filter className="w-4 h-4" />
                  {selectedMethods.length > 0 && <span className="text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full bg-[var(--color-primary)] text-black">{selectedMethods.length}</span>}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-zinc-900 border-white/10 text-white shadow-xl" align="end">
                <DropdownMenuLabel className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Filter by Method</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {uniqueMethods.map(method => (
                  <DropdownMenuCheckboxItem
                    key={method}
                    checked={selectedMethods.includes(method)}
                    onCheckedChange={() => toggleMethodFilter(method)}
                    className="focus:bg-white/10 focus:text-white cursor-pointer"
                  >
                    {method}
                  </DropdownMenuCheckboxItem>
                ))}
                {selectedMethods.length > 0 && (
                  <>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <button 
                      onClick={() => setSelectedMethods([])}
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
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Txn ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Method</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-card-border)]">
              {paginatedTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 text-sm font-medium text-[var(--color-primary)]">{txn.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-white">{txn.guest}</td>
                  <td className="px-6 py-4 text-sm text-white font-medium">{txn.amount}</td>
                  <td className="px-6 py-4 text-sm text-zinc-300 flex items-center gap-2">
                    {getMethodIcon(txn.method)} {txn.method}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <span className={getStatusColor(txn.status)}>{txn.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 bg-white/5 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors" title="Print Receipt">
                        <Printer className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white/5 hover:bg-purple-500/20 text-purple-400 rounded-lg transition-colors" title="Show QR Code">
                        <QrCode className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500">
                    No transactions found matching your criteria.
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
            {filteredTransactions.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length}
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
