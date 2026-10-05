/**
 * Centralized Image Registry
 *
 * This is the single source of truth for all image URLs used across the site.
 * When real NLPC photography becomes available, replace the placeholder URLs
 * here — every page reads from this registry.
 *
 * Supplied illustrations are optimized locally; unmatched placeholders use Pexels.
 * They are temporary stand-ins and should be replaced with approved NLPC imagery.
 */

const registry = {
  home: {
    logo: {
      url: '/NLPC_Heart_and_Leaf_Healthcare_Logo.png',
      alt: 'New Life Poly Clinic Ltd logo',
      credit: 'Supplied NLPC brand asset',
    },
    hero: {
      url: 'https://images.pexels.com/photos/30677591/pexels-photo-30677591.jpeg?auto=compress&cs=tinysrgb&w=1920',
      alt: 'Medical professional consulting with a patient during a blood pressure checkup in Lagos, Nigeria',
      credit: 'Ninthgrid / Pexels',
    },
    intro: {
      url: 'https://images.pexels.com/photos/18252404/pexels-photo-18252404.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Healthcare professional in clinical attire',
      credit: 'Tessy Agbonome / Pexels',
    },
    storytelling: {
      url: 'https://images.pexels.com/photos/7579823/pexels-photo-7579823.jpeg?auto=compress&cs=tinysrgb&w=1920',
      alt: 'Doctor consulting with a patient in a modern medical office',
      credit: 'cottonbro studio / Pexels',
    },
    editorial: {
      url: 'https://images.pexels.com/photos/29941468/pexels-photo-29941468.jpeg?auto=compress&cs=tinysrgb&w=1920',
      alt: 'Healthcare professionals in a hospital setting',
      credit: 'Joseph Oti Nyametease / Pexels',
    },
    location: {
      url: 'https://images.pexels.com/photos/27938904/pexels-photo-27938904.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Aerial view of Lagos city',
      credit: 'Ben Iwara / Pexels',
    },
  },
  about: {
    hero: {
      url: 'https://images.pexels.com/photos/33790192/pexels-photo-33790192.jpeg?auto=compress&cs=tinysrgb&w=1920',
      alt: 'Medical facility building in Nigeria',
      credit: 'sirmudi_photography / Pexels',
    },
    identity: {
      url: 'https://images.pexels.com/photos/6129502/pexels-photo-6129502.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Group of healthcare professionals in uniform',
      credit: 'RDNE Stock project / Pexels',
    },
    approach: {
      url: 'https://images.pexels.com/photos/7088834/pexels-photo-7088834.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Healthcare professional reviewing medical form with patient',
      credit: 'MART  PRODUCTION / Pexels',
    },
  },
  patientInformation: {
    hero: {
      url: 'https://images.pexels.com/photos/8459996/pexels-photo-8459996.jpeg?auto=compress&cs=tinysrgb&w=1920',
      alt: 'Bright and clean medical waiting room',
      credit: 'Los Muertos Crew / Pexels',
    },
    beforeVisit: {
      url: 'https://images.pexels.com/photos/6809658/pexels-photo-6809658.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Patient consulting with reception staff at a clinic',
      credit: 'Pavel Danilyuk / Pexels',
    },
    arriving: {
      url: 'https://images.pexels.com/photos/7108324/pexels-photo-7108324.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Modern clinic interior with seating',
      credit: 'Pavel Danilyuk / Pexels',
    },
    consultation: {
      url: 'https://images.pexels.com/photos/5215012/pexels-photo-5215012.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Doctor examining a patient during a consultation',
      credit: 'Antoni Shkraba / Pexels',
    },
    diagnostic: {
      url: 'https://images.pexels.com/photos/6627687/pexels-photo-6627687.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Lab technician working with laboratory equipment',
      credit: 'kaboompics.com / Pexels',
    },
    pharmacy: {
      url: 'https://images.pexels.com/photos/8657359/pexels-photo-8657359.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Pharmacist handing medication to a patient',
      credit: 'cottonbro studio / Pexels',
    },
  },
  contact: {
    hero: {
      url: 'https://images.pexels.com/photos/36000439/pexels-photo-36000439.jpeg?auto=compress&cs=tinysrgb&w=1920',
      alt: 'Clinic building exterior',
      credit: 'Joel Muzhira / Pexels',
    },
    location: {
      url: 'https://images.pexels.com/photos/27938900/pexels-photo-27938900.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Aerial view of urban Lagos, Nigeria',
      credit: 'Ben Iwara / Pexels',
    },
  },
  services: {
    medicalConsultancy: {
      hero: {
        url: 'https://images.pexels.com/photos/30688589/pexels-photo-30688589.jpeg?auto=compress&cs=tinysrgb&w=1920',
        alt: 'Healthcare professional checking a patient\'s blood pressure in Lagos, Nigeria',
        credit: 'Ninthgrid / Pexels',
      },
      intro: {
        url: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Doctor and patient during a consultation',
        credit: 'cottonbro studio / Pexels',
      },
      editorial: {
        url: 'https://images.pexels.com/photos/6129447/pexels-photo-6129447.jpeg?auto=compress&cs=tinysrgb&w=1920',
        alt: 'Physician discussing medical documents with a patient',
        credit: 'RDNE Stock project / Pexels',
      },
      journey: {
        url: 'https://images.pexels.com/photos/6129154/pexels-photo-6129154.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Medical professionals reviewing patient charts',
        credit: 'RDNE Stock project / Pexels',
      },
    },
    medicalLaboratory: {
      hero: {
        url: 'https://images.pexels.com/photos/8442373/pexels-photo-8442373.jpeg?auto=compress&cs=tinysrgb&w=1920',
        alt: 'Laboratory machine with test tubes for analysis',
        credit: 'Pavel Danilyuk / Pexels',
      },
      intro: {
        url: 'https://images.pexels.com/photos/6627667/pexels-photo-6627667.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Healthcare professional operating laboratory equipment',
        credit: 'kaboompics.com / Pexels',
      },
      editorial: {
        url: 'https://images.pexels.com/photos/8442027/pexels-photo-8442027.jpeg?auto=compress&cs=tinysrgb&w=1920',
        alt: 'Laboratory machinery in a medical facility',
        credit: 'Pavel Danilyuk / Pexels',
      },
      journey: {
        url: 'https://images.pexels.com/photos/6285355/pexels-photo-6285355.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Gloved hands handling laboratory vials',
        credit: 'Gustavo Fring / Pexels',
      },
    },
    audiologicalAssessment: {
      hero: {
        url: 'https://images.pexels.com/photos/5206951/pexels-photo-5206951.jpeg?auto=compress&cs=tinysrgb&w=1920',
        alt: 'Doctor using an otoscope to examine a patient\'s ear',
        credit: 'kaboompics.com / Pexels',
      },
      intro: {
        url: 'https://images.pexels.com/photos/5206942/pexels-photo-5206942.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Doctor performing an ear examination',
        credit: 'kaboompics.com / Pexels',
      },
      editorial: {
        url: 'https://images.pexels.com/photos/7179255/pexels-photo-7179255.jpeg?auto=compress&cs=tinysrgb&w=1920',
        alt: 'Young patient during a routine ear examination',
        credit: 'Mike Sangma / Pexels',
      },
      journey: {
        url: 'https://images.pexels.com/photos/5206950/pexels-photo-5206950.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Healthcare professional examining a patient\'s ear',
        credit: 'kaboompics.com / Pexels',
      },
    },
    optometry: {
      hero: {
        url: 'https://images.pexels.com/photos/5620070/pexels-photo-5620070.jpeg?auto=compress&cs=tinysrgb&w=1920',
        alt: 'Phoropter used in optometry for eye examination',
        credit: 'VICTOR REGA / Pexels',
      },
      intro: {
        url: 'https://images.pexels.com/photos/5996653/pexels-photo-5996653.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Optometrist examining a patient\'s eyes',
        credit: 'Pavel Danilyuk / Pexels',
      },
      editorial: {
        url: 'https://images.pexels.com/photos/32209715/pexels-photo-32209715.jpeg?auto=compress&cs=tinysrgb&w=1920',
        alt: 'Optometrist performing an eye exam with a slit lamp',
        credit: 'José Antonio Otegui Auzmendi / Pexels',
      },
      journey: {
        url: 'https://images.pexels.com/photos/6749697/pexels-photo-6749697.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Eye examination being conducted by an optometrist',
        credit: 'Antoni Shkraba / Pexels',
      },
    },
    dental: {
      hero: {
        url: 'https://images.pexels.com/photos/5355863/pexels-photo-5355863.jpeg?auto=compress&cs=tinysrgb&w=1920',
        alt: 'Modern dental clinic with dental chair and equipment',
        credit: 'Tima Miroshnichenko / Pexels',
      },
      intro: {
        url: 'https://images.pexels.com/photos/3946835/pexels-photo-3946835.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Dentist performing dental treatment',
        credit: 'Andrea Piacquadio / Pexels',
      },
      editorial: {
        url: 'https://images.pexels.com/photos/6809648/pexels-photo-6809648.jpeg?auto=compress&cs=tinysrgb&w=1920',
        alt: 'Dental equipment in a clinic setting',
        credit: 'Pavel Danilyuk / Pexels',
      },
      journey: {
        url: 'https://images.pexels.com/photos/3946837/pexels-photo-3946837.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Dentist treating a patient in a dental chair',
        credit: 'Andrea Piacquadio / Pexels',
      },
    },
    pharmacy: {
      hero: {
        url: 'https://images.pexels.com/photos/8657301/pexels-photo-8657301.jpeg?auto=compress&cs=tinysrgb&w=1920',
        alt: 'Pharmacist selecting medication from pharmacy shelves',
        credit: 'cottonbro studio / Pexels',
      },
      intro: {
        url: 'https://images.pexels.com/photos/6129585/pexels-photo-6129585.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Healthcare worker organizing medication',
        credit: 'RDNE Stock project / Pexels',
      },
      editorial: {
        url: 'https://images.pexels.com/photos/8657359/pexels-photo-8657359.jpeg?auto=compress&cs=tinysrgb&w=1920',
        alt: 'Pharmacist handing medication to a patient at the counter',
        credit: 'cottonbro studio / Pexels',
      },
      journey: {
        url: 'https://images.pexels.com/photos/14797855/pexels-photo-14797855.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Pharmacist organizing medication shelves',
        credit: 'World Sikh Organization of Canada / Pexels',
      },
    },
    dialysis: {
      hero: {
        url: 'https://images.pexels.com/photos/10987574/pexels-photo-10987574.jpeg?auto=compress&cs=tinysrgb&w=1920',
        alt: 'Medical device with digital displays in a hospital setting',
        credit: 'Кайрат Сатдиков / Pexels',
      },
      intro: {
        url: 'https://images.pexels.com/photos/12344725/pexels-photo-12344725.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Examination room with medical equipment',
        credit: 'Oleg PavLove / Pexels',
      },
      editorial: {
        url: 'https://images.pexels.com/photos/37654664/pexels-photo-37654664.jpeg?auto=compress&cs=tinysrgb&w=1920',
        alt: 'Medical facility room with equipment',
        credit: 'Arthur  Uzoagba / Pexels',
      },
      journey: {
        url: 'https://images.pexels.com/photos/11722768/pexels-photo-11722768.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Hospital room with medical equipment',
        credit: 'Andre / Pexels',
      },
    },
  },
} as const;

