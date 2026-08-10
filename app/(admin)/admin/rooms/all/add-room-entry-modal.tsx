"use client";

import * as React from "react";
import { Plus, Loader2 } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getRoomTypes, saveRoom } from "../actions";

export function AddRoomEntryModal() {
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [roomTypes, setRoomTypes] = React.useState<{id: string, name: string}[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (open && roomTypes.length === 0) {
      getRoomTypes().then(setRoomTypes).catch(console.error);
    }
  }, [open, roomTypes.length]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data = {
      roomNumber: formData.get("roomNumber"),
      floor: formData.get("floor"),
      roomTypeId: formData.get("roomTypeId"),
      status: formData.get("status"),
      hkStatus: formData.get("hkStatus"),
      notes: formData.get("notes"),
    };

    startTransition(async () => {
      const result = await saveRoom(data);
      if (result.success) {
        setOpen(false);
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg text-sm font-bold transition-colors">
          <Plus className="w-4 h-4" />
          Add Room
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-[var(--color-card)] border-[var(--color-card-border)] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Room</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Add a new room entry into the inventory.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="px-4 py-3 mx-4 mt-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto px-1 custom-scrollbar">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="roomNumber" className="text-zinc-300">Room Number</Label>
                <Input id="roomNumber" name="roomNumber" placeholder="e.g. 101" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="floor" className="text-zinc-300">Floor</Label>
                <Input id="floor" name="floor" type="number" placeholder="e.g. 1" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" required />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="roomTypeId" className="text-zinc-300">Room Type</Label>
              <Select name="roomTypeId" required>
                <SelectTrigger className="bg-zinc-800/50 border-white/10 text-white">
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  {roomTypes.map((rt) => (
                    <SelectItem key={rt.id} value={rt.id}>{rt.name}</SelectItem>
                  ))}
                  {roomTypes.length === 0 && (
                    <SelectItem value="loading" disabled>Loading room types...</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status" className="text-zinc-300">Status</Label>
                <Select name="status" defaultValue="Available">
                  <SelectTrigger className="bg-zinc-800/50 border-white/10 text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Occupied">Occupied</SelectItem>
                    <SelectItem value="CheckingIn">Checking In</SelectItem>
                    <SelectItem value="CheckingOut">Checking Out</SelectItem>
                    <SelectItem value="Cleaning">Cleaning</SelectItem>
                    <SelectItem value="Reserved">Reserved</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hkStatus" className="text-zinc-300">Housekeeping</Label>
                <Select name="hkStatus" defaultValue="Clean">
                  <SelectTrigger className="bg-zinc-800/50 border-white/10 text-white">
                    <SelectValue placeholder="Select HK status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Clean">Clean</SelectItem>
                    <SelectItem value="Dirty">Dirty</SelectItem>
                    <SelectItem value="InProgress">In Progress</SelectItem>
                    <SelectItem value="Inspected">Inspected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes" className="text-zinc-300">Notes</Label>
              <Textarea id="notes" name="notes" placeholder="Optional notes about the room..." className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500 resize-none" rows={3} />
            </div>
          </div>
          <DialogFooter className="mt-4 pt-4 border-t border-white/10">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="hover:bg-zinc-800 text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium px-8">
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create Room
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
