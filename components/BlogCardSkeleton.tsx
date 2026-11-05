export function BlogCardSkeleton() {
  return (
    <div className="flex h-full flex-col border-2 border-black bg-white p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="h-3 w-20 animate-pulse bg-neutral-200" />
        <div className="h-3 w-24 animate-pulse bg-neutral-200" />
      </div>
      <div className="mb-4 space-y-2">
        <div className="h-6 w-full animate-pulse bg-neutral-200" />
        <div className="h-6 w-3/4 animate-pulse bg-neutral-200" />
      </div>
      <div className="mb-6 space-y-2">
        <div className="h-4 w-full animate-pulse bg-neutral-100" />
        <div className="h-4 w-5/6 animate-pulse bg-neutral-100" />
      </div>
      <div className="mt-auto flex gap-2">
        {[0, 1, 2].map((item) => <div key={item} className="h-6 w-16 animate-pulse bg-neutral-200" />)}
      </div>
    </div>
  )
}
