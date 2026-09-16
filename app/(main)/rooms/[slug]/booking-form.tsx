'use client';

import { useState, useEffect } from 'react';
import { Calendar, User, CreditCard, CheckCircle2, Loader2, ArrowLeft, Edit2 } from 'lucide-react';
import { CURRENCY } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { createBooking, GuestDetail, getGuestByUserId, sendBookingConfirmationEmailAction } from './booking.action';
import { sendOtp, verifyOtp } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

interface BookingFormProps {
  price: number;
  occupancy: number;
  roomTypeId: string;
  petFriendly: boolean;
  user?: any;
}

export function BookingForm({ price, occupancy, roomTypeId, petFriendly, user }: BookingFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1 State
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [guests, setGuests] = useState<number>(2);
  const [rooms, setRooms] = useState<number>(1);

  // Step 2 State - Dynamic array of guests
  const [guestsData, setGuestsData] = useState<GuestDetail[]>([]);

  const [carryChild, setCarryChild] = useState(false);
  const [childrenCount, setChildrenCount] = useState(1);
  const [babyCribRequired, setBabyCribRequired] = useState(false);
  const [havingPet, setHavingPet] = useState(false);
  const [specialRequests, setSpecialRequests] = useState('');

  // Step 3 State
  const [bookingPersonName, setBookingPersonName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.mobile || '');

  // OTP Verification State
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(!!user);
  const [verifying, setVerifying] = useState(false);

  const [bookingNumber, setBookingNumber] = useState('');

  // Constraints
  const today = new Date().toISOString().split('T')[0];
  const minCheckOut = checkIn
    ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0]
    : new Date(new Date().getTime() + 86400000).toISOString().split('T')[0];

  useEffect(() => {
    const minRoomsNeeded = Math.ceil(guests / occupancy);
    if (rooms < minRoomsNeeded) {
      setRooms(minRoomsNeeded);
    }

    // Adjust guestsData array length
    setGuestsData(prev => {
      const newData = [...prev];
      while (newData.length < guests) {
        newData.push({
          fullName: '',
          dateOfBirth: '',
          gender: '',
          nationality: '',
          idType: 'Aadhaar',
          idNumber: '',
          phone: ''
        });
      }
      return newData.slice(0, guests);
    });
  }, [guests, occupancy, rooms]);

  useEffect(() => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      if (checkOutDate <= checkInDate) {
        setCheckOut(minCheckOut);
      }
    }
  }, [checkIn, checkOut, minCheckOut]);

  // Derived calculations
  let nights = 0;
  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }
  const baseRate = price * Math.max(1, nights) * rooms;
  const gst = baseRate * 0.05;
  const total = baseRate + gst;

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkIn && checkOut && guests >= 1 && rooms >= 1) {
      setStep(2);
    }
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    // Verify all guests have required fields
    for (let i = 0; i < guestsData.length; i++) {
      const g = guestsData[i];
      if (!g.fullName || !g.gender || !g.idType || !g.idNumber) {
        setError(`Please fill all required fields for Guest ${i + 1}`);
        return;
      }
    }

    setError('');
    // Default booking person to first guest
    if (guestsData.length > 0 && !bookingPersonName) {
      setBookingPersonName(guestsData[0].fullName);
    }
    setStep(3);
  };

  const updateGuestData = (index: number, field: keyof GuestDetail, value: any) => {
    setGuestsData(prev => {
      const newData = [...prev];
      newData[index] = { ...newData[index], [field]: value };
      return newData;
    });
  };

  const handleSendOtp = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setVerifying(true);
    const res = await sendOtp(email, bookingPersonName);
    setVerifying(false);
    if (res.success) {
      setOtpSent(true);
    } else {
      setError(res.error || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      setError('Please enter a valid OTP');
      return;
    }
    setError('');
    setVerifying(true);
    const res = await verifyOtp(email, otp);
    setVerifying(false);
    if (res.success) {
      setIsVerified(true);
      window.dispatchEvent(new Event('auth-updated'));
    } else {
      setError(res.error || 'Failed to verify OTP');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingPersonName || !email) return;
    if (!isVerified) {
      setError('Please verify your email address before confirming the booking');
      return;
    }

    setLoading(true);
    setError('');

    const res = await createBooking({
      roomTypeId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guestsCount: guests,
      roomsCount: rooms,
      basePrice: price,
      guestsData,
      carryChild,
      childrenCount,
      babyCribRequired,
      havingPet,
      specialRequests,
      bookingPersonName,
      email,
      phone
    });

    setLoading(false);

    if (res.success) {
      setBookingNumber(res.bookingNumber || '');
      
      // Send confirmation email asynchronously (fire and forget)
      sendBookingConfirmationEmailAction({
        email,
        bookingNumber: res.bookingNumber || '',
        primaryGuestName: bookingPersonName,
        guestNames: guestsData.map(g => g.fullName).filter(Boolean),
        checkIn,
        checkOut,
        roomsCount: rooms,
        totalAmount: total
      });

      setStep(4);
      // Dispatch event to update navbar session state
      window.dispatchEvent(new Event('auth-updated'));
    } else {
      setError(res.error || 'Something went wrong');
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="sticky top-24 bg-cream rounded-2xl p-6 md:p-8 shadow-lg border border-border overflow-hidden relative min-h-[400px]">
      {/* Progress Indicator */}
      {step < 4 && (
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-200 -z-10" />
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${step >= s ? 'bg-gold text-white' : 'bg-gray-200 text-gray-500'}`}>
              {s === 1 ? <Calendar className="w-4 h-4" /> : s === 2 ? <User className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
            <h3 className="font-heading text-2xl font-bold text-navy mb-2">Book This Room</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Starting from <span className="text-gold-dark font-semibold">{CURRENCY.SYMBOL}{price.toFixed(2)}</span> per night
            </p>
            <form onSubmit={handleNextStep1} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Check In</label>
                <input
                  type="date"
                  min={today}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Check Out</label>
                <input
                  type="date"
                  min={minCheckOut}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Guests</label>
                  <input
                    type="number"
                    min={1}
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Rooms</label>
                  <input
                    type="number"
                    min={Math.ceil(guests / occupancy)}
                    value={rooms}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val >= Math.ceil(guests / occupancy)) setRooms(val);
                    }}
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-dark text-white py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2 mt-4"
              >
                Book Now
              </button>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col h-full max-h-[65vh]">
            <div className="flex items-center gap-2 mb-4 shrink-0">
              <button onClick={() => setStep(1)} className="text-muted-foreground hover:text-navy transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h3 className="font-heading text-xl font-bold text-navy">Guest Details</h3>
            </div>

            <form onSubmit={handleNextStep2} className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8">
              {guestsData.map((guest, index) => (
                <div key={index} className="space-y-4 p-4 bg-white rounded-xl border border-border">
                  <h4 className="font-bold text-navy text-sm border-b border-border pb-2">Guest {index + 1}</h4>

                  {index === 0 && user && (
                    <div className="p-3 bg-navy/5 rounded-lg border border-navy/10 flex items-center justify-between mt-2">
                      <span className="text-sm font-medium text-navy">Are you the primary guest?</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={!!guest.isPrimary}
                          onChange={async (e) => {
                            const isPrimary = e.target.checked;
                            if (isPrimary) {
                              setGuestsData(prev => {
                                const newData = [...prev];
                                newData[0] = {
                                  ...newData[0],
                                  isPrimary: true,
                                  fullName: user.name || newData[0].fullName,
                                  phone: user.mobile || newData[0].phone
                                };
                                return newData;
                              });

                              const currentUserId = user.id || user.userId;
                              if (currentUserId) {
                                try {
                                  const userIdNum = typeof currentUserId === 'string' ? parseInt(currentUserId, 10) : currentUserId;
                                  const existingGuest = await getGuestByUserId(userIdNum);
                                  if (existingGuest) {
                                    setGuestsData(prev => {
                                      const newData = [...prev];
                                      newData[0] = {
                                        ...newData[0],
                                        ...existingGuest,
                                        isPrimary: true
                                      };
                                      return newData;
                                    });
                                  }
                                } catch (err) {
                                  console.error("Failed to fetch primary guest data", err);
                                }
                              }
                            } else {
                              updateGuestData(0, 'isPrimary', false);
                            }
                          }}
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gold"></div>
                      </label>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={guest.fullName}
                        onChange={e => updateGuestData(index, 'fullName', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Date of Birth</label>
                      <input
                        type="date"
                        max={today}
                        value={guest.dateOfBirth}
                        onChange={e => updateGuestData(index, 'dateOfBirth', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Gender *</label>
                      <select
                        required
                        value={guest.gender}
                        onChange={e => updateGuestData(index, 'gender', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Nationality</label>
                      <input
                        type="text"
                        value={guest.nationality}
                        onChange={e => updateGuestData(index, 'nationality', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                        placeholder="e.g. Indian"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">ID Type *</label>
                      <select
                        required
                        value={guest.idType}
                        onChange={e => updateGuestData(index, 'idType', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                      >
                        <option value="Aadhaar">Aadhaar</option>
                        <option value="PAN">PAN</option>
                        <option value="Passport">Passport</option>
                        <option value="DrivingLicense">Driving License</option>
                        <option value="VoterID">Voter ID</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">ID Number *</label>
                      <input
                        type="text"
                        required
                        value={guest.idNumber}
                        onChange={e => updateGuestData(index, 'idNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block text-sm font-medium text-navy mb-1.5">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={guest.phone || ''}
                      onChange={e => updateGuestData(index, 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                      placeholder="Guest contact"
                    />
                  </div>
                </div>
              ))}

              <div className="space-y-2 pt-4 border-t border-border shrink-0 pb-4">
                <label className="flex items-center gap-2 text-sm text-navy cursor-pointer">
                  <input type="checkbox" checked={carryChild} onChange={e => setCarryChild(e.target.checked)} className="rounded border-gray-300 text-gold focus:ring-gold/40" />
                  Carrying children
                </label>
                {carryChild && (
                  <div className="ml-6 space-y-3 mt-2">
                    <p className="text-xs text-muted-foreground italic">
                      *Only children aged 5 or under are allowed without additional booking.
                    </p>
                    <div className="flex items-center gap-3">
                      <label className="text-sm font-medium text-navy">Number of kids:</label>
                      <input
                        type="number"
                        min={1}
                        value={childrenCount}
                        onChange={e => setChildrenCount(parseInt(e.target.value) || 1)}
                        className="w-20 px-2 py-1.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                      />
                    </div>
                    <label className="flex items-center gap-2 text-sm text-navy cursor-pointer">
                      <input type="checkbox" checked={babyCribRequired} onChange={e => setBabyCribRequired(e.target.checked)} className="rounded border-gray-300 text-gold focus:ring-gold/40" />
                      Baby crib required
                    </label>
                  </div>
                )}
                {petFriendly && (
                  <label className="flex items-center gap-2 text-sm text-navy cursor-pointer">
                    <input type="checkbox" checked={havingPet} onChange={e => setHavingPet(e.target.checked)} className="rounded border-gray-300 text-gold focus:ring-gold/40" />
                    Bringing a pet
                  </label>
                )}

                <div className="mt-4 pt-2">
                  <label className="block text-sm font-medium text-navy mb-1.5">Special Requests (Optional)</label>
                  <textarea rows={2} value={specialRequests} onChange={e => setSpecialRequests(e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm" placeholder="Any specific needs..." />
                </div>
              </div>

              <div className="sticky bottom-0 bg-cream pt-2 shrink-0 pb-4">
                <button type="submit" className="w-full bg-gold hover:bg-gold-dark text-white py-3 rounded-full font-medium transition-colors shadow-lg">
                  Make Payment
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col h-full max-h-[65vh]">
            <div className="flex items-center gap-2 mb-4 shrink-0">
              <button onClick={() => setStep(2)} className="text-muted-foreground hover:text-navy transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h3 className="font-heading text-xl font-bold text-navy">Payment Details</h3>
            </div>
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 pb-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Booking Person Name *</label>
                <input type="text" required value={bookingPersonName} onChange={e => setBookingPersonName(e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-navy">Email Address *</label>
                  {(otpSent || isVerified) && (
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setIsVerified(false);
                        setOtp('');
                      }}
                      className="text-xs text-gold hover:text-gold-dark flex items-center gap-1 font-medium"
                    >
                      <Edit2 className="w-3 h-3" /> Edit
                    </button>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      setIsVerified(false);
                      setOtpSent(false);
                    }}
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm disabled:opacity-70 disabled:bg-gray-50"
                    placeholder="Enter your email"
                    disabled={otpSent || isVerified}
                  />
                  {!otpSent && !isVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={verifying || !email.includes('@')}
                      className="px-4 py-2 bg-navy text-white rounded-lg text-sm font-medium disabled:opacity-50 whitespace-nowrap"
                    >
                      {verifying && !otpSent ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Get OTP'}
                    </button>
                  )}
                  {isVerified && (
                    <div className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-medium flex items-center gap-1 border border-green-200">
                      <CheckCircle2 className="w-4 h-4" /> Verified
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">An account will be created if this is your first time.</p>
              </div>

              {otpSent && !isVerified && (
                <div className="bg-navy/5 p-4 rounded-lg border border-navy/10">
                  <label className="block text-sm font-medium text-navy mb-1.5">Enter OTP</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={otp}
                      onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      className="w-full px-3 py-2.5 border border-border rounded-lg text-sm text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-navy/40"
                      placeholder="••••"
                      maxLength={4}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={verifying || otp.length < 4}
                      className="px-6 py-2 bg-gold hover:bg-gold-dark text-white rounded-lg text-sm font-medium disabled:opacity-50"
                    >
                      {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify'}
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Phone Number (Optional)</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm" placeholder="10 digit mobile" />
              </div>

              <div className="bg-white p-4 rounded-xl border border-border mb-4">
                <h4 className="text-sm font-bold text-navy mb-3">Payment Method</h4>
                <div className="flex items-center justify-between p-3 border border-gold/30 bg-gold/5 rounded-lg">
                  <span className="text-sm font-medium text-gold-dark">Pay at Hotel</span>
                  <CheckCircle2 className="w-5 h-5 text-gold-dark" />
                </div>
              </div>

              <div className="bg-navy p-4 rounded-xl text-white">
                <h4 className="text-sm font-bold mb-3 border-b border-white/10 pb-2">Price Breakdown</h4>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex justify-between">
                    <span>{rooms} Room(s) x {nights} Night(s)</span>
                    <span>{CURRENCY.SYMBOL}{baseRate.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span>{CURRENCY.SYMBOL}{gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-white pt-2 border-t border-white/10 mt-2">
                    <span>Total</span>
                    <span>{CURRENCY.SYMBOL}{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !isVerified}
                className="w-full bg-gold hover:bg-gold-dark disabled:bg-gray-300 disabled:text-gray-500 text-white py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2 mt-4"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Booking'}
              </button>
            </form>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-navy mb-2">Booking Confirmed!</h3>
            <p className="text-muted-foreground mb-6">
              Your reservation has been successfully placed.
            </p>
            <div className="bg-white p-4 rounded-xl border border-border inline-block text-left mb-6">
              <p className="text-sm text-muted-foreground mb-1">Booking Reference ID:</p>
              <p className="font-mono text-lg font-bold text-navy">{bookingNumber}</p>
            </div>
            <p className="text-sm text-navy/70">
              You are now signed in. We look forward to hosting you!
            </p>

            <button
              onClick={() => router.push('/')}
              className="mt-8 px-6 py-2.5 bg-navy hover:bg-navy-dark text-white rounded-full font-medium transition-colors mx-auto block"
            >
              Return to Home
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
