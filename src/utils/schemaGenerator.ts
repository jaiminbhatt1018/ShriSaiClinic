import { CLINIC_INFO, FAQS } from '../data/clinicData';

/**
 * Generates Schema.org MedicalClinic structured data (JSON-LD)
 */
export function generateMedicalClinicSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': 'https://shrisaiclinic.com/#clinic',
    name: 'Shri Sai Clinic',
    alternateName: [
      'Shri Sai Homoeopathic Clinic',
      'Shree Sai Clinic',
      'Shri Sai Clinic Vasada',
      'Shri Sai Clinic Vansda'
    ],
    url: 'https://shrisaiclinic.com',
    logo: 'https://shrisaiclinic.com/assets/images/logo.png',
    image: 'https://shrisaiclinic.com/assets/images/dr-jay-bhatt-healing-teal.jpeg',
    description:
      'Specialized classical homeopathic clinic providing 100% steroid-free skin and hair care treatments led by Dr. Jay Bhatt (BHMS) in Vasada (Vansda), Gujarat, India.',
    telephone: CLINIC_INFO.phone,
    email: CLINIC_INFO.email,
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Google Pay, PhonePe, Paytm',
    medicalSpecialty: [
      'https://schema.org/Homeopathic',
      'https://schema.org/Dermatology'
    ],
    availableService: [
      {
        '@type': 'MedicalTherapy',
        name: '100% Steroid-Free Chronic Scalp Psoriasis & Eczema Remission',
        description:
          'Constitutional homeopathic treatment for severe chronic scaling, plaque psoriasis, and eczema without cortisone or steroid rebound.'
      },
      {
        '@type': 'MedicalTherapy',
        name: 'Alopecia Areata & Chronic Hair Fall Follicular Revival',
        description:
          'Internal homeopathic therapy stimulating dormant follicles to achieve natural terminal hair density without scalp steroid injections.'
      },
      {
        '@type': 'MedicalTherapy',
        name: 'Non-Surgical Skin Tag & Papilloma Clearance',
        description:
          'Internal oral constitutional medicine clearing pedunculated cervical and facial skin tags with zero excision, cautery, or scarring.'
      },
      {
        '@type': 'MedicalTherapy',
        name: 'Seborrheic Dermatitis & Chronic Flaking Management',
        description:
          'Cellular balance constitutional care restoring normal epidermal turnover and ending dependency on medicated shampoos.'
      },
      {
        '@type': 'MedicalProcedure',
        name: 'General Classical Homoeopathic Consultation',
        description:
          'In-depth individual case-taking and constitutional homeopathic prescription for acute and deep-seated chronic pathologies.'
      }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Samrudhi Complex, in front of Palace Gate, New Depo Road',
      addressLocality: 'Vasada',
      addressRegion: 'Gujarat',
      postalCode: '396050',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 20.7570,
      longitude: 73.3670
    },
    hasMap: CLINIC_INFO.mapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '09:00',
        closes: '12:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '15:00',
        closes: '20:00'
      }
    ],
    founder: {
      '@id': 'https://shrisaiclinic.com/#physician'
    },
    employee: [
      {
        '@id': 'https://shrisaiclinic.com/#physician'
      }
    ]
  };
}

/**
 * Generates Schema.org Physician structured data for Dr. Jay Bhatt
 */
export function generatePhysicianSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': 'https://shrisaiclinic.com/#physician',
    name: CLINIC_INFO.doctor,
    honorificPrefix: 'Dr.',
    jobTitle: 'General Physician & Classical Homoeopath',
    credential: 'BHMS (Bachelor of Homeopathic Medicine and Surgery)',
    medicalSpecialty: [
      'https://schema.org/Homeopathic',
      'https://schema.org/Dermatology'
    ],
    worksFor: {
      '@id': 'https://shrisaiclinic.com/#clinic'
    },
    affiliation: {
      '@id': 'https://shrisaiclinic.com/#clinic'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Samrudhi Complex, in front of Palace Gate, New Depo Road',
      addressLocality: 'Vasada',
      addressRegion: 'Gujarat',
      postalCode: '396050',
      addressCountry: 'IN'
    },
    telephone: CLINIC_INFO.phone,
    url: 'https://shrisaiclinic.com',
    image: 'https://shrisaiclinic.com/assets/images/dr-jay-bhatt-healing-teal.jpeg',
    description:
      'Dr. Jay Bhatt (BHMS) is a General Physician and experienced Homeopath in Vasada, Gujarat, specializing in 100% steroid-free treatments for stubborn skin ailments, chronic hair fall, and deep pathology with over 10 years of clinical practice.'
  };
}

/**

 * Generates Schema.org FAQPage structured data (JSON-LD)
 */
export function generateFAQPageSchema() {
  return {
    '@type': 'FAQPage',
    '@id': 'https://shrisaiclinic.com/#faq',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generates combined Schema.org Graph including Clinic, Physician, WebSite, and FAQPage
 */
export function generateFullClinicSchemaGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      generateMedicalClinicSchema(),
      generatePhysicianSchema(),
      generateFAQPageSchema(),
      {
        '@type': 'WebSite',
        '@id': 'https://shrisaiclinic.com/#website',
        url: 'https://shrisaiclinic.com',
        name: 'Shri Sai Clinic',
        publisher: {
          '@id': 'https://shrisaiclinic.com/#clinic'
        },
        inLanguage: ['en-IN', 'gu-IN', 'hi-IN']
      }
    ]
  };
}

