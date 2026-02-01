import Link from "next/link"
import { Calendar, Clock, User, ArrowRight, ArrowLeft } from "lucide-react"
import { BlogPost } from "@/types/blog"
import { CardWithCorners } from "@/components/ui/card-with-corners"
import { Badge } from "@/components/ui/badge"
import BlogSearch from "./search"
import { SITE_URL } from "@/lib/utils"

async function getPosts() {
    const res = await fetch(`${SITE_URL}/api/blog`, {
        cache: "force-cache",
        headers: {
            "x-api-secret": process.env.INTERNAL_API_SECRET || "",
        },
    })

    if (!res.ok) return []

    return res.json() as Promise<BlogPost[]>
}

export default async function BlogListPage() {
    const posts: BlogPost[] = await getPosts()

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-20 transition-colors duration-300">
            <div className="container mx-auto max-w-6xl">

                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground uppercase tracking-tight">
                        Blogs
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Thoughts, tutorials, and insights about web & mobile development
                    </p>
                </div>

                {/* Client search */}
                <BlogSearch posts={posts} />

            </div>

            {/* background glow */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
            <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 -z-10" />
        </div>
    )
}
