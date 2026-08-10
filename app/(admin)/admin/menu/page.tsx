import { Leaf, UtensilsCrossed } from "lucide-react";
import { CURRENCY } from '@/lib/constants';
import { db } from "@/lib/db";
import { AddMenuItemModal } from "./add-menu-item-modal";

export default async function MenuPage() {
  const dbMenuItems = await db.menuItem.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Menu Management</h1>
          <p className="text-zinc-400 mt-1">Manage restaurant menu items and categories.</p>
        </div>
        <AddMenuItemModal />
      </div>

      {dbMenuItems.length === 0 ? (
        <div className="text-center py-12 text-zinc-400 bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)]">
          No menu items found. Click "Add Menu Item" to get started!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dbMenuItems.map((item) => (
            <div key={item.id} className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden flex flex-col hover:border-[var(--color-primary)]/50 transition-all duration-300 group">
              <div className="h-48 w-full bg-zinc-800 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-black/60 backdrop-blur text-white text-xs px-3 py-1 rounded-full border border-white/10 font-medium">
                    {item.category}
                  </span>
                  {(item.dietaryType === 'Veg' || item.dietaryType === 'Vegan' || item.dietaryType === 'Jain') && (
                    <span className="bg-green-600/90 backdrop-blur text-white w-7 h-7 rounded-full flex items-center justify-center border border-white/10" title={item.dietaryType}>
                      <Leaf className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 bg-[var(--color-primary)] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  {CURRENCY.SYMBOL}{item.price.toFixed(2)}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg text-white">{item.name}</h3>
                  {!item.available && (
                    <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/50 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Sold Out</span>
                  )}
                </div>
                
                <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                  {item.description}
                </p>

                <div className="mt-5 pt-4 border-t border-[var(--color-card-border)] flex items-center justify-between text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <UtensilsCrossed className="w-4 h-4" />
                    {item.preparationTime} mins
                  </span>
                  <span className="bg-zinc-800/50 px-2 py-1 rounded-md text-[10px] font-mono tracking-wider text-zinc-400 border border-zinc-700">
                    ID: {item.id.substring(0, 8)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
