"use client"

import { motion } from "framer-motion"
import { CardWithCorners } from "@/components/ui/card-with-corners"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Star, Fork, GitFork, Calendar, Code, Eye } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"

interface ProjectDetailProps {
  project: {
    id: number
    name: string
    full_name: string
    description: string | null
    html_url: string
    homepage: string | null
    language: string | null
    stargazers_count: number
    forks_count: number
    watchers_count: number
    created_at: string
    updated_at: string
    topics: string[]
    readme?: string
    languages?: Record<string, number>
    owner: {
      login: string
      avatar_url: string
    }
  }
}

export const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatProjectName = (name: string) => {
    return name
      .replace(/-/g, ' ')
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <Link href="/#projects">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {formatProjectName(project.name)}
              </h1>
              <p className="text-xl text-muted-foreground">
                {project.description || "No description available"}
              </p>
            </div>
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block"
            >
              <Button size="lg" className="bg-[#CCFF00] hover:bg-[#b8e600] text-black">
                <ExternalLink className="mr-2 h-4 w-4" />
                View on GitHub
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">{project.stargazers_count}</span>
              <span>stars</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Fork className="h-5 w-5" />
              <span className="font-medium">{project.forks_count}</span>
              <span>forks</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Eye className="h-5 w-5" />
              <span className="font-medium">{project.watchers_count}</span>
              <span>watchers</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-5 w-5" />
              <span>Created {formatDate(project.created_at)}</span>
            </div>
            {project.language && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Code className="h-5 w-5" />
                <span className="font-medium">{project.language}</span>
              </div>
            )}
          </div>

          {/* Topics */}
          {project.topics && project.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.topics.map((topic) => (
                <span
                  key={topic}
                  className="text-sm font-medium text-foreground/60 bg-muted px-3 py-1 rounded-full border border-border"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          {/* Languages */}
          {project.languages && Object.keys(project.languages).length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(project.languages).map(([lang, bytes]) => (
                  <span
                    key={lang}
                    className="text-sm font-medium text-foreground/60 bg-muted px-3 py-1 rounded-full border border-border"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* README Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardWithCorners className="p-8">
            <h2 className="text-2xl font-bold mb-6">About This Project</h2>
            {project.readme ? (
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{project.readme}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-muted-foreground">
                No README available for this project. Check out the GitHub repository for more information.
              </p>
            )}
          </CardWithCorners>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden"
          >
            <Button size="lg" className="bg-[#CCFF00] hover:bg-[#b8e600] text-black">
              <ExternalLink className="mr-2 h-4 w-4" />
              View on GitHub
            </Button>
          </a>
          {project.homepage && (
            <a href={project.homepage} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Button>
            </a>
          )}
        </motion.div>
      </div>
    </div>
  )
}
