import Link from 'next/link';
import { Phone, Mail, ArrowUpRight } from 'lucide-react';
import { BrandMark } from '@/components/brand-mark';
import { CLINIC } from '@/lib/constants';

const links = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Your visit', href: '/patient-information' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
];

export function SiteFooter() {
  return <footer className="site-footer border-t border-border bg-primary/5">
    <div className="page-shell">
      <div className="grid gap-6 py-8 lg:grid-cols-[1.2fr_1fr_1fr] lg:items-start lg:gap-10 lg:py-10">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label="New Life Poly Clinic home">
            <BrandMark />
            <span><span className="block font-display text-lg font-semibold text-primary">New Life Poly Clinic</span><span className="mt-1 block text-xs text-muted-foreground">Fagba, Lagos · Outpatient care</span></span>
          </Link>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-0">
          {links.map(link => <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground hover:text-primary">{link.label}</Link>)}
        </nav>
        <div className="flex flex-wrap gap-x-6 gap-y-0 lg:flex-col">
          <a href={`tel:${CLINIC.phoneTel}`} className="gap-2 text-sm text-foreground hover:text-primary"><Phone className="h-4 w-4 text-secondary" />{CLINIC.phone}</a>
          <a href={`mailto:${CLINIC.email}`} className="gap-2 text-sm text-foreground hover:text-primary"><Mail className="h-4 w-4 text-secondary" />{CLINIC.email}</a>
          <Link href="/appointment" className="gap-2 text-sm font-semibold text-primary">Request an appointment <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>
      <div className="border-t border-border py-4 text-xs text-muted-foreground">&copy; {new Date().getFullYear()} {CLINIC.name}. All rights reserved.</div>
    </div>
  </footer>;
}
