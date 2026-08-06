"use client";

import * as React from "react";
import { Plus, X, Check, ChevronsUpDown, Edit, Loader2, Trash2 } from "lucide-react";
import { RoomType } from "@prisma/client";
import { saveRoomType, deleteRoomType } from "./actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Switch } from "@/components/ui/switch";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { SUGGESTED_AMENITIES } from "./constants";

export function AddRoomModal({ room, trigger }: { room?: RoomType, trigger?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [images, setImages] = React.useState<string[]>(room?.images?.length ? room.images : [""]);

  // Amenities Combobox State
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>(room?.amenities || []);

  const addImageField = () => {
    setImages([...images, ""]);
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const removeImageField = (index: number) => {
    if (images.length > 1) {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
    }
  };

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      id: room?.id,
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      price: (form.elements.namedItem('price') as HTMLInputElement).value,
      count: (form.elements.namedItem('count') as HTMLInputElement).value,
      maxOccupancy: (form.elements.namedItem('maxOccupancy') as HTMLInputElement).value,
      bedType: formData.get("bedType") as string || room?.bedType || "Single",
      floorRange: (form.elements.namedItem('floorRange') as HTMLInputElement).value,
      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
      smokingAllowed: form.querySelector('#smokingAllowed')?.getAttribute('aria-checked') === 'true',
      petFriendly: form.querySelector('#petFriendly')?.getAttribute('aria-checked') === 'true',
      accessible: form.querySelector('#accessible')?.getAttribute('aria-checked') === 'true',
      images: images.filter(img => img.trim() !== ""),
      amenities: selectedAmenities,
    };

    startTransition(async () => {
      await saveRoomType(data);
      setOpen(false);
    });
  };

  const [isDeleting, startDeleteTransition] = React.useTransition();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!room?.id) return;
    startDeleteTransition(async () => {
      await deleteRoomType(room.id);
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="w-10 h-10 flex items-center justify-center border border-[var(--color-primary)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg transition-colors font-medium">
            <Plus />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-[var(--color-card)] border-[var(--color-card-border)] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">{room ? "Edit Room Type" : "Add New Room Type"}</DialogTitle>
          <DialogDescription className="text-zinc-400">
            {room ? "Modify room category details." : "Create a new room category."} Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto px-1">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-zinc-300">Room Name</Label>
              <Input id="name" defaultValue={room?.name} placeholder="e.g. Deluxe Suite" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price" className="text-zinc-300">Price per night</Label>
                <Input id="price" type="number" defaultValue={room?.basePrice} placeholder="e.g. 150" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="count" className="text-zinc-300">Available Rooms</Label>
                <Input id="count" type="number" defaultValue={room?.totalRooms} placeholder="e.g. 10" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="maxOccupancy" className="text-zinc-300">Max Occupancy</Label>
                <Input id="maxOccupancy" type="number" defaultValue={room?.maxOccupancy} placeholder="e.g. 4" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bedType" className="text-zinc-300">Bed Type</Label>
                <Select name="bedType" defaultValue={room?.bedType}>
                  <SelectTrigger className="bg-zinc-800/50 border-white/10 text-white">
                    <SelectValue placeholder="Select bed type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Double">Double</SelectItem>
                    <SelectItem value="King">King</SelectItem>
                    <SelectItem value="Twin">Twin</SelectItem>
                    <SelectItem value="Family">Family</SelectItem>
                    <SelectItem value="Sweet">Sweet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="floorRange" className="text-zinc-300">Floor Range</Label>
              <Input id="floorRange" defaultValue={room?.floorRange} placeholder="e.g. 1-5" className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500" />
            </div>

            <div className="grid gap-2">
              <Label className="text-zinc-300">Images</Label>
              <div className="space-y-2">
                {images.map((img, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="https://..."
                      value={img}
                      onChange={(e) => updateImage(index, e.target.value)}
                      className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500 flex-1"
                    />
                    {images.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeImageField(index)}
                        className="border-white/10 bg-zinc-800/50 hover:bg-zinc-700/50 text-white"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={addImageField}
                className="w-full mt-2 border-white/10 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 border-dashed"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Image
              </Button>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="text-zinc-300 flex justify-between items-center">
                Description
                <span className="text-[10px] text-zinc-500 font-normal">Supports Markdown (**bold**, *italic*)</span>
              </Label>
              <Textarea id="description" name="description" defaultValue={room?.description} placeholder="Describe the room..." className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-500 resize-none" rows={3} />
            </div>

            <div className="grid gap-2 flex flex-col">
              <Label className="text-zinc-300">Amenities</Label>
              <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCombobox}
                    className="w-full justify-between bg-zinc-800/50 border-white/10 text-white hover:bg-zinc-800 hover:text-white"
                  >
                    Select amenities...
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-black/50 backdrop-blur-md border-white/10 text-white">
                  <Command className="bg-transparent text-white">
                    <CommandInput placeholder="Search amenity..." className="text-white placeholder:text-zinc-500 border-none focus:ring-0" />
                    <CommandList>
                      <CommandEmpty>No amenity found.</CommandEmpty>
                      <CommandGroup>
                        {SUGGESTED_AMENITIES.map(([amenity]) => (
                          <CommandItem
                            key={amenity}
                            value={amenity}
                            onSelect={() => toggleAmenity(amenity)}
                            className="text-white hover:bg-white/10 data-[selected=true]:bg-white/10 cursor-pointer"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedAmenities.includes(amenity) ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {amenity}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {selectedAmenities.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedAmenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-none py-1 px-2">
                      {amenity}
                      <button
                        onClick={() => toggleAmenity(amenity)}
                        className="ml-1 hover:text-red-400 focus:outline-none"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-6 py-2">
              <div className="flex items-center space-x-2">
                <Switch id="smokingAllowed" defaultChecked={room?.smokingAllowed} />
                <Label htmlFor="smokingAllowed" className="text-zinc-300">Smoking Allowed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="petFriendly" defaultChecked={room?.petFriendly} />
                <Label htmlFor="petFriendly" className="text-zinc-300">Pet Friendly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="accessible" defaultChecked={room?.accessible} />
                <Label htmlFor="accessible" className="text-zinc-300">Accessible</Label>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4 flex sm:justify-between items-center w-full gap-2 sm:gap-0">
            {room ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant="destructive" className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border-none sm:mr-auto w-full sm:w-auto">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[var(--color-card)] border-[var(--color-card-border)] text-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-zinc-400">
                      This will permanently delete the room type "{room.name}". This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-zinc-800/50 text-white border-white/10 hover:bg-zinc-700/50 hover:text-white">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      {isDeleting ? "Deleting..." : "Delete Room Type"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : <div className="sm:mr-auto" />}
            <Button type="submit" disabled={isPending} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white w-full sm:w-auto">
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Room Type
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
