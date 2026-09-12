'use client';

import { ArrowLeft, CalendarDays, User, CreditCard, Bed, Users, Info, ShieldCheck, Utensils, Car, CheckCircle2, Dog, Baby, X, Loader2, Edit2, Save, UploadCloud } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { CURRENCY } from "@/lib/constants";
import AdminLoading from "../../loading";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { getDocumentAsBase64, uploadDocument, deleteDocument } from "@/app/actions/upload.action";
import { updateGuestDetails } from "../actions";

export default function BookingDetailsClient({ booking }: { booking: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [documentData, setDocumentData] = useState<string | null>(null);
  const [isLoadingDocument, setIsLoadingDocument] = useState(false);
  const [isEditingGuests, setIsEditingGuests] = useState(false);
  const [editedGuests, setEditedGuests] = useState<any[]>([]);
  const [isSavingGuests, setIsSavingGuests] = useState(false);
  const [uploadingDocForId, setUploadingDocForId] = useState<string | null>(null);

  const handleDocumentReupload = async (e: React.ChangeEvent<HTMLInputElement>, guestId: string, oldUrl: string | null) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDocForId(guestId);
    
    try {
      if (oldUrl) {
        toast.loading('Deleting existing document...', { id: `upload-${guestId}` });
        await deleteDocument(oldUrl);
      }
      
      toast.loading('Uploading new document...', { id: `upload-${guestId}` });
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bookingNumber', booking.bookingNumber);
      
      const uploadRes = await uploadDocument(formData);
      
      if (uploadRes.success && uploadRes.path) {
        toast.loading('Updating guest record...', { id: `upload-${guestId}` });
        const existingGuest = displayGuests.find((g: any) => g.id === guestId);
        if (existingGuest) {
          const res = await updateGuestDetails(guestId, { ...existingGuest, idProofUrl: uploadRes.path });
          if (res.success) {
            toast.success('Document updated successfully', { id: `upload-${guestId}` });
            router.refresh();
          } else {
            toast.error('Failed to update guest record', { id: `upload-${guestId}` });
          }
        }
      } else {
        toast.error('Failed to upload document', { id: `upload-${guestId}` });
      }
    } catch (err) {
      toast.error('An error occurred during upload', { id: `upload-${guestId}` });
    } finally {
      setUploadingDocForId(null);
      e.target.value = '';
    }
  };

  const handleViewDocument = async (url: string) => {
    setDocumentData(null);
    setDocumentModalOpen(true);
    setIsLoadingDocument(true);
    
    try {
      const res = await getDocumentAsBase64(url);
      if (res.success && res.data) {
        setDocumentData(res.data);
      } else {
        toast.error(res.error || 'Failed to load document');
        setDocumentModalOpen(false);
      }
    } catch (error) {
      toast.error('An error occurred while loading the document');
      setDocumentModalOpen(false);
    } finally {
      setIsLoadingDocument(false);
    }
  };

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const handleBack = () => {
    setIsNavigating(true);
    router.push('/admin/bookings');
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Confirmed": return "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20";
      case "CheckedIn": return "text-blue-400 bg-blue-400/10 border border-blue-400/20";
      case "CheckedOut": return "text-purple-400 bg-purple-400/10 border border-purple-400/20";
      case "Pending": return "text-orange-400 bg-orange-400/10 border border-orange-400/20";
      case "Cancelled": return "text-red-400 bg-red-400/10 border border-red-400/20";
      case "NoShow": return "text-red-600 bg-red-600/10 border border-red-600/20";
      default: return "text-zinc-400 bg-zinc-400/10 border border-zinc-400/20";
    }
  };

  // Deduplicate guests based on idNumber, preserving older idType and newer idProofUrl
  const uniqueGuestsMap = new Map();
  if (booking.guests) {
    booking.guests.forEach((g: any) => {
      if (g.idNumber && uniqueGuestsMap.has(g.idNumber)) {
        const existing = uniqueGuestsMap.get(g.idNumber);
        uniqueGuestsMap.set(g.idNumber, {
          ...existing,
          ...g,
          idType: g.idType || existing.idType,
          idProofUrl: g.idProofUrl || existing.idProofUrl
        });
      } else {
        uniqueGuestsMap.set(g.idNumber || g.id, { ...g });
      }
    });
  }
  const displayGuests = Array.from(uniqueGuestsMap.values());

  const toggleEditGuests = () => {
    if (!isEditingGuests) {
      setEditedGuests(JSON.parse(JSON.stringify(displayGuests)));
    }
    setIsEditingGuests(!isEditingGuests);
  };

  const updateGuest = (id: string, field: string, value: any) => {
    setEditedGuests(prev => prev.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const saveGuests = async () => {
    setIsSavingGuests(true);
    let successCount = 0;
    
    for (const guest of editedGuests) {
      const dataToSave = {
        ...guest,
        dietaryPreferences: typeof guest.dietaryPreferences === 'string' ? guest.dietaryPreferences.split(',').map((s: string) => s.trim()).filter(Boolean) : guest.dietaryPreferences,
        accessibilityNeeds: typeof guest.accessibilityNeeds === 'string' ? guest.accessibilityNeeds.split(',').map((s: string) => s.trim()).filter(Boolean) : guest.accessibilityNeeds,
      };
      
      const res = await updateGuestDetails(guest.id, dataToSave);
      if (res.success) {
        successCount++;
      } else {
        toast.error(`Failed to update ${guest.fullName}`);
      }
    }
    
    if (successCount === editedGuests.length) {
      toast.success("Guest details updated successfully!");
      setIsEditingGuests(false);
      router.refresh();
    } else if (successCount > 0) {
      toast.success(`Partially updated ${successCount} guests.`);
      setIsEditingGuests(false);
      router.refresh();
    }
    
    setIsSavingGuests(false);
  };

  const primaryGuest = displayGuests[0] || {};
  const guestName = primaryGuest.fullName || booking.User?.name || 'Unknown';
  const checkIn = new Date(booking.checkInDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  const checkOut = new Date(booking.checkOutDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

  if (isNavigating) {
    return <AdminLoading />;
  }

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex items-center gap-4">
        <button 
          onClick={handleBack}
          className="p-2 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white tracking-tight">{booking.bookingNumber}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.bookingStatus)}`}>
              {booking.bookingStatus}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${booking.paymentStatus === 'Paid' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 'text-orange-400 bg-orange-400/10 border-orange-400/20'}`}>
              {booking.paymentStatus}
            </span>
          </div>
          <p className="text-zinc-400 mt-1 flex items-center gap-2" suppressHydrationWarning>
            Booked on {new Date(booking.createdAt).toLocaleDateString()} via {booking.source}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Overview & Payment) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Reservation Overview Card */}
          <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden">
            <div className="p-5 border-b border-[var(--color-card-border)] flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-[var(--color-primary)]" />
              <h2 className="text-lg font-bold text-white">Stay Overview</h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                  <p className="text-sm text-zinc-400 uppercase tracking-wider mb-1">Check In</p>
                  <p className="text-xl font-medium text-white" suppressHydrationWarning>{checkIn}</p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="h-px bg-white/10 w-full relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-card)] px-3 text-xs text-zinc-500 font-medium rounded-full border border-[var(--color-card-border)]">
                      {booking.nights} Night{booking.nights > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-sm text-zinc-400 uppercase tracking-wider mb-1">Check Out</p>
                  <p className="text-xl font-medium text-white" suppressHydrationWarning>{checkOut}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[var(--color-card-border)]">
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Room Type</p>
                  <p className="text-sm font-medium text-white flex items-center gap-2">
                    <Bed className="w-4 h-4 text-zinc-500" /> {booking.RoomType?.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Guests</p>
                  <p className="text-sm font-medium text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-zinc-500" /> {booking.adults} Adults, {booking.children} Children
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Rate Plan</p>
                  <p className="text-sm font-medium text-white flex items-center gap-2">
                    <Info className="w-4 h-4 text-zinc-500" /> {booking.ratePlan}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Room Number</p>
                  <p className="text-sm font-medium text-white flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${booking.roomId ? 'text-emerald-500' : 'text-orange-500'}`} /> 
                    {booking.Room?.roomNumber || 'Unassigned'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Details Card */}
          <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden">
            <div className="p-5 border-b border-[var(--color-card-border)] flex items-center gap-2">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-[var(--color-primary)]" />
                <h2 className="text-lg font-bold text-white">Guest Information</h2>
                {!isEditingGuests ? (
                  <button onClick={toggleEditGuests} className="ml-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors" title="Edit Guests">
                    <Edit2 className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex items-center ml-2 gap-1">
                    <button onClick={saveGuests} disabled={isSavingGuests} className="p-1.5 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 transition-colors" title="Save Changes">
                      {isSavingGuests ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    </button>
                    <button onClick={toggleEditGuests} disabled={isSavingGuests} className="p-1.5 rounded-md bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors" title="Cancel Edit">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {booking.hasPet && (
                  <div className="flex items-center gap-1 bg-orange-500/10 text-orange-400 px-2 py-1 rounded-md text-xs font-bold border border-orange-500/20" title="Has Pet">
                    <Dog className="w-4 h-4" />
                  </div>
                )}
                {booking.hasBaby && (
                  <div className="flex items-center gap-1 bg-blue-500/10 text-blue-400 px-2 py-1 rounded-md text-xs font-bold border border-blue-500/20" title="Has Baby">
                    <Baby className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
            <div className="p-0">
              <div className="divide-y divide-[var(--color-card-border)]">
                {displayGuests.map((guest: any, idx: number) => {
                  const currentGuest = isEditingGuests ? editedGuests.find(g => g.id === guest.id) : guest;
                  return (
                  <div key={guest.id} className="p-6 hover:bg-white/5 transition-colors">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                      <div className="flex-1 w-full">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          {currentGuest.fullName} 
                          {idx === 0 && <span className="bg-blue-500/10 text-blue-400 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-blue-500/20">Primary</span>}
                        </h3>
                        
                        {!isEditingGuests ? (
                          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                            <p className="text-sm text-zinc-400"><span className="text-zinc-500">Phone:</span> {currentGuest.phone || 'N/A'}</p>
                            <p className="text-sm text-zinc-400"><span className="text-zinc-500">Email:</span> {currentGuest.email || 'N/A'}</p>
                            <p className="text-sm text-zinc-400"><span className="text-zinc-500">Gender:</span> {currentGuest.gender || 'N/A'}</p>
                            <p className="text-sm text-zinc-400"><span className="text-zinc-500">Nationality:</span> {currentGuest.nationality || 'N/A'}</p>
                            {currentGuest.dateOfBirth && <p className="text-sm text-zinc-400" suppressHydrationWarning><span className="text-zinc-500">DOB:</span> {new Date(currentGuest.dateOfBirth).toLocaleDateString()}</p>}
                            {currentGuest.guestType && <p className="text-sm text-zinc-400"><span className="text-zinc-500">Type:</span> {currentGuest.guestType}</p>}
                            {currentGuest.address && <p className="text-sm text-zinc-400 w-full"><span className="text-zinc-500">Address:</span> {currentGuest.address}</p>}
                            
                            {currentGuest.dietaryPreferences?.length > 0 && (
                              <div className="w-full mt-2">
                                <span className="text-xs text-zinc-500 block mb-1">Dietary Preferences</span>
                                <div className="flex flex-wrap gap-2">
                                  {currentGuest.dietaryPreferences.map((d: string) => (
                                    <span key={d} className="px-2 py-0.5 bg-orange-500/10 text-orange-400 rounded-full text-[10px] font-medium border border-orange-500/20">{d}</span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {currentGuest.accessibilityNeeds?.length > 0 && (
                              <div className="w-full mt-2">
                                <span className="text-xs text-zinc-500 block mb-1">Accessibility Needs</span>
                                <div className="flex flex-wrap gap-2">
                                  {currentGuest.accessibilityNeeds.map((a: string) => (
                                    <span key={a} className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-medium border border-blue-500/20">{a}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-4">
                            <div>
                              <label className="text-xs text-zinc-500 mb-1 block">Full Name</label>
                              <input type="text" value={currentGuest.fullName || ''} onChange={(e) => updateGuest(guest.id, 'fullName', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]" />
                            </div>
                            <div>
                              <label className="text-xs text-zinc-500 mb-1 block">Phone</label>
                              <input type="text" value={currentGuest.phone || ''} onChange={(e) => updateGuest(guest.id, 'phone', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]" />
                            </div>
                            <div>
                              <label className="text-xs text-zinc-500 mb-1 block">Email</label>
                              <input type="email" value={currentGuest.email || ''} onChange={(e) => updateGuest(guest.id, 'email', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]" />
                            </div>
                            <div>
                              <label className="text-xs text-zinc-500 mb-1 block">Gender</label>
                              <select value={currentGuest.gender || ''} onChange={(e) => updateGuest(guest.id, 'gender', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]">
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-xs text-zinc-500 mb-1 block">Nationality</label>
                              <input type="text" value={currentGuest.nationality || ''} onChange={(e) => updateGuest(guest.id, 'nationality', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]" />
                            </div>
                            <div>
                              <label className="text-xs text-zinc-500 mb-1 block">Date of Birth</label>
                              <input type="date" value={currentGuest.dateOfBirth ? new Date(currentGuest.dateOfBirth).toISOString().split('T')[0] : ''} onChange={(e) => updateGuest(guest.id, 'dateOfBirth', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] [color-scheme:dark]" />
                            </div>
                            <div>
                              <label className="text-xs text-zinc-500 mb-1 block">Guest Type</label>
                              <select value={currentGuest.guestType || 'Regular'} onChange={(e) => updateGuest(guest.id, 'guestType', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]">
                                <option value="Regular">Regular</option>
                                <option value="VIP">VIP</option>
                                <option value="Corporate">Corporate</option>
                                <option value="Loyalty">Loyalty</option>
                              </select>
                            </div>
                            <div className="md:col-span-2">
                              <label className="text-xs text-zinc-500 mb-1 block">Address</label>
                              <input type="text" value={currentGuest.address || ''} onChange={(e) => updateGuest(guest.id, 'address', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]" />
                            </div>
                            <div className="md:col-span-1 lg:col-span-1">
                              <label className="text-xs text-zinc-500 mb-1 block">Dietary (comma separated)</label>
                              <input type="text" value={Array.isArray(currentGuest.dietaryPreferences) ? currentGuest.dietaryPreferences.join(', ') : (currentGuest.dietaryPreferences || '')} onChange={(e) => updateGuest(guest.id, 'dietaryPreferences', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]" />
                            </div>
                            <div className="md:col-span-2 lg:col-span-2">
                              <label className="text-xs text-zinc-500 mb-1 block">Accessibility (comma separated)</label>
                              <input type="text" value={Array.isArray(currentGuest.accessibilityNeeds) ? currentGuest.accessibilityNeeds.join(', ') : (currentGuest.accessibilityNeeds || '')} onChange={(e) => updateGuest(guest.id, 'accessibilityNeeds', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]" />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* ID Info Block */}
                      <div className="bg-zinc-900 border border-white/5 rounded-xl p-4 min-w-[200px] text-right flex flex-col items-end">
                        <div className="flex items-center justify-between w-full mb-1">
                          <p className="text-xs text-zinc-500 uppercase tracking-wider">ID Document</p>
                          <label className="cursor-pointer group relative" title="Upload new document">
                            {uploadingDocForId === guest.id ? (
                              <Loader2 className="w-4 h-4 text-zinc-400 animate-spin" />
                            ) : (
                              <UploadCloud className="w-4 h-4 text-zinc-400 group-hover:text-[var(--color-primary)] transition-colors" />
                            )}
                            <input type="file" className="hidden" accept="image/*,application/pdf" disabled={uploadingDocForId === guest.id} onChange={(e) => handleDocumentReupload(e, guest.id, guest.idProofUrl)} />
                          </label>
                        </div>
                        <p className="text-sm font-medium text-white">{guest.idType || (guest.idProofUrl ? 'Uploaded' : 'Not Provided')}</p>
                        <p className="text-xs text-zinc-400 font-mono mt-1">{guest.idNumber || '---'}</p>
                        {guest.idProofUrl && (
                          <button 
                            onClick={() => handleViewDocument(guest.idProofUrl)}
                            className="text-xs text-[var(--color-primary)] hover:underline mt-2 inline-block cursor-pointer"
                            disabled={uploadingDocForId === guest.id}
                          >
                            View Document
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Add-ons and Special Requests */}
          {(booking.specialRequests || booking.babyCribRequired || (booking.addOns && booking.addOns.length > 0)) && (
            <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden">
              <div className="p-5 border-b border-[var(--color-card-border)]">
                <h2 className="text-lg font-bold text-white">Special Requests & Add-ons</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {booking.babyCribRequired && <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-bold border border-purple-500/20">Baby Crib Required</span>}
                  {booking.addOns?.map((addon: string) => (
                    <span key={addon} className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs font-bold border border-white/5">{addon}</span>
                  ))}
                </div>
                {booking.specialRequests && (
                  <p className="text-sm text-zinc-300 bg-zinc-900 p-4 rounded-xl border border-white/5">
                    {booking.specialRequests}
                  </p>
                )}
              </div>
            </div>
          )}
          
        </div>

        {/* Right Column (Financials & Plugins) */}
        <div className="space-y-6">
          
          {/* Payment Summary */}
          <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden">
            <div className="p-5 border-b border-[var(--color-card-border)] flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[var(--color-primary)]" />
              <h2 className="text-lg font-bold text-white">Payment Summary</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Room Rate ({booking.nights} nights)</span>
                <span className="text-white font-medium">{CURRENCY.SYMBOL}{(booking.roomRate * booking.nights).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Taxes & Fees</span>
                <span className="text-white font-medium">{CURRENCY.SYMBOL}{(booking.totalAmount - (booking.roomRate * booking.nights)).toFixed(2)}</span>
              </div>
              
              <div className="border-t border-[var(--color-card-border)] pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-300 font-medium">Total Amount</span>
                  <span className="text-xl font-bold text-[var(--color-primary)]">{CURRENCY.SYMBOL}{booking.totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="bg-zinc-900 rounded-xl p-4 mt-4 border border-white/5 flex justify-between items-center">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Balance Due</p>
                  <p className={`text-lg font-bold ${booking.balanceDue > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {CURRENCY.SYMBOL}{booking.balanceDue.toFixed(2)}
                  </p>
                </div>
                {booking.balanceDue > 0 && (
                  <button className="px-4 py-2 bg-[var(--color-primary)] text-black font-medium text-xs rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors">
                    Collect Payment
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Placeholders for Future Modules */}
          
          {/* Food Bills Module Placeholder */}
          <div className="bg-zinc-900/50 rounded-2xl border border-dashed border-white/20 p-6 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-zinc-900 transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-orange-500/20 transition-colors">
              <Utensils className="w-6 h-6 text-zinc-400 group-hover:text-orange-400 transition-colors" />
            </div>
            <h3 className="text-white font-medium mb-1">Food & Dining Bills</h3>
            <p className="text-xs text-zinc-500">Room service and restaurant charges</p>
            <span className="mt-4 text-xs font-bold text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity">Coming Soon</span>
          </div>

          {/* Transport Bills Module Placeholder */}
          <div className="bg-zinc-900/50 rounded-2xl border border-dashed border-white/20 p-6 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-zinc-900 transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition-colors">
              <Car className="w-6 h-6 text-zinc-400 group-hover:text-blue-400 transition-colors" />
            </div>
            <h3 className="text-white font-medium mb-1">Transport Bills</h3>
            <p className="text-xs text-zinc-500">Manage pickup, drop, and rental charges</p>
            <span className="mt-4 text-xs font-bold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">Coming Soon</span>
          </div>
          
        </div>
      </div>

      {/* Document Viewer Modal */}
      {documentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-zinc-900/50">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--color-primary)]" />
                ID Document
              </h3>
              <button 
                onClick={() => setDocumentModalOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex-1 overflow-auto flex items-center justify-center bg-black/20 min-h-[50vh]">
              {isLoadingDocument ? (
                <div className="flex flex-col items-center justify-center text-zinc-400">
                  <Loader2 className="w-8 h-8 animate-spin mb-4 text-[var(--color-primary)]" />
                  <p>Loading document securely...</p>
                </div>
              ) : documentData ? (
                documentData.startsWith('data:application/pdf') ? (
                  <object data={documentData} type="application/pdf" className="w-full h-[70vh] rounded-lg">
                    <p className="text-zinc-400 text-center mt-10">PDF plugin not available in your browser. Cannot display document.</p>
                  </object>
                ) : (
                  <img src={documentData} alt="ID Document" className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-lg" />
                )
              ) : (
                <p className="text-zinc-500">Document could not be displayed.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
