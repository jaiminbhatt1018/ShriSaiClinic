import { ClinicalCase, ServiceItem, Testimonial, FAQItem } from '../types';

export const CLINIC_INFO = {
  name: "SHRI SAI CLINIC",
  tagline: "Homoeopathy & Clinical Skin Care",
  philosophy: "Gentle Healing, Lasting Relief",
  doctor: "Dr. Jay Bhatt",
  qualifications: "BHMS • General Physician • Classical Homoeopathy",
  phone: "+91 76002 39816",
  phoneRaw: "917600239816",
  phoneTel: "tel:+917600239816",
  doctorWhatsapp: "9054520603",
  doctorWhatsappRaw: "919054520603",
  doctorPhoneFormatted: "+91 90545 20603",
  whatsappUrl: "https://wa.me/917600239816?text=Hello%20Shri%20Sai%20Clinic,%20I%20would%20like%20to%20inquire%20about%20a%20consultation.",
  email: "contact@shrisaihomoeoclinic.com",
  address: "Samrudhi Complex in front of Palace gate new Depo Road Vasada Gujarat",
  mapsUrl: "https://share.google/myiPzk2hQAKWgQg6f",
  stats: {
    yearsExperience: 5,
    treatedPatients: 5000,
    reliefRate: 98.4,
    nonSteroidal: 100
  },
  opdHours: [
    { label: "Mon – Sat (Morning Session)", time: "10:00 AM – 1:30 PM", highlight: true },
    { label: "Mon – Sat (Evening Session)", time: "5:30 PM – 9:00 PM", highlight: true },
    { label: "Sunday (Special Batch)", time: "10:00 AM – 1:00 PM", highlight: false }
  ]
};

