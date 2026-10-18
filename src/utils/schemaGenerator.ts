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
      'Shri Sai Clinic Vansda'
    ],
    url: 'https://shrisaiclinic.com',
    logo: 'https://shrisaiclinic.com/assets/images/logo.png',
    image: 'https://shrisaiclinic.com/assets/images/dr-jay-bhatt-healing-teal.jpeg',
    description:
      'Specialized classical homeopathic clinic providing non-steroidal constitutional treatments led by Dr. Jay Bhatt (BHMS) in Vansda, Gujarat, India.',
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
        name: 'Chronic Scalp Psoriasis & Eczema Constitutional Remission',
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
      addressLocality: 'Vansda',
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
    alternateName: CLINIC_INFO.legalDoctorName,
    identifier: CLINIC_INFO.registrationNumber,
    honorificPrefix: 'Dr.',
    jobTitle: 'General Physician & Classical Homoeopath',
    credential: 'BHMS (Bachelor of Homoeopathic Medicine and Surgery)',
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: CLINIC_INFO.college,
      parentOrganization: {
        '@type': 'CollegeOrUniversity',
        name: CLINIC_INFO.university
      }
    },
    memberOf: {
      '@type': 'MedicalOrganization',
      name: CLINIC_INFO.council
    },
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
      addressLocality: 'Vansda',
      addressRegion: 'Gujarat',
      postalCode: '396050',
      addressCountry: 'IN'
    },
    telephone: CLINIC_INFO.phone,
    url: 'https://shrisaiclinic.com',
    image: 'https://shrisaiclinic.com/assets/images/dr-jay-bhatt-healing-teal.jpeg',
    description: `${CLINIC_INFO.doctor} (${CLINIC_INFO.legalDoctorName}, BHMS) is a Registered Medical Practitioner (Reg. No. ${CLINIC_INFO.registrationNumber}) with ${CLINIC_INFO.council}, specializing in constitutional homeopathic care with over ${CLINIC_INFO.stats.yearsExperience} years of clinical practice in Vansda, Gujarat.`
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

