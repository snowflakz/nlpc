/* eslint-disable @next/next/no-img-element -- Responsive, remotely compressed registry placeholders. */
import { imageSrcSet } from '@/lib/responsive-images';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { CTABand } from '@/components/sections/cta-band';
import { PatientJourney } from '@/components/sections/patient-journey';
import { RelatedServices } from '@/components/sections/related-services';
import { SERVICES, CLINIC } from '@/lib/constants';
import { SERVICE_CONTENT } from '@/lib/service-content';
import { generateMetadata as createMetadata } from '@/lib/seo';
export const dynamicParams = false;
export function generateStaticParams(){return SERVICES.map(({slug})=>({slug}));}
function getService(slug:string){const s=SERVICES.find(s=>s.slug===slug);if(!s)notFound();return s;}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const s=getService((await params).slug);return createMetadata({title:s.name,description:`${s.description} Plan your outpatient visit to NLPC in Fagba, Lagos.`,path:`/services/${s.slug}`,image:SERVICE_CONTENT[s.slug].image.url});}
export default async function ServicePage({params}:{params:Promise<{slug:string}>}){const s=getService((await params).slug),c=SERVICE_CONTENT[s.slug];return <>
<Breadcrumb items={[{label:'Home',href:'/'},{label:'Services',href:'/services'},{label:s.shortName}]} />
<section className={`page-shell service-hero service-hero-${c.layout} service-hero-${s.slug}`}><div className="service-hero-copy"><p className="eyebrow">{s.name}</p><h1 className="page-title mt-5">{c.headline}</h1><p className="body-copy mt-6 max-w-xl">{c.intro}</p><div className="mt-8 flex flex-wrap gap-3"><Link className="action-primary" href={`/appointment?service=${s.slug}`}>Request an appointment</Link><a className="action-secondary" href={`tel:${CLINIC.phoneTel}`}>Call the clinic</a></div></div><figure className="service-hero-image">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={c.image.url} srcSet={imageSrcSet(c.image.url)} sizes="(min-width: 1024px) 70vw, 100vw" alt={`Illustrative photograph: ${c.image.alt}`} width={1600} height={1067} fetchPriority="high" className="h-full w-full object-cover" /><figcaption className="mt-3 text-xs text-muted-foreground">Illustrative image · {c.image.credit}. Not an NLPC facility or staff image.</figcaption></figure></section>
<section className={s.slug==='dialysis'?'mt-20 bg-primary py-16 text-primary-foreground lg:mt-28 lg:py-24 dialysis-editorial':'mt-20 bg-accent py-16 lg:mt-28 lg:py-24'}><div className="page-shell grid gap-8 lg:grid-cols-12"><p className="eyebrow lg:col-span-3">For your visit</p><h2 className="font-display text-3xl sm:text-4xl lg:col-span-4">{c.focus}</h2><p className="body-copy lg:col-span-5">{c.detail}</p></div></section>
<section className="page-shell pt-20 lg:pt-28"><p className="eyebrow">A flexible patient journey</p><h2 className="mt-4 font-display text-3xl sm:text-4xl">What to expect</h2><p className="body-copy mt-4 max-w-2xl">These are general pointers. Your visit depends on your needs and arrangements made with the clinic.</p></section>
<PatientJourney steps={[{number:'01',title:'Before your visit',description:c.before},{number:'02',title:'Arrival',description:`Visit ${CLINIC.address.full} after confirming arrangements.`},{number:'03',title:'Your service',description:'Discuss your needs and ask the clinic to explain the service relevant to your visit.'},{number:'04',title:'Next steps',description:'Ask the clinic to explain any next steps relevant to your visit.'}]} />
<CTABand title={`Plan your ${s.shortName.toLowerCase()} visit.`} description="The requested date and time are preferences. The clinic will contact you to confirm availability." primaryCTA={{label:'Request an appointment',href:`/appointment?service=${s.slug}`}} secondaryCTA={{label:'Contact the clinic',href:'/contact'}} />
<RelatedServices currentSlug={s.slug} services={[...SERVICES]} /></>;}
