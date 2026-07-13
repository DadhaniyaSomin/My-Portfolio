"use client"

import Link from "next/link"
import { Calendar, User, Clock, ArrowRight } from "lucide-react"
import { BlogPost } from "@/types/blog"
import { CardWithCorners } from "@/components/ui/card-with-corners"
import { Badge } from "@/components/ui/badge"

type Props = {
  post: BlogPost
}

export function BlogCard({ post }: Props) {
  const tagColors: Record<string, string> = {
    'golang': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'programming': 'bg-green-500/10 text-green-500 border-green-500/20',
    'concurruncy': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'docker': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    'laravel': 'bg-red-500/10 text-red-500 border-red-500/20',
  }

  const getTagColor = (tag: string) => {
    const lowerTag = tag.toLowerCase()
    return tagColors[lowerTag] || 'text-primary border-primary/20'
  }

  return (
    <Link href={`/blog/${post.slug}`}>
      <CardWithCorners className="group cursor-pointer overflow-hidden border-border/50">

        {/* Cover Image with Blur and Gradient Overlay */}
        <div className="aspect-video overflow-hidden relative -mx-6 -mt-6 mb-4">
          <img
            src={post.coverImage || "/placeholder.svg"}
            className="w-full h-full object-cover blur-sm"
            alt={post.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
        </div>

        <div className="space-y-3 px-1">

          {/* Metadata Row */}
          <div className="flex items-center justify-between text-xs text-muted-foreground/80">
            <span className="flex gap-1.5 items-center">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex gap-1.5 items-center">
              <User className="h-3.5 w-3.5" />
              {post.author?.name ?? (process.env.NEXT_PUBLIC_FULL_NAME || "Somin Dadhaniya")}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold  transition-colors line-clamp-2 leading-tight">
            {post.title}
          </h3>

          {/* Summary */}
          <p className="text-foreground/60 text-sm line-clamp-2 leading-relaxed">
            {post.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {post.tags.slice(0, 3).map(tag => (
              <Badge
                key={tag}
                className={`${getTagColor(tag)} text-xs font-medium px-2.5 py-1 transition-colors`}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Read More Indicator */}
          <div className="flex items-center gap-2 text-xs text-primary/70  transition-colors pt-2">
            <span>Read more</span>
            <ArrowRight className="h-3.5 w-3.5  transition-transform" />
          </div>

        </div>
      </CardWithCorners>
    </Link>
  )
}
