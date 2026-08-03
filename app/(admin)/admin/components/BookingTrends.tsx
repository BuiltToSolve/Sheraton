"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  bookings: Math.floor(Math.random() * 50) + 40
}));

export function BookingTrends() {
  return (
    <div className="bg-[#1c1e26] p-6 rounded-2xl border border-white/5 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-bold">Booking Trends</h3>
        <select className="bg-transparent text-zinc-400 text-sm focus:outline-none">
          <option>Last 30 Days</option>
        </select>
      </div>
      <div className="flex gap-8 mb-6">
        <div>
          <div className="text-3xl font-bold text-blue-500">1854</div>
          <div className="text-xs text-zinc-500">Total Bookings</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-blue-500">62</div>
          <div className="text-xs text-zinc-500">Daily Average</div>
        </div>
      </div>
      <div className="h-[200px] w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="day" stroke="#52525b" tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#52525b" tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#27272a', border: 'none', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#3b82f6' }}
            />
            <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#1c1e26', strokeWidth: 2 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
