"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '01 Jun', Booked: 65, Canceled: 15 },
  { name: '02 Jun', Booked: 50, Canceled: 20 },
  { name: '03 Jun', Booked: 45, Canceled: 10 },
  { name: '04 Jun', Booked: 70, Canceled: 15 },
  { name: '05 Jun', Booked: 35, Canceled: 10 },
  { name: '06 Jun', Booked: 60, Canceled: 25 },
  { name: '07 Jun', Booked: 75, Canceled: 15 },
  { name: '08 Jun', Booked: 80, Canceled: 5 },
];

export function ReservationChart() {
  return (
    <div className="bg-[#1c1e26] p-6 rounded-2xl border border-white/5 h-full min-h-[280px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-bold">Reservation</h3>
      </div>
      <div className="flex-1 w-full text-xs min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="name" stroke="#52525b" tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#52525b" tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{fill: '#ffffff05'}}
              contentStyle={{ backgroundColor: '#27272a', border: 'none', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend verticalAlign="top" align="right" iconType="square" wrapperStyle={{ paddingBottom: '20px' }} />
            <Bar dataKey="Booked" stackId="a" fill="#8b5cf6" radius={[0, 0, 4, 4]} barSize={24} />
            <Bar dataKey="Canceled" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
