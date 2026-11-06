import { HeroSection } from "@/components/HeroSection"
import { TechStackSection } from "@/components/TechStackSection"
import { AboutSection } from "@/components/AboutSection"
import { ExperienceSection } from "@/components/ExperienceSection"
import { EngineeringApproachSection } from "@/components/EngineeringApproachSection"
import { BlogSection } from "@/components/BlogSection"
import ProjectSection from "@/components/ProjectSection"
import { ProofSection } from "@/components/ProofSection"
import { BlogPost } from "@/types/blog"
import { Client } from "@notionhq/client"
import { fetchFeaturedGitHubRepos } from "@/services/github"


async function getInitialData() {
  console.log("🚀 Fetching homepage data")

  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  const DATABASE_ID = process.env.NOTION_DATABASE_ID

  if (!process.env.NOTION_TOKEN || !DATABASE_ID) {
    console.error("❌ Missing Notion environment variables")
    return { blogs: [] }
  }

  try {
    console.log("📡 Querying Notion for homepage blogs...")
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      // Temporarily removed filter to see all pages
      // filter: {
      //   property: "Status",
      //   status: {
      //     equals: "Done",
      //   },
      // },
      sorts: [
        {
          timestamp: "created_time",
          direction: "descending",
        },
      ],
    })

    const posts = response.results.map((page: any) => {
      const props = page.properties

      let coverImage = "/placeholder.svg"
      // Check page-level cover first
      if (page.cover) {
        if (page.cover.type === "files") {
          coverImage = page.cover.files[0]?.type === "external"
            ? page.cover.files[0]?.external?.url
            : page.cover.files[0]?.file?.url
        } else {
          coverImage = page.cover.type === "external"
            ? page.cover.external.url
            : page.cover.file.url
        }
      }
      // Check property-level cover as fallback
      else if (props.cover && props.cover.type === "files" && props.cover.files?.length > 0) {
        coverImage = props.cover.files[0]?.type === "external"
          ? props.cover.files[0]?.external?.url
          : props.cover.files[0]?.file?.url
      }

      console.log("coverImage", coverImage)
      const authorData = props.Author?.people?.[0] || page.created_by

      return {
        id: page.id,
        title: props.Name?.title?.[0]?.plain_text ?? "Untitled",
        slug: props.Slug?.rich_text?.[0]?.plain_text ?? page.id,
        summary: props.Summary?.rich_text?.[0]?.plain_text ?? "",
        tags: props.Tags?.multi_select?.map((t: any) => t.name) ?? [],
        date: page.created_time,
        coverImage: coverImage,
        author: {
          name: authorData?.name ?? (process.env.NEXT_PUBLIC_FULL_NAME || "Somin Dadhaniya"),
          avatar: authorData?.avatar_url ?? null,
        }
      }
    })

    console.log("✅ Successfully mapped", posts.length, "posts for homepage")

    return {
      blogs: posts.slice(0, 3) as BlogPost[],
    }
  } catch (error) {
    console.error("❌ Error fetching homepage data:", error)
    return { blogs: [] }
  }
}

async function getInitialProjects() {
  try {
    const repos = await fetchFeaturedGitHubRepos()
    return repos.map((repo) => ({
      id: String(repo.id),
      title: repo.name.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()),
      url: repo.html_url.replace("https://", ""),
      logoUrl: "/placeholder.webp",
      description: repo.description || undefined,
      language: repo.language || undefined,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
    }))
  } catch (error) {
    console.error("Failed to fetch featured GitHub projects:", error)
    return []
  }
}

const Index = async () => {
  const [{ blogs }, projects] = await Promise.all([getInitialData(), getInitialProjects()])

  return (
    <div className="min-h-screen bg-white text-black">
      <HeroSection />
      <ProofSection />
      <ExperienceSection />
      <AboutSection />
      <TechStackSection />
      <ProjectSection initialProjects={projects} />
      <EngineeringApproachSection />
      <BlogSection initialPosts={blogs} />
    </div>
  )
}

export default Index
