"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { BlogPost } from "@/types/blog"
import BlogSearch from "./search"

export default function BlogClientPagination({ posts, allTags }: { posts: BlogPost[]; allTags: string[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTag, setSelectedTag] = useState("")
  const postsPerPage = 9

  // Tag counts
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = posts.filter(post => post.tags.includes(tag)).length
    return acc
  }, {} as Record<string, number>)

  const sortedTags = [...allTags].sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0))
  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag)
    setCurrentPage(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div className="mb-8 flex flex-wrap justify-start gap-2">
          <button
            onClick={() => handleTagChange("")}
            className={`border border-black px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-widest transition-colors ${!selectedTag
              ? "bg-primary text-black dark:bg-primary dark:text-primary-foreground"
              : "bg-white text-black hover:bg-cyan-50 dark:bg-card dark:text-foreground dark:hover:bg-primary dark:hover:text-primary-foreground"
              }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagChange(tag)}
            className={`border border-black px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-widest transition-colors ${selectedTag === tag
              ? "bg-primary text-black dark:bg-primary dark:text-primary-foreground"
              : "bg-white text-black hover:bg-cyan-50 dark:bg-card dark:text-foreground dark:hover:bg-primary dark:hover:text-primary-foreground"
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Client search */}
      <BlogSearch posts={paginatedPosts} totalCount={filteredPosts.length} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`border border-black p-2 hover:bg-cyan-50 transition-colors ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""
              }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Smart pagination with ellipsis */}
          {(() => {
            const pages = []
            const maxVisible = 5

            if (totalPages <= maxVisible) {
              // Show all pages if total is small
              for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
              }
            } else {
              // Always show first page
              pages.push(1)

              if (currentPage > 3) {
                pages.push("...")
              }

              // Show pages around current
              const start = Math.max(2, currentPage - 1)
              const end = Math.min(totalPages - 1, currentPage + 1)

              for (let i = start; i <= end; i++) {
                pages.push(i)
              }

              if (currentPage < totalPages - 2) {
                pages.push("...")
              }

              // Always show last page
              pages.push(totalPages)
            }

            return pages.map((page, index) => {
              if (page === "...") {
                return (
                  <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-muted-foreground">
                    ...
                  </span>
                )
              }

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page as number)}
                  className={`flex h-10 w-10 items-center justify-center border border-black font-mono text-xs font-semibold transition-colors ${currentPage === page
                    ? "bg-primary text-black"
                    : "bg-white hover:bg-cyan-50"
                    }`}
                >
                  {page}
                </button>
              )
            })
          })()}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`border border-black p-2 hover:bg-cyan-50 transition-colors ${currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
              }`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  )
}
