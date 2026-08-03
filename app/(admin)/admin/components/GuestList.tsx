const guests = [
  { name: 'Cora Stevens', room: '101', date: '13 June 24', time: '09:20 AM' },
  { name: 'Ali Salou', room: '102', date: '13 June 24', time: '11:30 AM' },
  { name: 'Jane Doe', room: '103', date: '14 June 24', time: '08:15 AM' },
  { name: 'Angelica Ramos', room: '104', date: '15 June 24', time: '14:20 PM' },
  { name: 'Dan Stevens', room: '105', date: '16 June 24', time: '11:10 AM' },
];

export function GuestList() {
  return (
    <div className="bg-[#1c1e26] p-6 rounded-2xl border border-white/5 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-bold">Guest List</h3>
        <button className="text-blue-400 text-sm font-medium hover:underline">View All</button>
      </div>
      
      <div className="space-y-4">
        {guests.map((guest, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${guest.name}`} alt={guest.name} />
              </div>
              <div>
                <div className="text-sm font-medium text-white">{guest.name}</div>
                <div className="text-xs text-zinc-500">Room {guest.room}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-zinc-300">{guest.date}</div>
              <div className="text-xs text-zinc-500">{guest.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
