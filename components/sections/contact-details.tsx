import { Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react';
import { CLINIC } from '@/lib/constants';
import { cn } from '@/lib/utils';

type ContactDetailsProps = {
  className?: string;
  showHeading?: boolean;
};

export function ContactDetails({ className, showHeading = true }: ContactDetailsProps) {
  return (
    <div className={cn('', className)}>
      {showHeading && (
        <h2 className="mb-6 font-display text-xl font-500 text-foreground">
          Clinic Details
        </h2>
      )}
      <ul className="space-y-5">
        <li className="flex items-start gap-3">
          <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-600 text-foreground">Address</p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">
              {CLINIC.address.full}
            </p>
          </div>
        </li>
        <li>
          <a
            href={`tel:${CLINIC.phoneTel}`}
            className="flex min-h-[44px] items-start gap-3 group"
          >
            <Phone className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-600 text-foreground">Phone</p>
              <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors mt-0.5">
                {CLINIC.phone}
              </p>
            </div>
          </a>
        </li>
        <li>
          <a
            href={`mailto:${CLINIC.email}`}
            className="flex min-h-[44px] items-start gap-3 group"
          >
            <Mail className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-600 text-foreground">Email</p>
              <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors mt-0.5">
                {CLINIC.email}
              </p>
            </div>
          </a>
        </li>
        <li>
          <a
            href={CLINIC.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-start gap-3 group"
          >
            <MessageCircle className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-600 text-foreground">WhatsApp</p>
              <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors mt-0.5">
                {CLINIC.whatsappNumber}
              </p>
            </div>
          </a>
        </li>
        <li className="flex items-start gap-3">
          <Clock className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-600 text-foreground">Opening Hours</p>
            <p className="text-sm text-muted-foreground mt-0.5">{CLINIC.hours}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Outpatient only</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
