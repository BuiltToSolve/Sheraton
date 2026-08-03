"use client";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Sun', users: 120 },
  { name: 'Mon', users: 180 },
  { name: 'Tue', users: 150 },
  { name: 'Wed', users: 190 },
  { name: 'Thu', users: 160 },
  { name: 'Fri', users: 220 },
  { name: 'Sat', users: 240 },
];

export function VisitorsChart() {
  return (
    <div className="bg-[#1c1e26] p-6 rounded-2xl border border-white/5 h-full">
      <h3 className="text-white font-bold mb-1">Visitors Chart</h3>
      <div className="text-xs text-zinc-500 mb-6 flex items-center gap-2">
        Average Daily Users 
        <span className="bg-white/10 px-2 py-0.5 rounded text-white font-medium">1,250 Visitors</span>
      </div>
      
      <div className="h-[200px] w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" stroke="#52525b" tickLine={false} axisLine={false} dy={10} />
            <Tooltip 
              cursor={{fill: '#ffffff05'}}
              contentStyle={{ backgroundColor: '#27272a', border: 'none', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#8b5cf6' }}
            />
            <Bar dataKey="users" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
