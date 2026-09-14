import { ChevronDown } from 'lucide-react';

export function SingleHero() {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/banner2.png"
          alt="Luxury Redefined"
          className="w-full h-full object-cover md:hidden"
        />
        <img
          src="/images/banner1.png"
          alt="Luxury Redefined"
          className="w-full h-full object-cover hidden md:block"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="animate-fade-up">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-gold" />
            <span className="text-sm font-body uppercase tracking-[0.3em] text-gold font-medium">
              Welcome To
            </span>
            <span className="h-px w-10 bg-gold" />
          </div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            Luxury Redefined
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
            Discover the epitome of luxury and comfort at Samrat Sheraton, where every moment is crafted for an unforgettable experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/rooms"
              className="bg-gold hover:bg-gold-dark text-white px-8 py-3.5 rounded-full font-medium text-sm tracking-wide transition-all hover:shadow-xl hover:scale-105"
            >
              Book Your Stay
            </a>
            <a
              href="/about"
              className="border border-white/40 hover:border-gold hover:text-gold text-white px-8 py-3.5 rounded-full font-medium text-sm tracking-wide transition-all"
            >
              Discover More
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-white/50 uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 text-gold" />
      </div>
    </section>
  );
}
