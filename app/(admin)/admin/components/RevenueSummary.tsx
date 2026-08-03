import { ArrowUpRight, ArrowDownRight, Home, Utensils, Heart, PlusSquare } from 'lucide-react';

export function RevenueSummary() {
  return (
    <div className="bg-[#1c1e26] p-6 rounded-2xl border border-white/5 h-full">
      <h3 className="text-white font-bold mb-6">Revenue Summary</h3>
      
      <div className="text-center mb-8 border-b border-white/10 pb-8">
        <div className="text-4xl font-bold text-white mb-2">$128,450</div>
        <div className="flex items-center justify-center text-xs font-bold text-emerald-500 mb-1">
          <ArrowUpRight className="w-3 h-3 mr-1" />
          +$19,230 (+11.5%)
        </div>
        <div className="text-xs text-zinc-500">vs. Previous Month</div>
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-bold text-white mb-4">Revenue Breakdown</h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center">
                <Home className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm text-zinc-300">Room Bookings</div>
                <div className="text-xs font-bold text-white">$89,120</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white">69.7%</div>
              <div className="text-[10px] text-emerald-500 flex items-center justify-end"><ArrowUpRight className="w-3 h-3"/> +8.5%</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                <Utensils className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm text-zinc-300">Food & Beverage</div>
                <div className="text-xs font-bold text-white">$23,500</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white">18.4%</div>
              <div className="text-[10px] text-emerald-500 flex items-center justify-end"><ArrowUpRight className="w-3 h-3"/> +12.4%</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-500 flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm text-zinc-300">Spa & Wellness</div>
                <div className="text-xs font-bold text-white">$8,750</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white">6.8%</div>
              <div className="text-[10px] text-red-500 flex items-center justify-end"><ArrowDownRight className="w-3 h-3"/> -2.1%</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center">
                <PlusSquare className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm text-zinc-300">Other Services</div>
                <div className="text-xs font-bold text-white">$6,530</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white">5.1%</div>
              <div className="text-[10px] text-emerald-500 flex items-center justify-end"><ArrowUpRight className="w-3 h-3"/> +4.1%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
