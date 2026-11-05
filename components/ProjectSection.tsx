import { ExternalLink } from "lucide-react"
import { ProjectCard } from "./ProjectCard"

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

export default function ProjectSection({ initialProjects = [] }: { initialProjects?: Project[] }) {
  const projects = initialProjects.slice(0, 3)

  return (
    <section id="projects" className="border-y border-neutral-200 bg-neutral-50 py-20">
      <div className="container mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-12 text-left">
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[.16em] text-cyan-800">01 / Selected work</p>
          <h2 className="mb-5 text-4xl font-extrabold uppercase tracking-[-.06em] text-black md:text-6xl">Things I’ve built.</h2>
          <p className="max-w-2xl font-mono text-sm leading-7 text-neutral-600 md:text-base">
            A handpicked set of repositories, each with a quick overview and direct access to its README, implementation, and technology details.
          </p>
        </div>

        {projects.length ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        ) : (
          <p className="border-2 border-black bg-white p-6 font-mono text-sm text-neutral-600">
            Featured repositories are temporarily unavailable. Visit GitHub to browse my work.
          </p>
        )}

        <div className="mt-9">
          <a href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || "somindadhaniya"}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-cyan-800 transition hover:text-black">
            More on GitHub <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
