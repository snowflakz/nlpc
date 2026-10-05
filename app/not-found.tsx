import Link from 'next/link';
import { Home, Stethoscope, CalendarCheck } from 'lucide-react';

export const metadata = { title: 'Page not found', robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="max-w-xl text-center">
        <p className="font-display text-8xl font-500 text-primary/65 sm:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl font-500 text-foreground sm:text-4xl text-balance">
          Page Not Found
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
          The page you are looking for may have been moved, renamed, or is no longer available.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-600 text-primary-foreground transition-colors hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-600 text-foreground transition-colors hover:bg-muted"
          >
            <Stethoscope className="h-4 w-4" />
            View Services
          </Link>
          <Link
            href="/appointment"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-600 text-foreground transition-colors hover:bg-muted"
          >
            <CalendarCheck className="h-4 w-4" />
            Book Appointment
          </Link>
        </div>
      </div>
    </section>
  );
}
