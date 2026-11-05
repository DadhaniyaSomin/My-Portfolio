import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { BlogPost } from "@/types/blog"
import { formatDate } from "@/lib/formatDate"
import { BgGradient } from "@/components/ui/bg-gradient"
import { ArrowLeft, Clock, Eye } from "lucide-react"
import readingDuration from "reading-duration"
import { SITE_URL } from "@/lib/utils"
import MarkdownContent from "@/components/MarkdownContent"
import BlogTableOfContents from "@/components/BlogTableOfContents"
import { Client } from "@notionhq/client"
import { NotionToMarkdown } from "notion-to-md"

function generateBlogPostSchema(post: BlogPost, content: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: process.env.NEXT_PUBLIC_FULL_NAME || "Somin Dadhaniya",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: process.env.NEXT_PUBLIC_FULL_NAME || "Somin Dadhaniya",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.id}`,
    },
    wordCount: content?.split(/\s+/).length || 0,
    articleSection: "Technology",
    inLanguage: "en-US",
  }
}

type ApiResponse = {
  post: BlogPost
  content: string
}

async function getBlogData(slug: string): Promise<ApiResponse | null> {
  console.log("🚀 getBlogData called with slug:", slug)

  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  const n2m = new NotionToMarkdown({ notionClient: notion })

  if (!process.env.NOTION_TOKEN) {
    console.error("❌ Missing NOTION_TOKEN")
    return null
  }

  try {
    console.log("📡 Querying Notion database to find page by slug...")
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    })

    console.log("📊 Query results:", response.results.length)

    if (response.results.length === 0) {
      console.error("❌ No page found with slug:", slug)
      return null
    }

    const page: any = response.results[0]
    console.log("✅ Found page:", page.id)

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

    const authorData = props.Author?.people?.[0] || page.created_by

    const post = {
      id: page.id,
      slug: slug,
      title: props.Name?.title?.[0]?.plain_text ?? "Untitled",
      summary: props.Summary?.rich_text?.[0]?.plain_text ?? "",
      tags: props.Tags?.multi_select?.map((t: any) => t.name) ?? [],
      date: page.created_time,
      coverImage,
      author: {
        name: authorData?.name ?? (process.env.NEXT_PUBLIC_FULL_NAME || "Somin Dadhaniya"),
        avatar: authorData?.avatar_url ?? null,
      },
    }

    console.log("📝 Converting page to Markdown...")
    const mdBlocks = await n2m.pageToMarkdown(page.id)
    const mdString = await n2m.toMarkdownString(mdBlocks)

    console.log("✅ Successfully fetched blog data")
    return {
      post,
      content: mdString.parent,
    }
  } catch (error) {
    console.error("❌ Failed to fetch blog data:", error)
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = await getBlogData(slug)

  if (!data) return { title: "Blog Not Found" }

  const { post } = data

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [process.env.NEXT_PUBLIC_FULL_NAME || "Somin Dadhaniya"],
      images: [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [],
    },
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = await getBlogData(slug)

  if (!data) notFound()

  const { post, content } = data

  const blogPostSchema = generateBlogPostSchema(post, content)

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-black">
      {/* BlogPosting JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />

      {/* HERO */}
      <header className="border-b-2 border-black bg-neutral-50 pb-10 pt-28 md:pb-14">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <div>
            <Link href="/blog" className="mb-6 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-neutral-600 hover:text-cyan-800">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <h1 className="mb-5 max-w-4xl text-4xl font-extrabold uppercase leading-[.95] tracking-[-.06em] text-black md:text-6xl xl:text-7xl">{post.title}</h1>
            <p className="mb-6 max-w-2xl font-mono text-sm leading-7 text-neutral-700 md:text-base">{post.summary}</p>

            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-foreground/60">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                {readingDuration(content || "")}
              </span>
            </div>
          </div>

        </div>
      </header>


      {/* CONTENT */}
      <div className="container mx-auto max-w-6xl pt-4 pb-16 relative px-4 md:px-6">
        <BgGradient />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <article className="max-w-none min-w-0 order-2 lg:order-1">
            <MarkdownContent content={content} />
          </article>

          <div className="order-1 lg:order-2 hidden lg:block">
            <BlogTableOfContents content={content} />
          </div>
        </div>
      </div>
    </div>
  )
}
