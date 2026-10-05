import type { Metadata } from 'next';
import { CLINIC } from './constants';

const baseUrl = (process.env.SITE_URL || 'https://newlifepolyclinic.com.ng').replace(/\/$/, '');

type SeoParams = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
};

export function generateMetadata({
  title,
  description,
  path,
  image,
  keywords,
}: SeoParams): Metadata {
  const url = `${baseUrl}${path}`;
  const ogImage = image || images.home.hero.url;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: CLINIC.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: CLINIC.name,
        },
      ],
      locale: 'en_NG',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    keywords,
  };
}

// Import images for default OG image
import { images } from './images';

export const SITE_URL = baseUrl;
