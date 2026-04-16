
import { HeroSection } from "@/components/HeroSection"
import { ContactSection } from "@/components/ContactSection"
import ProjectSection from "@/components/ProjectSection"
import { TechStackSection } from "@/components/TechStackSection"
import { AboutSection } from "@/components/AboutSection"
import { ExperienceSection } from "@/components/ExperienceSection"
import { BlogSection } from "@/components/BlogSection"

import { SITE_URL } from "@/lib/utils"

async function getInitialData() {
  try {
    const [blogsRes, projectsRes] = await Promise.all([
      fetch(`${SITE_URL}/api/blog`, {
        cache: "force-cache",
        headers: { "x-api-secret": process.env.INTERNAL_API_SECRET || "" },
      }),
      fetch(`${SITE_URL}/api/github`, {
        cache: "force-cache",
        headers: { "x-api-secret": process.env.INTERNAL_API_SECRET || "" },
      }),
    ])

    const blogs = blogsRes.ok ? await blogsRes.json() : []
    const projects = projectsRes.ok ? await projectsRes.json() : []

    // Format GitHub repos into Project format
    const formattedProjects = projects.map((repo: any) => ({
      id: repo.id.toString(),
      title: repo.name
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      url: repo.html_url.replace('https://', ''),
      logoUrl: `/placeholder.webp`,
      description: repo.description || undefined,
      language: repo.language || undefined,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
    }))

    return {
      blogs: blogs.slice(0, 3),
      projects: formattedProjects,
    }
  } catch (error) {
    console.error("Error fetching homepage data:", error)
    return { blogs: [], projects: [] }
  }
}

const Index = async () => {
  const { blogs, projects } = await getInitialData()

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <TechStackSection />
      <ProjectSection initialProjects={projects} />
      <BlogSection initialPosts={blogs} />
    </div>
  )
}

export default Index
