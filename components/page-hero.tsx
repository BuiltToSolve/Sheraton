import { cn } from '@/lib/utils';

interface PageHeroProps {
  title: string;
  breadcrumb: string;
  image: string;
}

export function PageHero({ title, breadcrumb, image }: PageHeroProps) {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-dark/70" />
      </div>
      <div className="relative z-10 text-center px-4 animate-fade-up">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-8 bg-gold" />
          <span className="text-xs font-body uppercase tracking-[0.2em] text-gold font-medium">
            Samrat Sheraton
          </span>
          <span className="h-px w-8 bg-gold" />
        </div>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          {title}
        </h1>
        <nav className="flex items-center justify-center gap-2 text-sm text-white/70">
          <span>Home</span>
          <span className="text-gold">/</span>
          <span className="text-gold">{breadcrumb}</span>
        </nav>
      </div>
    </section>
  );
}
