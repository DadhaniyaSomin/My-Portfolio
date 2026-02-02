export function BlogDetailSkeleton() {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            {/* Banner Skeleton */}
            <div className="relative w-full">
                {/* Grid lines overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute top-0 w-full h-px bg-foreground/10" />
                    <div className="absolute bottom-0 w-full h-px bg-foreground/10" />
                    <div className="hidden md:block absolute left-12 h-full w-px bg-foreground/10" />
                    <div className="hidden md:block absolute right-12 h-full w-px bg-foreground/10" />
                </div>

                <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-foreground/5">
                    {/* Content Overlay Skeleton */}
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
                        <div className="container mx-auto max-w-4xl">
                            {/* Back Link */}
                            <div className="h-6 w-32 bg-foreground/10 animate-pulse rounded mb-6" />

                            {/* Tags */}
                            <div className="flex gap-2 mb-6">
                                <div className="h-6 w-16 bg-foreground/10 animate-pulse rounded-full" />
                                <div className="h-6 w-20 bg-foreground/10 animate-pulse rounded-full" />
                            </div>

                            {/* Title */}
                            <div className="space-y-4 mb-6">
                                <div className="h-10 w-3/4 bg-foreground/10 animate-pulse rounded" />
                                <div className="h-10 w-1/2 bg-foreground/10 animate-pulse rounded" />
                            </div>

                            {/* Summary */}
                            <div className="hidden md:block space-y-2 mb-8">
                                <div className="h-6 w-full bg-foreground/10 animate-pulse rounded" />
                                <div className="h-6 w-5/6 bg-foreground/10 animate-pulse rounded" />
                            </div>

                            {/* Meta Data */}
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-foreground/10 animate-pulse" />
                                    <div className="h-4 w-24 bg-foreground/10 animate-pulse rounded" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 rounded-full bg-foreground/10 animate-pulse" />
                                    <div className="h-4 w-20 bg-foreground/10 animate-pulse rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-3xl px-4 py-16 relative">
                {/* Content Skeleton */}
                <article className="space-y-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="space-y-4">
                            {i % 2 === 0 && (
                                <div className="h-8 w-1/3 bg-foreground/5 animate-pulse rounded mb-6" />
                            )}
                            <div className="h-4 w-full bg-foreground/5 animate-pulse rounded" />
                            <div className="h-4 w-full bg-foreground/5 animate-pulse rounded" />
                            <div className="h-4 w-5/6 bg-foreground/5 animate-pulse rounded" />
                        </div>
                    ))}
                </article>
            </div>
        </div>
    )
}
