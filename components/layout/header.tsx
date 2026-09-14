'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Phone, Mail, Calendar, CalendarDays, User } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';

import { getCurrentUser, logout } from '@/app/actions/auth';
import { LoginModal } from '@/components/auth/login-modal';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    
    const fetchUser = () => {
      getCurrentUser().then(sessionUser => {
        if (sessionUser) setUser(sessionUser);
      });
    };

    fetchUser();
    
    window.addEventListener('auth-updated', fetchUser);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('auth-updated', fetchUser);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const handleWelcomeClick = () => {
    if (user && ['ADMIN', 'SUPERADMIN'].includes(user.role)) {
      router.push('/admin');
      if (mobileOpen) setMobileOpen(false);
    }
  };

  const isHome = pathname === '/';
  const transparent = isHome && !scrolled && !mobileOpen;

  return (
    <>
      <div
        className={cn(
          'hidden lg:block transition-all duration-300 w-full z-50',
          isHome ? 'fixed top-0' : '',
          scrolled && isHome ? '-translate-y-full' : 'translate-y-0',
          transparent ? 'bg-transparent' : 'bg-navy-dark'
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between py-2 text-xs text-white/70">
          <div className="flex items-center gap-6">
            <a href="tel:+8801701111000" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Phone className="w-3 h-3" />
              +880 170 1111 000
            </a>
            <a href="mailto:info@example.com" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Mail className="w-3 h-3" />
              info@example.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>Manduadih, Industrial estate road, Shivdaspur, Varanasi</span>
          </div>
        </div>
      </div>

      <header
        className={cn(
          'z-50 transition-all duration-300',
          isHome ? 'fixed w-full' : 'sticky top-0 w-full',
          isHome && !scrolled ? 'top-0 lg:top-[32px]' : 'top-0',
          transparent ? 'bg-transparent py-4' : 'bg-white shadow-md py-2'
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {/* <span
              className={cn(
                'font-heading text-2xl font-bold tracking-tight transition-colors',
                transparent ? 'text-white' : 'text-navy'
              )}
            >
              Hotel Samrat
            </span>
            <span className={cn('text-xs font-body tracking-widest uppercase transition-colors', transparent ? 'text-gold' : 'text-gold-dark')}>
              Sheraton
            </span> */}
            <Image src="/images/sslogo.png" alt="Logo" width={200} height={200} />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-body text-sm font-medium tracking-wide transition-colors relative group',
                  transparent ? 'text-white/90 hover:text-gold' : 'text-navy hover:text-gold-dark',
                  pathname === link.href && (transparent ? 'text-gold' : 'text-gold-dark')
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300',
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            ))}
            {user?.role === 'GUEST' && (
              <Link
                href="/account/bookings"
                className={cn(
                  'font-body text-sm font-medium tracking-wide transition-colors relative group',
                  transparent ? 'text-white/90 hover:text-gold' : 'text-navy hover:text-gold-dark',
                  pathname.startsWith('/account') && (transparent ? 'text-gold' : 'text-gold-dark')
                )}
              >
                Account
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300',
                    pathname.startsWith('/account') ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <span 
                  onClick={handleWelcomeClick}
                  className={cn("text-sm font-medium transition-opacity", transparent ? "text-white" : "text-navy", ['ADMIN', 'SUPERADMIN'].includes(user?.role) && "cursor-pointer hover:opacity-80")}
                >
                  Welcome {user.name || user.mobile}
                </span>
                <button
                  onClick={handleLogout}
                  className={cn(
                    'hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border',
                    transparent ? 'border-white/20 text-white hover:bg-white/10' : 'border-border text-navy hover:bg-muted'
                  )}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className={cn(
                  'hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors border',
                  transparent ? 'border-white text-white hover:bg-white hover:text-navy' : 'border-navy text-navy hover:bg-navy hover:text-white'
                )}
              >
                <User className="w-4 h-4" />
                Login
              </button>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn('lg:hidden p-2', transparent ? 'text-white' : 'text-navy')}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-border mt-2">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'py-3 px-4 rounded-lg font-body text-sm font-medium transition-colors',
                    pathname === link.href ? 'bg-gold/10 text-gold-dark' : 'text-navy hover:bg-muted'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              {user?.role === 'GUEST' && (
                <Link
                  href="/account/bookings"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'py-3 px-4 rounded-lg font-body text-sm font-medium transition-colors',
                    pathname.startsWith('/account') ? 'bg-gold/10 text-gold-dark' : 'text-navy hover:bg-muted'
                  )}
                >
                  Account
                </Link>
              )}
              <div className="mt-2 flex flex-col gap-2">
                {user ? (
                  <>
                    <div 
                      onClick={handleWelcomeClick}
                      className={cn("py-3 px-4 text-sm font-medium text-navy transition-colors", ['ADMIN', 'SUPERADMIN'].includes(user?.role) && "cursor-pointer hover:bg-muted")}
                    >
                      Welcome {user.name || user.mobile}
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 border border-border text-navy hover:bg-muted px-5 py-3 rounded-full text-sm font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setLoginOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 border border-navy text-navy hover:bg-navy hover:text-white px-5 py-3 rounded-full text-sm font-medium transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Login
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} onLoginSuccess={(u) => setUser(u)} />}
    </>
  );
}

function BookingModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 animate-fade-in" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-8 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading text-2xl font-bold text-navy">Book Your Stay</h3>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Check In</label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="date" className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Check Out</label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="date" className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Room Type</label>
            <select className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 bg-white">
              <option>Double Room</option>
              <option>Family Room</option>
              <option>Deluxe Room</option>
              <option>Superior Room</option>
              <option>Luxury Room</option>
              <option>Standard Room</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Guests</label>
              <input type="number" min={1} defaultValue={2} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Rooms</label>
              <input type="number" min={1} defaultValue={1} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gold hover:bg-gold-dark text-white py-3 rounded-full font-medium transition-colors"
          >
            Check Availability
          </button>
        </form>
      </div>
    </div>
  );
}
