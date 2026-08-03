"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Business', value: 136, color: '#3b82f6' },
  { name: 'Leisure', value: 96, color: '#10b981' },
];

export function GuestPurpose() {
  return (
    <div className="bg-[#1c1e26] p-6 rounded-2xl border border-white/5 h-full flex flex-col">
      <h3 className="text-white font-bold flex items-center gap-2 mb-6">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
        Guest Purpose
      </h3>
      
      <div className="flex-1 flex justify-center items-center relative min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs text-zinc-500">Total Guests</span>
          <span className="text-2xl font-bold text-white">232</span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-zinc-300">Business</span>
          </div>
          <span className="text-sm font-bold text-white">136 <span className="text-xs font-normal text-zinc-500">(59%)</span></span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm text-zinc-300">Leisure</span>
          </div>
          <span className="text-sm font-bold text-white">96 <span className="text-xs font-normal text-zinc-500">(41%)</span></span>
        </div>
      </div>
    </div>
  );
}
