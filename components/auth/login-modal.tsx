'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { sendOtp, verifyOtp, updateProfile, getCurrentUser } from '@/app/actions/auth';

export function LoginModal({ onClose, onLoginSuccess }: { onClose: () => void, onLoginSuccess: (user: any) => void }) {
  const router = useRouter();
  const [step, setStep] = useState<'mobile' | 'otp' | 'profile'>('mobile');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [secondaryId, setSecondaryId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isEmailLogin = identifier.includes('@');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (identifier.length >= 3) {
      setIsLoading(true);
      const res = await sendOtp(identifier);
      setIsLoading(false);
      if (res.success) {
        setStep('otp');
      } else {
        setError(res.error || 'Failed to send OTP');
      }
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const res = await verifyOtp(identifier, otp);
    setIsLoading(false);
    if (res.success) {
      if (res.isNewUser) {
        setStep('profile');
      } else {
        const user = await getCurrentUser();
        onLoginSuccess(user);
        onClose();
        const adminRoles = ['SUPERADMIN', 'ADMIN'];
        if (user?.role && adminRoles.includes(user.role)) {
          router.push('/admin');
        }
      }
    } else {
      setError(res.error || 'Invalid OTP');
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const finalName = name.trim() || identifier;
    const emailToSave = isEmailLogin ? undefined : secondaryId;
    const mobileToSave = isEmailLogin ? secondaryId : undefined;
    const res = await updateProfile(finalName, emailToSave, mobileToSave);
    
    setIsLoading(false);
    if (res.success) {
      const user = await getCurrentUser();
      onLoginSuccess(user);
      onClose();
    } else {
      setError(res.error || 'Failed to update profile');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 animate-fade-in" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-md w-full p-8 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading text-2xl font-bold text-navy">
            {step === 'mobile' && 'Welcome Back'}
            {step === 'otp' && 'Verify OTP'}
            {step === 'profile' && 'Complete Profile'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {step === 'mobile' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Email or Mobile Number</label>
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Enter email or 10-digit number" 
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={identifier.length < 3 || isLoading}
              className="w-full bg-navy hover:bg-navy-dark text-white py-3 rounded-full font-medium transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Get OTP'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              We've sent an OTP to <span className="font-medium text-navy">{isEmailLogin ? identifier : `+91 ${identifier}`}</span>
              <button 
                type="button" 
                onClick={() => setStep('mobile')}
                className="ml-2 text-gold hover:text-gold-dark font-medium underline"
              >
                Edit
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Enter OTP</label>
              <input 
                type="text" 
                placeholder="••••" 
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 text-center tracking-widest text-lg"
                required
              />
            </div>
            
            <div className="flex items-center justify-center mt-2">
              <p className="text-sm text-muted-foreground">
                Didn't receive code? <button type="button" onClick={handleSendOtp} className="text-gold hover:text-gold-dark font-medium transition-colors ml-1">Resend</button>
              </p>
            </div>
            
            <button
              type="submit"
              disabled={otp.length < 4 || isLoading}
              className="w-full bg-navy hover:bg-navy-dark text-white py-3 rounded-full font-medium transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Verify & Login'}
            </button>
          </form>
        )}

        {step === 'profile' && (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Please complete your profile to continue.
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">
                {isEmailLogin ? 'Mobile Number (Optional)' : 'Email Address (Optional)'}
              </label>
              <input 
                type={isEmailLogin ? "tel" : "email"} 
                placeholder={isEmailLogin ? "Enter your mobile number" : "Enter your email"} 
                value={secondaryId}
                onChange={(e) => setSecondaryId(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold hover:bg-gold-dark text-white py-3 rounded-full font-medium transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save & Continue'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
