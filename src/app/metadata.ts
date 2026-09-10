import type { Metadata } from "next";

const siteUrl = "https://samyakdeshar.vercel.app";
const fullName = "Samyak Deshar";
const jobTitle = "Data Scientist & Machine Learning Engineer";

const description =
  "Samyak Deshar is a Data Scientist and Machine Learning Engineer based in Kathmandu, Nepal. Explore his portfolio of AI, ML, Power BI, and data analytics projects built with Python, TensorFlow, Streamlit, and more.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: fullName,
    template: `%s | ${fullName}`,
  },

  description,

  keywords: [
    "Samyak Deshar",
    "Samyak Deshar portfolio",
    "Data Scientist Nepal",
    "Machine Learning Engineer Nepal",
    "Data Analyst",
    "AI Engineer",
    "Python developer",
    "Power BI dashboard",
    "TensorFlow",
    "scikit-learn",
    "Streamlit",
    "NLP engineer",
    "deep learning",
    "data visualization",
    "Kathmandu data scientist",
    "ML projects",
    "CropAI",
    "NEPSE AI",
    "fake news detection",
  ],

  authors: [{ name: fullName, url: siteUrl }],
  creator: fullName,
  publisher: fullName,

  category: "technology",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: fullName,
    title: fullName,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${fullName} — ${jobTitle}`,
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: fullName,
    description,
    images: [
      {
        url: "/og-image.png",
        alt: `${fullName} — ${jobTitle}`,
      },
    ],
    creator: "@samyakdeshar",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  manifest: "/manifest.webmanifest",

  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
    shortcut: "/icon.svg",
  },

  alternates: {
    canonical: siteUrl,
  },

  verification: {
    // Add Google Search Console / Bing verification tokens here when available
    // google: "your-google-verification-token",
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: fullName,
  url: siteUrl,
  image: `${siteUrl}/og-image.png`,
  jobTitle,
  description:
    "Data Scientist and Machine Learning Engineer with hands-on experience in machine learning, deep learning, NLP, data analytics, Power BI dashboards, and intelligent automation.",
  email: "sdeshar9803@gmail.com",
  telephone: "+9779847903839",
  sameAs: [
    "https://www.linkedin.com/in/samyak-deshar-081917279/",
    "https://github.com/Sleepyhead46",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Advanced College of Engineering and Management",
  },
  knowsAbout: [
    "Data Science",
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "Data Analysis",
    "Python",
    "Power BI",
    "TensorFlow",
    "scikit-learn",
    "SQL",
    "Streamlit",
    "Data Visualization",
    "ETL",
    "Statistical Analysis",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: jobTitle,
    occupationLocation: {
      "@type": "Country",
      name: "Nepal",
    },
    skills: "Python, Machine Learning, Deep Learning, Power BI, SQL, NLP",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": siteUrl,
  },
};
