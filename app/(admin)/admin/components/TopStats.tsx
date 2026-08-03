"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const barData = Array.from({ length: 12 }, (_, i) => ({ value: Math.floor(Math.random() * 50) + 10 }));
const donutData = [
  { name: 'Available', value: 55, color: '#10b981' },
  { name: 'Occupied', value: 45, color: '#f59e0b' }
];
const lineData = Array.from({ length: 10 }, (_, i) => ({ value: Math.floor(Math.random() * 1000) + 1000 }));
const pieData = [
  { name: 'Checked Out', value: 60, color: '#ef4444' },
  { name: 'Extended', value: 20, color: '#3b82f6' },
  { name: 'Pending', value: 20, color: '#eab308' },
];

export function TopStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* New Booking */}
      <div className="bg-[#1c1e26] p-5 rounded-2xl border border-white/5 flex flex-col justify-between h-[120px]">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-zinc-400 text-sm font-medium mb-1">New Booking</div>
            <div className="text-2xl font-bold text-white">1,879</div>
          </div>
          <div className="h-10 w-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <Bar dataKey="value" fill="#f97316" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex items-center text-xs font-medium text-emerald-500">
          <ArrowUpRight className="w-3 h-3 mr-1" />
          +7.0%
        </div>
      </div>

      {/* Available Rooms */}
      <div className="bg-[#1c1e26] p-5 rounded-2xl border border-white/5 flex flex-col justify-between h-[120px]">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-zinc-400 text-sm font-medium mb-1">Available Rooms</div>
            <div className="text-2xl font-bold text-white">55</div>
          </div>
          <div className="h-10 w-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={donutData} innerRadius={12} outerRadius={20} dataKey="value" stroke="none">
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex items-center text-xs font-medium text-red-500">
          <ArrowDownRight className="w-3 h-3 mr-1" />
          -3.1%
        </div>
      </div>

      {/* Revenue */}
      <div className="bg-[#1c1e26] p-5 rounded-2xl border border-white/5 flex flex-col justify-between h-[120px]">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-zinc-400 text-sm font-medium mb-1">Revenue</div>
            <div className="text-2xl font-bold text-white">$2,287</div>
          </div>
          <div className="h-10 w-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <Line type="monotone" dataKey="value" stroke="#84cc16" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex items-center text-xs font-medium text-emerald-500">
          <ArrowUpRight className="w-3 h-3 mr-1" />
          +9.2%
        </div>
      </div>

      {/* Checkout */}
      <div className="bg-[#1c1e26] p-5 rounded-2xl border border-white/5 flex flex-col justify-between h-[120px]">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-zinc-400 text-sm font-medium mb-1">Checkout</div>
            <div className="text-2xl font-bold text-white">567</div>
          </div>
          <div className="h-10 w-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} outerRadius={20} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex items-center text-xs font-medium text-red-500">
          <ArrowDownRight className="w-3 h-3 mr-1" />
          -0.4%
        </div>
      </div>
    </div>
  );
}
