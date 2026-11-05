import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { BlogPost } from "@/types/blog"
import { CardWithCorners } from "@/components/ui/card-with-corners"
import { Badge } from "@/components/ui/badge"

interface Props {
  posts: BlogPost[]
  showViewMore?: boolean
}

export default function BlogGrid({ posts, showViewMore = false }: Props) {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <CardWithCorners className="group h-full border-2 border-black bg-white p-5 transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0_#00b8d4]">
              <div className="mb-4 flex justify-between gap-4 font-mono text-[10px] uppercase tracking-wide text-neutral-500">
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{new Date(post.date).toLocaleDateString()}</span>
                <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{post.author?.name ?? (process.env.NEXT_PUBLIC_FULL_NAME || "Somin Dadhaniya")}</span>
              </div>
              <h3 className="mb-3 text-xl font-extrabold leading-tight tracking-tight text-black transition-colors group-hover:text-cyan-800">{post.title}</h3>
              <p className="mb-4 line-clamp-3 font-mono text-xs leading-6 text-neutral-600">{post.summary}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => <Badge key={tag} className="border border-black bg-black px-2 py-1 font-mono text-[10px] text-white">{tag}</Badge>)}
              </div>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-primary/70">Read more <ArrowRight className="h-3.5 w-3.5" /></span>
            </CardWithCorners>
          </Link>
        ))}
      </div>
      {showViewMore && <div className="mt-12 text-center"><Link href="/blog" className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-800 hover:text-black">View all writing →</Link></div>}
    </>
  )
}
