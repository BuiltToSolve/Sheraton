import { Leaf, UtensilsCrossed } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { menuItems } from "@/lib/data";

export default function MenuPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Menu Management</h1>
          <p className="text-zinc-400 mt-1">Manage restaurant menu items and categories.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg transition-colors font-medium">
              Add Menu Item
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-[var(--color-card)] border-[var(--color-card-border)] text-white">
            <DialogHeader>
              <DialogTitle className="text-xl">Add New Menu Item</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Create a new food or beverage item. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-zinc-300">Item Name</Label>
                <Input id="name" placeholder="e.g. Signature Burger" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price" className="text-zinc-300">Price ($)</Label>
                  <Input id="price" type="number" step="0.01" placeholder="e.g. 15.00" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category" className="text-zinc-300">Category</Label>
                  <Input id="category" placeholder="e.g. Beverages" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="text-zinc-300">Description</Label>
                <Textarea id="description" placeholder="Describe the item..." className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500 resize-none" rows={3} />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" id="veg" className="w-4 h-4 rounded border-white/10 bg-zinc-800/50 accent-[var(--color-primary)]" />
                <Label htmlFor="veg" className="text-zinc-300 cursor-pointer">Vegetarian Item</Label>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image" className="text-zinc-300">Image URL</Label>
                <Input id="image" placeholder="https://..." className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white">Save Menu Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden flex flex-col hover:border-[var(--color-primary)]/50 transition-all duration-300 group">
            <div className="h-48 w-full bg-zinc-800 relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.name} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-black/60 backdrop-blur text-white text-xs px-3 py-1 rounded-full border border-white/10 font-medium">
                  {item.category}
                </span>
                {item.veg && (
                  <span className="bg-green-600/90 backdrop-blur text-white w-7 h-7 rounded-full flex items-center justify-center border border-white/10" title="Vegetarian">
                    <Leaf className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <div className="absolute bottom-3 right-3 bg-[var(--color-primary)] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                ${item.price.toFixed(2)}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-lg text-white mb-2">{item.name}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                {item.description}
              </p>
              
              <div className="mt-5 pt-4 border-t border-[var(--color-card-border)] flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <UtensilsCrossed className="w-4 h-4" />
                  Menu Item
                </span>
                <span className="bg-zinc-800/50 px-2 py-1 rounded-md text-[10px] font-mono tracking-wider text-zinc-400 border border-zinc-700">
                  ID: {item.id}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
