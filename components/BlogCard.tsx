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
  return (
    <Link href={`/blog/${post.slug}`}>
      <CardWithCorners className="group h-full cursor-pointer overflow-hidden border-2 border-black bg-white p-4 transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0_#00b8d4]">
        <div className="space-y-3 px-1 py-1">

          {/* Metadata Row */}
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wide text-neutral-500">
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
          <h3 className="text-xl font-extrabold tracking-tight text-black transition-colors group-hover:text-cyan-800 line-clamp-2 leading-tight">
            {post.title}
          </h3>

          {/* Summary */}
          <p className="font-mono text-xs text-neutral-600 line-clamp-2 leading-6">
            {post.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {post.tags.slice(0, 3).map(tag => (
              <Badge
                key={tag}
                className="border border-black bg-black px-2.5 py-1 text-xs font-mono font-medium text-white transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Read More Indicator */}
          <div className="flex items-center gap-2 text-xs text-primary/70  transition-colors pt-2">
            <span className="font-mono uppercase tracking-widest">Read more</span>
            <ArrowRight className="h-3.5 w-3.5  transition-transform" />
          </div>

        </div>
      </CardWithCorners>
    </Link>
  )
}
