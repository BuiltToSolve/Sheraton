import { Key, Users, BarChart2, Wrench, Brush, Bell, CreditCard, Settings } from 'lucide-react';

export function QuickAccess() {
  return (
    <div className="bg-[#1c1e26] p-6 rounded-2xl border border-white/5 h-full">
      <h3 className="text-white font-bold mb-6 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
        Quick Access
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#27272a]/50 hover:bg-[#3f3f46]/50 border border-white/5 transition-colors relative">
          <Key className="w-6 h-6 text-blue-400 mb-2" />
          <span className="text-xs text-zinc-300">Room Management</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#27272a]/50 hover:bg-[#3f3f46]/50 border border-white/5 transition-colors relative">
          <Users className="w-6 h-6 text-emerald-400 mb-2" />
          <span className="text-xs text-zinc-300">Staff Roster</span>
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">2</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#27272a]/50 hover:bg-[#3f3f46]/50 border border-white/5 transition-colors relative">
          <BarChart2 className="w-6 h-6 text-amber-400 mb-2" />
          <span className="text-xs text-zinc-300">Reports</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#27272a]/50 hover:bg-[#3f3f46]/50 border border-white/5 transition-colors relative">
          <Wrench className="w-6 h-6 text-red-400 mb-2" />
          <span className="text-xs text-zinc-300">Maintenance</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#27272a]/50 hover:bg-[#3f3f46]/50 border border-white/5 transition-colors relative">
          <Brush className="w-6 h-6 text-purple-400 mb-2" />
          <span className="text-xs text-zinc-300">Housekeeping</span>
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">1</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#27272a]/50 hover:bg-[#3f3f46]/50 border border-white/5 transition-colors relative">
          <Bell className="w-6 h-6 text-pink-400 mb-2" />
          <span className="text-xs text-zinc-300">Guest Services</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#27272a]/50 hover:bg-[#3f3f46]/50 border border-white/5 transition-colors relative">
          <CreditCard className="w-6 h-6 text-orange-400 mb-2" />
          <span className="text-xs text-zinc-300">Billing</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#27272a]/50 hover:bg-[#3f3f46]/50 border border-white/5 transition-colors relative">
          <Settings className="w-6 h-6 text-zinc-400 mb-2" />
          <span className="text-xs text-zinc-300">Settings</span>
        </button>
      </div>
    </div>
  );
}
