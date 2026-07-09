import Link from "next/link"
import { Calendar, Clock, User, ArrowRight, ArrowLeft, Code, Database, Container, Zap } from "lucide-react"
import { BlogPost } from "@/types/blog"
import { CardWithCorners } from "@/components/ui/card-with-corners"
import { Badge } from "@/components/ui/badge"
import BlogSearch from "./search"
import { SITE_URL } from "@/lib/utils"
import type { Metadata } from "next"
import { Client } from "@notionhq/client"

export async function generateMetadata(): Promise<Metadata> {
  const fullName = process.env.NEXT_PUBLIC_FULL_NAME || "Somin Dadhaniya"
  return {
    title: `Blog — Backend Insights & Tutorials | ${fullName}`,
    description:
      `Read ${fullName}'s blog on Golang, Laravel, Docker, database optimization, and scalable backend architecture. Tutorials, tips, and system design insights.`,
    alternates: {
      canonical: `${SITE_URL}/blog`,
    },
    openGraph: {
      title: `Blog — Backend Insights | ${fullName}`,
      description:
        "Tutorials, insights, and tips on Golang, Laravel, Docker, and backend architecture.",
      url: `${SITE_URL}/blog`,
      type: "website",
    },
  }
}

async function getPosts() {
  console.log("🚀 Starting getPosts function")

  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  const DATABASE_ID = process.env.NOTION_DATABASE_ID

  console.log("📝 Environment Variables Check:")
  console.log("  - NOTION_TOKEN exists:", !!process.env.NOTION_TOKEN)
  console.log("  - NOTION_DATABASE_ID:", DATABASE_ID)

  if (!process.env.NOTION_TOKEN || !DATABASE_ID) {
    console.error("❌ Missing required environment variables")
    return []
  }

  try {
    console.log("📡 Querying Notion database...")
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

    console.log("✅ Notion query successful")
    console.log("📊 Total results:", response.results.length)
    console.log("📋 Raw results:", JSON.stringify(response.results, null, 2))

    const posts = response.results.map((page: any, index: number) => {
      const props = page.properties

      console.log(`\n📄 Processing post ${index + 1}:`)
      console.log("  - Page ID:", page.id)
      console.log("  - Properties:", JSON.stringify(props, null, 2))

      let coverImage = "/placeholder.svg"
      if (page.cover) {
        coverImage = page.cover.type === "external"
          ? page.cover.external.url
          : page.cover.file.url
        console.log("  - Cover image:", coverImage)
      }

      const authorData = props.Author?.people?.[0] || page.created_by
      console.log("  - Author:", authorData?.name || page.created_by?.name)

      const post = {
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

      console.log("  - Mapped post:", JSON.stringify(post, null, 2))
      return post
    })

    console.log("\n✅ Successfully mapped", posts.length, "posts")
    console.log("📦 Final posts array:", JSON.stringify(posts, null, 2))

    return posts as BlogPost[]
  } catch (error) {
    console.error("❌ Failed to fetch posts:", error)
    console.error("Error details:", JSON.stringify(error, null, 2))
    return []
  }
}

export default async function BlogListPage() {
  const posts: BlogPost[] = await getPosts()

  const topics = [
    { icon: Code, title: "Golang", desc: "Best practices & patterns" },
    { icon: Database, title: "Database", desc: "Optimization & scaling" },
    { icon: Container, title: "Docker", desc: "Containerization tips" },
    { icon: Zap, title: "Performance", desc: "System design insights" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">

        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground uppercase tracking-tight">
            Blogs
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about software engineering
          </p>
        </div>

        {/* Client search */}
        <BlogSearch posts={posts} />

        {/* Featured Topics - shown when no posts */}
        {posts.length === 0 && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Coming Soon
              </div>
              <h2 className="text-2xl font-bold mb-4">What I Write About</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                I'm working on in-depth tutorials and insights. Here's what you can expect:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topics.map((topic, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-2xl border border-border bg-card hover:bg-accent/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <topic.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground">{topic.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground text-sm">
                Stay tuned! Subscribe to get notified when new posts drop.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* background glow */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 -z-10" />
    </div>
  )
}
