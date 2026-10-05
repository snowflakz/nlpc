import { SITE_URL } from '@/lib/seo';
import './globals.css';
import { SiteMotion } from '@/components/motion/site-motion';
import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { MobileActionBar } from '@/components/sections/mobile-action-bar';
import { CLINIC } from '@/lib/constants';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: [{ url: '/favicon_io/favicon.ico' }, { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' }, { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' }], apple: [{ url: '/favicon_io/apple-touch-icon.png', sizes: '180x180' }], shortcut: '/favicon.ico' },
  manifest: '/favicon_io/site.webmanifest',
  title: {
    default: 'New Life Poly Clinic Ltd — Quality Healthcare in Fagba, Lagos',
    template: '%s — New Life Poly Clinic Ltd',
  },
  description:
    'Outpatient clinic in Fagba, Ifako-Ijaye, Lagos offering medical consultancy, laboratory, audiological assessment, optometry, dental, pharmacy and dialysis services.',
  keywords: [
    'New Life Poly Clinic',
    'NLPC Lagos',
    'clinic in Fagba',
    'clinic in Ifako-Ijaye',
    'outpatient clinic Lagos',
    'medical consultancy Fagba',
    'medical laboratory Fagba',
    'optometry Fagba',
    'dental clinic Fagba',
    'pharmacy Fagba',
    'dialysis Fagba',
    'audiological assessment Fagba',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    siteName: 'New Life Poly Clinic Ltd',
    title: 'New Life Poly Clinic Ltd — Quality Healthcare in Fagba, Lagos',
    description:
      'Outpatient clinic in Fagba, Ifako-Ijaye, Lagos offering seven healthcare services.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Life Poly Clinic Ltd — Quality Healthcare in Fagba, Lagos',
    description:
      'Outpatient clinic in Fagba, Ifako-Ijaye, Lagos offering seven healthcare services.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = { themeColor: "#094da5", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'MedicalClinic', name: CLINIC.name, url: SITE_URL, telephone: CLINIC.phoneTel, email: CLINIC.email, address: { '@type': 'PostalAddress', streetAddress: CLINIC.address.line1, addressLocality: 'Fagba, Ifako-Ijaye', addressRegion: 'Lagos', addressCountry: 'NG' } }).replace(/</g, '\u003c') }} />
        <SiteMotion />
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <SiteFooter />
        <MobileActionBar />
      </body>
    </html>
  );
}
