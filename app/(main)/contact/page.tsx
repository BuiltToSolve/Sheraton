'use client';

import { useState } from 'react';
import { PageHero } from '@/components/page-hero';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactInfo = [
    { icon: Phone, label: 'Call Us', value: '+91 87654 64513', sub: '' },
    { icon: Mail, label: 'Email Us', value: 'info@example.com', sub: 'info@support.com' },
    { icon: MapPin, label: 'Visit Us', value: 'Manduadih, Industrial estate road', sub: 'Shivdaspur, Varanasi' },
    { icon: Clock, label: 'Open Hours', value: 'Mon - Fri: 9am - 6pm', sub: 'Sat - Sun: 10am - 4pm' },
  ];

  return (
    <>
      <PageHero
        title="Contact Us"
        breadcrumb="Contact"
        image="https://images.pexels.com/photos/7821349/pexels-photo-7821349.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, i) => (
              <div
                key={i}
                className="group bg-cream rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-border"
              >
                <div className="w-14 h-14 rounded-full bg-gold/20 group-hover:bg-gold flex items-center justify-center mx-auto mb-4 transition-colors">
                  <item.icon className="w-6 h-6 text-gold-dark group-hover:text-white transition-colors" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-sm font-medium text-navy">{item.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-gold" />
                <span className="text-xs font-body uppercase tracking-[0.2em] text-gold-dark font-medium">
                  Get In Touch
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-6">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Have a question or special request? Fill out the form below and our team will get back to you within 24 hours. We are here to make your stay unforgettable.
              </p>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=90.36,23.78,90.44,23.84&layer=mapnik"
                  className="w-full h-[300px] border-0"
                  title="Hotel location"
                />
              </div>
            </div>

            <div className="bg-cream rounded-2xl p-8 shadow-lg border border-border">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                  <CheckCircle2 className="w-16 h-16 text-gold mb-4" />
                  <h3 className="font-heading text-2xl font-bold text-navy mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">Thank you for reaching out. We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-heading text-2xl font-bold text-navy mb-2">Contact Form</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">First Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Last Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                      placeholder="+1 234 567 890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Subject</label>
                    <select className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40">
                      <option>General Inquiry</option>
                      <option>Room Reservation</option>
                      <option>Event Booking</option>
                      <option>Feedback</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Message</label>
                    <textarea
                      rows={4}
                      required
                      className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-dark text-white py-3.5 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
