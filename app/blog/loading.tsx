import { BlogCardSkeleton } from "@/components/BlogCardSkeleton"

export default function Loading() {
    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-20">
            <div className="container mx-auto max-w-6xl px-4">

                {/* Fake header skeleton */}
                <div className="mb-16 flex flex-col items-center gap-3">
                    <div className="h-14 w-72 bg-muted rounded-lg animate-pulse" />
                    <div className="h-5 w-96 bg-muted/50 rounded animate-pulse" />
                </div>

                {/* Fake search bar */}
                <div className="h-14 w-full bg-muted/30 rounded-2xl mb-12 animate-pulse" />

                {/* Cards skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <BlogCardSkeleton key={i} />
                    ))}
                </div>
            </div>

            {/* keep background glow during loading */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
            <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 -z-10" />
        </div>
    )
}
