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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://somindadhaniya.vercel.app"

// JSON-LD Structured Data
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Somin Dadhaniya",
  url: SITE_URL,
  image: `${SITE_URL}/profile.webp`,
  jobTitle: "Backend Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Webmobtech",
    url: "https://webmobtech.com",
  },
  knowsAbout: [
    "Golang",
    "PHP",
    "Laravel",
    "Backend Architecture",
    "Microservices",
    "Docker",
    "PostgreSQL",
    "RESTful APIs",
  ],
  sameAs: [
    "https://github.com/somindadhaniya",
    "https://www.linkedin.com/in/somin-dadhaniya",
    "https://www.instagram.com/somin_dadhaniya/",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  email: "somindadhaniya@gmail.com",
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Somin Dadhaniya — Portfolio",
  url: SITE_URL,
  description:
    "Portfolio of Somin Dadhaniya — Backend Software Engineer specializing in scalable systems, RESTful APIs, Golang, Laravel, Docker, and cloud-native infrastructure.",
  author: {
    "@type": "Person",
    name: "Somin Dadhaniya",
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Somin Dadhaniya — Backend Software Engineer | Portfolio",
    template: "%s | Somin Dadhaniya",
  },
  description:
    "Backend Software Engineer with 3 years of experience building scalable systems, RESTful APIs, and cloud-native infrastructure using Golang, Laravel, Docker, and PostgreSQL.",
  keywords: [
    "Somin Dadhaniya",
    "Backend Software Engineer",
    "Golang Developer",
    "Laravel Developer",
    "PHP Developer",
    "Backend Developer India",
    "Microservices",
    "REST API Developer",
    "Docker Kubernetes",
    "Backend Portfolio",
  ],
  authors: [{ name: "Somin Dadhaniya", url: SITE_URL }],
  creator: "Somin Dadhaniya",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Somin Dadhaniya — Backend Software Engineer",
    description:
      "Backend Software Engineer with 3 years of experience building scalable APIs, microservices, and cloud-native infrastructure.",
    url: SITE_URL,
    siteName: "Somin Dadhaniya — Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Somin Dadhaniya — Backend Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Somin Dadhaniya — Backend Software Engineer",
    description:
      "Backend Software Engineer building scalable APIs, microservices, and cloud-native systems. View projects & blog.",
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
