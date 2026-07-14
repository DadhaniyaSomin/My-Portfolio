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
    image: post.coverImage ?? undefined,
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
      images: post.coverImage
        ? [
          {
            url: post.coverImage,
            alt: post.title,
          },
        ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: post.coverImage ? [post.coverImage] : [],
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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      {/* BlogPosting JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />

      {/* HERO */}
      <div className="relative min-h-[50vh] md:min-h-[60vh] flex flex-col justify-end pb-8 pt-16 md:pt-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.coverImage})` }}
        >
          <div className="absolute inset-0 bg-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto max-w-6xl px-4 md:px-6">

          <Link href="/blog" className="flex items-center gap-2 text-foreground/70 mb-4 md:mb-5 hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{post.title}</h1> */}

          {/* <p className="text-foreground/70 mb-6 text-base md:text-lg line-clamp-3 md:line-clamp-2">{post.summary}</p> */}

          <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-foreground/60">

            <span className="flex gap-1.5 items-center">
              <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
              {formatDate(post.date)}
            </span>

            <span className="flex gap-1.5 items-center">
              <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
              {readingDuration(content || "")}
            </span>

          </div>
        </div>
      </div>


      {/* DIVIDER */}
      <div className="container mx-auto max-w-6xl py-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

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
