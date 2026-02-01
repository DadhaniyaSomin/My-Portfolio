export function BlogCardSkeleton() {
  return (
    <div className="group border border-border rounded-2xl overflow-hidden bg-muted/30 backdrop-blur h-full flex flex-col transition-colors duration-300">
      {/* Image Skeleton */}
      <div className="relative w-full h-48 overflow-hidden bg-muted">
        <div className="w-full h-full bg-gradient-to-r from-muted via-muted/80 to-muted animate-shimmer" />
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Meta Info Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-3 w-20 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-shimmer rounded" />
          <div className="h-3 w-24 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-shimmer rounded" />
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-6 w-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-shimmer rounded" />
          <div className="h-6 w-3/4 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-shimmer rounded" />
        </div>

        {/* Summary Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-shimmer rounded" />
          <div className="h-4 w-5/6 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-shimmer rounded" />
        </div>

        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-6 w-16 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-shimmer rounded-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
