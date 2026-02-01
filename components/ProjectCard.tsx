"use client"

import { ExternalLink } from "lucide-react"

interface Project {
  id: string
  title: string
  url: string
  logoUrl: string
  stars?: number
  forks?: number
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative transition-all ease-in-out h-full">
      {/* Back layer (purple) - positioned first so it's behind */}
      <div className="absolute h-full w-full left-1.5 top-1.5 group-hover:left-2 group-hover:top-2 bg-muted group-hover:bg-[#b087ff] border border-border group-hover:border-slate-500 rounded-2xl transition-all ease-in-out shadow-xl group-hover:shadow-2xl"></div>

      {/* Middle layer (yellow) */}
      <div className="absolute h-full w-full left-0 top-0 bg-muted group-hover:bg-[#ffd074] border border-border rounded-2xl transition-all ease-in-out"></div>

      {/* Main card - on top */}
      <button
        type="button"
        className="relative flex justify-between px-6 md:px-8 rounded-2xl h-auto min-h-32 py-4 items-center bg-card border border-border hover:border-slate-400 dark:hover:border-zinc-600 top-0 left-0 group-hover:-top-2 group-hover:-left-2 transition-all ease-in-out w-full shadow-lg hover:shadow-xl"
        onClick={() => window.open(`https://${project.url}`, "_blank")}
      >
        <div className="flex flex-col gap-2 text-start relative pr-2 min-w-0 flex-1">
          <div className="flex flex-col gap-0.5 min-w-0">
            <p className="text-lg md:text-xl font-bold text-foreground leading-tight group-hover:text-black dark:group-hover:text-white transition-colors truncate">
              {project.title}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 overflow-hidden whitespace-nowrap truncate transition-colors">
              {project.url}
            </p>
          </div>

          {(project.stars !== undefined || project.forks !== undefined) && (
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-1.5 text-[#ffd074] group-hover:text-[#ffd074] transition-colors">
                <svg className="w-3.5 h-3.5 stroke-[2] fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span className="text-xs font-medium">{project.stars || 0}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#b087ff] group-hover:text-[#b087ff] transition-colors">
                <svg className="w-3.5 h-3.5 stroke-[2] fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="18" r="3"></circle>
                  <circle cx="6" cy="6" r="3"></circle>
                  <circle cx="18" cy="6" r="3"></circle>
                  <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"></path>
                  <path d="M12 12v3"></path>
                </svg>
                <span className="text-xs font-medium">{project.forks || 0}</span>
              </div>
            </div>
          )}
        </div>

        <ExternalLink className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-black dark:group-hover:text-white transition-colors flex-shrink-0 ml-2" />
      </button>
    </div>
  )
}

export { ProjectCard }
