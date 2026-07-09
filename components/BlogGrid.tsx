import Link from "next/link"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                        <CardWithCorners className="group hover:scale-105 transition-all cursor-pointer">

                            <div className="aspect-video overflow-hidden mb-4 -mx-6 -mt-6">
                                <img
                                    src={post.coverImage || "/placeholder.svg"}
                                    className="w-full h-full object-cover group-hover:scale-110 transition"
                                />
                            </div>

                            <div className="space-y-4">

                                <div className="flex justify-between text-sm text-white/50">
                                    <span className="flex gap-1 items-center">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(post.date).toLocaleDateString()}
                                    </span>
                                    <span className="flex gap-1 items-center">
                                        <Clock className="h-4 w-4" /> 3 min
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold group-hover:text-blue-400 transition">
                                    {post.title}
                                </h3>

                                <p className="text-white/70 text-sm line-clamp-3">
                                    {post.summary}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {post.tags.slice(0, 3).map(tag => (
                                        <Badge
                                            key={tag}
                                            className="bg-white/10 border border-white/20 text-xs text-white/80"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex justify-between pt-2 text-sm">
                                    <span className="flex gap-1 items-center text-white/50">
                                        <User className="h-3 w-3" />
                                        {post.author?.name ?? (process.env.NEXT_PUBLIC_FULL_NAME || "Somin Dadhaniya")}
                                    </span>
                                    <span className="flex items-center text-blue-400">
                                        Read More
                                        <ArrowRight className="ml-1 h-3 w-3" />
                                    </span>
                                </div>

                            </div>
                        </CardWithCorners>
                    </Link>
                ))}
            </div>

            {showViewMore && (
                <div className="flex justify-center mt-16">
                    <Link
                        href="/blog"
                        className="flex gap-2 items-center text-zinc-500 hover:text-white group"
                    >
                        <span className="text-lg font-medium">View more blogs</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            )}
        </>
    )
}
