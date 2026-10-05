'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, MapPin, CalendarCheck, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CLINIC, NAV_LINKS, SERVICES } from '@/lib/constants';
import { cn } from '@/lib/utils';

type MobileNavProps = {
  onNavigate: () => void;
};

export function MobileNav({ onNavigate }: MobileNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <ScrollArea className="flex-1 px-6 py-4" aria-label="Mobile navigation">
      <nav className="flex flex-col gap-1">
        {NAV_LINKS.map((link) => {
          if (link.label === 'Services') {
            return (
              <div key={link.href} className="mb-1">
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className={cn(
                    'flex items-center justify-between py-3 text-base font-500 border-b border-border/60',
                    isActive(link.href) ? 'text-primary' : 'text-foreground'
                  )}
                >
                  Services
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                <div className="ml-4 mt-1 mb-2 flex flex-col gap-0.5 sm:grid sm:grid-cols-2 sm:gap-x-4">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={onNavigate}
                      className={cn(
                        'flex min-h-[44px] items-center py-2 text-sm font-400 transition-colors',
                        pathname === `/services/${service.slug}`
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      )}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={cn(
                'flex items-center justify-between py-3 text-base font-500 border-b border-border/60',
                isActive(link.href) ? 'text-primary' : 'text-foreground'
              )}
            >
              {link.label}
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="mt-6 flex flex-col gap-2">
        <Link
          href="/appointment"
          onClick={onNavigate}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-600 text-primary-foreground transition-colors hover:bg-primary-light"
        >
          <CalendarCheck className="h-4 w-4" />
          Book Appointment
        </Link>
        <a
          href={`tel:${CLINIC.phoneTel}`}
          className="flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-600 text-foreground transition-colors hover:bg-muted"
        >
          <Phone className="h-4 w-4" />
          Call the Clinic
        </a>
        <div className="grid grid-cols-2 gap-2">
          <a
            href={CLINIC.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background min-h-[44px] px-3 py-2.5 text-xs font-500 text-foreground transition-colors hover:bg-muted"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>
          <a
            href={CLINIC.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background min-h-[44px] px-3 py-2.5 text-xs font-500 text-foreground transition-colors hover:bg-muted"
          >
            <MapPin className="h-3.5 w-3.5" />
            Directions
          </a>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs font-600 uppercase tracking-wide text-muted-foreground mb-2">
          Opening Hours
        </p>
        <p className="text-sm text-foreground">{CLINIC.hours}</p>
        <p className="mt-1 text-xs text-muted-foreground">Outpatient only</p>
      </div>
    </ScrollArea>
  );
}
