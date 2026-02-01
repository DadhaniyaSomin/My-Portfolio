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

type ApiResponse = {
  post: BlogPost
  content: string
}

async function getBlogData(slug: string): Promise<ApiResponse | null> {
  const res = await fetch(`${SITE_URL}/api/blog/${slug}`, {
    next: { revalidate: 3600 },
    headers: {
      "x-api-secret": process.env.INTERNAL_API_SECRET || "",
    },
  })

  if (!res.ok) return null
  return res.json()
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
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [{ url: post.coverImage ?? "" }],
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

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">

      {/* HERO */}
      <div className="relative min-h-[60vh] flex flex-col justify-end pb-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.coverImage})` }}
        >
          <div className="absolute inset-0 bg-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto max-w-6xl">

          <Link href="/blog" className="flex items-center gap-2 text-foreground/70 mb-5 hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <p className="text-foreground/70 mb-6">{post.summary}</p>

          <div className="flex gap-4 text-sm text-foreground/60">

            <span className="flex gap-1 items-center">
              <Clock className="w-4 h-4" />
              {formatDate(post.date)}
            </span>

            <span className="flex gap-1 items-center">
              <Eye className="w-4 h-4" />
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
      <div className="container mx-auto max-w-6xl pt-4 pb-16 relative">
        <BgGradient />

        <article className="max-w-none">
          <MarkdownContent content={content} />
        </article>
      </div>
    </div>
  )
}
