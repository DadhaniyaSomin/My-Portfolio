import { HeroSection } from "@/components/HeroSection"
import { ContactSection } from "@/components/ContactSection"
import { TechStackSection } from "@/components/TechStackSection"
import { AboutSection } from "@/components/AboutSection"
import { ExperienceSection } from "@/components/ExperienceSection"
import { BlogSection } from "@/components/BlogSection"

import { SITE_URL } from "@/lib/utils"

async function getInitialData() {
  try {
    const blogsRes = await fetch(`${SITE_URL}/api/blog`, {
      cache: "force-cache",
      headers: { "x-api-secret": process.env.INTERNAL_API_SECRET || "" },
    })

    const blogs = blogsRes.ok ? await blogsRes.json() : []

    return {
      blogs: blogs.slice(0, 3),
    }
  } catch (error) {
    console.error("Error fetching homepage data:", error)
    return { blogs: [] }
  }
}

const Index = async () => {
  const { blogs } = await getInitialData()

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <TechStackSection />
      <BlogSection initialPosts={blogs} />
    </div>
  )
}

export default Index
