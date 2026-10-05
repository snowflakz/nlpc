export const CLINIC = {
  name: 'New Life Poly Clinic Ltd',
  shortName: 'NLPC',
  tagline: 'Quality Healthcare, Close to Home.',
  address: {
    line1: '132 Iju Road',
    line2: 'Fagba, Ifako-Ijaye',
    city: 'Lagos',
    country: 'Nigeria',
    full: '132 Iju Road, Fagba, Ifako-Ijaye, Lagos, Nigeria',
  },
  phone: '+1 (252) 691 4076',
  phoneTel: '+12526914076',
  email: 'newlifepolyclinic26@gmail.com',
  hours: '8:00 AM – 5:00 PM',
  outpatientOnly: true,
  mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=132+Iju+Road%2C+Fagba%2C+Ifako-Ijaye%2C+Lagos%2C+Nigeria&travelmode=driving&dir_action=navigate',
  mapsEmbedUrl: 'https://www.google.com/maps?q=132+Iju+Road+Fagba+Ifako-Ijaye+Lagos+Nigeria&output=embed',
  whatsappNumber: '+234 802 328 4834',
  whatsappUrl: 'https://wa.me/2348023284834',
} as const;

export const SERVICES = [
  {
    slug: 'medical-consultancy',
    name: 'Medical Consultancy',
    shortName: 'Consultancy',
    description: 'General medical consultations for health concerns and check-ups.',
    icon: 'stethoscope',
  },
  {
    slug: 'medical-laboratory',
    name: 'Medical Laboratory / Diagnosis',
    shortName: 'Laboratory',
    description: 'Laboratory testing and diagnostic services.',
    icon: 'flask-conical',
  },
  {
    slug: 'audiological-assessment',
    name: 'Audiological Assessment',
    shortName: 'Audiology',
    description: 'Hearing and audiological assessment services.',
    icon: 'ear',
  },
  {
    slug: 'optometry',
    name: 'Optometry (Eyes)',
    shortName: 'Optometry',
    description: 'Eye care and vision assessment services.',
    icon: 'eye',
  },
  {
    slug: 'dental',
    name: 'Dental',
    shortName: 'Dental',
    description: 'Outpatient dental care and oral health services.',
    icon: 'smile',
  },
  {
    slug: 'pharmacy',
    name: 'Pharmacy',
    shortName: 'Pharmacy',
    description: 'Pharmacy services and medication dispensing.',
    icon: 'pill',
  },
  {
    slug: 'dialysis',
    name: 'Dialysis',
    shortName: 'Dialysis',
    description: 'Dialysis treatment services.',
    icon: 'droplet',
  },
] as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Patient Information', href: '/patient-information' },
  { label: 'Appointment', href: '/appointment' },
  { label: 'Contact', href: '/contact' },
] as const;
