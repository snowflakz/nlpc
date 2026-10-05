import { cn } from '@/lib/utils';

type InfoItem = {
  title: string;
  body: string;
};

type InfoListProps = {
  eyebrow?: string;
  title: string;
  items: InfoItem[];
  layout?: 'vertical' | 'horizontal';
  className?: string;
};

export function InfoList({
  eyebrow,
  title,
  items,
  layout = 'vertical',
  className,
}: InfoListProps) {
  return (
    <section className={cn('py-20 lg:py-32', className)}>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {(eyebrow || title) && (
          <div className="mb-12 max-w-2xl">
            {eyebrow && (
              <p className="mb-3 text-xs font-600 uppercase tracking-widest text-primary">
                {eyebrow}
              </p>
            )}
            <h2 className="font-display text-3xl font-500 leading-[1.15] text-foreground sm:text-4xl text-balance">
              {title}
            </h2>
          </div>
        )}

        <div
          className={cn(
            layout === 'horizontal'
              ? 'grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'
              : 'flex flex-col divide-y divide-border'
          )}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className={cn(
                layout === 'vertical' ? 'py-6 first:pt-0 last:pb-0' : 'flex flex-col'
              )}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-sm font-500 text-primary tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-600 text-foreground">{item.title}</h3>
              </div>
              <p
                className={cn(
                  'mt-2 text-muted-foreground leading-relaxed',
                  layout === 'horizontal' ? 'text-base' : 'text-base pl-8'
                )}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
