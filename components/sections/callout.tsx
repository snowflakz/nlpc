import { cn } from '@/lib/utils';

type CalloutProps = {
  title?: string;
  children: React.ReactNode;
  variant?: 'info' | 'note' | 'warning';
  className?: string;
};

const variantStyles = {
  info: 'bg-primary/5 border-primary/15',
  note: 'bg-accent border-accent-foreground/15',
  warning: 'bg-warning/5 border-warning/20',
};

export function Callout({ title, children, variant = 'info', className }: CalloutProps) {
  return (
    <section className={cn('py-12 lg:py-16', className)}>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'rounded-xl border p-6 lg:p-10',
            variantStyles[variant]
          )}
        >
          {title && (
            <h2 className="mb-3 font-display text-xl font-500 text-foreground sm:text-2xl">
              {title}
            </h2>
          )}
          <div className="text-base text-muted-foreground leading-relaxed text-pretty">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
