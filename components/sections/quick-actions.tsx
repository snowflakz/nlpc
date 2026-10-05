import { Phone, MessageCircle, MapPin, CalendarCheck } from 'lucide-react';
import { CLINIC } from '@/lib/constants';
import { cn } from '@/lib/utils';

type QuickActionsProps = {
  className?: string;
  layout?: 'horizontal' | 'grid';
};

export function QuickActions({ className, layout = 'horizontal' }: QuickActionsProps) {
  const actions = [
    {
      icon: Phone,
      label: 'Call',
      value: CLINIC.phone,
      href: `tel:${CLINIC.phoneTel}`,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Message us',
      href: CLINIC.whatsappUrl,
      external: true,
    },
    {
      icon: MapPin,
      label: 'Directions',
      value: '132 Iju Road, Fagba',
      href: CLINIC.mapsUrl,
      external: true,
    },
    {
      icon: CalendarCheck,
      label: 'Book',
      value: 'Appointment',
      href: '/appointment',
    },
  ];

  if (layout === 'grid') {
    return (
      <div className={cn('grid grid-cols-2 gap-4 lg:grid-cols-4', className)}>
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <a
              key={i}
              href={action.href}
              target={action.external ? '_blank' : undefined}
              rel={action.external ? 'noopener noreferrer' : undefined}
              className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-primary/30 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Icon className="h-6 w-6 text-primary" />
              <span className="text-sm font-600 text-foreground">{action.label}</span>
              <span className="text-xs text-muted-foreground">{action.value}</span>
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {actions.map((action, i) => {
        const Icon = action.icon;
        return (
          <a
            key={i}
            href={action.href}
            target={action.external ? '_blank' : undefined}
            rel={action.external ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-500 text-foreground transition-colors hover:border-primary/30 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Icon className="h-4 w-4 text-primary" />
            {action.label}
          </a>
        );
      })}
    </div>
  );
}
