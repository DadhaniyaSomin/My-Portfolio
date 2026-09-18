"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BlogPost } from "@/types/blog"
import { BlogCardSkeleton } from "@/components/BlogCardSkeleton"
import { BlogCard } from "./BlogCard"
import { SectionHeading } from "./SectionHeading"

export function BlogSection({ initialPosts }: { initialPosts?: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts || [])
  const [loading, setLoading] = useState(!initialPosts)

  useEffect(() => {
    if (initialPosts) return;

    const load = async () => {
      try {
        const res = await fetch("/api/blog")
        if (!res.ok) throw new Error("Failed to fetch blogs")
        const data = await res.json()
        setPosts(data.slice(0, 3))
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [initialPosts])

  return (
    <section id="blog" className="py-20 bg-background transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <SectionHeading
          eyebrow="03 / Field Notes"
          title="Latest Blogs"
          description="Practical notes on backend engineering, distributed systems, and lessons learned while building."
        />

        {/* Loader */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="hidden lg:block"><BlogCardSkeleton /></div>
            <div className="hidden md:block"><BlogCardSkeleton /></div>
            <div className="block"><BlogCardSkeleton /></div>
          </div>
        )}

        {/* Blogs */}
        {!loading && posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* CTA */}
            <div className="flex justify-center mt-16">
              <Link
                href="/blog"
                className="flex gap-2 items-center text-muted-foreground hover:text-foreground group transition-colors"
              >
                <span className="text-lg font-medium">View more blogs</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-center text-gray-500">No blogs yet - I'm working on some posts!</p>
        )}
      </div>
    </section>
  )
}

export default BlogSection
