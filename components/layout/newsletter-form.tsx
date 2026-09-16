'use client';

import { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { subscribeToNewsletter } from '@/app/actions/newsletter';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    const result = await subscribeToNewsletter(email);
    
    if (result.success) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
    }
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status !== 'idle') setStatus('idle');
        }}
        required
        disabled={status === 'loading' || status === 'success'}
        className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-full text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/40 disabled:opacity-70"
      />
      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="w-11 h-11 shrink-0 bg-gold hover:bg-gold-dark rounded-full flex items-center justify-center transition-colors disabled:opacity-70 disabled:hover:bg-gold"
        aria-label="Subscribe"
      >
        {status === 'success' ? (
          <Check className="w-4 h-4 text-white" />
        ) : (
          <Send className="w-4 h-4 text-white" />
        )}
      </button>
    </form>
  );
}
