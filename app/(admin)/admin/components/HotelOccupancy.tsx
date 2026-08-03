"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', rate: 45 },
  { name: 'Feb', rate: 52 },
  { name: 'Mar', rate: 68 },
  { name: 'Apr', rate: 74 },
  { name: 'May', rate: 85 },
  { name: 'Jun', rate: 80 },
  { name: 'Jul', rate: 72 },
  { name: 'Aug', rate: 68 },
  { name: 'Sep', rate: 75 },
  { name: 'Oct', rate: 82 },
  { name: 'Nov', rate: 78 },
  { name: 'Dec', rate: 85 },
];

export function HotelOccupancy() {
  return (
    <div className="bg-[#1c1e26] p-6 rounded-2xl border border-white/5 h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-white font-bold mb-1">Hotel Occupancy Rate</h3>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-red-500">78.5%</span>
            <span className="text-xs text-zinc-500 mb-1">Current Month</span>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded ml-2 mb-1">+5.2%</span>
          </div>
        </div>
      </div>
      <div className="flex gap-8 mb-6 text-sm">
        <div>
          <div className="text-xs text-zinc-500">Previous Month</div>
          <div className="text-white font-medium">72.3%</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">YTD Average</div>
          <div className="text-white font-medium">75.8%</div>
        </div>
      </div>
      <div className="h-[200px] w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="name" stroke="#52525b" tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#52525b" tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#27272a', border: 'none', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#ef4444' }}
            />
            <Area type="monotone" dataKey="rate" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorRate)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
