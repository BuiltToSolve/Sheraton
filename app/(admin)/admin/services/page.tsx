"use client";

import { useState } from "react";
import { 
  UtensilsCrossed, Car, Dumbbell, Flower2, 
  Gamepad2, Plane, Waves, KeyRound, LucideIcon, Plus,
  ConciergeBell, Sparkles, ShieldCheck, Wifi, Coffee, Monitor, Wind, Tv,
  Music, Book, Briefcase, Camera, Key, Lock, Phone, Star, Map
} from "lucide-react";
import { facilities } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ICON_MAP: Record<string, LucideIcon> = {
  UtensilsCrossed, Car, Dumbbell, Flower2, Gamepad2, Plane, Waves, KeyRound,
  ConciergeBell, Sparkles, ShieldCheck, Wifi, Coffee, Monitor, Wind, Tv,
  Music, Book, Briefcase, Camera, Key, Lock, Phone, Star, Map
};

export default function ServicesPage() {
  const [facilitiesList, setFacilitiesList] = useState(facilities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newIconName, setNewIconName] = useState<string>("UtensilsCrossed");

  const handleAddService = () => {
    if (!newName || !newDescription || !newIconName || !newImage) return;
    
    setFacilitiesList(prev => [
      ...prev, 
      { name: newName, description: newDescription, image: newImage, icon: newIconName }
    ]);
    
    setNewName("");
    setNewDescription("");
    setNewImage("");
    setNewIconName("UtensilsCrossed");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Guest Services & Facilities</h1>
          <p className="text-zinc-400 mt-1">Manage and view hotel amenities and facilities.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {facilitiesList.map((facility) => {
          const Icon = ICON_MAP[facility.icon] || Waves;
          return (
            <div key={facility.name} className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden group hover:border-[var(--color-primary)]/50 transition-all flex flex-col">
              <div className="relative h-48 w-full overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card)] to-transparent" />
                <div className="absolute bottom-4 left-4 bg-[var(--color-primary)] p-2.5 rounded-xl text-white shadow-lg shadow-black/50">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">{facility.name}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-[var(--color-card)] border-[var(--color-card-border)] text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Add New Service</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Create a new guest service or facility.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Service Name</label>
              <Input 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Valet Parking"
                className="bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Image URL</label>
              <Input 
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="https://images.pexels.com/... or /images/..."
                className="bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Description</label>
              <Textarea 
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Enter a description for the service..."
                className="w-full bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Select Icon</label>
              <div className="grid grid-cols-6 gap-2 pt-2 max-h-[140px] overflow-y-auto pr-2 custom-scrollbar">
                {Object.entries(ICON_MAP).map(([iconName, Icon]) => (
                  <button
                    key={iconName}
                    onClick={() => setNewIconName(iconName)}
                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${
                      newIconName === iconName 
                        ? "bg-[var(--color-primary)] text-white ring-2 ring-[var(--color-primary)] ring-offset-2 ring-offset-[#18181b]" 
                        : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                    }`}
                    title={iconName}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddService}
              disabled={!newName || !newDescription || !newIconName || !newImage}
              className="px-5 py-2 rounded-lg font-medium bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Service
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
