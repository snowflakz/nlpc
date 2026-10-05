import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import { cn } from '@/lib/utils';

type ServicesOverviewProps = {
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function ServicesOverview({
  className,
  eyebrow = 'What We Offer',
  title = 'Our Services',
  description = 'Explore seven outpatient services at New Life Poly Clinic Ltd.',
}: ServicesOverviewProps) {
  return (
    <section className={cn('py-20 lg:py-32 bg-muted/30', className)}>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div data-motion className="mb-12 lg:mb-16 max-w-2xl">
          <p className="mb-3 text-xs font-600 uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl font-500 leading-[1.15] text-primary sm:text-4xl lg:text-5xl text-balance">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
            {description}
          </p>
        </div>

        {/* Editorial numbered list */}
        <div data-motion-stagger className="service-links border-t border-border">
          {SERVICES.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex items-center gap-4 lg:gap-8 border-b border-border py-6 lg:py-8 transition-colors hover:bg-muted/50 -mx-4 px-4 lg:-mx-6 lg:px-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {/* Number */}
              <span className="font-display text-2xl font-500 text-primary tabular-nums w-10 shrink-0 lg:text-3xl lg:w-12">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Service name */}
              <span className="flex-1 font-display text-xl font-500 text-foreground transition-colors group-hover:text-primary lg:text-3xl">
                {service.name}
              </span>

              {/* Description (desktop only) */}
              <span className="hidden lg:block text-base text-muted-foreground max-w-sm text-right leading-relaxed">
                {service.description}
              </span>

              {/* Arrow */}
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-1 shrink-0" />
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-8 flex justify-end">
          <Link
            href="/services"
            className="inline-flex min-h-[44px] items-center text-sm font-600 text-primary hover:text-primary-light transition-colors"
          >
            View all services →
          </Link>
        </div>
      </div>
    </section>
  );
}
