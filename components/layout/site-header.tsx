'use client';
import { BrandMark } from '@/components/brand-mark';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone, ChevronDown, CalendarCheck } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { MobileNav } from './mobile-nav';
import { CLINIC, NAV_LINKS, SERVICES } from '@/lib/constants';

import { cn } from '@/lib/utils';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border transition-all duration-300',
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-background/95'
      )}
    >
      <div className="mx-auto max-w-8xl px-4 sm:px-6 xl:px-8">
        <div className="flex h-16 items-center justify-between xl:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            aria-label={`${CLINIC.name} home`}
          >
            <div className="flex h-12 w-14 items-center justify-center overflow-hidden rounded-lg bg-background/90 transition-colors">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <BrandMark />
            </div>
            <div className="hidden sm:block">
              <span className={cn(
                'block font-display text-lg font-500 leading-tight transition-colors text-primary',
                scrolled ? 'text-primary' : 'text-primary'
              )}>
                New Life Poly Clinic
              </span>
              <span className={cn(
                'block text-xs font-400 tracking-wide uppercase transition-colors',
                scrolled ? 'text-muted-foreground' : 'text-muted-foreground'
              )}>
                Fagba, Lagos
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              if (link.label === 'Services') {
                return (
                  <DropdownMenu key={link.href}>
                    <DropdownMenuTrigger
                      className={cn(
                        'flex items-center gap-1 px-3 py-2 text-sm font-500 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        isActive(link.href)
                          ? 'text-primary'
                          : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                      )}
                    >
                      Services
                      <ChevronDown className="h-3.5 w-3.5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="center"
                      className="service-menu w-72 p-2"
                      sideOffset={8}
                    >
                      <DropdownMenuItem asChild>
                        <Link href="/services" className="min-h-[44px] font-600 text-primary">
                          All Services
                        </Link>
                      </DropdownMenuItem>
                      <div className="my-1 h-px bg-border" />
                      {SERVICES.map((service) => (
                        <DropdownMenuItem key={service.slug} asChild>
                          <Link
                            href={`/services/${service.slug}`}
                            className="min-h-[44px] px-3 py-3"
                          >
                            <span className="font-500 text-sm">{service.name}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href)?'page':undefined}
                  className={cn(
                    'px-3 py-2 text-sm font-500 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    isActive(link.href)
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="desktop-header-actions hidden xl:flex items-center gap-3">
            <a
              href={`tel:${CLINIC.phoneTel}`} aria-label={`Call the clinic: ${CLINIC.phone}`}
              className="flex items-center gap-1.5 text-sm font-500 text-foreground/70 hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden xl:inline">{CLINIC.phone}</span>
            </a>
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-600 text-primary-foreground transition-colors hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <CalendarCheck className="h-4 w-4" />
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="touch-menu-trigger xl:hidden flex items-center justify-center h-11 w-11 rounded-md text-foreground hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-xs sm:max-w-md p-0 flex flex-col"
            >
              <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-background">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <BrandMark />
                  </div>
                  <div className="text-left">
                    <span className="block font-display text-sm font-500">New Life Poly Clinic</span>
                    <span className="block text-xs font-400 text-muted-foreground">Fagba, Lagos</span>
                  </div>
                </SheetTitle>
                <SheetDescription className="sr-only">Explore clinic pages and services. Press Escape to close navigation.</SheetDescription>
              </SheetHeader>
              <MobileNav onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
