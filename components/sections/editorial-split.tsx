import { imageSrcSet } from '@/lib/responsive-images';
import { cn } from '@/lib/utils';

type EditorialSplitProps = {
  direction?: 'text-left' | 'text-right';
  ratio?: '60/40' | '55/45' | '50/50' | '40/60';
  eyebrow?: string;
  title: string;
  body: string;
  image: {
    url: string;
    alt: string;
  };
  ctas?: { label: string; href: string; variant?: 'primary' | 'secondary' }[];
  className?: string;
};

const ratioMap = {
  '60/40': 'lg:grid-cols-12',
  '55/45': 'lg:grid-cols-11',
  '50/50': 'lg:grid-cols-2',
  '40/60': 'lg:grid-cols-12',
};

const colMap = {
  '60/40': { text: 'lg:col-span-7', image: 'lg:col-span-5' },
  '55/45': { text: 'lg:col-span-6', image: 'lg:col-span-5' },
  '50/50': { text: '', image: '' },
  '40/60': { text: 'lg:col-span-5', image: 'lg:col-span-7' },
};

export function EditorialSplit({
  direction = 'text-left',
  ratio = '60/40',
  eyebrow,
  title,
  body,
  image,
  ctas = [],
  className,
}: EditorialSplitProps) {
  const textCol = colMap[ratio].text;
  const imageCol = colMap[ratio].image;
  const isTextRight = direction === 'text-right';

  return (
    <section className={cn('py-20 lg:py-32', className)}>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className={cn('grid grid-cols-1 gap-8 lg:gap-12 items-center', ratioMap[ratio])}>
          {/* Text */}
          <div
            className={cn(
              textCol,
              isTextRight && 'lg:order-2'
            )}
          >
            {eyebrow && (
              <p className="mb-3 text-xs font-600 uppercase tracking-widest text-primary">
                {eyebrow}
              </p>
            )}
            <h2 className="font-display text-3xl font-500 leading-[1.15] text-primary sm:text-4xl text-balance">
              {title}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              {body}
            </p>
            {ctas.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {ctas.map((cta, i) => (
                  <a
                    key={i}
                    href={cta.href}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                      cta.variant === 'secondary' || cta.variant === undefined
                        ? 'bg-background text-foreground border border-border hover:bg-muted'
                        : 'bg-primary text-primary-foreground hover:bg-primary-light'
                    )}
                  >
                    {cta.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Image */}
          <div
            className={cn(
              imageCol,
              isTextRight && 'lg:order-1'
            )}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl lg:aspect-[3/4]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy"                 src={image.url} srcSet={imageSrcSet(image.url)}
                alt={image.alt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
