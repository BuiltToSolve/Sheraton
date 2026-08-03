"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Jan', Online: 120, Offline: 80 },
  { month: 'Feb', Online: 150, Offline: 90 },
  { month: 'Mar', Online: 180, Offline: 70 },
  { month: 'Apr', Online: 220, Offline: 110 },
  { month: 'May', Online: 250, Offline: 130 },
  { month: 'Jun', Online: 280, Offline: 100 },
  { month: 'Jul', Online: 310, Offline: 120 },
];

export function BookingSource() {
  return (
    <div className="bg-[#1c1e26] p-6 rounded-2xl border border-white/5 h-full">
      <h3 className="text-white font-bold mb-6">Booking Source</h3>
      <div className="h-[250px] w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="month" stroke="#52525b" tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#52525b" tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#27272a', border: 'none', borderRadius: '8px', color: '#fff' }}
            />
            <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" dataKey="Online" stroke="#3b82f6" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="Offline" stroke="#ec4899" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
