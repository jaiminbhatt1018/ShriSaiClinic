import React from 'react';
import { Helmet } from 'react-helmet-async';
import { generateFullClinicSchemaGraph } from '../../utils/schemaGenerator';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  keywords?: string;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const DEFAULT_SEO = {
  title: 'Shri Sai Clinic | Advanced Homeopathic Care by Dr. Jay Bhatt',
  description:
    'Specialized classical homeopathic clinic led by Dr. Jay Bhatt (BHMS) in Vansda, Gujarat. Offering HPI-standard non-steroidal constitutional care for scalp psoriasis, alopecia areata, chronic eczema, and non-surgical skin tag removal.',
  canonicalUrl: 'https://shrisaiclinic.com/',
  ogImage: 'https://shrisaiclinic.com/assets/images/dr-jay-bhatt-healing-teal.jpeg',
  ogType: 'website' as const,
  keywords:
    'Homeopathy clinic Vansda, Classical homeopathy Gujarat, Dr. Jay Bhatt, Steroid-free skin treatment, Scalp psoriasis homeopathy, Alopecia areata treatment, Non-surgical skin tag removal, Chronic eczema homeopathy'
};

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  canonicalUrl = DEFAULT_SEO.canonicalUrl,
  ogImage = DEFAULT_SEO.ogImage,
  ogType = DEFAULT_SEO.ogType,
  keywords = DEFAULT_SEO.keywords,
  structuredData
}) => {
  // Use passed structuredData or default to full MedicalClinic & Physician Schema Graph
  const schemaToInject = structuredData || generateFullClinicSchemaGraph();

  return (
    <Helmet>
      {/* 1. Primary Document Information */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Dr. Jay Bhatt (BHMS)" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />

      {/* 2. Open Graph Protocol (Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Shri Sai Clinic" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Dr. Jay Bhatt (BHMS) at Shri Sai Clinic, Vansda" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="gu_IN" />

      {/* 3. Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* 4. Local SEO Geo Tags (Vansda, Gujarat, India) */}
      <meta name="geo.region" content="IN-GJ" />
      <meta name="geo.placename" content="Vansda, Gujarat, India" />
      <meta name="geo.position" content="20.7570;73.3670" />
      <meta name="ICBM" content="20.7570, 73.3670" />

      {/* 5. Medical Schema.org JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaToInject)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
