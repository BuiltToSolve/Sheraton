"use client";

import { useState, useTransition } from "react";
import { saveMenuItem } from "./actions";
import { Loader2 } from "lucide-react";
import { CURRENCY } from '@/lib/constants';

import { MenuCategory, DietaryType, FoodAllergen } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export function AddMenuItemModal() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await saveMenuItem(formData);
      if (result.success) {
        setOpen(false);
      } else {
        alert(`Failed to save menu item: ${result.error}`);
        console.error(result.error);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg transition-colors font-medium">
          Add Menu Item
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-[var(--color-card)] border-[var(--color-card-border)] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Menu Item</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Create a new food or beverage item. Fill in all the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-zinc-300">Item Name</Label>
                <Input id="name" name="name" placeholder="e.g. Signature Burger" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image" className="text-zinc-300">Image URL</Label>
                <Input id="image" name="image" placeholder="https://..." className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" required />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category" className="text-zinc-300">Category</Label>
                <Select name="category" required>
                  <SelectTrigger className="bg-zinc-800/50 border-white/10 text-white">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-white/10 text-white">
                    {Object.values(MenuCategory).map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dietaryType" className="text-zinc-300">Dietary Type</Label>
                <Select name="dietaryType" required>
                  <SelectTrigger className="bg-zinc-800/50 border-white/10 text-white">
                    <SelectValue placeholder="Select dietary type" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-white/10 text-white">
                    {Object.values(DietaryType).map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price" className="text-zinc-300">Price ({CURRENCY.SYMBOL})</Label>
                <Input id="price" name="price" type="number" step="0.01" placeholder="0.00" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cuisine" className="text-zinc-300">Cuisine (Optional)</Label>
                <Input id="cuisine" name="cuisine" placeholder="e.g. American, Italian" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="preparationTime" className="text-zinc-300">Preparation Time (mins)</Label>
                <Input id="preparationTime" name="preparationTime" type="number" placeholder="e.g. 15" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="calories" className="text-zinc-300">Calories (kcal)</Label>
                <Input id="calories" name="calories" type="number" placeholder="Optional" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label className="text-zinc-300">Allergens</Label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-4 gap-x-6 mt-2">
                {Object.values(FoodAllergen).filter(a => a !== 'None').map((allergen) => (
                  <label key={allergen} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="allergens" value={allergen} className="w-4 h-4 rounded border-white/10 bg-zinc-800/50 accent-[var(--color-primary)]" />
                    <span className="text-sm text-zinc-400">{allergen}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="text-zinc-300">Description</Label>
              <Textarea id="description" name="description" placeholder="Describe the item..." className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500 resize-none" rows={3} required />
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" id="available" name="available" defaultChecked className="w-4 h-4 rounded border-white/10 bg-zinc-800/50 accent-[var(--color-primary)]" />
              <Label htmlFor="available" className="text-zinc-300 cursor-pointer">Item is Available</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Menu Item
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
