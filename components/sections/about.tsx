'use client';

import { useState } from 'react';
import { SectionHeading } from '@/components/section-heading';
import { Quote, Volume2, VolumeX } from 'lucide-react';

export function About() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="py-20 lg:py-28 bg-cream section-pattern">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <video
                src="/images/samrat hotel teaser reel.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-[600px] lg:h-[600px] object-cover"
              />
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-70 group-hover:opacity-100 shadow-lg"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
            {/* <div className="absolute -bottom-6 -right-6 bg-gold rounded-2xl p-6 shadow-xl hidden md:block">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-white fill-white" />
                <div>
                  <p className="font-heading text-3xl font-bold text-white">5.0</p>
                  <p className="text-xs text-white/80 uppercase tracking-wider">Rating</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -left-6 bg-navy rounded-2xl p-6 shadow-xl hidden md:block">
              <p className="font-heading text-4xl font-bold text-gold">25+</p>
              <p className="text-xs text-white/80 uppercase tracking-wider mt-1">Years of Excellence</p>
            </div> */}
          </div>

          <div>
            <SectionHeading
              eyebrow="Welcome to Hotel Samrat Sheraton"
              title="The Best Hotel For Accommodation"
              align="left"
            />
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Welcome to Hotel Samrat Sheraton, a comfortable hotel located in the spiritual and historic city of Varanasi, India.
                We offer luxurious and thoughtfully designed stay options to make every visit relaxing and memorable.
                Our dedicated team is committed to providing warm hospitality and attentive service throughout your stay.
              </p>
              <p>
                Guests can enjoy convenient facilities including transport services, secure lockers, an in-house restaurant, and car parking.
                Whether you are visiting Varanasi for pilgrimage, leisure, or business, we provide a welcoming base to explore the city.
                At Hotel Samrat Sheraton, we bring together comfort, convenience, and genuine Indian hospitality for an enjoyable stay.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center">
                  <Quote className="w-6 h-6 text-gold-dark" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-navy">Team</p>
                  <p className="text-sm text-muted-foreground">Hotel Samrat Sheraton</p>
                </div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="flex gap-6">
                <div>
                  <p className="font-heading text-2xl font-bold text-navy">20+</p>
                  <p className="text-xs text-muted-foreground">Luxury Rooms</p>
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold text-navy">50+</p>
                  <p className="text-xs text-muted-foreground">Amenities</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href="/about"
                className="bg-navy hover:bg-navy-light text-white px-7 py-3 rounded-full font-medium text-sm transition-colors"
              >
                About Us
              </a>
              <a
                href="/contact"
                className="border border-navy/20 hover:border-gold hover:text-gold-dark text-navy px-7 py-3 rounded-full font-medium text-sm transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
