"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BlogPost } from "@/types/blog"
import { BlogCardSkeleton } from "@/components/BlogCardSkeleton"
import { BlogCard } from "./BlogCard"

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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground uppercase tracking-tight">
            Latest Blogs
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web & mobile development
          </p>
        </div>

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
          <p className="text-center text-gray-500">No blogs found.</p>
        )}
      </div>
    </section>
  )
}

export default BlogSection
