export function RoomAvailability() {
  return (
    <div className="bg-[#1c1e26] p-6 rounded-2xl border border-white/5 flex flex-col justify-between h-full min-h-[280px]">
      <h3 className="text-white font-bold mb-4">Room Availability</h3>
      
      {/* Horizontal Stacked Bar */}
      <div className="w-full h-8 flex rounded overflow-hidden mb-8">
        <div className="bg-[#f97316] h-full" style={{ width: '42%' }}></div>
        <div className="bg-[#fdba74] h-full" style={{ width: '29%' }}></div>
        <div className="bg-[#ffedd5] h-full" style={{ width: '19%' }}></div>
        <div className="bg-[#99f6e4] h-full" style={{ width: '10%' }}></div>
      </div>

      <div className="grid grid-cols-2 gap-4 gap-y-8 mt-auto">
        <div className="flex flex-col border-l-2 border-[#f97316] pl-3">
          <div className="text-xs text-zinc-500 mb-1">Occupied</div>
          <div className="text-2xl font-bold text-white leading-none">125</div>
        </div>
        <div className="flex flex-col border-l-2 border-[#fdba74] pl-3">
          <div className="text-xs text-zinc-500 mb-1">Reserved</div>
          <div className="text-2xl font-bold text-white leading-none">87</div>
        </div>
        <div className="flex flex-col border-l-2 border-[#ffedd5] pl-3">
          <div className="text-xs text-zinc-500 mb-1">Available</div>
          <div className="text-2xl font-bold text-white leading-none">57</div>
        </div>
        <div className="flex flex-col border-l-2 border-[#99f6e4] pl-3">
          <div className="text-xs text-zinc-500 mb-1">Not Ready</div>
          <div className="text-2xl font-bold text-white leading-none">25</div>
        </div>
      </div>
    </div>
  );
}
