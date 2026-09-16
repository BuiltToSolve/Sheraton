import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { NewsletterForm } from './newsletter-form';

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Image src="/images/sslogoRevert.png" alt="Hotel Samrat Sheraton Logo" width={250} height={250} className="h-[120px] w-auto" />
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Step into a world of timeless elegance and bespoke hospitality, where every detail is meticulously crafted for your absolute indulgence.
Discover an oasis of refined comfort and unparalleled luxury, designed to make your stay truly unforgettable.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: 'https://www.facebook.com/hotelsamratsheraton/', label: 'Facebook' },
                { Icon: Instagram, href: 'https://www.instagram.com/p/DdS419NzT0H/?stkn=Yng5bDhjdjJoMGk=', label: 'Instagram' },
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold flex items-center justify-center transition-colors"
                  aria-label={label}
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
                  <p>+91 91518 43351</p>
                  <p>+91 91518 43352</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold mt-1 shrink-0" />
                <div className="text-sm text-white/60">
                  <p>info@hotelsamratsheraton.com</p>
                  <p>support@hotelsamratsheraton.com</p>
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
              Subscribe to our newsletter for exclusive offers and updates about Hotel Samrat Sheraton.
            </p>
            <NewsletterForm />

          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            Copyright 2026 Hotel Samrat Sheraton | Design By Teja Enterprises
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
