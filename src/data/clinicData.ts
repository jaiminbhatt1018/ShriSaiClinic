import { ClinicalCase, ServiceItem, Testimonial, FAQItem } from '../types';

export const CLINIC_INFO = {
  name: "SHREE SAI CLINIC",
  tagline: "Homoeopathy & Clinical Skin Care",
  philosophy: "Gentle Healing, Lasting Relief",
  doctor: "Dr. Jaykumar Bhatt",
  legalDoctorName: "Dr. Jaykumar Vihangbhai Bhatt",
  qualifications: "BHMS (VNSGU Surat)",
  fullQualifications: "BHMS (Bachelor of Homoeopathic Medicine & Surgery)",
  college: "Shri C. N. Kothari Homoeopathic Medical College & Research Centre, Vyara",
  university: "Veer Narmad South Gujarat University, Surat",
  registrationNumber: "G-22263",
  council: "Gujarat State Homoeopathic Medical Council",
  councilStatus: "Registered Medical Practitioner (RMP)",
  phone: "+91 76002 39816",
  phoneRaw: "917600239816",
  phoneTel: "tel:+917600239816",
  doctorWhatsapp: "7600239816",
  doctorWhatsappRaw: "917600239816",
  doctorPhoneFormatted: "+91 76002 39816",
  whatsappUrl: "https://wa.me/917600239816?text=Hello%20Shree%20Sai%20Clinic,%20I%20would%20like%20to%20inquire%20about%20a%20consultation.",
  email: "appointments.shrisaiclinic@gmail.com",
  address: "Samrudhi Complex, Opp. Palace Gate, New Depo Road, Vansda, Gujarat",
  mapsUrl: "https://share.google/myiPzk2hQAKWgQg6f",
  mapsEmbedUrl: "https://maps.google.com/maps?q=Shree+Sai+Clinic,+Samrudhi+Complex,+Opp.+Palace+Gate,+Vansda,+Gujarat&t=&z=16&ie=UTF8&iwloc=&output=embed",
  stats: {
    yearsExperience: 10,
    treatedPatients: 5000,
    clinicalDepartments: 7,
    pharmacopoeia: "HPI Standard"
  },
  opdHours: [
    { label: "Mon – Sun (Morning Session)", time: "9:00 AM – 12:00 PM", highlight: true },
    { label: "Mon – Sun (Evening Session)", time: "3:00 PM – 8:00 PM", highlight: true }
  ]
};

