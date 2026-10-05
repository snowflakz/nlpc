import { imageSrcSet } from '@/lib/responsive-images';
import { cn } from '@/lib/utils';

type HeroVariant = 'full-bleed' | 'split' | 'centered' | 'overlay';

type CTAButton = {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: React.ReactNode;
  external?: boolean;
};

type HeroProps = {
  variant?: HeroVariant;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: {
    url: string;
    alt: string;
  };
  ctas?: CTAButton[];
  textPosition?: 'left' | 'center' | 'right';
  className?: string;
};

export function Hero({
  variant = 'full-bleed',
  eyebrow,
  title,
  subtitle,
  image,
  ctas = [],
  textPosition = 'left',
  className,
}: HeroProps) {
  if (variant === 'full-bleed') {
    return (
      <section
        className={cn(
          'home-hero relative min-h-[70vh] flex items-end overflow-hidden pt-24',
          className
        )}
      >
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img fetchPriority="high"             src={image.url} srcSet={imageSrcSet(image.url)}
            alt={image.alt}
            className="hero-photo absolute inset-0 h-full w-full object-cover"
            sizes="100vw"
          />
        )}
        <div aria-hidden="true" className="hero-atmosphere"><span /><span /><svg viewBox="0 0 600 400" fill="none"><path d="M-40 290 C120 80 180 440 360 210 S620 20 660 160" /><path d="M-40 315 C120 105 180 465 360 235 S620 45 660 185" /></svg></div>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/75 to-foreground/55" />

        <div className="relative z-10 mx-auto max-w-8xl w-full px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
          <div
            className={cn(
              'hero-copy max-w-2xl',
              textPosition === 'center' && 'mx-auto text-center',
              textPosition === 'right' && 'ml-auto text-right'
            )}
          >
            {eyebrow && (
              <p className="mb-4 text-xs font-600 uppercase tracking-widest text-background/90 animate-fade-in">
                {eyebrow}
              </p>
            )}
            <h1 className="font-display text-4xl font-500 leading-[1.1] text-background sm:text-5xl lg:text-6xl text-balance animate-fade-up">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-6 text-lg text-background/90 max-w-xl leading-relaxed text-pretty animate-fade-up">
                {subtitle}
              </p>
            )}
            {ctas.length > 0 && (
              <div
                className={cn(
                  'hero-actions mt-8 flex flex-wrap gap-3',
                  textPosition === 'center' && 'justify-center'
                )}
              >
                {ctas.map((cta, i) => (
                  <CTA key={i} {...cta} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'overlay') {
    return (
      <section
        className={cn(
          'relative min-h-[60vh] flex items-center overflow-hidden',
          className
        )}
      >
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img fetchPriority="high"             src={image.url} srcSet={imageSrcSet(image.url)}
            alt={image.alt}
            className="absolute inset-0 h-full w-full object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-foreground/55" />

        <div className="relative z-10 mx-auto max-w-8xl w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div
            className={cn(
              'max-w-2xl',
              textPosition === 'center' && 'mx-auto text-center',
              textPosition === 'right' && 'ml-auto text-right'
            )}
          >
            {eyebrow && (
              <p className="mb-4 text-xs font-600 uppercase tracking-widest text-background/70">
                {eyebrow}
              </p>
            )}
            <h1 className="font-display text-4xl font-500 leading-[1.1] text-background sm:text-5xl lg:text-6xl text-balance">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-6 text-lg text-background/90 max-w-xl leading-relaxed text-pretty">
                {subtitle}
              </p>
            )}
            {ctas.length > 0 && (
              <div
                className={cn(
                  'mt-8 flex flex-wrap gap-3',
                  textPosition === 'center' && 'justify-center'
                )}
              >
                {ctas.map((cta, i) => (
                  <CTA key={i} {...cta} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'split') {
    return (
      <section className={cn('pt-24 lg:pt-28', className)}>
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[60vh]">
            <div className="lg:col-span-7 order-2 lg:order-1">
              {eyebrow && (
                <p className="mb-4 text-xs font-600 uppercase tracking-widest text-primary">
                  {eyebrow}
                </p>
              )}
              <h1 className="font-display text-4xl font-500 leading-[1.1] text-foreground sm:text-5xl lg:text-6xl text-balance">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed text-pretty">
                  {subtitle}
                </p>
              )}
              {ctas.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {ctas.map((cta, i) => (
                    <CTA key={i} {...cta} />
                  ))}
                </div>
              )}
            </div>
            {image && (
              <div className="lg:col-span-5 order-1 lg:order-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img fetchPriority="high"                     src={image.url} srcSet={imageSrcSet(image.url)}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // centered variant
  return (
    <section className={cn('pt-24 lg:pt-32 pb-12 lg:pb-16', className)}>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {eyebrow && (
            <p className="mb-4 text-xs font-600 uppercase tracking-widest text-primary">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-4xl font-500 leading-[1.1] text-foreground sm:text-5xl lg:text-6xl text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              {subtitle}
            </p>
          )}
          {ctas.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              {ctas.map((cta, i) => (
                <CTA key={i} {...cta} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CTA({ label, href, variant = 'primary', icon, external }: CTAButton) {
  const base =
    'inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

  const variants = {
    primary:
      'bg-primary text-primary-foreground hover:bg-primary-light',
    secondary:
      'bg-secondary text-secondary-foreground border border-secondary hover:bg-secondary/90',
    ghost:
      'text-foreground hover:bg-muted',
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, variants[variant])}
      >
        {icon}
        {label}
      </a>
    );
  }

  return (
    <a href={href} className={cn(base, variants[variant])}>
      {icon}
      {label}
    </a>
  );
}
