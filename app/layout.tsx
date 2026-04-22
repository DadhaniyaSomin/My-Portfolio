import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Header } from "@/components/Header"
import { PageTransition } from "@/components/PageTransition"
import { Toaster } from "@/components/ui/sonner"
// import { GoogleAnalytics } from "@next/third-parties/google"
import { ContactSection } from "@/components/ContactSection"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const SITE_URL = "https://tusharpankhaniya.vercel.app"

// JSON-LD Structured Data
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tushar Pankhaniya",
  url: SITE_URL,
  image: `${SITE_URL}/profile.webp`,
  jobTitle: "Mobile Application Developer",
  worksFor: {
    "@type": "Organization",
    name: "WebMobTech Solutions Pvt. Ltd.",
    url: "https://webmobtech.com",
  },
  knowsAbout: [
    "React Native",
    "Flutter",
    "Mobile App Development",
    "TypeScript",
    "Cross-Platform Development",
  ],
  sameAs: [
    "https://github.com/tushar-2223",
    "https://www.linkedin.com/in/tushar2223",
    "https://www.instagram.com/tushar.p_22/",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Anand",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  email: "pankhaniyatushar9@gmail.com",
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Tushar Pankhaniya — Portfolio",
  url: SITE_URL,
  description:
    "Portfolio of Tushar Pankhaniya — React Native & Flutter developer building high-performance cross-platform mobile applications.",
  author: {
    "@type": "Person",
    name: "Tushar Pankhaniya",
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tushar Pankhaniya — React Native & Flutter Developer | Portfolio",
    template: "%s | Tushar Pankhaniya",
  },
  description:
    "Mobile app developer with 2+ years of experience shipping React Native & Flutter apps. View projects, blog posts, and get in touch to build your next mobile application.",
  keywords: [
    "Tushar Pankhaniya",
    "React Native Developer",
    "Flutter Developer",
    "Mobile App Developer",
    "Cross-Platform Developer",
    "React Native Portfolio",
    "Flutter Portfolio",
    "Mobile Application Developer India",
    "Hire React Native Developer",
    "Hire Flutter Developer",
  ],
  authors: [{ name: "Tushar Pankhaniya", url: SITE_URL }],
  creator: "Tushar Pankhaniya",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Tushar Pankhaniya — React Native & Flutter Developer",
    description:
      "Mobile app developer with 2+ years of experience shipping React Native & Flutter apps. View projects, blog posts, and get in touch.",
    url: SITE_URL,
    siteName: "Tushar Pankhaniya — Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tushar Pankhaniya — React Native & Flutter Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tushar Pankhaniya — React Native & Flutter Developer",
    description:
      "Mobile app developer shipping high-performance React Native & Flutter apps. View projects & blog.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} font-geist-sans`}>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Providers>
          <Header />
          <PageTransition>
            {children}
          </PageTransition>
          <ContactSection />
          <Toaster />
        </Providers>
        {/* <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} /> */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
