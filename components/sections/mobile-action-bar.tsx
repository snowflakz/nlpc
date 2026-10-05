'use client';
import { usePathname } from 'next/navigation';
import { Phone, CalendarCheck, MessageCircle, Navigation } from 'lucide-react';
import Link from 'next/link';
import { CLINIC } from '@/lib/constants';

export function MobileActionBar() {
  const pathname = usePathname();
  if (pathname === '/appointment') return null;
  return <nav aria-label="Quick clinic actions" className="mobile-action-dock xl:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md">
    <div className="mx-auto grid max-w-2xl grid-cols-4 gap-2 px-3 pt-2">
      <a href={`tel:${CLINIC.phoneTel}`} className="mobile-dock-link text-primary"><Phone aria-hidden="true" className="h-5 w-5" /><span>Call</span></a>
      <a href={CLINIC.whatsappUrl} target="_blank" rel="noopener noreferrer" className="mobile-dock-link text-secondary"><MessageCircle aria-hidden="true" className="h-5 w-5" /><span>WhatsApp</span></a>
      <a href={CLINIC.mapsUrl} target="_blank" rel="noopener noreferrer" className="mobile-dock-link text-primary"><Navigation aria-hidden="true" className="h-5 w-5" /><span>Directions</span></a>
      <Link href="/appointment" aria-label="Book an appointment" className="mobile-dock-link bg-primary text-primary-foreground"><CalendarCheck aria-hidden="true" className="h-5 w-5" /><span>Book</span></Link>
    </div>
  </nav>;
}
