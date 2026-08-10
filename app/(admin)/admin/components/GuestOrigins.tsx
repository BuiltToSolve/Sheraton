import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { CURRENCY } from '@/lib/constants';

export function GuestOrigins() {
  return (
    <div className="bg-[#1c1e26] p-6 rounded-2xl border border-white/5 h-full">
      <h3 className="text-white font-bold mb-6">Guest Origins</h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <span className="text-xl">🇺🇸</span>
              <div>
                <div className="text-sm text-zinc-300">United States</div>
                <div className="text-xs text-zinc-500">245 bookings · <span className="text-emerald-500">{CURRENCY.SYMBOL}86,450</span></div>
              </div>
            </div>
            <div className="text-right flex items-center gap-2">
              <div className="text-sm text-white">35.2%</div>
              <div className="text-[10px] text-emerald-500 flex items-center"><ArrowUpRight className="w-3 h-3"/> +12.5%</div>
            </div>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1">
            <div className="bg-blue-500 h-1 rounded-full" style={{ width: '35.2%' }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <span className="text-xl">🇬🇧</span>
              <div>
                <div className="text-sm text-zinc-300">United Kingdom</div>
                <div className="text-xs text-zinc-500">156 bookings · <span className="text-emerald-500">{CURRENCY.SYMBOL}57,800</span></div>
              </div>
            </div>
            <div className="text-right flex items-center gap-2">
              <div className="text-sm text-white">22.4%</div>
              <div className="text-[10px] text-emerald-500 flex items-center"><ArrowUpRight className="w-3 h-3"/> +8.2%</div>
            </div>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1">
            <div className="bg-emerald-500 h-1 rounded-full" style={{ width: '22.4%' }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <span className="text-xl">🇩🇪</span>
              <div>
                <div className="text-sm text-zinc-300">Germany</div>
                <div className="text-xs text-zinc-500">134 bookings · <span className="text-emerald-500">{CURRENCY.SYMBOL}52,140</span></div>
              </div>
            </div>
            <div className="text-right flex items-center gap-2">
              <div className="text-sm text-white">19.2%</div>
              <div className="text-[10px] text-red-500 flex items-center"><ArrowDownRight className="w-3 h-3"/> -2.1%</div>
            </div>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1">
            <div className="bg-amber-500 h-1 rounded-full" style={{ width: '19.2%' }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <span className="text-xl">🇫🇷</span>
              <div>
                <div className="text-sm text-zinc-300">France</div>
                <div className="text-xs text-zinc-500">92 bookings · <span className="text-emerald-500">{CURRENCY.SYMBOL}34,852</span></div>
              </div>
            </div>
            <div className="text-right flex items-center gap-2">
              <div className="text-sm text-white">13.2%</div>
              <div className="text-[10px] text-emerald-500 flex items-center"><ArrowUpRight className="w-3 h-3"/> +4.2%</div>
            </div>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1">
            <div className="bg-purple-500 h-1 rounded-full" style={{ width: '13.2%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