export type ImageAsset = {
  url: string;
  alt: string;
  credit: string;
};

const supplied = (name: string, alt: string): ImageAsset => ({
  url: `/images/${name}-1600.webp`,
  alt,
  credit: 'Supplied healthcare illustration',
});
export const images = {
  ...registry,
  home: {
    ...registry.home,
    logo: { url: '/images/nlpc-logo.webp', alt: 'New Life Poly Clinic Ltd logo', credit: 'Supplied NLPC brand asset' },
    hero: supplied('eye-care', 'Illustration of a patient having an eye examination'),
    intro: registry.home.intro,
    storytelling: registry.home.storytelling,
    editorial: registry.home.editorial,
  },
  about: registry.about,
  services: {
    ...registry.services,
    medicalConsultancy: { ...registry.services.medicalConsultancy, hero: supplied('consultation', 'A doctor and patient in conversation') },
    optometry: { ...registry.services.optometry, hero: supplied('eye-examination', 'A patient during an eye examination'), intro: supplied('eye-care', 'A patient having an eye examination') },
    dental: { ...registry.services.dental, hero: supplied('dental-care', 'A dentist examining a patient') },
    pharmacy: { ...registry.services.pharmacy, hero: supplied('pharmacy-care', 'A pharmacist discussing medicines with a patient') },
  },
} as const;
