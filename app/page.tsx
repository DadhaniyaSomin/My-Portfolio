import { HeroSection } from "@/components/HeroSection"
import { ContactSection } from "@/components/ContactSection"
import { TechStackSection } from "@/components/TechStackSection"
import { AboutSection } from "@/components/AboutSection"
import { ExperienceSection } from "@/components/ExperienceSection"
import { BlogSection } from "@/components/BlogSection"
import { BlogPost } from "@/types/blog"
import { Client } from "@notionhq/client"

import { SITE_URL } from "@/lib/utils"

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
