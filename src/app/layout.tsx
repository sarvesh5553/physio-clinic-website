import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://www.drbhagyashrisphysio.com"
  ),

  title: {
    default:
      "Dr. Bhagyashri Salunke | Physiotherapist in Pune",
    template:
      "%s | Dr. Bhagyashri Salunke PhysioCare",
  },

  description:
    "Dr. Bhagyashri Salunke provides professional physiotherapy and rehabilitation care in Pune, including pain management, injury rehabilitation, home visit physiotherapy and online physiotherapy consultations.",

  keywords: [
    "Dr Bhagyashri Salunke",
    "Dr Bhagyashri Salunke physiotherapist",
    "Bhagyashri physiotherapy",
    "Bhagyashri physiotherapist Pune",
    "Dr Bhagyashri physiotherapy",
    "PhysioCare Pune",

    "physiotherapist in Pune",
    "physiotherapy in Pune",
    "best physiotherapist in Pune",
    "physiotherapy clinic in Pune",
    "physiotherapy treatment in Pune",

    "home visit physiotherapy Pune",
    "home visit physiotherapist Pune",
    "physiotherapist at home Pune",
    "physiotherapy at home Pune",
    "home physiotherapy Pune",

    "online physiotherapy",
    "online physiotherapy consultation",
    "online physiotherapist",
    "online physiotherapy India",
    "online physiotherapy consultation Pune",

    "Electrotherapy Pune",
    "Pain Management Pune",
    "Manual Therapy Pune",
    "Exercise Therapy Pune",
    "Neuro Rehabilitation Pune",
    "Sports Rehabilitation Pune",
    "Post Surgical Rehabilitation Pune",
    "Posture Correction Pune",
    "Dry Needling Pune",
    "Cupping Therapy Pune",
    "Kinesio Taping Pune",

    "Back Pain Pune",
    "Neck Pain Pune",
    "Sciatica Pune",
    "Frozen Shoulder Pune",
    "Arthritis Pune",
    "Knee Pain Pune",
    "Shoulder Pain Pune",
    "Tennis Elbow Pune",
    "Slip Disc Pune",
    "Sports Injury Pune",
    "Hip Pain Pune",
    "Ankle Sprain Pune",
    "Muscle Strain Pune",
    "Joint Stiffness Pune",
    "Postural Problems Pune",
    "Ligament Injury Pune",
    "Plantar Fasciitis Pune",
    "Chronic Pain Pune",
  ],

  authors: [
    {
      name: "Dr. Bhagyashri Salunke",
    },
  ],

  creator:
    "Dr. Bhagyashri Salunke",

  publisher:
    "Dr. Bhagyashri Salunke PhysioCare",

  applicationName:
    "PhysioCare",

  category: "health",

  alternates: {
    canonical:
      "https://www.drbhagyashrisphysio.com",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",

    locale: "en_IN",

    url:
      "https://www.drbhagyashrisphysio.com",

    siteName:
      "Dr. Bhagyashri Salunke PhysioCare",

    title:
      "Dr. Bhagyashri Salunke | Physiotherapist in Pune",

    description:
      "Professional physiotherapy and rehabilitation care by Dr. Bhagyashri Salunke in Pune, including home visit and online physiotherapy services.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt:
          "Dr. Bhagyashri Salunke PhysioCare - Physiotherapy in Pune",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Dr. Bhagyashri Salunke | Physiotherapist in Pune",

    description:
      "Professional physiotherapy and rehabilitation care by Dr. Bhagyashri Salunke.",

    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />

        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="teal"
        />

        <meta
          name="theme-color"
          content="#0f969c"
        />
      </head>

      <body suppressHydrationWarning>
        {/* =====================================================
            SEO STRUCTURED DATA
        ===================================================== */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context":
                "https://schema.org",

              "@graph": [
                {
                  "@type": "WebSite",

                  "@id":
                    "https://www.drbhagyashrisphysio.com/#website",

                  url:
                    "https://www.drbhagyashrisphysio.com",

                  name:
                    "Dr. Bhagyashri Salunke PhysioCare",

                  description:
                    "Professional physiotherapy and rehabilitation services by Dr. Bhagyashri Salunke.",

                  inLanguage: "en-IN",

                  publisher: {
                    "@id":
                      "https://www.drbhagyashrisphysio.com/#person",
                  },
                },

                {
                  "@type": "Person",

                  "@id":
                    "https://www.drbhagyashrisphysio.com/#person",

                  name:
                    "Dr. Bhagyashri Salunke",

                  jobTitle:
                    "Physiotherapist & Rehabilitation Specialist",

                  url:
                    "https://www.drbhagyashrisphysio.com",

                  telephone:
                    "+919322518895",

                  email:
                    "drbhagyashrisalunkept@gmail.com",

                  image:
                    "https://www.drbhagyashrisphysio.com/bhagyashri1.png",

                  description:
                    "Dr. Bhagyashri Salunke is a Bachelor of Physiotherapy professional and Physiotherapist & Rehabilitation Specialist.",

                  worksFor: {
                    "@id":
                      "https://www.drbhagyashrisphysio.com/#business",
                  },

                  hasOccupation: {
                    "@type":
                      "Occupation",

                    name:
                      "Physiotherapist",

                    occupationalCategory:
                      "Physiotherapy and Rehabilitation",
                  },

                  hasCredential: [
                    {
                      "@type":
                        "EducationalOccupationalCredential",

                      credentialCategory:
                        "Bachelor of Physiotherapy",

                      name:
                        "Bachelor of Physiotherapy",
                    },

                    {
                      "@type":
                        "EducationalOccupationalCredential",

                      name:
                        "Certified Diversified Needling Therapist",
                    },

                    {
                      "@type":
                        "EducationalOccupationalCredential",

                      name:
                        "Certified Diversified Cupping Therapist",
                    },

                    {
                      "@type":
                        "EducationalOccupationalCredential",

                      name:
                        "Certified IAFM Therapist",
                    },

                    {
                      "@type":
                        "EducationalOccupationalCredential",

                      name:
                        "Therapeutic Taping Practitioner",
                    },
                  ],

                  knowsAbout: [
                    "Physiotherapy",
                    "Rehabilitation",
                    "Pain Management",
                    "Manual Therapy",
                    "Exercise Therapy",
                    "Neuro Rehabilitation",
                    "Sports Rehabilitation",
                    "Post Surgical Rehabilitation",
                    "Posture Correction",
                    "Dry Needling",
                    "Dry and Wet Cupping",
                    "Kinesio Taping",
                    "Home Visit Physiotherapy",
                    "Online Physiotherapy",
                  ],

                  sameAs: [
                    "https://www.instagram.com/drbhagyashrisphysiocare",
                    "https://youtube.com/@physiocare18",
                  ],
                },

                {
                  "@type":
                    "MedicalBusiness",

                  "@id":
                    "https://www.drbhagyashrisphysio.com/#business",

                  name:
                    "Dr. Bhagyashri Salunke PhysioCare",

                  url:
                    "https://www.drbhagyashrisphysio.com",

                  telephone:
                    "+919322518895",

                  email:
                    "drbhagyashrisalunkept@gmail.com",

                  description:
                    "Physiotherapy and rehabilitation services including pain management, manual therapy, exercise therapy, neuro rehabilitation, sports rehabilitation, post-surgical rehabilitation, posture correction, dry needling, cupping and kinesio taping.",

                  image:
                    "https://www.drbhagyashrisphysio.com/bhagyashri1.png",

                  medicalSpecialty:
                    "PhysicalTherapy",

                  employee: {
                    "@id":
                      "https://www.drbhagyashrisphysio.com/#person",
                  },

                  areaServed: [
                    {
                      "@type":
                        "City",
                      name: "Pune",
                    },

                    {
                      "@type":
                        "Place",
                      name: "Pirangut",
                    },

                    {
                      "@type":
                        "Place",
                      name: "Baner",
                    },

                    {
                      "@type":
                        "Place",
                      name: "Hinjawadi",
                    },

                    {
                      "@type":
                        "Place",
                      name: "Balewadi",
                    },

                    {
                      "@type":
                        "Place",
                      name: "Pashan",
                    },

                    {
                      "@type":
                        "Place",
                      name: "Wakad",
                    },
                  ],

                  availableService: [
                    {
                      "@type":
                        "MedicalTherapy",
                      name:
                        "Electrotherapy",
                    },

                    {
                      "@type":
                        "MedicalTherapy",
                      name:
                        "Pain Management",
                    },

                    {
                      "@type":
                        "MedicalTherapy",
                      name:
                        "Manual Therapy",
                    },

                    {
                      "@type":
                        "MedicalTherapy",
                      name:
                        "Exercise Therapy",
                    },

                    {
                      "@type":
                        "MedicalTherapy",
                      name:
                        "Neuro Rehabilitation",
                    },

                    {
                      "@type":
                        "MedicalTherapy",
                      name:
                        "Sports Rehabilitation",
                    },

                    {
                      "@type":
                        "MedicalTherapy",
                      name:
                        "Post Surgical Rehabilitation",
                    },

                    {
                      "@type":
                        "MedicalTherapy",
                      name:
                        "Posture Correction",
                    },

                    {
                      "@type":
                        "MedicalTherapy",
                      name:
                        "Dry Needling",
                    },

                    {
                      "@type":
                        "MedicalTherapy",
                      name:
                        "Dry and Wet Cupping",
                    },

                    {
                      "@type":
                        "MedicalTherapy",
                      name:
                        "Kinesio Taping",
                    },

                    {
                      "@type":
                        "Service",
                      name:
                        "Home Visit Physiotherapy",
                    },

                    {
                      "@type":
                        "Service",
                      name:
                        "Online Physiotherapy Consultation",
                    },
                  ],

                  sameAs: [
                    "https://www.instagram.com/drbhagyashrisphysiocare",
                    "https://youtube.com/@physiocare18",
                  ],
                },

                {
                  "@type":
                    "Service",

                  "@id":
                    "https://www.drbhagyashrisphysio.com/#home-visits",

                  name:
                    "Home Visit Physiotherapy",

                  provider: {
                    "@id":
                      "https://www.drbhagyashrisphysio.com/#business",
                  },

                  areaServed: [
                    {
                      "@type":
                        "City",
                      name: "Pune",
                    },

                    {
                      "@type":
                        "Place",
                      name: "Pirangut",
                    },

                    {
                      "@type":
                        "Place",
                      name: "Baner",
                    },

                    {
                      "@type":
                        "Place",
                      name: "Hinjawadi",
                    },

                    {
                      "@type":
                        "Place",
                      name: "Balewadi",
                    },

                    {
                      "@type":
                        "Place",
                      name: "Pashan",
                    },

                    {
                      "@type":
                        "Place",
                      name: "Wakad",
                    },
                  ],

                  description:
                    "Home visit physiotherapy services are available in Pune and nearby areas, subject to availability.",
                },

                {
                  "@type":
                    "Service",

                  "@id":
                    "https://www.drbhagyashrisphysio.com/#online-physiotherapy",

                  name:
                    "Online Physiotherapy Consultation",

                  provider: {
                    "@id":
                      "https://www.drbhagyashrisphysio.com/#business",
                  },

                  areaServed: {
                    "@type":
                      "Country",

                    name: "India",
                  },

                  description:
                    "Online physiotherapy consultations are available for patients outside Pune, subject to appointment availability.",
                },
              ],
            }),
          }}
        />

        {children}
      </body>
    </html>
  );
}