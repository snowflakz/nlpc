import Link from 'next/link';
import { cn } from '@/lib/utils';

type CTABandProps = {
  title: string;
  description?: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  className?: string;
};

export function CTABand({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  className,
}: CTABandProps) {
  return (
    <section className={cn('py-20 lg:py-32', className)}>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="cta-panel rounded-2xl bg-primary px-6 py-16 text-center lg:px-12 lg:py-24">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-500 leading-[1.15] text-primary-foreground sm:text-4xl lg:text-5xl text-balance">
            {title}
          </h2>
          {description && (
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/75 leading-relaxed text-pretty">
              {description}
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={primaryCTA.href}
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3.5 text-sm font-600 text-secondary-foreground transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              {primaryCTA.label}
            </Link>
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/30 px-6 py-3.5 text-sm font-600 text-primary-foreground transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                {secondaryCTA.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
