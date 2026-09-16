'use client';

import { useState, useTransition } from 'react';
import { PageHero } from '@/components/page-hero';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { saveContactMessage } from "./actions";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[0-9\s\-()]{7,15}$/, "Invalid phone number").optional().or(z.literal("")),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "General Inquiry",
      message: "",
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    startTransition(async () => {
      const result = await saveContactMessage(data);
      if (result.success) {
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        console.error("Failed to send message:", result.error);
      }
    });
  };

  const contactInfo = [
    { icon: Phone, label: 'Call Us', value: '+91 91518 43351', sub: '+91 91518 43352' },
    { icon: Mail, label: 'Email Us', value: 'info@hotelsamratsheraton.com', sub: 'support@hotelsamratsheraton.com' },
    { icon: MapPin, label: 'Visit Us', value: 'Manduadih, Industrial estate road', sub: 'Shivdaspur, Varanasi' },
    { icon: Clock, label: 'Open Hours', value: '24x7', sub: '' },
  ];

  return (
    <>
      <PageHero
        title="Contact Us"
        breadcrumb="Contact"
        image="images/reception.jpeg"
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
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3607.0632306629363!2d82.96266587538524!3d25.302079577643575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDE4JzA3LjUiTiA4MsKwNTcnNTQuOSJF!5e0!3m2!1sen!2sin!4v1789554073664!5m2!1sen!2sin"
                  className="w-full h-[500px] border-0"
                  title="Hotel location"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
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
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h3 className="font-heading text-2xl font-bold text-navy mb-2">Contact Form</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">First Name</label>
                      <input
                        {...register("firstName")}
                        className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Last Name</label>
                      <input
                        {...register("lastName")}
                        className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
                    <input
                      {...register("email")}
                      className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Phone</label>
                    <input
                      {...register("phone")}
                      className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40"
                      placeholder="Enter your phone number"
                      maxLength={10}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Subject</label>
                    <select {...register("subject")} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40">
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Room Reservation">Room Reservation</option>
                      <option value="Event Booking">Event Booking</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Message</label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 resize-none"
                      placeholder="Your message..."
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-gold hover:bg-gold-dark text-white py-3.5 rounded-full font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {isPending ? 'Sending...' : 'Send Message'}
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
