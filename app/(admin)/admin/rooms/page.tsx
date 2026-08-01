import { Wifi, Tv, Wind, Coffee, Bed } from "lucide-react";
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

const roomTypes = [
  {
    id: 1,
    name: "Standard Room",
    count: 45,
    price: "$150/night",
    description: "Comfortable and spacious room perfect for solo travelers or couples.",
    amenities: ["Wi-Fi", "Smart TV", "Air Conditioning", "Tea/Coffee"],
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Deluxe King",
    count: 20,
    price: "$250/night",
    description: "Premium bedding with luxurious decor and extended city views.",
    amenities: ["Wi-Fi", "Smart TV", "Air Conditioning", "Mini Fridge", "Safe"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Presidential Suite",
    count: 2,
    price: "$850/night",
    description: "The ultimate luxury experience with a private lounge and panoramic views.",
    amenities: ["Wi-Fi", "Smart TV", "Air Conditioning", "Mini Bar", "Bathtub", "Living Area"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800",
  },
];

export default function RoomsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Rooms & Accommodation</h1>
          <p className="text-zinc-400 mt-1">Manage dynamic room inventory and types.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg transition-colors font-medium">
              Add Room Type
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-[var(--color-card)] border-[var(--color-card-border)] text-white">
            <DialogHeader>
              <DialogTitle className="text-xl">Add New Room Type</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Create a new room category. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-zinc-300">Room Name</Label>
                <Input id="name" placeholder="e.g. Deluxe Suite" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price" className="text-zinc-300">Price per night</Label>
                  <Input id="price" placeholder="e.g. $150/night" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="count" className="text-zinc-300">Available Rooms</Label>
                  <Input id="count" type="number" placeholder="e.g. 10" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="text-zinc-300">Description</Label>
                <Textarea id="description" placeholder="Describe the room..." className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500 resize-none" rows={3} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amenities" className="text-zinc-300">Amenities (comma separated)</Label>
                <Input id="amenities" placeholder="Wi-Fi, Smart TV, Mini Bar" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image" className="text-zinc-300">Image URL</Label>
                <Input id="image" placeholder="https://..." className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white">Save Room Type</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {roomTypes.map((room) => (
          <div key={room.id} className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden flex flex-col hover:border-[var(--color-primary)]/50 transition-colors">
            <div className="h-48 w-full bg-zinc-800 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={room.image} alt={room.name} className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity" />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-sm font-medium text-white">
                {room.count} Available
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-white">{room.name}</h2>
                <span className="text-[var(--color-primary)] font-bold">{room.price}</span>
              </div>
              <p className="text-sm text-zinc-400 mb-6">{room.description}</p>

              <div className="mt-auto">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => (
                    <span key={amenity} className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-zinc-300">
                      {amenity === "Wi-Fi" && <Wifi className="w-3 h-3" />}
                      {amenity === "Smart TV" && <Tv className="w-3 h-3" />}
                      {amenity === "Air Conditioning" && <Wind className="w-3 h-3" />}
                      {amenity === "Tea/Coffee" && <Coffee className="w-3 h-3" />}
                      {(!["Wi-Fi", "Smart TV", "Air Conditioning", "Tea/Coffee"].includes(amenity)) && <Bed className="w-3 h-3" />}
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
