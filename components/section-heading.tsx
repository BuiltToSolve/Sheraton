import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <div className={cn('flex items-center gap-3 mb-3', align === 'center' && 'justify-center')}>
          <span className="h-px w-8 bg-gold" />
          <span className="text-xs font-body uppercase tracking-[0.2em] text-gold-dark font-medium">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-gold" />
        </div>
      )}
      <h2
        className={cn(
          'font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight',
          light ? 'text-white' : 'text-navy'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-4 text-base leading-relaxed', light ? 'text-white/70' : 'text-muted-foreground')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
