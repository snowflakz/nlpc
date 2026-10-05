import { imageSrcSet } from '@/lib/responsive-images';
import { generateMetadata } from '@/lib/seo';
import Link from 'next/link';
import { ArrowDownRight, ArrowRight, MapPin, Phone, MessageCircle, Navigation } from 'lucide-react';
import { Hero } from '@/components/sections/hero';
import { EditorialSplit } from '@/components/sections/editorial-split';
import { FullWidthImage } from '@/components/sections/full-width-image';
import { ServicesOverview } from '@/components/sections/services-overview';
import { PatientJourney } from '@/components/sections/patient-journey';
import { CTABand } from '@/components/sections/cta-band';
import { ContactDetails } from '@/components/sections/contact-details';
import { SectionHeading } from '@/components/sections/section-heading';
import { images } from '@/lib/images';
import { CLINIC } from '@/lib/constants';

export const metadata = generateMetadata({title: 'Outpatient care in Fagba, Lagos', description: 'New Life Poly Clinic Ltd offers seven outpatient healthcare services at 132 Iju Road, Fagba, Lagos. Contact the clinic to plan your visit.', path: '/'});

export default function HomePage() {
  return (
    <>
      <Hero
        variant="full-bleed"
        eyebrow="New Life Poly Clinic Ltd · Fagba, Lagos"
        title="Quality Healthcare, Close to Home."
        subtitle="An outpatient clinic in Fagba, Ifako-Ijaye, Lagos, offering seven healthcare services for the community."
        image={images.home.hero}
        ctas={[
          { label: 'Book an Appointment', href: '/appointment', variant: 'primary' },
          { label: 'Call the Clinic', href: `tel:${CLINIC.phoneTel}`, variant: 'secondary' },
          { label: 'WhatsApp Us', href: CLINIC.whatsappUrl, variant: 'secondary', external: true },
        ]}
      />

      <section className="border-b border-border bg-background py-10 lg:py-14">
        <div className="mx-auto grid max-w-8xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="flex items-start gap-4">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-xs font-600 uppercase tracking-widest text-muted-foreground">Find us</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{CLINIC.address.full}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <ClockIcon />
            <div>
              <p className="text-xs font-600 uppercase tracking-widest text-muted-foreground">Opening hours</p>
              <p className="mt-2 text-sm text-foreground">{CLINIC.hours}</p>
              <p className="mt-1 text-xs text-muted-foreground">Outpatient only</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-xs font-600 uppercase tracking-widest text-muted-foreground">Speak with us</p>
              <a href={`tel:${CLINIC.phoneTel}`} className="mt-2 flex min-h-[44px] items-center text-sm text-foreground transition-colors hover:text-primary">{CLINIC.phone}</a>
              <a href={`mailto:${CLINIC.email}`} className="mt-1 flex min-h-[44px] items-center text-xs text-muted-foreground transition-colors hover:text-primary">{CLINIC.email}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden py-20 lg:py-32">
        <div className="mx-auto grid max-w-8xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-7 lg:pt-10">
            <p className="mb-4 text-xs font-600 uppercase tracking-widest text-primary">A nearby place for care</p>
            <h2 className="max-w-3xl font-display text-4xl font-500 leading-[1.08] text-primary sm:text-5xl lg:text-6xl">
              Healthcare that feels closer to home.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              New Life Poly Clinic Ltd is an outpatient clinic at 132 Iju Road, Fagba, Ifako-Ijaye, Lagos. Our services bring consultation, diagnosis and specialist outpatient care into one accessible local setting.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/about" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-600 text-primary-foreground transition-colors hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                More about NLPC <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/patient-information" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-600 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                What to expect
              </Link>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden rounded-[1.25rem]">
              {/* Placeholder until approved NLPC interior photography is available. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" width={960} height={1200} src={images.home.intro.url} srcSet={imageSrcSet(images.home.intro.url)} sizes="(min-width: 1024px) 40vw, 100vw" alt={images.home.intro.alt} className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden w-44 border border-border bg-background p-4 shadow-sm sm:block lg:-left-12">
              <p className="font-display text-3xl font-500 text-primary">NLPC</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">New Life Poly Clinic Ltd</p>
            </div>
          </div>
        </div>
      </section>

      <ServicesOverview
        eyebrow="The care available here"
        title="Seven ways to begin your care journey"
        description="Explore the services available at New Life Poly Clinic Ltd. Each service has its own dedicated information page."
      />

      <section className="bg-foreground py-20 text-background lg:py-28">
        <div className="mx-auto grid max-w-8xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:px-8">
          <div className="lg:col-span-5">
            <p className="mb-4 text-xs font-600 uppercase tracking-widest text-secondary-light">A considered first step</p>
            <h2 className="font-display text-4xl font-500 leading-[1.1] text-background sm:text-5xl">Start with the service that is right for your need.</h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-background/65">If you are unsure where to begin, contact the clinic or request an appointment and tell us what you need help with.</p>
            <Link href="/services/medical-consultancy" className="mt-8 inline-flex min-h-[44px] items-center gap-2 text-sm font-600 text-background transition-colors hover:text-secondary-light">Explore medical consultancy <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.25rem]">
              {/* Placeholder until approved NLPC consultation photography is available. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" width={1600} height={900} src={images.home.storytelling.url} srcSet={imageSrcSet(images.home.storytelling.url)} sizes="(min-width: 1024px) 60vw, 100vw" alt={images.home.storytelling.alt} className="h-full w-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 text-sm text-background/85">A calm, clear place to begin.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Your visit"
            title="A simple way to prepare"
            description="The exact experience depends on the service you are visiting for. These broad steps are intended as general guidance, not a guaranteed clinic-specific workflow."
          />
          <PatientJourney
            className="pb-0"
            steps={[
              { number: '01', title: 'Before your visit', description: 'Choose a service and contact the clinic or request an appointment.' },
              { number: '02', title: 'Arrival', description: 'Make your way to the clinic at 132 Iju Road, Fagba.' },
              { number: '03', title: 'Your consultation or service', description: 'Your experience will depend on the service you are visiting for.' },
              { number: '04', title: 'Next steps', description: 'The clinic can guide you on any next steps relevant to your visit.' },
            ]}
          />
          <div className="mt-10 flex justify-center">
            <Link href="/patient-information" className="inline-flex min-h-[44px] items-center gap-2 text-sm font-600 text-primary transition-colors hover:text-primary-light">Read patient information <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <FullWidthImage
        src={images.home.editorial.url}
        alt={images.home.editorial.alt}
        caption="Illustrative healthcare image. Not an NLPC facility or staff photograph."
        height="tall"
      />

      <section className="py-20 lg:py-32">
        <div className="mx-auto grid max-w-8xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-8">
          <div className="lg:col-span-5">
            <p className="mb-4 text-xs font-600 uppercase tracking-widest text-primary">Visit NLPC</p>
            <h2 className="font-display text-4xl font-500 leading-[1.1] text-primary sm:text-5xl">Find your way to care.</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">Call, email or message us before your visit. You can also request directions to the clinic.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={CLINIC.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-600 text-primary-foreground transition-colors hover:bg-primary-light"><Navigation className="h-4 w-4" /> Get directions</a>
              <a href={CLINIC.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-600 text-foreground transition-colors hover:bg-muted"><MessageCircle className="h-4 w-4" /> WhatsApp us</a>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <ContactDetails />
          </div>
        </div>
      </section>

      <CTABand
        title="When you are ready, we are here."
        description="Request an appointment and tell us your preferred date and time. The clinic will contact you to confirm availability."
        primaryCTA={{ label: 'Book an Appointment', href: '/appointment' }}
        secondaryCTA={{ label: 'Contact the Clinic', href: '/contact' }}
      />
    </>
  );
}

function ClockIcon() {
  return <span aria-hidden="true" className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-primary"><span className="h-1.5 w-1.5 rounded-full bg-primary" /></span>;
}