export const CLINICAL_CASES: ClinicalCase[] = [
  {
    id: "psoriasis",
    category: "Skin Care Remission",
    title: "Scalp Psoriasis Remission",
    aspectRatio: "600 / 675",
    duration: "4 Months",
    method: "Constitutional",
    recovery: "100% Clear",
    description: "Severe chronic scaling and thick erythematous plaques across the forehead and entire scalp. Dr. Jay Bhatt's constitutional homeopathy stimulated immune self-regulation, resulting in complete scalp restoration without topical steroid creams or immunosuppressants.",
    highlights: [
      "Zero topical cortisone or steroid rebound",
      "Complete scalp epidermal turnover normalized"
    ],
    beforeImg: "/assets/cases/psoriasis_before.jpg",
    afterImg: "/assets/cases/psoriasis_after.jpg",
    disclaimer: "Case SSC-PS-204 • Dr. Jay Bhatt (BHMS) • Samrudhi Complex, Vansda • Individual results vary based on constitutional analysis",
    bookingSubject: "Scalp Psoriasis Treatment Inquiry"
  },
  {
    id: "skintags",
    category: "Dermatological Care",
    title: "Neck Skin Tags (Non-Surgical)",
    aspectRatio: "600 / 655",
    duration: "6 Weeks",
    method: "Oral Remedy",
    recovery: "Zero Scarring",
    description: "Multiple widespread pedunculated skin tags and dermal papillomas across the posterior cervical neck. Cured completely through internal homeopathic medicines with zero cauterization, excision, bleeding, or scarring.",
    highlights: [
      "Zero surgical excision or electric cautery",
      "Smooth skin without post-procedure hyperpigmentation"
    ],
    beforeImg: "/assets/cases/skintags_before.jpg",
    afterImg: "/assets/cases/skintags_after.jpg",
    disclaimer: "Case SSC-ST-118 • Dr. Jay Bhatt (BHMS) • Samrudhi Complex, Vansda • Zero surgery or chemical burning",
    bookingSubject: "Skin Tags Non-Surgical Treatment Inquiry"
  },
  {
    id: "alopecia",
    category: "Hair & Trichology",
    title: "Alopecia Areata (Patchy Hair Loss)",
    aspectRatio: "600 / 888",
    duration: "3 Months",
    method: "Follicular Revival",
    recovery: "Full Density",
    description: "Pediatric case presenting with acute, smooth circular alopecic patches over the fronto-temporal hairline. Constitutional treatment revived dormant hair follicles, achieving full natural density and healthy hair regrowth.",
    highlights: [
      "Natural follicular revival without steroid scalp injections",
      "Complete terminal hair regrowth with healthy thickness"
    ],
    beforeImg: "/assets/cases/alopecia_before.jpg",
    afterImg: "/assets/cases/alopecia_after.jpg",
    disclaimer: "Case SSC-AA-309 • Dr. Jay Bhatt (BHMS) • Samrudhi Complex, Vansda • Natural follicular revival",
    bookingSubject: "Alopecia Areata Hair Regrowth Inquiry"
  },
  {
    id: "seborrhea",
    category: "Scalp Dermatology",
    title: "Seborrheic Dermatitis Recovery",
    aspectRatio: "600 / 860",
    duration: "8 Weeks",
    method: "Internal Clearance",
    recovery: "Flake-Free",
    description: "Stubborn flaking, greasy crusts, and persistent scalp erythema. Treated via constitutional cellular balance, completely clearing the epidermal inflammation and leaving a clean, healthy scalp.",
    highlights: [
      "Long-term remission without medicated shampoo dependency",
      "Calmed itchy scalp inflammation and restored healthy barrier"
    ],
    beforeImg: "/assets/cases/seborrhea_before.jpg",
    afterImg: "/assets/cases/seborrhea_after.jpg",
    disclaimer: "Case SSC-SD-412 • Dr. Jay Bhatt (BHMS) • Samrudhi Complex, Vansda • Long-term sustained clearance",
    bookingSubject: "Seborrheic Dermatitis Inquiry"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "acne",
    category: "skin",
    iconName: "Sparkles",
    title: "Acne, Pimples & Scars",
    departmentBadge: "Skin Care",
    description: "Targeted homoeopathy corrects internal androgen surges, sebum overproduction, and bacterial colonization. Eradicates recurrent cysts, blackheads, and post-acne pigmentation safely.",
    bulletPoints: [
      "No harsh oral retinoids or peel burns",
      "Prevents permanent crater scarring",
      "Rebalances natural skin moisture barrier"
    ],
    bookingSubject: "Acne & Pimples Treatment"
  },
  {
    id: "psoriasis",
    category: "skin",
    iconName: "ShieldAlert",
    title: "Psoriasis & Eczema",
    departmentBadge: "Chronic Care",
    description: "Deep-acting constitutional homoeopathy harmonizes the immune response to halt excessive epidermal cell proliferation, intense flaking, weeping cracks, and unbearable itching.",
    bulletPoints: [
      "Zero topical steroid rebound flare-ups",
      "Controls scalp, plaque & inverse psoriasis",
      "Long-term remission & skin healing"
    ],
    bookingSubject: "Psoriasis & Eczema Treatment"
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
    bookingSubject: "Melasma & Pigmentation"
  },
  {
    id: "hairloss",
    category: "skin",
    iconName: "Feather",
    title: "Hair Loss & Alopecia",
    departmentBadge: "Trichology",
    description: "Comprehensive treatment for diffuse hair thinning, patchy Alopecia Areata, telogen effluvium, and androgenetic baldness through follicular stimulation and cellular nourishment.",
    bulletPoints: [
      "Strengthens hair roots & reactivates papillae",
      "Corrects underlying thyroid/stress triggers",
      "Eradicates stubborn seborrheic dandruff"
    ],
    bookingSubject: "Hair Loss & Alopecia Treatment"
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
    bookingSubject: "Allergies & Asthma Treatment"
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
    bookingSubject: "PCOD / Hormonal Consultation"
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
    bookingSubject: "Gastrointestinal Consultation"
  },
  {
    id: "pediatrics",
    category: "child-women",
    iconName: "Baby",
    title: "Child Health & Immunity",
    departmentBadge: "Pediatrics",
    description: "Sweet, pleasant sugar-pill homoeopathic remedies loved by children. Treats recurrent coughs, colds, tonsillitis, adenoids, poor appetite, dentition issues, and bedwetting.",
    bulletPoints: [
      "100% tasty, non-bitter, easy to administer",
      "Avoids repeated cycles of heavy antibiotics",
      "Builds resilient natural defense systems"
    ],
    bookingSubject: "Pediatric Child Consultation"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Pooja Sharma",
    initials: "PS",
    badge: "Acne & Melasma",
    condition: "Treated for Hormonal Acne & Melasma",
    title: "\"Severe Hormonal Cystic Acne Completely Cleared\"",
    stars: 5,
    review: "\"I battled painful cystic acne for 4 years. Chemical ointments burned my skin and made things worse once stopped. Dr. Jay Bhatt identified my hormonal root cause. Within 4 months of gentle sweet globules, my face cleared up with zero new pimples!\""
  },
  {
    name: "Rajesh Patel",
    initials: "RP",
    badge: "Scalp Psoriasis",
    condition: "Treated for Chronic Scalp Psoriasis",
    title: "\"3 Years of Flaking Scalp Plaques Healed 100%\"",
    stars: 5,
    review: "\"I was prescribed steroid shampoos and cortisone lotions that gave temporary relief, then aggressive rebound flare-ups. Dr. Jay Bhatt started constitutional homoeopathy. In just 4 months my scalp cleared completely and has stayed 100% plaque-free!\""
  },
  {
    name: "Dr. K. Mehta (M.D.)",
    initials: "KM",
    badge: "Allergies & Sinus",
    condition: "Treated for Chronic Sinusitis",
    title: "\"Astonishing Scientific Results for Sinusitis\"",
    stars: 5,
    review: "\"Being an allopathic doctor myself, I was amazed by Dr. Jay's diagnostic precision and pure classical prescribing. My 7-year recurring morning allergic sneezing and sinus headaches stopped completely. Exceptional clinical acumen.\""
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
    answer: "Zero. At Shri Sai Clinic, every remedy is prepared strictly as per the official Homoeopathic Pharmacopoeia of India (HPI). We strictly prescribe non-steroidal, gentle micro-doses that stimulate your body's innate self-healing immune response without causing dependency, liver toxicity, or rebound flaring."
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
    question: "Why does Dr. Jay Bhatt spend 30–45 minutes in first consultation?",
    answer: "Classical homoeopathy treats the patient as a whole individual, not just an isolated disease label. Dr. Jay analyzes your emotional constitution, thermal sensitivity, sleep patterns, metabolic tendencies, and root disease origins to select the single, most precise remedy that permanently cures your condition."
  }
];
