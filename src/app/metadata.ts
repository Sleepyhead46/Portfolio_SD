import type { Metadata } from "next";

const siteUrl = "https://samyakdeshar.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Samyak Deshar | Data Scientist & Machine Learning Engineer",
    template: "%s | Samyak Deshar",
  },
  description:
    "Portfolio of Samyak Deshar showcasing expertise in data science, machine learning, analytics, automation, and AI projects.",
  keywords: [
    "Data Science",
    "Machine Learning",
    "AI Engineer",
    "Data Analyst",
    "Python",
    "Power BI",
    "TensorFlow",
    "SQL",
    "NLP",
    "Streamlit",
  ],
  authors: [{ name: "Samyak Deshar", url: siteUrl }],
  creator: "Samyak Deshar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Samyak Deshar",
    title: "Samyak Deshar | Data Scientist & Machine Learning Engineer",
    description:
      "Portfolio of Samyak Deshar showcasing expertise in data science, machine learning, analytics, automation, and AI projects.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Samyak Deshar — Data Scientist & Machine Learning Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samyak Deshar | Data Scientist & Machine Learning Engineer",
    description:
      "Portfolio of Samyak Deshar showcasing expertise in data science, machine learning, analytics, automation, and AI projects.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Samyak Deshar",
  url: siteUrl,
  jobTitle: "Data Scientist & Machine Learning Engineer",
  description:
    "Data professional with hands-on experience in machine learning, data analysis, dashboard development, and workflow automation.",
  email: "sdeshar9803@gmail.com",
  telephone: "+9779847903839",
  sameAs: ["https://www.linkedin.com/in/samyak-deshar-081917279/"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "Nepal",
  },
  knowsAbout: [
    "Data Science",
    "Machine Learning",
    "Data Analysis",
    "Python",
    "Power BI",
    "TensorFlow",
    "SQL",
    "NLP",
  ],
};
