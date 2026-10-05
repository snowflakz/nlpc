/* eslint-disable @next/next/no-img-element -- Responsive, remotely compressed registry placeholders. */
import { imageSrcSet } from '@/lib/responsive-images';
import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { CTABand } from '@/components/sections/cta-band';
import { SERVICES } from '@/lib/constants';
import { SERVICE_CONTENT } from '@/lib/service-content';
import { generateMetadata } from '@/lib/seo';
export const metadata = generateMetadata({ title: 'Our seven services', description: 'Explore seven outpatient services at NLPC in Fagba, Lagos, with dedicated information for each service.', path: '/services' });
export default function ServicesPage() { return <>
<Breadcrumb items={[{label:'Home',href:'/'},{label:'Services'}]} />
<section className="page-shell pb-16 pt-8 lg:pb-24"><p className="eyebrow">Seven services · One outpatient clinic</p><div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end"><h1 className="page-title lg:col-span-8">Find your starting point for care.</h1><p className="body-copy lg:col-span-4">Explore care at New Life Poly Clinic Ltd. Select a service to learn more and prepare for your visit.</p></div></section>
<section aria-label="All seven services" className="page-shell">{SERVICES.map((s,i)=><Link key={s.slug} href={`/services/${s.slug}`} className="service-row group"><span className="eyebrow">0{i+1}</span><div><h2 className="font-display text-3xl sm:text-4xl group-hover:text-primary">{s.name}</h2><p className="mt-3 text-muted-foreground">{s.description}</p><span className="mt-5 block text-sm font-600 text-primary">Explore service ↗</span></div><div className="aspect-[3/2] overflow-hidden sm:w-56 lg:w-72">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={SERVICE_CONTENT[s.slug].image.url.replace('w=1920','w=640')} alt={`Illustrative image: ${SERVICE_CONTENT[s.slug].image.alt}`} srcSet={imageSrcSet(SERVICE_CONTENT[s.slug].image.url)} sizes="(min-width: 1024px) 288px, (min-width: 640px) 224px, 80vw" width={640} height={427} loading="lazy" className="h-full w-full object-cover" /></div></Link>)}<p className="mt-5 text-xs text-muted-foreground">Illustrative images do not depict NLPC facilities or staff.</p></section>
<CTABand title="Unsure where to begin?" description="Contact the clinic to discuss which service you need." primaryCTA={{label:'Contact the clinic',href:'/contact'}} secondaryCTA={{label:'Request an appointment',href:'/appointment'}} /></>; }
