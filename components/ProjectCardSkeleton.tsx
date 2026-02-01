export function ProjectCardSkeleton() {
    return (
        <div className="group relative h-full min-h-32">
            {/* Back layer */}
            <div className="absolute h-full w-full left-1.5 top-1.5 bg-muted border border-border/50 rounded-2xl" />

            {/* Middle layer */}
            <div className="absolute h-full w-full left-0 top-0 bg-muted border border-border/50 rounded-2xl" />

            {/* Front layer (Main content) */}
            <div className="relative flex justify-between px-6 md:px-8 rounded-2xl h-full py-4 items-center bg-card border border-border">
                <div className="flex flex-col gap-3 w-full pr-4">
                    {/* Title Skeleton */}
                    <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />

                    {/* URL Skeleton */}
                    <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />

                    {/* Stats Skeleton */}
                    <div className="flex gap-4 mt-1">
                        <div className="h-4 w-12 bg-muted animate-pulse rounded" />
                        <div className="h-4 w-12 bg-muted animate-pulse rounded" />
                    </div>
                </div>

                {/* Icon Skeleton */}
                <div className="w-6 h-6 bg-muted animate-pulse rounded flex-shrink-0" />
            </div>
        </div>
    )
}
