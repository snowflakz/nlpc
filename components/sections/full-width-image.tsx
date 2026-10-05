import { imageSrcSet } from '@/lib/responsive-images';
import { cn } from '@/lib/utils';

type FullWidthImageProps = {
  src: string;
  alt: string;
  caption?: string;
  height?: 'short' | 'medium' | 'tall';
  className?: string;
};

const heightMap = {
  short: 'h-[30vh] min-h-[280px]',
  medium: 'h-[45vh] min-h-[360px]',
  tall: 'h-[60vh] min-h-[480px]',
};

export function FullWidthImage({
  src,
  alt,
  caption,
  height = 'medium',
  className,
}: FullWidthImageProps) {
  return (
    <section className={cn('relative w-full overflow-hidden', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy"         src={src} srcSet={imageSrcSet(src)}
        alt={alt}
        className={cn('w-full object-cover', heightMap[height])}
        sizes="100vw"
      />
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-6 lg:p-10">
          <div className="mx-auto max-w-8xl">
            <p className="text-sm text-background/90 max-w-xl leading-relaxed font-400">
              {caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
