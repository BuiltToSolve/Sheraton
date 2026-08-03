const bookings = [
  { room: '101', name: 'John Doe', checkIn: '12/07/2023', checkOut: '17/07/2023', mobile: '555-0192', status: 'Booked' },
  { room: '102', name: 'Jane Smith', checkIn: '12/07/2023', checkOut: '15/07/2023', mobile: '555-0183', status: 'Booked' },
  { room: '103', name: 'Alice Johnson', checkIn: '13/07/2023', checkOut: '20/07/2023', mobile: '555-0174', status: 'Checked In' },
  { room: '104', name: 'Bob Brown', checkIn: '13/07/2023', checkOut: '14/07/2023', mobile: '555-0165', status: 'Booked' },
  { room: '105', name: 'Charlie Davis', checkIn: '14/07/2023', checkOut: '18/07/2023', mobile: '555-0156', status: 'Checked In' },
  { room: '106', name: 'Eve Wilson', checkIn: '15/07/2023', checkOut: '19/07/2023', mobile: '555-0147', status: 'Canceled' },
  { room: '107', name: 'David Clark', checkIn: '15/07/2023', checkOut: '16/07/2023', mobile: '555-0138', status: 'Booked' },
];

export function CurrentBooking() {
  return (
    <div className="bg-[#1c1e26] p-6 rounded-2xl border border-white/5 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-bold">Current Booking</h3>
        <button className="text-blue-400 text-sm font-medium hover:underline">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="text-xs text-zinc-500 border-b border-white/5">
              <th className="px-4 py-3 font-medium">Room No</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Check In</th>
              <th className="px-4 py-3 font-medium">Check Out</th>
              <th className="px-4 py-3 font-medium">Mobile</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {bookings.map((booking, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-4 text-sm text-zinc-300">{booking.room}</td>
                <td className="px-4 py-4 text-sm text-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${booking.name}`} alt={booking.name} />
                  </div>
                  {booking.name}
                </td>
                <td className="px-4 py-4 text-sm text-zinc-400">{booking.checkIn}</td>
                <td className="px-4 py-4 text-sm text-zinc-400">{booking.checkOut}</td>
                <td className="px-4 py-4 text-sm text-zinc-400">📞 {booking.mobile}</td>
                <td className="px-4 py-4 text-sm">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                    booking.status === "Checked In" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                    booking.status === "Booked" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                    "bg-red-500/10 text-red-400 border-red-500/20"
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-zinc-400">
                  <button className="hover:text-white">•••</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
