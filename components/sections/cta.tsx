import { Phone, Mail, MapPin, Clock, Send, Hotel } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="images/banner1.png"
          alt="Hotel exterior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-dark/85" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold" />
            <span className="text-xs font-body uppercase tracking-[0.2em] text-gold font-medium">
              Get In Touch
            </span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Ready to Experience Luxury?
          </h2>
          <p className="text-white/70 mb-10 leading-relaxed max-w-xl mx-auto">
            Book your stay at Samrat Sheraton today and immerse yourself in a world of elegance, comfort, and unparalleled hospitality.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Phone, label: 'Call Us', value: '+91 91518 43351' },
              { icon: Mail, label: 'Email Us', value: 'info@hotelsamratsheraton.com' },
              { icon: MapPin, label: 'Visit Us', value: 'Manduadih, Industrial estate road, Shivdaspur, Varanasi' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mb-2">
                  <item.icon className="w-5 h-5 text-gold" />
                </div>
                <p className="text-xs text-white/50 uppercase tracking-wider">{item.label}</p>
                <p className="text-sm text-white font-medium">{item.value}</p>
              </div>
            ))}
          </div>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white px-8 py-3.5 rounded-full font-medium text-sm transition-colors"
          >
            <Send className="w-4 h-4" />
            Contact Us Now
          </a>
        </div>
      </div>
    </section>
  );
}
