import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 pt-24 text-black">
      <div className="mb-12 border-2 border-black bg-white p-10 text-center shadow-[5px_5px_0_#00b8d4]">
        <div>
          <h1 className="mb-4 text-6xl font-extrabold tracking-tighter text-black md:text-8xl">
            404
          </h1>
          <p className="mb-2 text-2xl font-bold text-black md:text-3xl">
            Blog Post Not Found
          </p>
          <p className="max-w-md font-mono text-sm leading-7 text-neutral-600">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>

      <Link href="/blog" className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-cyan-800 hover:text-black group">
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span>Back to all posts</span>
      </Link>

    </div>
  )
}
