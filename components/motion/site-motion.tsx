'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/** Progressive enhancement: content stays visible with JS disabled or reduced motion. */
export function SiteMotion() {
  const pathname = usePathname();
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>();
    const updateProgress = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${distance > 0 ? Math.min(1, scrollY / distance) : 0})`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateProgress); };
    const stop = () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
      frame = 0;
      if (progress.current) progress.current.style.transform = 'scaleX(0)';
    };
    const start = () => {
      stop();
      if (preference.matches || !('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting || seen.has(entry.target)) return;
          seen.add(entry.target);
          observer?.unobserve(entry.target);
          const element = entry.target as HTMLElement;
          const image = element.matches('figure, .motion-image');
          const animation = element.animate([
            { opacity: image ? 0.65 : 0.25, transform: image ? 'translateY(20px) scale(.98)' : 'translateY(24px)' },
            { opacity: 1, transform: 'translateY(0) scale(1)' },
          ], { duration: image ? 950 : 720, delay: Number(element.dataset.motionDelay || 0), easing: 'cubic-bezier(.22,1,.36,1)' });
          animations.add(animation);
          animation.finished.then(() => animations.delete(animation)).catch(() => {});
        });
      }, { threshold: 0.12 });
      const targets = document.querySelectorAll<HTMLElement>(
        '#main-content section > .page-shell, #main-content section > .max-w-8xl, #main-content section > div.mx-auto, .service-hero-copy, .service-hero-image, .service-row, [data-motion]'
      );
      targets.forEach(element => {
        // Avoid nested entrance animations and keep the main hero/LCP immediately readable.
        if (element.querySelector('[data-motion-stagger]') || element.closest('.home-hero') || element.parentElement?.closest('[data-motion-observed]')) return;
        element.dataset.motionObserved = 'true';
        observer?.observe(element);
      });
      document.querySelectorAll<HTMLElement>('[data-motion-stagger] > *').forEach((element, i) => {
        element.dataset.motionDelay = String(Math.min(i, 4) * 80);
        observer?.observe(element);
      });
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      onScroll();
    };
    start();
    preference.addEventListener('change', start);
    return () => {
      stop();
      preference.removeEventListener('change', start);
      document.querySelectorAll('[data-motion-observed]').forEach(element => element.removeAttribute('data-motion-observed'));
    };
  }, [pathname]);
  return <div ref={progress} className="reading-progress" aria-hidden="true" />;
}