export const CLINICAL_CASES: ClinicalCase[] = [
  {
    id: "psoriasis",
    category: "Skin Care Remission",
    title: "Scalp Psoriasis Relief",
    aspectRatio: "600 / 675",
    duration: "4 Months",
    method: "Constitutional",
    recovery: "Scalp Remission",
    description: "Severe, long-lasting flaking and thick red patches across the forehead and scalp. Dr. Jaykumar Bhatt used customized homeopathic treatment to help the body naturally balance its immune system. Complete healing of the scalp without using steroid creams or harsh medicines.",
    highlights: [
      "Zero topical cortisone or steroid rebound",
      "Complete scalp epidermal turnover normalized"
    ],
    beforeImg: "/assets/cases/psoriasis_before.jpg",
    afterImg: "/assets/cases/psoriasis_after.jpg",
    disclaimer: "Case SSC-PS-204 • Dr. Jaykumar Bhatt (BHMS) • Samrudhi Complex, Vansda • Individual results vary based on constitutional analysis",
    bookingSubject: "Scalp Psoriasis Treatment Inquiry"
  },
  {
    id: "skintags",
    category: "Dermatological Care",
    title: "Neck Skin Tag Removal (Non-Surgical)",
    aspectRatio: "600 / 655",
    duration: "6 Weeks",
    method: "Oral Remedy",
    recovery: "Zero Scarring",
    description: "Multiple skin tags and small raised growths across the back of the neck were completely cleared using internal homeopathic medicines. This natural treatment restored smooth skin from within without any burning, cutting, bleeding, or scarring.",
    highlights: [
      "Zero surgical excision or electric cautery",
      "Smooth skin without post-procedure hyperpigmentation"
    ],
    beforeImg: "/assets/cases/skintags_before.jpg",
    afterImg: "/assets/cases/skintags_after.jpg",
    disclaimer: "Case SSC-ST-118 • Dr. Jaykumar Bhatt (BHMS) • Samrudhi Complex, Vansda • Zero surgery or chemical burning",
    bookingSubject: "Skin Tags Non-Surgical Treatment Inquiry"
  },
  {
    id: "alopecia",
    category: "Hair & Trichology",
    title: "Patchy Hair Loss Treatment (Alopecia)",
    aspectRatio: "600 / 888",
    duration: "3 Months",
    method: "Follicular Revival",
    recovery: "Full Density",
    description: "Sudden smooth round bald spots near the hairline in a child were fully restored using personalized homeopathic medicine. The natural approach stimulated hair growth from within, restoring strong, dense, and healthy hair without harsh chemical treatments.",
    highlights: [
      "Natural follicular revival without steroid scalp injections",
      "Complete terminal hair regrowth with healthy thickness"
    ],
    beforeImg: "/assets/cases/alopecia_before.jpg",
    afterImg: "/assets/cases/alopecia_after.jpg",
    disclaimer: "Case SSC-AA-309 • Dr. Jaykumar Bhatt (BHMS) • Samrudhi Complex, Vansda • Natural follicular revival",
    bookingSubject: "Alopecia Areata Hair Regrowth Inquiry"
  },
  {
    id: "seborrhea",
    category: "Scalp Dermatology",
    title: "Severe Dandruff and Scalp Eczema",
    aspectRatio: "600 / 860",
    duration: "8 Weeks",
    method: "Internal Clearance",
    recovery: "Flake-Free",
    description: "Persistent oily flaking, crusts, and red, irritated skin on the scalp were completely cleared through customized homeopathic care. By soothing skin inflammation naturally from within, the treatment restored a clean and healthy scalp.",
    highlights: [
      "Long-term remission without medicated shampoo dependency",
      "Calmed itchy scalp inflammation and restored healthy barrier"
    ],
    beforeImg: "/assets/cases/seborrhea_before.jpg",
    afterImg: "/assets/cases/seborrhea_after.jpg",
    disclaimer: "Case SSC-SD-412 • Dr. Jaykumar Bhatt (BHMS) • Samrudhi Complex, Vansda • Long-term sustained clearance",
    bookingSubject: "Seborrheic Dermatitis Inquiry"
  },
  {
    id: "kidneystone",
    category: "Renal & Chronic Care",
    title: "Natural Kidney Stone Treatment",
    aspectRatio: "542 / 487",
    duration: "3 Weeks",
    method: "Constitutional",
    recovery: "Stone Expelled",
    description: "Severe lower back and side pain caused by a kidney stone was successfully resolved through targeted homeopathic medicine. The natural treatment relaxed the urinary tract, allowing the stone to pass completely on its own without needing surgery, laser breakdown, or stent placement.",
    highlights: [
      "Painless natural stone expulsion without lithotripsy or surgery",
      "Resolved acute renal colic & prevents recurrent stone formation"
    ],
    beforeImg: "/assets/cases/kidneystone_poster.jpg",
    afterImg: "/assets/cases/kidneystone_poster.jpg",
    disclaimer: "Case SSC-KS-523 • Dr. Jaykumar Bhatt (BHMS) • Samrudhi Complex, Vansda • Verified actual stone expelled post-treatment",
    bookingSubject: "Kidney Stone Treatment Inquiry"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "psoriasis",
    category: "skin",
    iconName: "ShieldAlert",
    title: "Psoriasis & Eczema",
    departmentBadge: "Chronic Care",
    description: "Soothes persistent red patches, intense itching, and stubborn flaking naturally from within with non-steroidal constitutional care.",
    bulletPoints: [
      "Zero cortisone or steroid rebound flare-ups",
      "Scalp, plaque, inverse & guttate care",
      "Restores natural skin barrier & healing"
    ],
    bookingSubject: "Psoriasis & Eczema Treatment",
    slides: [
      {
        image: "/assets/cases/psoriasis-plaque-lesions.webp",
        alt: "Clinical presentation of round psoriasis plaque lesions on skin",
        captionBadge: "Plaque & Guttate Psoriasis"
      },
      {
        image: "/assets/cases/eczema-hands-scaling.jpg",
        alt: "Severe eczema with dry cracked skin and scaling on hands",
        captionBadge: "Severe Hand Eczema & Scaling"
      },
      {
        image: "/assets/cases/psoriasis-back-itching.jpg",
        alt: "Patient scratching itchy red psoriasis patches on back",
        captionBadge: "Active Flare-ups & Itching"
      }
    ]
  },
  {
    id: "melasma",
    category: "skin",
    iconName: "Sun",
    title: "Melasma & Pigmentation",
    departmentBadge: "Skin Care",
    description: "Safe natural regulatory solutions for facial dark patches, chloasma, freckles, and post-inflammatory hyperpigmentation. Rebuilds clear, even-toned skin from within.",
    bulletPoints: [
      "Safe during and after pregnancy melasma",
      "Regulates overactive melanocytes naturally",
      "Restores natural skin radiance"
    ],
    bookingSubject: "Melasma & Pigmentation",
    slides: [
      {
        image: "/assets/cases/melasma-facial-portrait-v2.png",
        alt: "Clinical portrait of patient with symmetrical facial melasma, cheek pigmentation, and chloasma",
        captionBadge: "Facial Melasma & Chloasma"
      },
      {
        image: "/assets/cases/melasma-cheek-hyperpigmentation.png",
        alt: "Clinical presentation of dense epidermal cheek hyperpigmentation and sun-induced melasma patches",
        captionBadge: "Cheek Hyperpigmentation"
      }
    ]
  },
  {
    id: "hairloss",
    category: "skin",
    iconName: "Feather",
    title: "Hair Loss & Alopecia",
    departmentBadge: "Trichology",
    description: "Stimulates dormant follicles, halts chronic thinning, and restores natural hair density without steroid injections.",
    bulletPoints: [
      "Natural follicular revival without steroid injections",
      "Treats patchy alopecia, receding & diffuse thinning",
      "Corrects underlying hormonal & nutritional triggers"
    ],
    bookingSubject: "Hair Loss & Alopecia Treatment",
    slides: [
      {
        image: "/assets/cases/male-androgenetic-alopecia.jpg",
        alt: "Male androgenetic alopecia with receding hairline and crown thinning",
        captionBadge: "Male Pattern Thinning"
      },
      {
        image: "/assets/cases/patchy-alopecia-areata-scalp.png",
        alt: "Clinical presentation of patchy alopecia areata circular bald spots on scalp",
        captionBadge: "Patchy Alopecia Areata"
      },
      {
        image: "/assets/cases/female-diffuse-hair-thinning.png",
        alt: "Young woman checking diffuse hair thinning along parting and crown line",
        captionBadge: "Female Pattern Thinning"
      }
    ]
  },
  {
    id: "allergies",
    category: "chronic",
    iconName: "Wind",
    title: "Allergies & Asthma",
    departmentBadge: "Respiratory",
    description: "Effective desensitization remedies for allergic rhinitis, morning sneezing bursts, recurrent sinus congestion, chronic bronchitis, and bronchial asthma attacks.",
    bulletPoints: [
      "Reduces reliance on daily inhalers",
      "Strengthens airway mucosal immunity",
      "Non-sedating, zero lethargy or drowsiness"
    ],
    bookingSubject: "Allergies & Asthma Treatment",
    slides: [
      {
        image: "/assets/cases/allergic-rhinitis-sneezing-relief.png",
        alt: "Man sneezing into a tissue due to allergic rhinitis, morning allergy bursts, and sinus congestion",
        captionBadge: "Allergic Rhinitis & Sinus"
      },
      {
        image: "/assets/cases/asthma-inhaler-breathing-relief.png",
        alt: "Patient managing asthma attack with inhaler and breathing difficulty with healthcare support",
        captionBadge: "Asthma & Wheezing Relief"
      }
    ]
  },
  {
    id: "pcod",
    category: "child-women",
    iconName: "Heart",
    title: "PCOD, PCOS & Hormones",
    departmentBadge: "Women's Health",
    description: "Gentle homoeopathic remedies to correct ovarian follicular cysts, irregular menstrual cycles, hormonal acne, facial hair (hirsutism), and metabolic thyroid imbalance.",
    bulletPoints: [
      "Natural ovulatory cycle restoration",
      "Zero synthetic birth control hormones",
      "Weight balance & mood stabilization"
    ],
    bookingSubject: "PCOD / Hormonal Consultation",
    slides: [
      {
        image: "/assets/cases/pcod-ovarian-cysts-anatomy.png",
        alt: "Medical anatomical illustration of polycystic ovaries with follicular cysts in PCOD",
        captionBadge: "PCOD Ovarian Disease"
      },
      {
        image: "/assets/cases/pcod-abdominal-pelvic-pain.png",
        alt: "Young woman suffering from lower right abdominal and pelvic pain due to PCOD",
        captionBadge: "Pelvic Pain & Cramps"
      },
      {
        image: "/assets/cases/pcos-polycystic-ovary-anatomy.png",
        alt: "Medical anatomical illustration of PCOS polycystic ovary syndrome pathology",
        captionBadge: "PCOS Ovary Syndrome"
      }
    ]
  },
  {
    id: "gastric",
    category: "chronic",
    iconName: "Activity",
    title: "Gastric, GERD & IBS",
    departmentBadge: "Digestion",
    description: "Safe relief for chronic acid reflux, heartburn, bloating, ulcerative colitis, irritable bowel syndrome (IBS), constipation, and piles without lifelong antacids.",
    bulletPoints: [
      "Restores healthy gut motility naturally",
      "Non-surgical management of piles/fissures",
      "Relieves stress-induced digestive spasms"
    ],
    bookingSubject: "Gastrointestinal Consultation",
    slides: [
      {
        image: "/assets/cases/gerd-acid-reflux-throat-burning.jpg",
        alt: "Patient suffering from throat burning, acid regurgitation, and esophageal reflux",
        captionBadge: "Acid Reflux & Regurgitation"
      },
      {
        image: "/assets/cases/stomach-acidity-heartburn-burning.webp",
        alt: "Illustration of stomach acidity, heartburn, and burning sensation in upper digestive tract",
        captionBadge: "Acidity & Heartburn"
      }
    ]
  },
  {
    id: "pediatrics",
    category: "child-women",
    iconName: "Baby",
    title: "Child Health & Immunity",
    departmentBadge: "Pediatrics",
    description: "Sweet, pleasant sugar-pill homoeopathic remedies loved by children. Treats recurrent coughs, colds, tonsillitis, adenoids, poor appetite, dentition issues, and bedwetting.",
    bulletPoints: [
      "Pleasant-tasting, non-bitter, easy to administer",
      "Avoids repeated cycles of heavy antibiotics",
      "Builds resilient natural defense systems"
    ],
    bookingSubject: "Pediatric Child Consultation",
    slides: [
      {
        image: "/assets/cases/child-health-gentle-pediatric-visit.png",
        alt: "Young toddler during a comfortable, gentle pediatric checkup visit",
        captionBadge: "Gentle Pediatric Care"
      },
      {
        image: "/assets/cases/child-fever-cough-cold-thermometer.jpg",
        alt: "Caring mother tending to sick child with fever thermometer in bed",
        captionBadge: "Recurrent Fever & Colds"
      },
      {
        image: "/assets/cases/child-immunity-defense-mask.jpg",
        alt: "Young child with face mask for recurrent infections and low seasonal immunity",
        captionBadge: "Immunity & Frequent Infections"
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Pooja Sharma",
    initials: "PS",
    badge: "Acne & Melasma",
    condition: "Hormonal Acne & Melasma",
    title: "Severe Hormonal Acne Cleared",
    stars: 5,
    review: "Suffered from painful cystic acne for 4 years. Dr. Jay's constitutional treatment cleared my skin in 4 months with zero side effects. Skin is completely clear and radiant!"
  },
  {
    name: "Rajesh Patel",
    initials: "RP",
    badge: "Scalp Psoriasis",
    condition: "Chronic Scalp Psoriasis",
    title: "3 Years of Flaking Plaques Healed",
    stars: 5,
    review: "Had aggressive scalp flaking and intense itchiness. In just 12 weeks of gentle classical homoeopathy, my scalp cleared completely and stayed 100% plaque-free."
  },
  {
    name: "Anjali Desai",
    initials: "AD",
    badge: "Alopecia Areata",
    condition: "Patchy Alopecia Hair Loss",
    title: "Terminal Hair Regrowth in 3 Months",
    stars: 5,
    review: "Had two circular bald patches on my scalp. Dr. Jay's remedies stimulated natural follicular regrowth without steroid injections. Full healthy hair restored!"
  },
  {
    name: "Vikram Solanki",
    initials: "VS",
    badge: "Skin Warts",
    condition: "Facial & Neck Warts",
    title: "Painless Clearance Without Surgery",
    stars: 5,
    review: "Had 5 stubborn warts on face and neck. Within 6 weeks of gentle sweet pills, all warts dried and shed off naturally with zero scars or pigmentation."
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 1,
    question: "Does Homoeopathy take a very long time to show results?",
    answer: "Not at all. In acute conditions (such as fever, acute allergic attacks, sudden rashes, toothaches, or stomach cramps), homoeopathic remedies act swiftly within minutes or hours. In chronic long-standing diseases like 5-year psoriasis or arthritis, homoeopathy addresses deep metabolic layers, so visible progressive improvement occurs within weeks and permanent stability in a few months."
  },
  {
    id: 2,
    question: "Do your remedies contain any steroids or heavy chemicals?",
    answer: "Zero. At Shree Sai Clinic, every remedy is prepared strictly as per the official Homoeopathic Pharmacopoeia of India (HPI). We strictly prescribe non-steroidal, gentle micro-doses that stimulate your body's innate self-healing immune response without causing dependency, liver toxicity, or rebound flaring."
  },
  {
    id: 3,
    question: "Can I take allopathic and homoeopathic medicines together?",
    answer: "Yes, absolutely. Homoeopathic remedies work on a bio-energetic regulatory level and do not chemically interfere with routine medications for blood pressure, thyroid, diabetes, or asthma. Simply maintain a 20 to 30-minute time gap between doses."
  },
  {
    id: 4,
    question: "Are there strict food restrictions (like onion, garlic, or coffee)?",
    answer: "Modern classical homoeopathy does not enforce unrealistic dietary deprivations. We simply recommend rinsing your mouth clean and avoiding strong pungent flavors (raw raw onion, raw garlic, strong menthol toothpaste, or dark coffee) for 15 minutes before and after consuming the medicine."
  },
  {
    id: 5,
    question: "Why does Dr. Jaykumar Bhatt spend 30–45 minutes in first consultation?",
    answer: "Classical homoeopathy treats the patient as a whole individual, not just an isolated disease label. Dr. Jaykumar Bhatt analyzes your emotional constitution, thermal sensitivity, sleep patterns, metabolic tendencies, and root disease origins to select the single, individualised constitutional remedy to stimulate your body's self-healing response and restore long-term balance."
  }
];
