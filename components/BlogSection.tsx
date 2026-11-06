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
    <section id="blog" className="border-b border-neutral-200 bg-white py-20">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <SectionHeading
          eyebrow="06 / Writing"
          title="Field notes."
          description="Field notes from building backend systems: Go and PHP patterns, API design, database performance, and the tradeoffs behind reliable software."
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
                className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-cyan-800 transition-colors hover:text-black"
              >
                <span>View all writing</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
