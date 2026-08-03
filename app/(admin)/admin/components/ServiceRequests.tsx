export function ServiceRequests() {
  return (
    <div className="bg-[#1c1e26] p-6 rounded-2xl border border-white/5 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          Service Requests
        </h3>
      </div>
      <div className="text-xs text-zinc-500 mb-6">Active requests requiring attention</div>
      
      <div className="grid grid-cols-3 divide-x divide-white/10 text-center mb-6 border-b border-white/10 pb-6">
        <div>
          <div className="text-2xl font-bold text-amber-500">3</div>
          <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Pending</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-500">2</div>
          <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">In Progress</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-red-500">2</div>
          <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">High Priority</div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-medium text-white">Recent Requests</h4>
        <button className="text-xs text-blue-400 hover:underline">View All</button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
               <span>🛏️</span>
            </div>
            <div>
              <div className="text-sm text-zinc-200 font-medium">Extra Towels and Pillows</div>
              <div className="text-xs text-zinc-500">Room 412 • 5 mins ago</div>
            </div>
          </div>
          <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500">Pending</span>
        </div>
        
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
               <span>❄️</span>
            </div>
            <div>
              <div className="text-sm text-zinc-200 font-medium">Air conditioning not working</div>
              <div className="text-xs text-zinc-500">Room 305 • 15 mins ago</div>
            </div>
          </div>
          <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-500">In Progress</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
               <span>🧹</span>
            </div>
            <div>
              <div className="text-sm text-zinc-200 font-medium">Urgent cleaning required</div>
              <div className="text-xs text-zinc-500">Room 108 • 1 hr ago</div>
            </div>
          </div>
          <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-500">Pending</span>
        </div>
      </div>
    </div>
  );
}
