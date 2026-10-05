import type { MetadataRoute } from 'next';
import { SERVICES } from '@/lib/constants';
import { SITE_URL } from '@/lib/seo';
export default function sitemap():MetadataRoute.Sitemap {return ['','/about','/services',...SERVICES.map(s=>`/services/${s.slug}`),'/patient-information','/appointment','/contact','/privacy'].map(path=>({url:`${SITE_URL}${path}`,changeFrequency:'monthly' as const,priority:path===''?1:path.startsWith('/services')?0.8:0.6}));}
