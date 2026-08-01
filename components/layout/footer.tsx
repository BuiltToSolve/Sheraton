import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import { navLinks } from '@/lib/data';

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="font-heading text-2xl font-bold text-white">Samrat</span>
              <span className="text-xs font-body tracking-widest uppercase text-gold">Sheraton</span>
            </div>
            <h4 className="font-heading text-lg font-semibold mb-3 text-gold-light">About Samrat</h4>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Hotel ut nisl quam nestibulum ac quam nec odio elementum oneni sceisuen the aucan ligula. Orci varius natoque penatibus et magnis dis parturient.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold flex items-center justify-center transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-5 text-gold-light">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-gold transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-px bg-gold transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-5 text-gold-light">Contacts</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold mt-1 shrink-0" />
                <div className="text-sm text-white/60">
                  <p>+880 170 1111 000</p>
                  <p>+880 170 1111 000</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold mt-1 shrink-0" />
                <div className="text-sm text-white/60">
                  <p>info@example.com</p>
                  <p>info@support.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-1 shrink-0" />
                <div className="text-sm text-white/60">
                  <p>Manduadih, Industrial estate road</p>
                  <p>Shivdaspur, Varanasi</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-5 text-gold-light">Newsletter</h4>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              Subscribe to our newsletter for exclusive offers and updates about Samrat Sheraton.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-full text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/40"
              />
              <button
                type="button"
                className="w-11 h-11 shrink-0 bg-gold hover:bg-gold-dark rounded-full flex items-center justify-center transition-colors"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            Copyright 2024 Samrat | Design By Egens Lab
          </p>
          <div className="flex items-center gap-3">
            {['Visa', 'Mastercard', 'Amazon Pay', 'PayPal'].map((p) => (
              <span key={p} className="text-xs text-white/40 bg-white/5 px-3 py-1.5 rounded">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
