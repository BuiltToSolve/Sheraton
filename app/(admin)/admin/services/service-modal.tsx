"use client";

import { useState, useTransition } from "react";
import { saveService, deleteService, toggleMaintenance } from "./actions";
import { Loader2, Plus, UtensilsCrossed, Car, Dumbbell, Flower2, Gamepad2, Plane, Waves, KeyRound, ConciergeBell, Sparkles, ShieldCheck, Wifi, Coffee, Monitor, Wind, Tv, Music, Book, Briefcase, Camera, Key, Lock, Phone, Star, Map, LucideIcon, Trash2, Wrench } from "lucide-react";
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

const ICON_MAP: Record<string, LucideIcon> = {
  UtensilsCrossed, Car, Dumbbell, Flower2, Gamepad2, Plane, Waves, KeyRound,
  ConciergeBell, Sparkles, ShieldCheck, Wifi, Coffee, Monitor, Wind, Tv,
  Music, Book, Briefcase, Camera, Key, Lock, Phone, Star, Map
};

interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  underMaintenance: boolean;
}

export function ServiceModal({ service }: { service?: Service }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [iconName, setIconName] = useState<string>(service?.icon || "UtensilsCrossed");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("icon", iconName);
    
    startTransition(async () => {
      const result = await saveService(formData);
      if (result.success) {
        setOpen(false);
      } else {
        alert(`Failed to save service: ${result.error}`);
        console.error(result.error);
      }
    });
  };

  const handleDelete = () => {
    if (!service) return;
    if (confirm("Are you sure you want to delete this service?")) {
      startTransition(async () => {
        const result = await deleteService(service.id);
        if (result.success) {
          setOpen(false);
        } else {
          alert(`Failed to delete service: ${result.error}`);
        }
      });
    }
  };

  const handleToggleMaintenance = () => {
    if (!service) return;
    startTransition(async () => {
      const result = await toggleMaintenance(service.id, service.underMaintenance);
      if (result.success) {
        setOpen(false);
      } else {
        alert(`Failed to toggle maintenance: ${result.error}`);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {service ? (
          <button className="p-2 bg-zinc-800/80 hover:bg-[var(--color-primary)] text-zinc-400 hover:text-white rounded-lg transition-colors border border-zinc-700/50 hover:border-transparent">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
          </button>
        ) : (
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors whitespace-nowrap">
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-[var(--color-card)] border-[var(--color-card-border)] text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{service ? 'Edit Service' : 'Add New Service'}</DialogTitle>
          <DialogDescription className="text-zinc-400">
            {service ? 'Update the details of this guest service.' : 'Create a new guest service or facility.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          {service && <input type="hidden" name="id" value={service.id} />}
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-zinc-300">Service Name</Label>
              <Input id="name" name="name" defaultValue={service?.name} placeholder="e.g. Swimming Pool" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image" className="text-zinc-300">Image URL</Label>
              <Input id="image" name="image" defaultValue={service?.image} placeholder="https://..." className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" required />
            </div>

            <div className="grid gap-2">
              <Label className="text-zinc-300">Select Icon</Label>
              <div className="grid grid-cols-8 gap-2 p-3 bg-zinc-800/50 rounded-lg border border-white/10 h-40 overflow-y-auto">
                {Object.keys(ICON_MAP).map((name) => {
                  const IconComp = ICON_MAP[name];
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setIconName(name)}
                      className={`p-2 rounded-md flex items-center justify-center transition-colors ${
                        iconName === name ? 'bg-[var(--color-primary)] text-white' : 'text-zinc-400 hover:bg-zinc-700 hover:text-white'
                      }`}
                      title={name}
                    >
                      <IconComp className="w-5 h-5" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="text-zinc-300">Description</Label>
              <Textarea id="description" name="description" defaultValue={service?.description} placeholder="Describe the facility..." className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500 resize-none" rows={3} required />
            </div>
          </div>
          <DialogFooter className="sm:justify-between items-center w-full mt-4">
            <div className="flex gap-2 w-full sm:w-auto justify-start mb-4 sm:mb-0">
              {service && (
                <>
                  <button
                    type="button"
                    onClick={handleToggleMaintenance}
                    disabled={isPending}
                    title={service.underMaintenance ? "Remove from Maintenance" : "Put under Maintenance"}
                    className={`p-2 rounded-lg transition-colors ${
                      service.underMaintenance 
                        ? "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border border-amber-500/50" 
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-transparent"
                    }`}
                  >
                    <Wrench className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isPending}
                    title="Delete Service"
                    className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors border border-transparent hover:border-red-500/30"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            <Button type="submit" disabled={isPending} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white w-full sm:w-auto">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {service ? 'Update Service' : 'Add Service'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
