"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { BlogPost } from "@/types/blog"
import { BlogCard } from "@/components/BlogCard"

export default function BlogSearch({ posts, totalCount }: { posts: BlogPost[]; totalCount?: number }) {
  const [query, setQuery] = useState("")

  const filtered = posts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.summary.toLowerCase().includes(query.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <>
      {/* Search box */}
      <div className="relative mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input
          placeholder="Search blogs by title, summary, or tags..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full bg-muted/50 border border-border rounded-2xl py-4 pl-12 pr-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors duration-300"
        />
      </div>

      {filtered.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          {totalCount !== undefined && (
            <p className="text-center text-muted-foreground text-sm mt-4">
              Showing {filtered.length} of {totalCount} posts
            </p>
          )}
        </>
      ) : (
        <div className="text-center py-20 text-gray-500">
          No blogs found matching your search.
        </div>
      )}
    </>
  )
}
