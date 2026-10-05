import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type RelatedService = {
  slug: string;
  name: string;
};

type RelatedServicesProps = {
  currentSlug: string;
  services: RelatedService[];
  className?: string;
};

export function RelatedServices({ currentSlug, services, className }: RelatedServicesProps) {
  return (
    <section className={cn('py-16 lg:py-24 border-t border-border', className)}>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-600 uppercase tracking-widest text-primary mb-2">
            Continue Exploring
          </p>
          <h2 className="font-display text-2xl font-500 text-foreground sm:text-3xl">
            Related Services
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services
            .filter((s) => s.slug !== currentSlug)
            .slice(0, 3)
            .map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex items-center justify-between rounded-xl border border-border p-5 transition-colors hover:border-primary/30 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="font-display text-lg font-500 text-foreground transition-colors group-hover:text-primary">
                  {service.name}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-1" />
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
