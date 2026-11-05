"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  title: string
  url: string
  logoUrl: string
  description?: string
  language?: string
  stars?: number
  forks?: number
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative h-full">
      <div aria-hidden="true" className="absolute inset-0 translate-x-1 translate-y-1 border-2 border-black bg-primary transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
      <Link href={`/projects/${project.id}`} className="relative flex h-full min-h-[220px] flex-col items-start justify-between border-2 border-black bg-white p-5 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 md:p-6">
        <div className="flex min-w-0 flex-col gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-extrabold leading-tight text-black transition-colors group-hover:text-cyan-800 md:text-xl">{project.title}</h3>
            {project.description && <p className="mt-3 line-clamp-3 font-mono text-xs leading-6 text-neutral-600">{project.description}</p>}
          </div>
          {project.language && <span className="w-fit border border-neutral-300 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-neutral-600">{project.language}</span>}
        </div>
        <div className="mt-5 flex w-full items-center justify-between border-t border-neutral-200 pt-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-cyan-800">
          <span>View project</span><ArrowUpRight className="h-4 w-4" />
        </div>
      </Link>
    </div>
  )
}

export { ProjectCard }
