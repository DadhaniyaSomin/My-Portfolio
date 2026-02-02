import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Header } from "@/components/Header"
import { PageTransition } from "@/components/PageTransition"
import { Toaster } from "@/components/ui/sonner"
import { GoogleAnalytics } from "@next/third-parties/google"
import { ContactSection } from "@/components/ContactSection"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Tushar Pankhaniya - Mobile Application Developer",
  description: "The portfolio of Tushar Pankhaniya, a Mobile Application Developer specializing in React Native and Flutter, showcasing projects and blog posts.",
  keywords: ["Tushar Pankhaniya", "Portfolio", "React Native Developer", "Flutter Developer", "Mobile App Developer"],
  openGraph: {
    title: "Tushar Pankhaniya - Mobile Application Developer",
    description: "The portfolio of Tushar Pankhaniya, a Mobile Application Developer specializing in React Native and Flutter, showcasing projects and blog posts.",
    url: "https://tusharpankhaniya.vercel.app",
    siteName: "Tushar Pankhaniya's Portfolio",
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} font-geist-sans`}>
        <Providers>
          <Header />
          <PageTransition>
            {children}
          </PageTransition>
          <ContactSection />
          <Toaster />
        </Providers>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
